const userModel = require("../models/userModels");
const doctorModel = require("../models/doctorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register callback
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exists!", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Successfully!", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// const loginController = async (req, res) => {
//     try {
//         const user = await userModel.findOne({email: req.body.email});
//         if(!user){
//             return res.status(200).send({message:'User Not Found!', success: false});
//         }
//         const isMatch = await bcrypt.compare(req.body.password, user.password);
//         if(!isMatch){
//             return res.status(200).send({message:'Invalid Email or Password!', success: false});
//         }
//         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
//         res.status(200).send({message: 'Login Successfully!', success:true, token});
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({message: `Error in Login CTR ${error.message}`})
//     }
// };

const loginController = (req, res) => {
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(200)
          .send({ message: "User Not Found!", success: false });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res
              .status(200)
              .send({ message: "Invalid Email or Password!", success: false });
          }
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          res
            .status(200)
            .send({ message: "Login Successfully!", success: true, token });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(500)
            .send({ message: `Error in Login CTRL ${error.message}` });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: `Error in Login CTR ${error.message}` });
    });
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      // return res.status(200).send({
      return res.status(404).send({
        message: "User Not Found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error!",
      success: false,
      error,
    });
  }
};

// Apply-Doc Ctrl
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pendng" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "doctor-application-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + ' ' + newDoctor.lastName,
        onClickPath: '/admin/doctors'
      }
    });
    await userModel.findOneAndUpdate(adminUser._id, {notification})
    res.status(201).send({
      success: true,
      message: 'Doctor Account Applied Successfully'
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while applying as a Doctor!",
      success: false,
      error,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
};

const userModel = require("../models/userModels");
const doctorModel = require("../models/doctorModel");

//Get Single Doctor
const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Doctor data fetched successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Doctor Details",
      error,
    });
  }
};

const updateDoctorProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating Doctor's Profile",
      error,
    });
  }
};
// get single doctor
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Single Doctor Info Fetched Successfully!",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting Single Doctor Detail",
      error,
    });
  }
};
module.exports = {
  getDoctorInfoController,
  updateDoctorProfileController,
  getDoctorByIdController,
};

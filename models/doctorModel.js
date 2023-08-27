const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
    },
    email: {
      type: String,
      required: [true, "Email Name is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address Name is required"],
    },
    specialization: {
      type: String,
      required: [true, "Specialization Name is required"],
    },
    experience: {
      type: String,
      required: [true, "Experience Name is required"],
    },
    feesPerConsultation: {
      type: Number,
      required: [true, "Fees Per Consulation is required"],
    },
    status: {
      type: String,
      default: 'pending',
    },
    timings: [
      {
        type: String,
        required: [true, "Work timing is required"],
      },
      {
        type: String,
        required: [true, "Work timing is required"],
      },
    ],
    // timings: {
    //   type: Object,
    //   required: [true, "Work timing is required"],
    // },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;

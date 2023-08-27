const express = require("express");
const authMiddleWare = require("../middlewares/authMiddleware");
const {
  getDoctorInfoController,
  updateDoctorProfileController,
  getDoctorByIdController,
  doctorAppointmentController,
  updateStatusController,
} = require("../controllers/doctorCtrl");

const router = express.Router();

// POST GET Doctor Info
router.post("/getDoctorInfo", authMiddleWare, getDoctorInfoController);

// POST UPDATE Doctor PROFILE
router.post("/updateProfile", authMiddleWare, updateDoctorProfileController);

// POST UPDATE Doctor PROFILE
router.post("/getDoctorById", authMiddleWare, getDoctorByIdController);

//GET APPOINTMENT
router.get("/doctor-appointments", authMiddleWare, doctorAppointmentController);

//UPDATE STATUS
router.post("/update-status", authMiddleWare, updateStatusController);

module.exports = router;

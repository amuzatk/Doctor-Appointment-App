const express = require("express");
const authMiddleWare = require("../middlewares/authMiddleware");
const {
  getDoctorInfoController,
  updateDoctorProfileController,
  getDoctorByIdController,
} = require("../controllers/doctorCtrl");

const router = express.Router();

// POST GET Doctor Info
router.post("/getDoctorInfo", authMiddleWare, getDoctorInfoController);

// POST UPDATE Doctor PROFILE
router.post("/updateProfile", authMiddleWare, updateDoctorProfileController);

// POST UPDATE Doctor PROFILE
router.post("/getDoctorById", authMiddleWare, getDoctorByIdController);

module.exports = router;

const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookAvailabilityController,
  userAppointmentController
} = require("../controllers/userCtl");
const authMiddleware = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routes
//LOGIN || POST

router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//APPLY-DOC || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//DOCTOR NOTIFICATION || POST
router.post(
  "/get-all-notifications",
  authMiddleware,
  getAllNotificationController
);

//DELETE NOTIFICATION || POST
router.post(
  "/delete-all-notifications",
  authMiddleware,
  deleteAllNotificationController
);

//GET METHOD || APPROVED DOCTORS
router.get(
  "/getAllDoctors",
  authMiddleware,
  getAllDoctorsController
);

//Book APPOINTMENT
router.post('/book-appointment', authMiddleware, bookAppointmentController)

//Book availability
router.post('/book-availability', authMiddleware, bookAvailabilityController)

//USER APPOINTMENT
router.get('/user-appointments', authMiddleware, userAppointmentController)
module.exports = router;

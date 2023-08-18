const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
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

module.exports = router;

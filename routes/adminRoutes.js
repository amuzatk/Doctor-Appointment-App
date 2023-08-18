const express = require("express");
const {
    getAllUsersController,
    getAllDoctorsController,
    changeAccountStatusController,
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//GET METHOD || USERS
router.get(
  "/getAllUsers",
  authMiddleware,
  getAllUsersController
);
//GET METHOD || DOCTORS
router.get(
    "/getAllDoctors",
    authMiddleware,
    getAllDoctorsController
  );
  //POST CHANGE ACCOUNT STATUS
router.post(
  "/getAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;

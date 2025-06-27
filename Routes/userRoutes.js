const express = require("express");
const router = express.Router();
// const userValidation = require("../middleWares/userMiddelWares");
// const authorize = require("../middleWares/authorize");
// const authenticate = require("../middleWares/authinticate");
// const signup =require("../Controllers/authController")
const {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  //   deleteUser,
} = require("../Controller/userController");

router.post(
  "/",
  //   authenticate,
  //   authorize(["manger"]),
  //   userValidation,
  createUser
);
router.get("/", getAllUser);
router.get("/:id", getUser);
router.patch(
  "/:id",
  //   authenticate,
  //   authorize(["manger"]),
  //   userValidation,
  updateUser
);
// router.delete("/:id", deleteUser);

module.exports = router;

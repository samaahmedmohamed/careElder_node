const express = require("express");
const router = express.Router();
const {
  createProvider,
  //   getAllUser,
  //   getUser,
  //   updateUser,
} = require("../Controller/providerController");

router.post("/", createProvider);
// router.get("/", getAllUser);
// router.get("/:id", getUser);
// router.patch(
//   "/:id",
//   //   authenticate,
//   //   authorize(["manger"]),
//   //   userValidation,
//   updateUser
// );
// router.delete("/:id", deleteUser);

module.exports = router;

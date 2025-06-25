const { login } = require("../Controller/loginController");

const express = require("express");
const router = express.Router();

router.post("/", login);
module.exports = router;

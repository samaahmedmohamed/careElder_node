const { register } = require("../Controller/registerController");

const express = require("express");
const router = express.Router();

router.post("/", register);
module.exports = router;

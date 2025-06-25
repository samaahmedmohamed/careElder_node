const mongoose = require("mongoose");
const express = require("express");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => {
  console.log("MongoDB connected successfully");
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

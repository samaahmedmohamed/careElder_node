const express = require("express");
const app = express();
app.use(express.json());
const registerRoutes = require("./Routes/registerRoutes");
const loginRoutes = require("./Routes/loginRoutes");

app.use("/signup", registerRoutes);
app.use("/login", loginRoutes);
module.exports = app;

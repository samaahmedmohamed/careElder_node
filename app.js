const express = require("express");
const app = express();
app.use(express.json());
const registerRoutes = require("./Routes/registerRoutes");
const loginRoutes = require("./Routes/loginRoutes");
const serviceRoutes=require("./Routes/serviceRoutes")
app.use("/signup", registerRoutes);
app.use("/login", loginRoutes);
app.use('/service',serviceRoutes);
module.exports = app;

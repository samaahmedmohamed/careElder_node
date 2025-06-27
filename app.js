const express = require("express");
const app = express();
app.use(express.json());
const registerRoutes = require("./Routes/registerRoutes");
const loginRoutes = require("./Routes/loginRoutes");
const userRoutes = require("./Routes/userRoutes");
const providerRoutes = require("./Routes/providerRoutes");

app.use("/signup", registerRoutes);
app.use("/login", loginRoutes);
app.use("/users", userRoutes);
app.use("/provider", providerRoutes);

module.exports = app;

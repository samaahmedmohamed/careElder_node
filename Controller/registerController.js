const bcrypt = require("bcrypt");
const userModel = require("../Model/userModel");
const providerModel = require("../Model/providerModel");

exports.register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    role,
    country,
    phone,
    gender,
    profileImage,
    jobDescription,
    cvImage,
    frontNationalID,
    backNationalID,
  } = req.body;

  try {
    const existing =
      role === "provider"
        ? await providerModel.findOne({ email })
        : await userModel.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "provider") {
      const provider = await providerModel.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        role: "provider",
        country: country,
        phone: phone,
        gender: gender,
        profileImage: profileImage,
        jobDescription: jobDescription,
        cvImage: cvImage,
        frontNationalID: frontNationalID,
        backNationalID: backNationalID,
      });
      res.status(201).json({ message: "Provider registered", provider });
    } else {
      const user = await userModel.create({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        role: "user",
        country,
        phone,
        gender,
        profileImage,
      });
      res.status(201).json({ message: "User registered", user });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

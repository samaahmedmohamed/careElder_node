const providerModel = require("../Model/providerModel");
const catchAsync = require("../utilities/catchAsync");

const createProvider = catchAsync(async (req, res) => {
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

  const newProvider = await providerModel.create({
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

  res.status(200).json({
    status: "success",
    data: { provider: newProvider },
  });
});

module.exports = { createProvider };

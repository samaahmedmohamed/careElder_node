// const

const userModel = require("../Model/userModel");
const catchAsync = require("../utilities/catchAsync");

const createUser = catchAsync(async (req, res) => {
  const newUser = await userModel.create({
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

  res.status(200).json({
    status: "success",
    data: { user: newUser },
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const { status, name } = req.query;
  const filter = {};
  if (filter) {
    filter.status = status;
  }
  if (name) {
    filter.$or = [
      { firstName: { $regex: name, $options: "i" } },
      { lastName: { $regex: name, $options: "i" } },
    ];
  }
  const users = await userModel.find(filter);
  res.status(200).json({
    status: "success",
    data: { users: users },
  });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userModel.findById(req.param.id);
  if (!user) {
    res.status(404).json({
      status: "failed",
      message: "No user Exists with that id",
    });
  }
  res.status(200).json({
    status: "success",
    data: { user: user },
  });
});

const updateUser = catchAsync(async (req, res) => {
  const updated = await userModel.findByIdAndUpdate(req.param.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: { user: updated },
  });
});
module.exports = { createUser, getAllUser, getUser, updateUser };

// const bcrypt = require("bcrypt");
// const userModel = require("../Model/userModel");
// const providerModel = require("../Model/providerModel");
// const jwt = require("jsonwebtoken");

// exports.login = async (req, res) => {
//   const { email, password, role } = req.body;

//   try {
//     const user =
//       role === "provider"
//         ? await providerModel.findOne({ email }).select("+password")
//         : await userModel.findOne({ email }).select("+password");
//     console.log("Email received:", email);
//     console.log("Role received:", role);
//     console.log(user);

//     if (!user) return res.status(404).json({ message: "provider not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "2d" }
//     );

//     res.status(200).json({
//       message: "Logged in successfully",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

const bcrypt = require("bcrypt");
const userModel = require("../Model/userModel");
const providerModel = require("../Model/providerModel");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await providerModel.findOne({ email }).select("+password");
    let modelType = "provider";

    if (!user) {
      user = await userModel.findOne({ email }).select("+password");
      modelType = "user";
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: modelType },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: modelType,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

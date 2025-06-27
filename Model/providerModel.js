const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    //mm
    firstName: {
      type: String,
      required: [true, "tell us your first name please !"],
    },
    lastName: {
      type: String,
      required: [true, "tell us your last name please !"],
    },
    email: {
      type: String,
      required: [true, "tell us your email plz !"],
      unique: true,
      validate: [validator.isEmail, "please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "please enter 8 digits !"],
      minLength: 8,
      select: false,
    },
    gender: {
      type: String,
      required: [true, "tell us your email plz !"],
      enum: ["male", "female"],
    },

    phone: {
      type: String,
      required: false,
    },

    country: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["provider"],
      default: "provider",
    },
    jobDescription: {
      type: String,
      enum: ["Home Nursing", "Care Assistant", "Physiotherapy"],
      defualt: "Care Assistant",
    },
    cvImage: {
      type: String,
      required: true,
    },
    frontNationalID: {
      type: String,
      required: true,
    },
    backNationalID: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: true,
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now(),
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
userSchema
  .virtual("confirmPassword")
  .set(function (value) {
    this._confirmPassword = value;
  })
  .get(function () {
    return this._confirmPassword;
  });

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    if (this._confirmPassword !== this.password) {
      return next(new Error("passwords donot match"));
    }
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const providerModel = mongoose.model("providers", userSchema);

module.exports = providerModel;

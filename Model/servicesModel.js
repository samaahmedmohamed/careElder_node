const validator = require("validator");
const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema({
  service: {
    type: [String],
    required: true,
  },
  pricing: {
    type: {
      PerHour: {
        type: new mongoose.Schema(
          { price: { type: Number, required: true } },
          { _id: false }
        ),
        required: true,
      },
      PerDay: {
        type: new mongoose.Schema(
          { price: { type: Number, required: true } },
          { _id: false }
        ),
        required: true,
      },
      overNight: {
        type: new mongoose.Schema(
          { price: { type: Number, required: true } },
          { _id: false }
        ),
        required: true,
      },
    },
    required: true,
  },
  availability: {
    type: [
      new mongoose.Schema(
        {
          day: {
            type: String,
            enum: [
              "Saturday",
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
            required: true,
          },
          available: {
            type: Boolean,
            default: false,
          },
          timeSlots: {
            type: [String], // مثلا ["10:00-12:00", "13:00-15:00"]
            default: [],
          },
          serviceType: {
            type: String,
            enum: ["PerHour", "PerDay", "overNight", null],
            default: null,
          },
        },
        { _id: false }
      ),
    ],
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "providers",
    required: true
  }
});
const serviceModel=mongoose.model("services", serviceSchema)
module.exports=serviceModel;
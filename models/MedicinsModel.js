// Creating A MedicinSchema For data connection
const { Schema, model } = require("mongoose");
const MedicinSchema = new Schema(
  {
    medicinName: {
      type: String,
      required: true,
    },
    medicinType: {
      type: String,
      enum: ["pills", "tablet", "syringe", "syrup"],
      required: true,
    },
    medicinReminderHours: {
      type: Number,
      required: true,
    },
    medicinDose: {
      type: Number,
      required: true,
    },
    medicinConvertedDose: {
      type: Number,
    },
  },
  { timestamps: true }
);

// export for globl uses
module.exports = model("MedicinModel", MedicinSchema);

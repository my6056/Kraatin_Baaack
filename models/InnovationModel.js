// Creating A InnovationSchema For data connection
const { Schema, model } = require("mongoose");
const InnovationSchema = new Schema(
  {
    weight: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
    },
    age: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "regular",
    },
  },
  { timestamps: true }
);

// export for globl uses
module.exports = model("InnovationModel", InnovationSchema);

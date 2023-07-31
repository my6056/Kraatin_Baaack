// Creating A UserSchemaaa For data connection
const { Schema, model } = require("mongoose");
const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    emailId: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minLength: 6,
    },
  },
  { timestamps: true }
);

// export for globl uses
module.exports = model("UserModel", UserSchema);

// importing
const InnovationModel = require("../models/InnovationModel");
const { validationResult } = require("express-validator");

// Create User Innovtion update funtion

module.exports.CreateHealthDetails = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ status: false, message: errors.array() });
  }
  const { weight, age, address, type } = req.body;
  try {
    const updatedUserDetails = await InnovationModel.findByIdAndUpdate(
      req.params.id,
      {
        weight,
        age,
        address,
        type,
      },
      { new: true }
    ).populate("UserModel");
    if (!updatedUserDetails) {
      return res.json({ status: false, message: "Forbidden" });
    }
    return res.json({
      status: true,
      message: "Details Added Successfully",
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "Internl Server Error !",
    });
  }
};

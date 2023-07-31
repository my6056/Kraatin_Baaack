// importing
const MedicinModel = require("../models/MedicinsModel");

// add medicin function

module.exports.AddMedicins = async (req, res) => {
  const { medicinName, medicinType, medicinReminderHours, medicinDose } =
    req.body;
  if (!medicinName && !medicinReminderHours && !medicinType) {
    return res.json({
      status: false,
      message: "All Fields Required !",
    });
  }
  try {
    const medicineSave = await new MedicinModel({
      medicinName,
      medicinReminderHours,
      medicinType,
      medicinDose,
    });
    const conversionFactor = 0.001;
    medicineSave.medicinConvertedDose = medicinDose * conversionFactor;
    await medicineSave.save();
    return res.json({
      status: true,
      message: "Medicin Added Successfull",
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "Internal Server Error !",
    });
  }
};

// Get All Medicins function

module.exports.GetMedicins = async (req, res) => {
  try {
    const medicins = await MedicinModel.find();
    if (medicins.length === 0) {
      return res.json({
        status: false,
        message: "Please Add Medicins ",
      });
    }
    return res.json({
      status: true,
      medicins,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "Internal Server Error !",
    });
  }
};

// Importing router and express aand other functions
const express = require("express");
const router = express.Router();
const {
  AddMedicins,
  GetMedicins,
} = require("../controllers/MedicinController");

// aadding medicins routes
router.post("/add-new", AddMedicins);
// Get all Medicins
router.get("/get-all", GetMedicins);

// Export for global use
module.exports = router;

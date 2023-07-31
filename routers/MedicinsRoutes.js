// Importing router and express aand other functions
const express = require("express");
const router = express.Router();
const {
  AddMedicins,
  GetMedicins,
  DeleteMedicin,
} = require("../controllers/MedicinController");

// aadding medicins routes
router.post("/add-new", AddMedicins);
// Get all Medicins
router.get("/get-all", GetMedicins);
// delete medici
router.delete("/delete/:id", DeleteMedicin);

// Export for global use
module.exports = router;

// Importing router and express aand other functions
const express = require("express");
const router = express.Router();
const { CreateHealthDetails } = require("../controllers/innovation");
const { body } = require("express-validator");
// Validation middleware
const validateUpdateData = [
  body("weight").isNumeric().optional(),
  body("age").isInt({ min: 0 }).optional(),
  body("address").isString().optional(),
  body("type").isIn(["regular", "admin"]).optional(),
];

// routes for update
router.put("/add-details/:id", validateUpdateData, CreateHealthDetails);

// Export for global use
module.exports = router;

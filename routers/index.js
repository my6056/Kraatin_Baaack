// Importing router and express and routes
const express = require("express");
const router = express.Router();
const UserRoutes = require("./UserRoutes");
const InnovtionRoutes = require("./InnovationRoutes");
const MedicinsRoutes = require("./MedicinsRoutes");
router.get("/", (req, res) => {
  return res.send("Site Working");
});

// User All Routes
router.use("/user", UserRoutes);
// innovation all routes
router.use("/health", InnovtionRoutes);
// Medicins ROutes
router.use("/medicin", MedicinsRoutes);

// Export for global use
module.exports = router;

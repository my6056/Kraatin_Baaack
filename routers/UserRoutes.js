// Importing router and express aand other functions
const express = require("express");
const router = express.Router();
const { AccountCreate, LoginUser } = require("../controllers/UserController");

// user account creation route
router.post("/create_new", AccountCreate);
// user Login function
router.post("/login", LoginUser);

// Export for global use
module.exports = router;

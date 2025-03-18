const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const authController = require("../controllers/auth.controller")
const { protect } = require("../middleware/auth.middleware")

// Register a new user
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  authController.register,
)

// Login user
router.post(
  "/login",
  [check("email", "Please include a valid email").isEmail(), check("password", "Password is required").exists()],
  authController.login,
)

// Get user profile
router.get("/profile", protect, authController.getProfile)

// Update user profile
router.put("/profile", protect, authController.updateProfile)

module.exports = router


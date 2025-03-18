const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const contactController = require("../controllers/contact.controller")
const { protect, admin } = require("../middleware/auth.middleware")

// Submit contact form
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("subject", "Subject is required").not().isEmpty(),
    check("message", "Message is required").not().isEmpty(),
  ],
  contactController.submitContactForm,
)

// Get all contact submissions (admin only)
router.get("/", protect, admin, contactController.getContactSubmissions)

// Update contact status (admin only)
router.put("/:id", protect, admin, contactController.updateContactStatus)

module.exports = router


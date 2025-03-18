const Contact = require("../models/Contact.model")
const { validationResult } = require("express-validator")
const nodemailer = require("nodemailer")

// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
exports.submitContactForm = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, subject, message } = req.body

    // Create new contact entry
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    })

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    // Send auto-reply to user
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for contacting Brushes and Beyond`,
      html: `
        <h3>Thank you for contacting Brushes and Beyond</h3>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p>Best regards,</p>
        <p>The Brushes and Beyond Team</p>
      `,
    }

    await transporter.sendMail(autoReplyOptions)

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully. We will get back to you soon!",
      contact,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all contact submissions (admin only)
// @route   GET /api/contact
// @access  Private/Admin
exports.getContactSubmissions = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 })
    res.json(contacts)
  } catch (error) {
    next(error)
  }
}

// @desc    Update contact submission status (admin only)
// @route   PUT /api/contact/:id
// @access  Private/Admin
exports.updateContactStatus = async (req, res, next) => {
  try {
    const { status, responseText } = req.body

    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({ message: "Contact submission not found" })
    }

    contact.status = status || contact.status

    if (responseText) {
      contact.response = {
        text: responseText,
        date: Date.now(),
      }

      // Send response email to user
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: contact.email,
        subject: `Re: ${contact.subject}`,
        html: `
          <h3>Response to your inquiry</h3>
          <p>Dear ${contact.name},</p>
          <p>${responseText}</p>
          <p>Best regards,</p>
          <p>The Brushes and Beyond Team</p>
        `,
      }

      await transporter.sendMail(mailOptions)
    }

    const updatedContact = await contact.save()

    res.json(updatedContact)
  } catch (error) {
    next(error)
  }
}


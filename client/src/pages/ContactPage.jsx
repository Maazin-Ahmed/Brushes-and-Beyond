"use client"

import { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, AlertCircle, CheckCircle } from "react-feather"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" })

  const { name, email, subject, message } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!name.trim()) newErrors.name = "Name is required"
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email is invalid"
    }
    if (!subject.trim()) newErrors.subject = "Subject is required"
    if (!message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)
    setSubmitStatus({ type: "", message: "" })

    try {
      const res = await axios.post("/api/contact", formData)

      setSubmitStatus({
        type: "success",
        message: res.data.message || "Your message has been sent successfully! We will get back to you soon.",
      })

      // Clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong. Please try again."
      setSubmitStatus({
        type: "error",
        message: errorMsg,
      })

      // Set field errors if returned from server
      if (err.response?.data?.errors) {
        const serverErrors = {}
        err.response.data.errors.forEach((error) => {
          serverErrors[error.param] = error.msg
        })
        setErrors(serverErrors)
      }
    } finally {
      setLoading(false)
      // Scroll to top to show status message
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h1>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-pink-500 to-green-500 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            We'd love to hear from you! Whether you have a question about our products, custom orders, or anything else,
            our team is ready to answer all your questions.
          </motion.p>
        </div>
      </section>

      {/* Status messages */}
      {submitStatus.message && (
        <div className="container mx-auto px-4 py-4">
          <div
            className={`rounded-md p-4 ${submitStatus.type === "success" ? "bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200" : "bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200"}`}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                {submitStatus.type === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-400 dark:text-green-300" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-400 dark:text-red-300" />
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{submitStatus.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Send Us a Message</h2>
            <div className="h-1 w-16 bg-pink-500 mb-6"></div>
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                    errors.name ? "border-red-500 dark:border-red-500" : "border-gray-300"
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                    errors.email ? "border-red-500 dark:border-red-500" : "border-gray-300"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={onChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                    errors.subject ? "border-red-500 dark:border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Product Inquiry"
                />
                {errors.subject && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={onChange}
                  rows="5"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                    errors.message ? "border-red-500 dark:border-red-500" : "border-gray-300"
                  }`}
                  placeholder="How can we help you?"
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-green-500 text-white py-3 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h2>
            <div className="h-1 w-16 bg-green-500 mb-6"></div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
              <div className="flex items-start mb-6">
                <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Our Location</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    123 Crafts Avenue, Andheri East
                    <br />
                    Mumbai, Maharashtra 400069
                    <br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Phone Number</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    <a
                      href="tel:+919876543210"
                      className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <a
                      href="tel:+912234567890"
                      className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                    >
                      +91 22 3456 7890
                    </a>{" "}
                    (Office)
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Email Address</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    <a
                      href="mailto:info@brushesandbeyond.com"
                      className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                    >
                      info@brushesandbeyond.com
                    </a>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <a
                      href="mailto:support@brushesandbeyond.com"
                      className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                    >
                      support@brushesandbeyond.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Business Hours</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 dark:bg-gray-800 hover:bg-pink-100 dark:hover:bg-pink-900/30 p-3 rounded-full transition-colors"
              >
                <svg
                  className="h-6 w-6 text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 dark:bg-gray-800 hover:bg-pink-100 dark:hover:bg-pink-900/30 p-3 rounded-full transition-colors"
              >
                <svg
                  className="h-6 w-6 text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 dark:bg-gray-800 hover:bg-pink-100 dark:hover:bg-pink-900/30 p-3 rounded-full transition-colors"
              >
                <svg
                  className="h-6 w-6 text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 .977.296 1.889.809 2.661a4.897 4.897 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Visit Our Workshop</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-green-500 mx-auto mb-6"></div>
          </motion.div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden h-[400px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1648651024812!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Brushes and Beyond Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-green-500 mx-auto mb-6"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Do you offer international shipping?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Yes, we ship our products worldwide. International shipping rates vary depending on the destination
                country and the size of your order.
              </p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Can I request custom designs?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We love creating custom pieces. Please contact us with your ideas, and we'll work with you to bring your
                vision to life.
              </p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">What is your return policy?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We accept returns within 14 days of delivery for unused items in their original packaging. Custom orders
                are non-returnable unless there's a defect.
              </p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">How long does shipping take?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Domestic orders typically arrive within 3-5 business days. International shipping can take 7-21 business
                days depending on the destination.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-green-500 rounded-2xl p-8 md:p-12 text-white text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for updates on new products, special offers, and creative inspiration.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-full flex-grow focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-pink-500 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage


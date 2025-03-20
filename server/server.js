const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const colors = require("colors")
const path = require("path")
const morgan = require("morgan")
const connectDB = require("./config/db")
const { errorHandler } = require("./middleware/error.middleware")

// Load environment variables from .env file
dotenv.config()

// Connect to MongoDB
connectDB()

// Initialize Express
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Development logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// API Routes
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/contact", require("./routes/contact.routes"))
// Add more routes as needed

// Error handling middleware
app.use(errorHandler)

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../client/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.send("API is running...")
  })
}

// Set port and start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  server.close(() => process.exit(1))
})


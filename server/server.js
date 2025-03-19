const express = require("express")
const dotenv = require("dotenv")
const colors = require("colors")
const morgan = require("morgan")
const path = require("path")
const cors = require("cors")
const connectDB = require("./config/db")
const { errorHandler } = require("./middleware/error.middleware")

// Load env vars
dotenv.config()

// Connect to database
connectDB()

// Route files
const authRoutes = require("./routes/auth.routes")
const productRoutes = require("./routes/product.routes")
const cartRoutes = require("./routes/cart.routes")
const orderRoutes = require("./routes/order.routes")
const contactRoutes = require("./routes/contact.routes")

const app = express()

// Body parser
app.use(express.json())

// Enable CORS
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? process.env.CLIENT_URL_PROD : process.env.CLIENT_URL,
    credentials: true,
  }),
)

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Mount routers
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/contact", contactRoutes)

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

// Error handler middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold),
)

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  server.close(() => process.exit(1))
})


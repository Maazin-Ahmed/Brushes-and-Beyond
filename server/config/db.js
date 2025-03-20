const mongoose = require("mongoose")
const colors = require("colors")

const connectDB = async () => {
  try {
    // Format connection string compatible with MongoDB Compass
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)

    // Log additional connection details for debugging
    console.log(`Database Name: ${conn.connection.name}`.green)
    console.log(`Connection State: ${mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"}`.green)

    // Set up connection event listeners for better error handling
    mongoose.connection.on("error", (err) => {
      console.error(`Mongoose connection error: ${err}`.red.bold)
    })

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose connection disconnected".yellow)
    })

    // Handle application termination gracefully
    process.on("SIGINT", async () => {
      await mongoose.connection.close()
      console.log("Mongoose connection closed due to app termination".yellow)
      process.exit(0)
    })

    return conn
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.red.bold)
    console.error(
      `Connection string (redacted): ${process.env.MONGODB_URI?.replace(/mongodb(\+srv)?:\/\/[^:]+:[^@]+@/, "mongodb$1://****:****@")}`
        .yellow,
    )
    console.error(`Full error details: ${error.stack}`.gray)
    process.exit(1)
  }
}

module.exports = connectDB


const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Attempting to connect to MongoDB...");
  if (!process.env.MONGODB_URI) {
    console.error("Error: MONGODB_URI is not defined in your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected successfully.");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

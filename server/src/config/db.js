const mongoose = require("mongoose");
mongoose.set("bufferCommands", false);

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn("MONGODB_URI (or MONGO_URI) not set. API will run without database connection.");
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
}

module.exports = connectDB;

// backend/utils/db.js

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = `mongodb+srv://prernaspk123:prerna%409897@geo-green.puffi0c.mongodb.net/?retryWrites=true&w=majority&appName=geo-green`;

    if (!uri) {
      throw new Error(
        "No MongoDB URI provided. Set MONGO_URI (or MONGODB_URI) in backend/.env."
      );
    }

    // Detect unreplaced placeholders from Atlas template
    if (/[<>]/.test(uri) || uri.includes("<username>") || uri.includes("<password>") || uri.includes("<cluster>")) {
      throw new Error(
        "Your MONGO_URI still contains placeholders. Replace <username>, <password>, and <cluster> with real values from MongoDB Atlas."
      );
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

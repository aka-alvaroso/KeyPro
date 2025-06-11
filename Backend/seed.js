const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Text = require("./models/text");

// MongoDB connection string - update with your actual connection details
const mongoURI = "mongodb://localhost:27017/keypro";

// Read the JSON file
const textsPath = path.join(__dirname, "..", "Texts", "all-texts.json");
const texts = JSON.parse(fs.readFileSync(textsPath, "utf-8"));

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("Connected to MongoDB successfully");

    try {
      // Clear existing texts
      await Text.deleteMany({});

      // Insert all texts
      const result = await Text.insertMany(texts);
      console.log(`Successfully inserted ${result.length} texts into database`);
    } catch (error) {
      console.error("Error seeding database:", error);
    } finally {
      // Close the connection
      mongoose.connection.close();
      console.log("Database connection closed");
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

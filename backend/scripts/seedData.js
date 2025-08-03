const mongoose = require("mongoose");
const Product = require("../models/productModel");
require("dotenv").config();

const sampleProducts = [
  {
    name: "NPK Fertilizer 20-20-20",
    description: "Balanced NPK fertilizer for all crops. Promotes healthy growth and high yields.",
    price: 850,
    category: "Fertilizers",
    offer: "10% OFF",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
  },
  {
    name: "Organic Neem Pesticide",
    description: "Natural pest control solution. Safe for plants and environment.",
    price: 450,
    category: "Pesticides",
    offer: "15% OFF",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
  },
  {
    name: "Glyphosate Herbicide",
    description: "Effective weed control for agricultural fields.",
    price: 1200,
    category: "Herbicides",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
  },
  {
    name: "Humic Acid Growth Promoter",
    description: "Enhances root development and nutrient absorption.",
    price: 650,
    category: "Growth Promoters",
    offer: "5% OFF",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
  },
  {
    name: "Vermicompost Organic",
    description: "Pure organic fertilizer rich in nutrients and beneficial microbes.",
    price: 350,
    category: "Organic Products",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
  },
  {
    name: "Urea Fertilizer 46-0-0",
    description: "High nitrogen fertilizer for leafy growth and green color.",
    price: 750,
    category: "Fertilizers",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert sample data
    const products = await Product.insertMany(sampleProducts);
    console.log(`Added ${products.length} sample products`);

    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

// seedData(); 
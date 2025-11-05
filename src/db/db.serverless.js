import mongoose from "mongoose";
import { MONGODB_URL } from "../config/Dotenv.config.js";
import { logger } from "../config/logger.config.js";

let isConnected = false;

export const DBConnect = async (server) => {
  if (!MONGODB_URL) {
    const error = "MongoDB connection string is not found";
    logger.warn(error);
    if (server) {
      server.close(() => {
        logger.warn("Server closed because connecting string is not found");
        process.exit(1);
      });
    } else {
      throw new Error(error);
    }
  }

  // If already connected, return
  if (isConnected) {
    logger.info("Using existing MongoDB connection");
    return;
  }

  try {
    // Configure mongoose for serverless
    mongoose.set('bufferCommands', false);
    
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(MONGODB_URL, options);
    isConnected = true;
    logger.info("✅ Connected to MongoDB.");
  } catch (error) {
    logger.error("DB connection failed:", error);
    console.error("DB connection failed:", error);
    
    if (server) {
      server.close(() => {
        logger.warn("Server closed due to DB connection failure.");
        process.exit(1);
      });
    } else {
      throw error;
    }
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  isConnected = true;
  logger.info('MongoDB connected');
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  logger.info('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  isConnected = false;
  logger.error('MongoDB connection error:', error);
});
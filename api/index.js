import "../src/config/Dotenv.config.js";
import express from "express";
import { CorsConfig } from "../src/config/Cors.config.js";
import { CustomErrorHandler } from "../src/middlewares/ErrorMiddleware.js";
import { DBConnect } from "../src/db/db.serverless.js";
import CategoryRouter from "../src/routes/category.router.js";
import SubCategoryRouter from "../src/routes/sub_category.router.js";
import ItemRouter from "../src/routes/item.router.js";
import { GlobalRouter } from "../src/routes/global.router.js";

const app = express();

// Initialize database connection for serverless
DBConnect();

// Configure CORS and middleware
CorsConfig(app);
app.use(express.json());

// Routes
app.use("/api/categories", CategoryRouter);
app.use("/api/sub-categories", SubCategoryRouter);
app.use("/api/items", ItemRouter);
app.use("/api/global", GlobalRouter);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Guestara Upsell API is running!", 
    timestamp: new Date().toISOString(),
    endpoints: {
      categories: "/api/categories",
      subCategories: "/api/sub-categories", 
      items: "/api/items",
      global: "/api/global"
    }
  });
});

// Error handling middleware (should be last)
app.use(CustomErrorHandler);

export default app;
import { logger } from "../config/logger.config.js";
import CategorySchema from "../models/Category.schema.js";
import itemSchema from "../models/item.schema.js";
import sub_categorySchema from "../models/sub_category.schema.js";
import { AppError } from "../utils/AppError.js";

export const searchEverythingService = async (query) => {
  try {
    if (!query || query.trim().length === 0) {
      throw new AppError("Search query cannot be empty", 400);
    }

    const searchRegex = new RegExp(query, "i"); // case-insensitive search

    const [categories, subcategories, items] = await Promise.all([
      CategorySchema.find({ name: { $regex: searchRegex } }),
      sub_categorySchema.find({ name: { $regex: searchRegex } }),
      itemSchema.find({ name: { $regex: searchRegex } }),
    ]);

    // Combine results in a structured way
    const results = {
      categories,
      subcategories,
      items,
    };

    logger.info(`Search for "${query}" returned ${categories.length + subcategories.length + items.length} results`);
    return results;
  } catch (err) {
    logger.error("Search service error:", err);
    throw new AppError(err.message || "Something went wrong while searching", err.statusCode || 500);
  }
};
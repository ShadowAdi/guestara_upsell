import { logger } from "../config/logger.config";
import CategorySchema from "../models/Category.schema";
import { AppError } from "../utils/AppError";

export const CreateCategoryService = async (categoryData) => {
  try {
    const newCategory = new CategorySchema({
      name: categoryData.name,
      description: categoryData.description,
      image: categoryData.image,
      tax_applicable: categoryData.tax_applicable,
      tax: categoryData.tax,
      tax_type: categoryData.tax_type,
    });
    await newCategory.save();
    return newCategory;
  } catch (error) {
    logger.error(`Failed to create category: ${error}`);
    console.error(`Failed to create user: `, error);
    throw new AppError(`Failed to create user: ${error}`, 500);
  }
};

export const isCategoryExistsService = async (name) => {
  try {
    const isCategoryExists = await CategorySchema.exists({ name: name });
    return isCategoryExists;
  } catch (error) {
    logger.error(`Failed to get category: ${error}`);
    console.error(`Failed to get category: `, error);
    throw new AppError(`Failed to get category: ${error}`, 500);
  }
};

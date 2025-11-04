import { logger } from "../config/logger.config";
import sub_categorySchema from "../models/sub_category.schema";
import { AppError } from "../utils/AppError";

export const createSubCategoryService = async (data) => {
  try {
    const { category_id, name, image, description, tax_applicable, tax } = data;

    const subCategory = await sub_categorySchema.create({
      category_id,
      name,
      image,
      description,
      tax_applicable:
        typeof tax_applicable === "boolean"
          ? tax_applicable
          : category.tax_applicable,
      tax: typeof tax === "number" ? tax : category.tax,
    });

    return subCategory;
  } catch (error) {
    console.error("Failed to create sub-category:", error);
    throw new AppError(`Failed to create sub-category: ${error.message}`, 500);
  }
};

export const getAllSubCategory = async () => {
  try {
    const getAllSubCategory = await sub_categorySchema.find();
    return getAllSubCategory;
  } catch (error) {
    console.error("Failed to get all sub-category:", error);
    logger.error("Failed to get all subcategory " + error);
    throw new AppError(`Failed to get all sub-category: ${error.message}`, 500);
  }
};

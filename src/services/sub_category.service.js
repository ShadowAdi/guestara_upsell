import { logger } from "../config/logger.config.js";
import sub_categorySchema from "../models/sub_category.schema.js";
import { AppError } from "../utils/AppError.js";

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
    const getAllSubCategory = await sub_categorySchema
      .find()
      .populate("category_id", "name image");
    return getAllSubCategory;
  } catch (error) {
    console.error("Failed to get all sub-category:", error);
    logger.error("Failed to get all subcategory " + error);
    throw new AppError(`Failed to get all sub-category: ${error.message}`, 500);
  }
};

export const getAllSubCategoryBasedOnCategoryId = async (categoryId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new AppError("Invalid category ID format", 400);
    }

    const subCategories = await sub_categorySchema
      .find({ category_id: categoryId })
      .populate("category_id", "name image");

    return subCategories;
  } catch (error) {
    console.error("Failed to get subcategories:", error);
    logger.error("Failed to get subcategories: " + error);
    throw new AppError(`Failed to get subcategories: ${error.message}`, 500);
  }
};



export const getSubCategoryByIdOrNameService = async (identifier) => {
  try {
    let query = {};

    if (/^[0-9a-fA-F]{24}$/.test(identifier)) {
      query = { _id: identifier };
    } else {
      query = { name: identifier };
    }

    const subCategory = await sub_categorySchema
      .findOne(query)
      .populate("category_id", "name image");

    if (!subCategory) {
      throw new AppError("Sub Category not found", 404);
    }

    return subCategory;
  } catch (error) {
    console.error("Failed to get sub category:", error);
    throw new AppError(`Failed to get sub category: ${error.message}`, 500);
  }
};


export const updateSubCategoryService = async (subCategoryId, data) => {
  try {

    const updatedSubCategory = await sub_categorySchema.findByIdAndUpdate(
      subCategoryId,
      data,
      { new: true }
    );

    return updatedSubCategory;
  } catch (error) {
    logger.error("Failed to update sub-category: " + error);
    throw new AppError(`Failed to update sub-category: ${error.message}`, 500);
  }
};
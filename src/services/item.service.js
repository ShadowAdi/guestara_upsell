import { logger } from "../config/logger.config";
import CategorySchema from "../models/Category.schema";
import itemSchema from "../models/item.schema";
import sub_categorySchema from "../models/sub_category.schema";
import { AppError } from "../utils/AppError";

export const isItemExistsService = async (name) => {
  try {
    const existingItem = await itemSchema.exists({ name: name.trim() });
    return existingItem;
  } catch (error) {
    logger.error(`Failed to check if item exists: ${error}`);
    console.error("Failed to check if item exists:", error);
    throw new AppError(`Failed to check if item exists: ${error.message}`, 500);
  }
};

export const createItemService = async (data) => {
  try {
    const {
      category_id,
      sub_category_id,
      name,
      image,
      description,
      tax_applicable,
      tax,
      base_amount,
      discount,
    } = data;

    if (!category_id && !sub_category_id) {
      throw new AppError("Either category_id or sub_category_id is required", 400);
    }

    let finalTaxApplicable = tax_applicable;
    let finalTax = tax;

    if (sub_category_id) {
      const subCat = await sub_categorySchema.findById(sub_category_id).populate("category_id");
      if (!subCat) throw new AppError("Sub-category not found", 404);

      if (finalTaxApplicable === undefined || finalTaxApplicable === null)
        finalTaxApplicable = subCat.tax_applicable ?? subCat.category_id?.tax_applicable ?? false;

      if (finalTax === undefined || finalTax === null)
        finalTax = subCat.tax ?? subCat.category_id?.tax ?? 0;
    } else if (category_id) {
      const cat = await CategorySchema.findById(category_id);
      if (!cat) throw new AppError("Category not found", 404);

      if (finalTaxApplicable === undefined || finalTaxApplicable === null)
        finalTaxApplicable = cat.tax_applicable ?? false;

      if (finalTax === undefined || finalTax === null)
        finalTax = cat.tax ?? 0;
    }

    const total_amount = base_amount - (discount || 0);

    const newItem = await itemSchema.create({
      category_id,
      sub_category_id,
      name,
      image,
      description,
      tax_applicable: finalTaxApplicable,
      tax: finalTax,
      base_amount,
      discount,
      total_amount,
    });

    logger.info(`Item created successfully: ${name}`);
    return newItem;
  } catch (error) {
    logger.error(`Failed to create item: ${error}`);
    console.error("Failed to create item:", error);
    throw new AppError(`Failed to create item: ${error.message}`, 500);
  }
};

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
      throw new AppError(
        "Either category_id or sub_category_id is required",
        400
      );
    }

    let finalTaxApplicable = tax_applicable;
    let finalTax = tax;

    if (sub_category_id) {
      const subCat = await sub_categorySchema
        .findById(sub_category_id)
        .populate("category_id");
      if (!subCat) throw new AppError("Sub-category not found", 404);

      if (finalTaxApplicable === undefined || finalTaxApplicable === null)
        finalTaxApplicable =
          subCat.tax_applicable ?? subCat.category_id?.tax_applicable ?? false;

      if (finalTax === undefined || finalTax === null)
        finalTax = subCat.tax ?? subCat.category_id?.tax ?? 0;
    } else if (category_id) {
      const cat = await CategorySchema.findById(category_id);
      if (!cat) throw new AppError("Category not found", 404);

      if (finalTaxApplicable === undefined || finalTaxApplicable === null)
        finalTaxApplicable = cat.tax_applicable ?? false;

      if (finalTax === undefined || finalTax === null) finalTax = cat.tax ?? 0;
    }

    const total_amount = base_amount - (discount || 0);

    const newItem = await itemSchema.create({
      category_id,
      subcategory_id: sub_category_id,
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

export const getAllItemsService = async () => {
  try {
    const getAllItems = await itemSchema
      .find()
      .populate("category_id")
      .populate("subcategory_id");
    return getAllItems;
  } catch (error) {
    console.error("Failed to get all items:", error);
    logger.error("Failed to get all items " + error);
    throw new AppError(`Failed to get all items: ${error.message}`, 500);
  }
};

export const getItemByIdOrNameService = async (identifier) => {
  try {
    let query = {};

    if (/^[0-9a-fA-F]{24}$/.test(identifier)) {
      query = { _id: identifier };
    } else {
      query = { name: identifier.toLowerCase() };
    }

    const item = await itemSchema.findOne(query);

    if (!item) {
      throw new AppError("Item not found", 404);
    }

    return subCategory;
  } catch (error) {
    console.error("Failed to get item:", error);
    throw new AppError(`Failed to get item: ${error.message}`, 500);
  }
};

export const getAllItemsBasedOnCategoryId = async (categoryId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      throw new AppError("Invalid categoryId format", 400);
    }

    const items = await itemSchema.find({ category_id: categoryId });

    return items;
  } catch (error) {
    console.error("Failed to get items:", error);
    logger.error("Failed to get items: " + error);
    throw new AppError(`Failed to get items: ${error.message}`, 500);
  }
};

export const getAllItemsBasedOnSubCategoryId = async (subCategoryId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(subCategoryId)) {
      throw new AppError("Invalid sub CategoryId ID format", 400);
    }

    const items = await itemSchema.find({ subcategory_id: subCategoryId });

    return items;
  } catch (error) {
    console.error("Failed to get items:", error);
    logger.error("Failed to get items: " + error);
    throw new AppError(`Failed to get items: ${error.message}`, 500);
  }
};

export const updateItemService = async (itemId, data) => {
  try {
    if (data.base_amount !== undefined || data.discount !== undefined) {
      const base = data.base_amount ?? existingItem.base_amount;
      const discount = data.discount ?? existingItem.discount ?? 0;
      data.total_amount = base - discount;
    }

    const updatedItem = await itemSchema.findByIdAndUpdate(itemId, data, {
      new: true,
    });

    return updatedItem;
  } catch (error) {
    logger.error("Failed to update item: " + error);
    throw new AppError(`Failed to update item: ${error.message}`, 500);
  }
};

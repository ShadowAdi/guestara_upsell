import { body, param } from "express-validator";
import { getItemByIdOrNameService } from "../services/item.service.js";
import { getCategoryByIdOrNameService } from "../services/category.service.js";
import { getSubCategoryByIdOrNameService } from "../services/sub_category.service.js";
import { AppError } from "../utils/AppError.js";
import { logger } from "../config/logger.config.js";

export const EditItemValidator = () => {
  return [
    param("itemId")
      .isMongoId()
      .withMessage("Invalid item ID")
      .custom(async (id) => {
        const item = await getItemByIdService(id);
        if (!item) {
          logger.error("Item not found for update");
          throw new AppError("Item not found", 404);
        }
        return true;
      }),

    body("name")
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),

    body("image").optional().isURL().withMessage("Image must be a valid URL"),

    body("description")
      .optional()
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),

    body("tax_applicable")
      .optional()
      .isBoolean()
      .withMessage("Tax applicability must be a boolean"),

    body("tax")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Tax must be a non-negative number"),

    body("base_amount")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Base amount must be a non-negative number"),

    body("discount")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Discount must be a non-negative number"),

    body("total_amount")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Total amount must be a non-negative number"),

    body("category_id")
      .optional()
      .isMongoId()
      .withMessage("Category ID must be a valid MongoDB ObjectId")
      .custom(async (value) => {
        const category = await getCategoryByIdOrNameService(value);
        if (!category) {
          logger.error("Parent Category not found for update");
          throw new AppError("Parent Category not found", 404);
        }
        return true;
      }),

    body("sub_category_id")
      .optional()
      .isMongoId()
      .withMessage("SubCategory ID must be a valid MongoDB ObjectId")
      .custom(async (value) => {
        const subCategory = await getSubCategoryByIdOrNameService(value);
        if (!subCategory) {
          logger.error("Parent SubCategory not found for update");
          throw new AppError("Parent SubCategory not found", 404);
        }
        return true;
      }),
  ];
};

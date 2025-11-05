import { body } from "express-validator";
import { getCategoryByIdOrNameService } from "../services/category.service.js";
import { getSubCategoryByIdOrNameService } from "../services/sub_category.service.js";
import { isItemExistsService } from "../services/item.service.js";
import { logger } from "../config/logger.config.js";
import { AppError } from "../utils/AppError.js";

export function CreateItemValidator() {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .custom(async (name) => {
        const itemAlreadyExists = await isItemExistsService(name);
        if (itemAlreadyExists) {
          logger.error("Failed to get the Item");
          console.error("Failed to get the Item");
          throw new AppError("Failed to get the Item", 400);
        }
        return true;
      }),

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
      .notEmpty()
      .withMessage("Base amount is required")
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
        const parentCategoryFound = await getCategoryByIdOrNameService(value);
        if (!parentCategoryFound) {
          logger.error("Failed to get parent Category");
          console.error("Failed to get parent category");
          throw new AppError("Failed to get parent category");
        }
        return true;
      }),
    body("sub_category_id")
      .optional()
      .isMongoId()
      .withMessage("SubCategory ID must be a valid MongoDB ObjectId")
      .custom(async (value) => {
        const parentSubCategoryFound = await getSubCategoryByIdOrNameService(
          value
        );
        if (!parentSubCategoryFound) {
          logger.error("Failed to get parent Sub Category");
          console.error("Failed to get parent Sub Category");
          throw new AppError("Failed to get parent Sub Category");
        }
        return true;
      }),
  ];
}

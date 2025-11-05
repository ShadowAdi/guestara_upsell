import { body, param } from "express-validator";
import { getSubCategoryByIdOrNameService } from "../services/sub_category.service.js";
import { AppError } from "../utils/AppError.js";
import logger from "../config/logger.config.js";

export const EditSubCategoryValidator = [
  param("subCategoryId")
    .isMongoId()
    .withMessage("Invalid sub-category ID")
    .custom(async (id) => {
      const subCategory = await getSubCategoryByIdOrNameService(id);
      if (!subCategory) {
        logger.error("SubCategory not found for update");
        throw new AppError("SubCategory not found", 404);
      }
      return true;
    }),

  body("name")
    .optional()
    .trim()
    .isString()
    .withMessage("Name must be a string"),

  body("image")
    .optional()
    .isURL()
    .withMessage("Image must be a valid URL"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("tax_applicable")
    .optional()
    .isBoolean()
    .withMessage("Tax applicability must be a boolean"),

  body("tax")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Tax must be a positive number"),
];

import { body, param } from "express-validator";
import { getCategoryByIdOrNameService } from "../services/category.service.js";
import { AppError } from "../utils/AppError.js";
import {logger} from "../config/logger.config.js";

export const EditCategoryValidator = () => { return [
  param("categoryId")
    .isMongoId()
    .withMessage("Invalid category ID")
    .custom(async (id) => {
      const category = await getCategoryByIdOrNameService(id);
      if (!category) {
        logger.error("Category not found for update");
        throw new AppError("Category not found", 404);
      }
      return true;
    }),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .isAlpha()
    .withMessage("Name must contain only alphabetical characters"),

  body("image")
    .optional()
    .isURL()
    .withMessage("Image must be a valid URL"),

  body("description")
    .optional()
    .isLength({ min: 12 })
    .withMessage("Description must be at least 12 characters long"),

  body("tax_applicable")
    .optional()
    .isBoolean()
    .withMessage("Tax Applicability must be a boolean value"),

  body("tax")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Tax must be a positive number"),

  body("tax_type")
    .optional()
    .isIn(["percentage", "fixed"])
    .withMessage("Tax type must be either 'percentage' or 'fixed'"),
]};

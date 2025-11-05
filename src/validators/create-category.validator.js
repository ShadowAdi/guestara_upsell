import { body } from "express-validator";
import { isCategoryExistsService } from "../services/category.service.js";

export function CreateCategoryValidator() {
  return [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .toLowerCase()
      .isAlpha()
      .withMessage("Name must contain only alphabetical characters")
      .notEmpty()
      .withMessage("Name should not be empty")
      .custom(async (value) => {
        const existingCategory = await isCategoryExistsService(value);
        if (existingCategory) {
          throw new Error("Category with this name already exists");
        }
        return true;
      }),

    body("image")
      .optional()
      .trim()
      .isURL()
      .withMessage("Image must be a valid URL"),

    body("description")
      .trim()
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
  ];
}

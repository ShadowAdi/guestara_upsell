import { body } from "express-validator";
import { getCategoryByIdOrNameService } from "../services/category.service";

export const createSubCategoryValidator = [
  body("category_id")
    .notEmpty()
    .withMessage("category_id is required")
    .isMongoId()
    .withMessage("Invalid category_id")
    .custom(async (value) => {
      const parentCategoryFound = await getCategoryByIdOrNameService(value);
      if (!parentCategoryFound) {
        logger.error("Failed to get parent Category");
        console.error("Failed to get parent category");
        throw new AppError("Failed to get parent category");
      }
      return true;
    }),

  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .trim()
    .withMessage("name must be a string"),

  body("image").optional().isURL().withMessage("image must be a valid URL"),

  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string"),

  body("tax_applicable")
    .optional()
    .isBoolean()
    .withMessage("tax_applicable must be a boolean"),

  body("tax").optional().isNumeric().withMessage("tax must be a number"),
];

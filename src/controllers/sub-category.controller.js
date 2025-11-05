import { logger } from "../config/logger.config";
import { getCategoryByIdOrNameService } from "../services/category.service";
import {
  createSubCategoryService,
  getAllSubCategory,
  getAllSubCategoryBasedOnCategoryId,
  getSubCategoryByIdOrNameService,
} from "../services/sub_category.service";
import { AppError } from "../utils/AppError";
import { CustomTryCatch } from "../utils/CustomTryCatch";

export const CreateSubCategory = CustomTryCatch(async (request, response) => {
  const subCategoryData = request.body;
  const createdSubCategory = await createSubCategoryService(subCategoryData);
  return response.status(201).json({
    success: true,
    message: "Sub Category Created successfully.",
    data: createdSubCategory,
  });
});

export const GetAllSubCategory = CustomTryCatch(async (request, response) => {
  const allSubCategories = await getAllSubCategory();
  return response.status(200).json({
    success: true,
    data: allSubCategories,
  });
});

export const GetSubcategory = CustomTryCatch(async (request, response) => {
  const { identifier } = req.params;

  const subCategory = await getSubCategoryByIdOrNameService(identifier);
  return response.status(200).json({
    success: true,
    data: subCategory,
  });
});

export const GetSubCategoryBasedOnCategoryId = CustomTryCatch(
  async (request, response) => {
    const { categoryId } = req.params;
    const parentCategoryFound = await getCategoryByIdOrNameService(categoryId);
    if (!parentCategoryFound) {
      logger.error("Failed to get the parent category");
      throw new AppError("Failed to get the parent category", 400);
    }

    const subCategories = await getAllSubCategoryBasedOnCategoryId(categoryId);

    res.status(200).json({
      success: true,
      message: "Sub Category fetched successfully",
      data: subCategories,
    });
  }
);

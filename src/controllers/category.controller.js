import {
  CreateCategoryService,
  GetAllCategoryService,
  updateCategoryService,
} from "../services/category.service.js";
import { CustomTryCatch } from "../utils/CustomTryCatch.js";

export const CreateCategory = CustomTryCatch(async (request, response) => {
  const categoryData = request.body;
  const createdCategory = await CreateCategoryService(categoryData);
  return response.status(201).json({
    success: true,
    message: "Category Created successfully.",
    data: createdCategory,
  });
});

export const GetAllCategory = CustomTryCatch(async (req, res) => {
  const getAllCategory = await GetAllCategoryService();
  return response.status(200).json({
    success: true,
    data: getAllCategory,
  });
});

export const GetCategory = CustomTryCatch(async (req, res) => {
  const { identifier } = req.params;
  const category = await getCategoryByIdOrNameService(identifier);

  res.status(200).json({
    success: true,
    message: "Category fetched successfully",
    data: category,
  });
});

export const UpdateCategory = CustomTryCatch(async (req, res) => {
  const { categoryId } = req.params;
  const { data } = req.body;

  const categoryUpdated = await updateCategoryService(categoryId, data);

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: categoryUpdated,
  });
});

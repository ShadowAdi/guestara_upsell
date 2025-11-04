import {
  createSubCategoryService,
  getAllSubCategory,
  getSubCategoryByIdOrNameService,
} from "../services/sub_category.service";
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



export const GetSubCategory = CustomTryCatch(async (request, response) => {
  const { identifier } = req.params;
  const subCategory = await getSubCategoryByIdOrNameService(identifier);

  res.status(200).json({
    success: true,
    message: "Sub Category fetched successfully",
    data: subCategory,
  });
});

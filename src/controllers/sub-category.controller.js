import { createSubCategoryService } from "../services/sub_category.service";
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

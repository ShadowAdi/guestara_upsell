import { CreateCategoryService } from "../services/category.service";
import { CustomTryCatch } from "../utils/CustomTryCatch";

export const CreateCategory = CustomTryCatch(async (request, response) => {
  const userData = request.body;
  const createdCategory = await CreateCategoryService(userData);
  return response.status(201).json({
    success: true,
    message: "Category Created successfully.",
    data: createdCategory,
  });
});

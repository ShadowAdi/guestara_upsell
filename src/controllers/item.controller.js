import {
  createItemService,
  getAllItemsBasedOnCategoryId,
  getAllItemsBasedOnSubCategoryId,
  getAllItemsService,
  getItemByIdOrNameService,
} from "../services/item.service";
import { CustomTryCatch } from "../utils/CustomTryCatch";

export const CreateItem = CustomTryCatch(async (request, response) => {
  const itemData = request.body;
  const createdItem = await createItemService(itemData);
  return response.status(201).json({
    success: true,
    message: "Item Created successfully.",
    data: createdItem,
  });
});

export const GetAllSubItem = CustomTryCatch(async (request, response) => {
  const allItems = await getAllItemsService();
  return response.status(200).json({
    success: true,
    data: allItems,
  });
});

export const GetItemByNameOrId = CustomTryCatch(async (request, response) => {
  const { identifier } = req.params;

  const items = await getItemByIdOrNameService(identifier);

  res.status(200).json({
    success: true,
    message: "items fetched successfully",
    data: items,
  });
});

export const GetItemByCategoryId = CustomTryCatch(async (request, response) => {
  const { categoryId } = req.params;

  const items = await getAllItemsBasedOnCategoryId(categoryId);

  res.status(200).json({
    success: true,
    message: "items fetched successfully",
    data: items,
  });
});

export const GetItemBySubCategoryId = CustomTryCatch(
  async (request, response) => {
    const { subCategoryId } = req.params;

    const items = await getAllItemsBasedOnSubCategoryId(subCategoryId);

    res.status(200).json({
      success: true,
      message: "items fetched successfully",
      data: items,
    });
  }
);

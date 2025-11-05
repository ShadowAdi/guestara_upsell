import { logger } from "../config/logger.config.js";
import {
  createItemService,
  getAllItemsBasedOnCategoryId,
  getAllItemsBasedOnSubCategoryId,
  getAllItemsService,
  getItemByIdOrNameService,
  updateItemService,
} from "../services/item.service.js";
import { AppError } from "../utils/AppError.js";
import { CustomTryCatch } from "../utils/CustomTryCatch.js";

export const CreateItem = CustomTryCatch(async (request, response) => {
  const itemData = request.body;
  const createdItem = await createItemService(itemData);
  return response.status(201).json({
    success: true,
    message: "Item Created successfully.",
    data: createdItem,
  });
});

export const GetAllItems = CustomTryCatch(async (request, response) => {
  const allItems = await getAllItemsService();
  return response.status(200).json({
    success: true,
    data: allItems,
  });
});

export const GetItemByNameOrId = CustomTryCatch(async (req, res) => {
  const { identifier } = req.params;

  const items = await getItemByIdOrNameService(identifier);

  res.status(200).json({
    success: true,
    message: "items fetched successfully",
    data: items,
  });
});

export const GetItemByCategoryId = CustomTryCatch(async (req, res) => {
  const { categoryId } = req.params;

  const items = await getAllItemsBasedOnCategoryId(categoryId);

  res.status(200).json({
    success: true,
    message: "items fetched successfully",
    data: items,
  });
});

export const GetItemBySubCategoryId = CustomTryCatch(async (req, res) => {
  const { subCategoryId } = req.params;

  const items = await getAllItemsBasedOnSubCategoryId(subCategoryId);

  res.status(200).json({
    success: true,
    message: "items fetched successfully",
    data: items,
  });
});

export const UpdateItem = CustomTryCatch(async (req, res) => {
  const { itemId } = req.params;
const updateData = req.body;

  const items = await updateItemService(itemId, updateData);

  res.status(200).json({
    success: true,
    message: "item updated successfully",
    data: items,
  });
});

import {
  createItemService,
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

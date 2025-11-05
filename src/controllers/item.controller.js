import { createItemService } from "../services/item.service";
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

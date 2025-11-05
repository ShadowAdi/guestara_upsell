import itemSchema from "../models/item.schema";

export const isItemExistsService = async (name) => {
  try {
    const existingItem = await itemSchema.exists({ name: name.trim() });
    return existingItem;
  } catch (error) {
    logger.error(`Failed to check if item exists: ${error}`);
    console.error("Failed to check if item exists:", error);
    throw new AppError(`Failed to check if item exists: ${error.message}`, 500);
  }
};
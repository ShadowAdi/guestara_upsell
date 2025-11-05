import express from "express";
import { CreateItemValidator } from "../validators/create-item.validator.js";
import { ValidateRequest } from "../middlewares/ValidateRequest.js";
import {
  CreateItem,
  GetAllItems,
  GetItemByCategoryId,
  GetItemByNameOrId,
  GetItemBySubCategoryId,
  UpdateItem,
} from "../controllers/item.controller.js";
import { EditItemValidator } from "../validators/edit-item.validator.js";

const ItemRouter = express.Router();

ItemRouter.post("/", CreateItemValidator(), ValidateRequest, CreateItem);
ItemRouter.get("/", GetAllItems);
ItemRouter.get("/item/:identifier", GetItemByNameOrId);
ItemRouter.get("/item/category/:categoryId", GetItemByCategoryId);
ItemRouter.get("/item/sub-category/:subCategoryId", GetItemBySubCategoryId);
ItemRouter.patch(
  "/item/:itemId",
  EditItemValidator(),
  ValidateRequest,
  UpdateItem
);

export default ItemRouter;

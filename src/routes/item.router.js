import express from "express";
import { CreateItemValidator } from "../validators/create-item.validator";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import {
  CreateItem,
  GetAllItems,
  GetItemByCategoryId,
  GetItemByNameOrId,
  GetItemBySubCategoryId,
} from "../controllers/item.controller";

const ItemRouter = express.Router();

ItemRouter.post("/", CreateItemValidator(), ValidateRequest, CreateItem);
ItemRouter.get("/", GetAllItems);
ItemRouter.get("/item/:identifier", GetItemByNameOrId);
ItemRouter.get("/item/category/:categoryId", GetItemByCategoryId);
ItemRouter.get("/item/sub-category/:subCategoryId", GetItemBySubCategoryId);

export default ItemRouter;

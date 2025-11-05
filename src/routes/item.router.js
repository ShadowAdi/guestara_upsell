import express from "express";
import { CreateItemValidator } from "../validators/create-item.validator";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { CreateItem } from "../controllers/item.controller";

const ItemRouter = express.Router();

ItemRouter.post("/", CreateItemValidator(), ValidateRequest, CreateItem);

export default ItemRouter;

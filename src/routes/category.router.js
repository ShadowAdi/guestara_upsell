import express from "express";
import {
  CreateCategory,
  GetAllCategory,
  GetCategory,
  UpdateCategory,
} from "../controllers/category.controller.js";
import { ValidateRequest } from "../middlewares/ValidateRequest.js";
import { CreateCategoryValidator } from "../validators/create-category.validator.js";
import { EditCategoryValidator } from "../validators/edit-category.validator.js";

const CategoryRouter = express.Router();

CategoryRouter.post(
  "/",
  CreateCategoryValidator(),
  ValidateRequest,
  CreateCategory
);
CategoryRouter.get("/", GetAllCategory);
CategoryRouter.get("/category/:identifier", GetCategory);
CategoryRouter.patch("/category/:categoryId",EditCategoryValidator(),ValidateRequest, UpdateCategory);

export default CategoryRouter;

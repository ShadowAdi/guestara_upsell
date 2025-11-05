import express from "express";
import {
  CreateCategory,
  GetAllCategory,
  GetCategory,
  UpdateCategory,
} from "../controllers/category.controller";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { CreateCategoryValidator } from "../validators/create-category.validator";
import { EditCategoryValidator } from "../validators/edit-category.validator";

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

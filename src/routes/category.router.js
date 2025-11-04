import express from "express";
import {
  CreateCategory,
  GetAllCategory,
  GetCategory,
} from "../controllers/category.controller";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { CreateCategoryValidator } from "../validators/create-category.validator";

const CategoryRouter = express.Router();

CategoryRouter.post(
  "/",
  CreateCategoryValidator(),
  ValidateRequest,
  CreateCategory
);
CategoryRouter.get("/", GetAllCategory);
CategoryRouter.get("/category/:identifier", GetCategory);

export default CategoryRouter;

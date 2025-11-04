import express from "express";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { CreateSubCategory } from "../controllers/sub-category.controller";
import { createSubCategoryValidator } from "../validators/sub-category-create.validator";


const SubCategoryRouter = express.Router();

SubCategoryRouter.post(
  "/",
  createSubCategoryValidator(),
  ValidateRequest,
  CreateSubCategory
);

export default SubCategoryRouter;

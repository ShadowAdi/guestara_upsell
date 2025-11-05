import express from "express";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import {
  CreateSubCategory,
  GetAllSubCategory,
  GetSubcategory,
  GetSubCategory,
  GetSubCategoryBasedOnCategoryId,
  UpdateSubCategory,
} from "../controllers/sub-category.controller";
import { createSubCategoryValidator } from "../validators/sub-category-create.validator";
import { EditSubCategoryValidator } from "../validators/edit-sub-category.validator";

const SubCategoryRouter = express.Router();

SubCategoryRouter.post(
  "/",
  createSubCategoryValidator(),
  ValidateRequest,
  CreateSubCategory
);

SubCategoryRouter.get("/", GetAllSubCategory);

SubCategoryRouter.get("/subCategory/:identifier", GetSubcategory);

SubCategoryRouter.get("/category/:categoryId", GetSubCategoryBasedOnCategoryId);

SubCategoryRouter.patch(
  "/subCategory/:subCategoryId",
  EditSubCategoryValidator(),
  ValidateRequest,
  UpdateSubCategory
);

export default SubCategoryRouter;

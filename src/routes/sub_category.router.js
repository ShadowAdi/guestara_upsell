import express from "express";
import { ValidateRequest } from "../middlewares/ValidateRequest.js";
import {
  CreateSubCategory,
  GetAllSubCategory,
  GetSubcategory,
  GetSubCategoryBasedOnCategoryId,
  UpdateSubCategory,
} from "../controllers/sub-category.controller.js";
import { createSubCategoryValidator } from "../validators/sub-category-create.validator.js";
import { EditSubCategoryValidator } from "../validators/edit-sub-category.validator.js";

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

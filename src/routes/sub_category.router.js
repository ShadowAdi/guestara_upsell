import express from "express";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { CreateSubCategory, GetAllSubCategory, GetSubcategory, GetSubCategory, GetSubCategoryBasedOnCategoryId } from "../controllers/sub-category.controller";
import { createSubCategoryValidator } from "../validators/sub-category-create.validator";


const SubCategoryRouter = express.Router();

SubCategoryRouter.post(
  "/",
  createSubCategoryValidator(),
  ValidateRequest,
  CreateSubCategory
);

SubCategoryRouter.get(
  "/",
  GetAllSubCategory
);


SubCategoryRouter.get(
  "/subCategory/:identifier",
  GetSubcategory
);

SubCategoryRouter.get(
  "/category/:categoryId",
  GetSubCategoryBasedOnCategoryId
);

export default SubCategoryRouter;

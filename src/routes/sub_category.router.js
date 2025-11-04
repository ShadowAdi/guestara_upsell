import express from "express";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { CreateSubCategory, GetAllSubCategory, GetSubCategory } from "../controllers/sub-category.controller";
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
  GetSubCategory
);

export default SubCategoryRouter;

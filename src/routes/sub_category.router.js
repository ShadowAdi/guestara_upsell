import express from "express";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { CreateSubCategory } from "../controllers/sub-category.controller";


const SubCategoryRouter = express.Router();

SubCategoryRouter.post(
  "/",
  CreateCategoryValidator(),
  ValidateRequest,
  CreateSubCategory
);

export default SubCategoryRouter;

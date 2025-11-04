import express from 'express'
import { CreateCategory } from '../controllers/category.controller';
import { ValidateRequest } from '../middlewares/ValidateRequest';
import { CreateCategoryValidator } from '../validators/create-category.validator';


const CategoryRouter = express.Router();

CategoryRouter.post("/", CreateCategoryValidator(), ValidateRequest, CreateCategory);


export default CategoryRouter;
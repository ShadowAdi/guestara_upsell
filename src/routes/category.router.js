import express from 'express'
import { CreateCategory } from '../controllers/category.controller';
import { ValidateRequest } from '../middlewares/ValidateRequest';


const CategoryRouter = express.Router();

CategoryRouter.post("/", CreateValidateUser(), ValidateRequest, CreateCategory);


export default CategoryRouter;
import express from "express";
import { SearchEverything } from "../controllers/search.controller.js";

const SearchRouter = express.Router();

SearchRouter.get("/", SearchEverything);

export default SearchRouter;
import express from "express";
import { SearchEverything } from "../controllers/global.controller.js";

export const GlobalRouter = express.Router();

GlobalRouter.get("/", SearchEverything);


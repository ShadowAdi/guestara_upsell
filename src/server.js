import "./config/Dotenv.config.js";
import express from "express";
import { CorsConfig } from "./config/Cors.config.js";
import { CustomErrorHandler } from "./middlewares/ErrorMiddleware.js";
import { AppConnect } from "./config/app.config.js";
import CategoryRouter from "./routes/category.router.js";
import SubCategoryRouter from "./routes/sub_category.router.js";
import ItemRouter from "./routes/item.router.js";

const app = express();

CorsConfig(app);
app.use(express.json());

app.use("/api/categories", CategoryRouter);
app.use("/api/sub-categories", SubCategoryRouter);
app.use("/api/items", ItemRouter);

app.use(CustomErrorHandler);

AppConnect(app);
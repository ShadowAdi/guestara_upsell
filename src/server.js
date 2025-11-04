import "./config/DotEnvConfig.js";
import express from "express";
import { CorsConfig } from "./config/corsConfig.js";
import { CustomErrorHandler } from "./middlewares/ErrorHandler.js";
import { AppConnect } from "./config/AppConfig.js";
import CategoryRouter from "./routes/category.router.js";

const app = express();

CorsConfig(app);
app.use(express.json());

app.use("/api/category", CategoryRouter);

app.use(CustomErrorHandler);

AppConnect(app);
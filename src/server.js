import "./config/DotEnvConfig.js";
import express from "express";
import { CorsConfig } from "./config/corsConfig.js";
import { CustomErrorHandler } from "./middlewares/ErrorHandler.js";
import { AppConnect } from "./config/AppConfig.js";

const app = express();

CorsConfig(app);
app.use(express.json());


app.use(CustomErrorHandler);

AppConnect(app);
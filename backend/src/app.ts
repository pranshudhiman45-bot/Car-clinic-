import express from "express";
import cors from "cors";
import helmet from "helmet";
import { corsOptions } from "./config/cors";
import { apiRouter } from "./routes";
import { notFound } from "./middleware/not-found";
import { errorHandler } from "./middleware/error-handler";

export const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandler);

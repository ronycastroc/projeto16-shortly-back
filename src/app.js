import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { PORT } from "./configs/constants.js";
import authRoutes from "./routes/authRoutes.js";
import urlsRoutes from "./routes/urlsRoutes.js";

const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(urlsRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
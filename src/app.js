import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { PORT } from "./configs/constants.js";
import authRoutes from "./routes/authRoutes.js";
import urlsRoutes from "./routes/urlsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import rankingRoute from "./routes/rankingRoutes.js";

const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(urlsRoutes);
app.use(usersRoutes);
app.use(rankingRoute);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
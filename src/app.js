import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { PORT } from "./configs/constants.js";

const app = express();
app.use(express.json());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
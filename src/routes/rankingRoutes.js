import express from "express";
import { readRanking } from "../controllers/rankingControllers.js";

const router = express.Router();

router.get("/ranking", readRanking);

export default router;
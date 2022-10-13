import express from "express";
import { createUrl } from "../controllers/urlsControllers.js";

const router = express.Router();

router.post("/urls/shorten", createUrl);

export default router;
import express from "express";
import { createUrl, readUrls } from "../controllers/urlsControllers.js";

const router = express.Router();

router.post("/urls/shorten", createUrl);
router.get("/urls/:id", readUrls);

export default router;
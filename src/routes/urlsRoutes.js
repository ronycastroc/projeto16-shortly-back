import express from "express";
import { createUrl, readUrl, readShortUrl, deleteUrl } from "../controllers/urlsControllers.js";

const router = express.Router();

router.post("/urls/shorten", createUrl);
router.get("/urls/:id", readUrl);
router.get("/urls/open/:shortUrl", readShortUrl);
router.delete("/urls/:id", deleteUrl);

export default router;
import express from "express";
import { createUrl, readUrl, readShortUrl } from "../controllers/urlsControllers.js";

const router = express.Router();

router.post("/urls/shorten", createUrl);
router.get("/urls/:id", readUrl);
router.get("/urls/open/:shortUrl", readShortUrl);

export default router;
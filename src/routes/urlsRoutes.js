import express from "express";
import { createUrl, readUrl, readShortUrl, deleteUrl } from "../controllers/urlsControllers.js";
import { validateUrl } from "../middlewares/joiMiddlewares.js";
import { authValidation } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/urls/shorten", validateUrl, authValidation, createUrl);
router.get("/urls/:id", readUrl);
router.get("/urls/open/:shortUrl", readShortUrl);
router.delete("/urls/:id", authValidation, deleteUrl);

export default router;
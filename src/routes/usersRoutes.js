import express from "express";
import { readUser } from "../controllers/usersControllers.js";
import { authValidation } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/users/me", authValidation, readUser);

export default router;
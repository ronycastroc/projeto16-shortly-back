import express from "express";
import { readUser } from "../controllers/usersControllers.js";

const router = express.Router();

router.get("/users/me", readUser);

export default router;
import express from "express";
import { signUp, signIn } from "../controllers/authControllers.js";
import { validateSignUp, validateSignin } from "../middlewares/joiMiddlewares.js";

const router = express.Router();

router.post("/signup", validateSignUp, signUp);
router.post("/signin", validateSignin, signIn);

export default router;
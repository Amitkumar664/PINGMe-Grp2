  import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// User registration
router.post("/register", signup);  // or use "/signup" if preferred

// User login
router.post("/login", login);

export default router;
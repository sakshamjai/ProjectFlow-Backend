import express from "express";
import { loginUser, logoutUser, getMe } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { loginValidator } from "../validators/auth.validator.js";
const router = express.Router();

router.post("/login", loginValidator, loginUser);
router.post("/logout-user", logoutUser);
router.get("/get-me", protect, getMe);

export default router;
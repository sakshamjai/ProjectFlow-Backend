import express from "express";
import { createUser, getUsers } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createUserValidator } from "../validators/user.validator.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", protect, allowRoles("admin"), getUsers);
router.post("/create-user", protect, allowRoles("admin"), createUserValidator, createUser);

export default router;
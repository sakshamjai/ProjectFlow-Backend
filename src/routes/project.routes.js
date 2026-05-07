import express from "express";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

import { allowRoles } from "../middlewares/role.middleware.js";

import {
  createProjectValidator,
} from "../validators/project.validator.js";

const router = express.Router();

router.post("/create", protect, allowRoles("admin"), createProjectValidator, createProject );

router.get("/", protect, getProjects );

router.get("/:id", protect, getProjectById );

router.put("/:id", protect, allowRoles("admin"), updateProject);

router.delete("/:id", protect, allowRoles("admin"), deleteProject);

export default router;
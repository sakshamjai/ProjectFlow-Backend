import express from "express";

import {
    createTask,
    getTasksByProject,
    updateTask,
    deleteTask,
    getTasks
} from "../controllers/task.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

import { allowRoles } from "../middlewares/role.middleware.js";

import {
    createTaskValidator,
} from "../validators/task.validator.js";

const router = express.Router();

router.post(
    "/create",
    protect,
    allowRoles("admin"),
    createTaskValidator,
    createTask
);

router.get(
    "/project/:projectId",
    protect,
    getTasksByProject
);

router.put(
    "/:id",
    protect,
    updateTask
);

router.delete(
    "/:id",
    protect,
    allowRoles("admin"),
    deleteTask
);

router.get(
    "/",
    protect,
    getTasks
);
export default router;
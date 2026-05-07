import { body } from "express-validator";

export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    next();
};

export const createTaskValidator = [
    body("title")
        .notEmpty()
        .withMessage("Task title is required"),

    body("project")
        .notEmpty()
        .withMessage("Project is required"),

    body("assignedTo")
        .notEmpty()
        .withMessage("Assigned user is required"),

    body("status")
        .optional()
        .isIn([
            "todo",
            "in-progress",
            "done",
        ])
        .withMessage("Invalid status"),

    body("priority")
        .optional()
        .isIn(["low", "medium", "high"])
        .withMessage("Invalid priority"),
];
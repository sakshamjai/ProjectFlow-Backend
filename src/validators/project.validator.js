import { validationResult, body } from "express-validator";

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
export const createProjectValidator = [
    body("title")
        .notEmpty()
        .withMessage("Project title is required"),

    body("description")
        .optional(),

    body("members")
        .optional()
        .isArray()
        .withMessage("Members must be an array"),
];
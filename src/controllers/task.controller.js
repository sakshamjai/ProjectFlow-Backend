import Task from "../models/task.model.js";
import Project from "../models/project.model.js";

export const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            status,
            priority,
            dueDate,
            project,
            assignedTo,
        } = req.body;

        const existingProject = await Project.findById(project);

        if (!existingProject) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            project,
            assignedTo,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getTasksByProject = async (req, res) => {
    try {
        const tasks = await Task.find({
            project: req.params.projectId,
        }).populate("assignedTo", "username email").populate("createdBy", "username email");

        res.status(200).json({
            success: true,
            data: tasks,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getTasks = async (req, res) => {
    try {
        let tasks;

        if (req.user.role === "admin") {
            tasks = await Task.find().populate("assignedTo", "username email").populate("project", "title");
        }
        else {
            tasks = await Task.find({ assignedTo: req.user._id, }).populate("assignedTo", "username email").populate("project", "title");
        }

        res.status(200).json({
            success: true,
            data: tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        Object.assign(task, req.body);

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


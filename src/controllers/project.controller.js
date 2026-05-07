import Project from "../models/project.model.js";

export const createProject = async (req, res) => {
    try {
        const { title, description, members } = req.body;

        const project = await Project.create({
            title,
            description,
            members,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProjects = async (req, res) => {
    try {
        let projects;

        if (req.user.role === "admin") {
            projects = await Project.find().populate("members", "username email").populate("createdBy", "username email");
        }
        else {
            projects = await Project.find({ members: req.user._id, }).populate("createdBy", "username email");
        }

        res.status(200).json({
            success: true,
            data: projects,
        });

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate("members", "username email").populate("createdBy", "username email");

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        if (req.user.role !== "admin" && !project.members.some((member) => member._id.toString() === req.user._id.toString())) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        res.status(200).json({
            success: true,
            data: project,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { title, description, members } = req.body;

        const project = await Project.findById(
            req.params.id
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        project.title = title || project.title;

        project.description = description || project.description;

        project.members = members || project.members;

        await project.save();

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: project,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        await project.deleteOne();

        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
import Task from "../models/task.model.js";

export const getDashboardData = async (req, res) => {
    try {
        let filter = {};

        if (req.user.role === "member") {
            filter.assignedTo = req.user._id;
        }

        const totalTasks = await Task.countDocuments(
            filter
        );

        const completedTasks = await Task.countDocuments({ ...filter, status: "done", });

        const pendingTasks =
            await Task.countDocuments({
                ...filter,
                status: {
                    $in: [
                        "todo",
                        "in-progress",
                    ],
                },
            });

        const overdueTasks =
            await Task.countDocuments({
                ...filter,

                dueDate: {
                    $lt: new Date(),
                },

                status: {
                    $ne: "done",
                },
            });

        res.status(200).json({
            success: true,

            data: {
                totalTasks,
                completedTasks,
                pendingTasks,
                overdueTasks,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
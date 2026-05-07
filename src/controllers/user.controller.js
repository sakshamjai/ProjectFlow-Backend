import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id username email role");
    res.status(200).json({ success: true, data: users });
  }
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const creatorRole = req.user.role;

    const rolePermissions = {
      admin: ["member"]
    };


    if (!rolePermissions[creatorRole]) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to create users"
      });
    }


    if (!rolePermissions[creatorRole].includes(role)) {
      return res.status(403).json({
        success: false,
        message: `${creatorRole} cannot create ${role}`
      });
    }

    const user = await User.create({
      username,
      email,
      password,
      role,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: user
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
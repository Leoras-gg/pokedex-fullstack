import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = await User.create({
      email,
      password
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: user._id
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating user",
      error: error.message
    });
  }
};

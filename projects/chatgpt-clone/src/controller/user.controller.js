import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "../model/user.model.js";
import {
  loginValidatorSchema,
  signupValidatorSchema,
} from "../validators/user.validator.js";

dotenv.config();

const createToken = (userId, email) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const signupController = async (req, res) => {
  try {
    const validationResult = signupValidatorSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid input data",
        errors: validationResult.error.flatten(),
      });
    }

    const { name, email, password, age } = validationResult.data;

    if (!name || !email || !password || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
    });

    const token = createToken(newUser._id, newUser.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        age: newUser.age,
      },
    });
  } catch (error) {
    console.error("Error in signupController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginController = async (req, res) => {
  try {
    const validationResult = loginValidatorSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid input data",
        errors: validationResult.error.flatten(),
      });
    }

    const { email, password } = validationResult.data;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createToken(user._id, user.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
      },
    });
  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const profileController = async (req, res) => {
//   try {
//     const { email } = req.user; // Assuming the authMiddleware adds the user object to the request

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const user = await User.findOne({ email }).select("-password"); // Exclude password from the response

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({
//       message: "Profile fetched successfully",
//       user: {
//         name: user.name,
//         email: user.email,
//         age: user.age,
//         usage: user.usage,
//       },
//     });
//   } catch (error) {
//     console.error("Error in profileController:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const profileController = async (req, res) => {
  try {
    const loggedUser = req.user; // Assuming the authMiddleware adds the user object to the request

    if (!loggedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user: {
        name: loggedUser.name,
        email: loggedUser.email,
        age: loggedUser.age,
        usage: loggedUser.usage,
      },
    });
  } catch (error) {
    console.error("Error in profileController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in logoutController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  signupController,
  loginController,
  profileController,
  logoutController,
};

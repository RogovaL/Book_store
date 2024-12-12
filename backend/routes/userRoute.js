import express from "express";
import { loginUser, registerUser, getUserByToken, getUserById } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get", getUserByToken);
userRouter.get("/get/:userId", getUserById); // Доданий маршрут для отримання користувача за userId

export default userRouter;

import express from "express";
import { addComment, getCommentsForBook, updateComment, deleteComment } from "../controllers/commentController.js";

const commentRouter = express.Router();

// Route to add a comment
commentRouter.post("/add", addComment);

// Route to get comments for a specific book by bookId
commentRouter.get("/book/:bookId", getCommentsForBook);

// Optional: Route to update a comment by commentId
commentRouter.put("/update/:commentId", updateComment);

// Route to delete a comment by commentId
commentRouter.delete("/delete/:commentId", deleteComment);

export default commentRouter;

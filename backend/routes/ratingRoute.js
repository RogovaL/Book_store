import express from "express";
import { addRating, getRatingsForBook } from "../controllers/ratingController.js";

const ratingRouter = express.Router();

// Route to add or update a rating
ratingRouter.post("/add", addRating);

// Route to get ratings for a specific book by bookId
ratingRouter.get("/book/:bookId", getRatingsForBook);

export default ratingRouter;

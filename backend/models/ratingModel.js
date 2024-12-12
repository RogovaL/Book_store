import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const ratingModel =
  mongoose.models.rating || mongoose.model("rating", ratingSchema);

export default ratingModel;

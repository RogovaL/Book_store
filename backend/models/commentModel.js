import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const commentModel =
  mongoose.models.comment || mongoose.model("comment", commentSchema);

export default commentModel;

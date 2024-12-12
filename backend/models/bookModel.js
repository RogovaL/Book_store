import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  pdfFile: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  }
});

const bookModel = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default bookModel;

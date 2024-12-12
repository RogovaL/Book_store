import express from "express";
import {
  addBook,
  listBooks,
  removeBook,
  updateBook,
  getBookById,
} from "../controllers/bookController.js";
import multer from "multer";
import path from "path";

// Створюємо директорії для збереження файлів
const imageUploadDir = path.resolve("uploads", "images");
const pdfUploadDir = path.resolve("uploads", "books");

// Переконаємося, що ці директорії існують, або створимо їх
import fs from "fs";
if (!fs.existsSync(imageUploadDir)) {
  fs.mkdirSync(imageUploadDir, { recursive: true });
}
if (!fs.existsSync(pdfUploadDir)) {
  fs.mkdirSync(pdfUploadDir, { recursive: true });
}

// Налаштування multer для завантаження зображень і PDF
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, imageUploadDir);
    } else if (file.mimetype === "application/pdf") {
      cb(null, pdfUploadDir);
    } else {
      cb(new Error("Invalid file type. Only image and PDF files are allowed."), false);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const bookRouter = express.Router();

// Роут для додавання книги з можливістю завантаження зображення та PDF
bookRouter.post("/add", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "pdfFile", maxCount: 1 } // Оновлено ім'я поля для відповідності
]), addBook);

bookRouter.post("/update", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "pdfFile", maxCount: 1 } // Оновлено ім'я поля для відповідності
]), updateBook);

bookRouter.get("/list", listBooks);
bookRouter.post("/remove", removeBook);


bookRouter.get("/get/:id", getBookById);

export default bookRouter;

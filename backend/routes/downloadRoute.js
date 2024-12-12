import path from "path";
import express from "express";
import bookModel from "../models/bookModel.js"; // Імпортуємо модель книги

const downloadRouter = express.Router();

downloadRouter.get("/book/:id", async (req, res) => {
  try {
    const bookId = req.params.id;

    // Знаходимо книгу за її ID
    const book = await bookModel.findById(bookId);

    if (!book) {
      return res.status(404).send("Книга не знайдена");
    }



    // Отримуємо шлях до PDF файлу з поля pdfFile
    const filePath = path.resolve(`./uploads/books/${book.pdfFile}`);
    console.log(">>>>>>>>>>>>>>>>Downloading file:", filePath);

    // Відправка файлу
    res.download(filePath, book.pdfFile, (err) => {
      if (err) {
        console.error("Error downloading the file:", err);
        res.status(500).send({err: "Помилка завантаження файлу.", book});
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default downloadRouter;

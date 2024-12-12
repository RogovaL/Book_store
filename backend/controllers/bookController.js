import bookModel from "../models/bookModel.js";
import fs from "fs";
import path from "path";

// Додати книгу
const addBook = async (req, res) => {
  try {
    const image_filename = req.files && req.files.image ? req.files.image[0].filename : null;
    const pdf_filename = req.files && req.files.pdfFile ? req.files.pdfFile[0].filename : null;

    // Створити новий документ книги
    const book = new bookModel({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      publishYear: req.body.publishYear,
      category: req.body.category,
      price: req.body.price,
      image: image_filename,
      pdfFile: pdf_filename,
    });

    await book.save();
    res.json({ success: true, message: "Book Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while adding the book." });
  }
};

// Оновити книгу
const updateBook = async (req, res) => {
  try {
    const { id } = req.body;
    let updatedFields = {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      publishYear: req.body.publishYear,
      category: req.body.category,
      price: req.body.price,
    };

    // Перевірити, чи є нове зображення
    if (req.files && req.files.image) {
      const book = await bookModel.findById(id);
      if (book && book.image) {
        const imagePath = path.join(path.dirname(import.meta.url), "../uploads", book.image);
        fs.unlink(imagePath, (err) => {
          if (err) console.log('Error deleting old image:', err);
        });
      }
      updatedFields.image = req.files.image[0].filename;
    }

    // Перевірити, чи є новий PDF-файл
    if (req.files && req.files.pdfFile) {
      const book = await bookModel.findById(id);
      if (book && book.pdfFile) {
        const pdfPath = path.join(path.dirname(import.meta.url), "../uploads", book.pdfFile);
        fs.unlink(pdfPath, (err) => {
          if (err) console.log('Error deleting old PDF file:', err);
        });
      }
      updatedFields.pdfFile = req.files.pdfFile[0].filename;
    }

    // Оновлення книги у базі даних
    const updatedBook = await bookModel.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({ success: true, message: "Book updated successfully", data: updatedBook });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ success: false, message: "An error occurred while updating the book" });
  }
};

// Список всіх книг
const listBooks = async (req, res) => {
  try {
    const books = await bookModel.find({});
    res.json({ success: true, data: books });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Отримати книгу за ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);

    if (!book) {
      return res.json({ success: false, message: "Book not found" });
    }

    res.json({ success: true, data: book });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Видалити книгу
const removeBook = async (req, res) => {
  try {
    const book = await bookModel.findById(req.body.id);
    if (book && book.image) {
      const imagePath = path.join(path.dirname(import.meta.url), "../uploads", book.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.log(err);
      });
    }
    if (book && book.pdfFile) {
      const pdfPath = path.join(path.dirname(import.meta.url), "../uploads", book.pdfFile);
      fs.unlink(pdfPath, (err) => {
        if (err) console.log(err);
      });
    }

    await bookModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Book Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addBook, listBooks, removeBook, updateBook, getBookById };

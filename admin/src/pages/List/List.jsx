import React, { useEffect, useState } from "react";
import "./List.css"; // Стиль для компонента
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    description: "",
    image: null,
    pdfFile: null,
  });

  // Функція для отримання списку книг
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${url}/api/books/list`);
      if (response.data.success) {
        setBooks(response.data.data);
      } else {
        toast.error("Failed to fetch books.");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("An error occurred while fetching books.");
    }
  };

  // Функція для видалення книги
  const removeBook = async (bookId) => {
    try {
      const response = await axios.post(`${url}/api/books/remove`, {
        id: bookId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchBooks();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error removing book:", error);
      toast.error("An error occurred while removing the book.");
    }
  };

  // Функція для оновлення книги
  const updateBook = async () => {
    try {
      const form = new FormData();
      form.append("id", editingBook._id);
      form.append("title", formData.title);
      form.append("author", formData.author);
      form.append("category", formData.category);
      form.append("price", formData.price);
      form.append("description", formData.description);
      if (formData.image) {
        form.append("image", formData.image);
      }
      if (formData.pdfFile) {
        form.append("pdfFile", formData.pdfFile);
      }

      const response = await axios.post(`${url}/api/books/update`, form);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchBooks();
        setEditingBook(null);
        setFormData({
          title: "",
          author: "",
          category: "",
          price: "",
          description: "",
          image: null,
          pdfFile: null,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("An error occurred while updating the book.");
    }
  };

  // Функція для заповнення форми під час редагування книги
  const handleEditClick = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      price: book.price,
      description: book.description,
      image: null,
      pdfFile: null,
    });
  };

  // Функція для оновлення стану форми
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Функція для обробки змін файлу зображення
  const handleImageChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: e.target.files[0],
    }));
  };

  // Функція для обробки змін PDF-файлу
  const handlePdfChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      pdfFile: e.target.files[0],
    }));
  };

  // Виклик функції для отримання даних при першому рендері
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="list-container">
      <h2>Book List</h2>
      <div className="list-table">
        <div className="list-table-header list-table-format title">
          <b>Image</b>
          <b>Title</b>
          <b>Author</b>
          <b>Category</b>
          <b>Price</b>
          <b>Actions</b>
        </div>
        {books.map((book) => (
          <div key={book._id} className="list-table-row list-table-format">
            <img
              src={`${url}/images/${book.image}`}
              alt={book.title}
              className="book-image"
            />
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.category}</p>
            <p>${book.price.toFixed(2)}</p>
            <div className="actions">
              <button
                onClick={() => handleEditClick(book)}
                className="btn outline"
              >
                Edit
              </button>
              <button
                onClick={() => removeBook(book._id)}
                className="btn outline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Форма редагування книги */}
      {editingBook && (
        <div className="edit-form">
          <h3>Edit Book</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateBook();
            }}
          >
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              placeholder="Title"
              required
            />
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleFormChange}
              placeholder="Author"
              required
            />
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleFormChange}
              placeholder="Category"
              required
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleFormChange}
              placeholder="Price"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              placeholder="Description"
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
            />
            <input
              type="file"
              name="pdfFile"
              onChange={handlePdfChange}
              accept="application/pdf"
            />
            <button type="submit">Update Book</button>
            <button type="button" onClick={() => setEditingBook(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default List;

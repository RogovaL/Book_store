import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [data, setData] = useState({
    title: "",
    author: "",
    publishYear: "",
    category: "Fiction",
    price: "",
    description: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onFileChangeHandler = (event, type) => {
    const file = event.target.files[0];
    if (type === "image") {
      setImage(file);
    } else if (type === "pdf") {
      setPdfFile(file);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("publishYear", Number(data.publishYear));
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("description", data.description);
    if (image) formData.append("image", image);
    if (pdfFile) formData.append("pdfFile", pdfFile);

    try {
      const response = await axios.post(`${url}/api/books/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setData({
          title: "",
          author: "",
          publishYear: "",
          category: "Fiction",
          price: "",
          description: "", // Очищення поля опису
        });
        setImage(null);
        setPdfFile(null); // Очищення поля PDF
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the book.");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-upload flex-col">
          <p>Upload Book Image</p>
          <label htmlFor="image">
            <img
              className="image"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Book Preview"
            />
          </label>
          <input
            onChange={(e) => onFileChangeHandler(e, "image")}
            type="file"
            id="image"
            hidden
            accept="image/*"
          />
        </div>  

        <div className="add-upload flex-col">
          <p>Upload Book PDF</p>
          <label htmlFor="pdfFile">
            <img
              className="pdfFile"
              src={assets.upload_area}
              alt="pdf File"
            />
          </label>
          <input
            onChange={(e) => onFileChangeHandler(e, "pdf")}
            type="file"
            id="pdfFile"
            accept=".pdf"
            name="pdfFile"
            hidden
            className="file-input"
          />
        </div>

        <div className="add-book-title flex-col">
          <p>Book Title</p>
          <input
            onChange={onChangeHandler}
            value={data.title}
            type="text"
            name="title"
            placeholder="Title"
            required
          />
        </div>

        <div className="add-book-author flex-col">
          <p>Author</p>
          <input
            onChange={onChangeHandler}
            value={data.author}
            type="text"
            name="author"
            placeholder="Author"
            required
          />
        </div>

        <div className="add-book-publishYear flex-col">
          <p>Publish Year</p>
          <input
            onChange={onChangeHandler}
            value={data.publishYear}
            type="number"
            name="publishYear"
            placeholder="Year"
            min="1000"
            max={new Date().getFullYear()}
            required
          />
        </div>

        <div className="add-book-description flex-col">
          <p>Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            placeholder="Book Description"
            rows="4"
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
            >
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Biography">Biography</option>
              <option value="Science">Science</option>
              <option value="Fantasy">Fantasy</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="Price"
              min="0"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default Add;

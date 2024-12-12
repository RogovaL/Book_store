import React, { useContext, useState } from "react";
import "./BooksDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import BookItem from "../BookItem/BookItem";
import { Link } from "react-router-dom";

const BooksDisplay = ({ category, searchTerm }) => {
  const [displayOrder, setDisplayOrder] = useState("grid");
  const [sortOption, setSortOption] = useState("default"); // Додали стан для сортування
  let { book_list } = useContext(StoreContext);

  // Фільтруємо книги за категорією
  book_list = book_list.filter((item) => {
    const matchesCategory = category === "All" || category === item.category;
    return matchesCategory;
  });

  // Фільтруємо книги за пошуковим запитом
  if (searchTerm) {
    book_list = book_list.filter((item) => {
      const matchesSearchTerm =
        item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.author?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearchTerm;
    });
  }

  // Сортування книг
  if (sortOption === "date") {
    book_list = book_list.sort((a, b) => b.publishYear - a.publishYear); // Новіші зверху
  } else if (sortOption === "alphabetical") {
    book_list = book_list.sort((a, b) =>
      a.title.localeCompare(b.title, "en", { sensitivity: "base" })
    ); // Сортування за алфавітом
  } else if (sortOption === "price") {
    book_list = book_list.sort((a, b) => a.price - b.price); // Найдешевші зверху
  }

  return (
    <div className="books-display" id="books-display">
      <div className="books-display-header">
        <h2>Список книг</h2>

        <div className="view-options">
          <button
            className={
              displayOrder == "column" ? "btn outline active" : "btn outline"
            }
            onClick={() => setDisplayOrder("column")}
          >
            Список
          </button>
          <button
            className={
              displayOrder == "grid" ? "btn outline active" : "btn outline"
            }
            onClick={() => setDisplayOrder("grid")}
          >
            Блоки
          </button>
        </div>

        <div className="sort-options">
          <label htmlFor="sort">Сортувати за:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">За замовчуванням</option>
            <option value="date">Датою виходу</option>
            <option value="alphabetical">Алфавітом</option>
            <option value="price">Ціною</option>
          </select>
        </div>
      </div>

      <div className={`books-display-list ${displayOrder}`}>
        {book_list.length > 0 ? (
          book_list.map((item, index) => (
            <BookItem
              key={index}
              id={item._id}
              title={item.title}
              price={item.price}
              image={item.image}
              category={item.category}
              author={item.author}
              publishYear={item.publishYear}
              displayOrder={displayOrder}
            />
          ))
        ) : (
          <p>Книги не знайдені</p>
        )}
      </div>
    </div>
  );
};

export default BooksDisplay;

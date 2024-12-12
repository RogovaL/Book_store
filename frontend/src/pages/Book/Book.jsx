import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import CommentsDisplay from "../../components/CommentsDisplay/CommentsDisplay";
import RateBook from "../../components/RateBook/RateBook";
import LibraryActions from "../../components/LibraryActions/LibraryActions";
import {
  fetchBookById,
  fetchUserByToken,
  fetchUserOrders,
  fetchRatingsByBookId,
  submitRating,
  downloadBook,
} from "../../helpers/apiHelpers";
import {
  calculateAverageRating,
  checkIfBookInOrders,
} from "../../helpers/utils";
import "./Book.css";

const Book = () => {
  const { id } = useParams();
  const { url, token } = useContext(StoreContext);

  const [book, setBook] = useState(null); // Дані книги
  const [rating, setRating] = useState(""); // Стан для оцінки
  const [ratings, setRatings] = useState([]); // Оцінки книги
  const [user, setUser] = useState(null); // Дані користувача
  const [userOrders, setUserOrders] = useState([]); // Замовлення користувача
  const [isInOrder, setIsInOrder] = useState(false); // Перевірка наявності книги в замовленнях

  useEffect(() => {
    console.log("book");

    const initializeData = async () => {
      try {
        // Завантаження книги без токена
        const bookData = await fetchBookById(url, id);
        setBook(bookData);
        console.log("book", bookData);

        // Завантаження оцінок
        const ratingsData = await fetchRatingsByBookId(url, id);
        setRatings(ratingsData);

        // Завантаження даних користувача, якщо є токен
        if (token) {
          const [userData, ordersData] = await Promise.all([
            fetchUserByToken(url, token),
            fetchUserOrders(url, token),
          ]);

          setUser(userData);
          setUserOrders(ordersData);
          setIsInOrder(checkIfBookInOrders(ordersData, id));
        }
      } catch (error) {
        console.error("Помилка ініціалізації даних:", error);
      }
    };

    initializeData(); // Завантажуємо дані без перевірки токена
  }, [id, url, token]); // Перезапускається при зміні id, url або token

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        console.error("Користувач не авторизований для оцінки");
        return;
      }

      // Надсилаємо оцінку лише якщо є токен та користувач
      const success = await submitRating(url, id, user._id, rating);
      if (success) {
        setRating("");
        const updatedRatings = await fetchRatingsByBookId(url, id);
        setRatings(updatedRatings);
      }
    } catch (error) {
      console.error("Помилка обробки оцінки:", error);
    }
  };

  const handleDownload = () => {
    if (book) {
      downloadBook(url, id, book.title); // Завантаження книги
    }
  };

  if (!book) return <p>Завантаження...</p>;

  return (
    <div className="product-page">
      <div className="product-header">
        <img
          className="product-image"
          src={`${url}/images/${book.image}`}
          alt={book.title}
        />
        <div className="product-info">
          <h1 className="product-title">{book.title}</h1>
          <p className="product-author">Автор: {book.author}</p>
          <p className="product-category">Категорія: {book.category}</p>
          <p className="product-year">Рік публікації: {book.publishYear}</p>
          <p className="product-price">
            Ціна: {book.price ? `$${book.price.toFixed(2)}` : "Безкоштовно"}
          </p>
          <p className="product-description">Опис: {book.description}</p>
          {isInOrder && <LibraryActions handleDownload={handleDownload} />}
        </div>
      </div>

      <div className="product-ratings">
        <h2>Оцінки</h2>
        {ratings.length ? (
          <>
            <p className="rating-stars">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`star ${
                    index < Math.round(calculateAverageRating(ratings))
                      ? "selected"
                      : ""
                  }`}
                >
                  &#9733;
                </span>
              ))}
            </p>
            <p>Оцінка: {calculateAverageRating(ratings).toFixed(2)}</p>
            <p>Оцінювачів: {ratings.length}</p>
          </>
        ) : (
          <p>Оцінок поки немає.</p>
        )}
      </div>

      <div className="if-user-block">
        <div className="box">
          {token && (
            <RateBook
              rating={rating}
              setRating={setRating}
              handleRatingSubmit={handleRatingSubmit}
            />
          )}
        </div>

        <CommentsDisplay bookId={id} url={url} token={token} />
      </div>
    </div>
  );
};

export default Book;

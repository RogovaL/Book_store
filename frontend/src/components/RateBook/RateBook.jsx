import React from "react";
import "./RateBook.css";

const RateBook = ({ rating, setRating, handleRatingSubmit }) => {
  // Функція для обробки кліку на зірочку
  const handleStarClick = (index) => {
    setRating(index + 1); // Встановлюємо рейтинг
  };

  return (
    <div className="rate-book">
      <h3>Оцінити книжку</h3>
      <form onSubmit={handleRatingSubmit}>
        <div className="stars">
          {[...Array(5)].map((_, index) => (
            <span key={index} onClick={() => handleStarClick(index)}>
              <button
                className={`star ${index < rating ? "selected" : ""}`}
                type="submit"
              >
                &#9733;
              </button>
            </span>
          ))}
        </div>
      </form>
    </div>
  );
};

export default RateBook;

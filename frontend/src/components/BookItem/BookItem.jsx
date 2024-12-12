import React, { useContext } from "react";
import "./BookItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

const BookItem = ({
  id,
  title,
  author,
  publishYear,
  category,
  price,
  image,
  displayOrder,
  isOwnerView = false,
}) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  const imageSrc = image ? `${url}/images/${image}` : assets.default_book_image;

  return (
    <div className={`book-item ${displayOrder}`}>
      <div className="book-item-img-container">
        <img
          className="book-item-image"
          src={imageSrc}
          alt={title || "Book image"}
        />

        {!isOwnerView &&
          (!cartItems[id] ? (
            <img
              className="add"
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt="Add to Cart"
              aria-label="Add to Cart"
            />
          ) : (
            <div className="book-item-counter">
              <button
                onClick={() => removeFromCart(id)}
                className="remove-from-cart"
              >
                Відмінити
              </button>
            </div>
          ))}
      </div>
      <div className="book-item-info">
        <div className="book-item-header">
          <p className="book-item-title"><b>{title}</b></p>
          <p className="book-item-author"><b>{author}</b></p>
        </div>
        <div>
          <p className="book-item-publishYear">Рік публікації: <b>{publishYear}</b></p>
          <p className="book-item-category">Категорія: <b>{category || "N/A"}</b></p>
        </div>
        <div>
          <p className="book-item-price">
            <b>{price != null ? `$${price.toFixed(2)}` : "Price not available"}</b>
          </p>
        </div>
      </div>
      <Link to={`/book/${id}`} className="btn dark m-2">
        Більше..
      </Link>
    </div>
  );
};

export default BookItem;

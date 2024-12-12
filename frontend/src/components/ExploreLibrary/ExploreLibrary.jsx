import React from "react";
import "./ExploreLibrary.css";
import { book_categories } from "../../assets/assets";

const ExploreLibrary = ({ category, setCategory }) => {
  return (
    <div className="explore-library" id="explore-library">
      <h1>Можете подивитись нашу бібліотеку</h1> 
        <p className="explore-library-text">
          Різноманітний вибір книг всіх жанрів!
        </p>
      <div className="explore-library-list">
        {book_categories.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.category_name
                )
              }
              key={index}
              className="explore-library-list-item"
            >
              <img
                className={category === item.category_name ? "active" : ""}
                src={item.category_image}
                alt=""
              />
              <p>{item.category_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreLibrary;

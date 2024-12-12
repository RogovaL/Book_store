import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Знаходьте книги тут</h2>
        <p>
          Різноманітний вибір книг всіх жанрів! На нашому сайті ви зможете
          знайти книги всіх жанрів, від фантастики до детективів.
        </p>
        <Link
          to="/search"
          onClick={() => setMenu("Search")}
          className="btn dark"
        >
          Переглянути бібліотеку
        </Link>
      </div>
    </div>
  );
};

export default Header;

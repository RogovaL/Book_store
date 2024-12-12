import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ setCategory, setSearchTerm }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(search);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for a book..."
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select onChange={handleCategoryChange} className="search-category">
          <option value="All">Всі категорії</option>
          <option value="Fiction">Художня література</option>
          <option value="Non-Fiction">Нехудожня література</option>
          <option value="Mystery">Детективи</option>
          <option value="Biography">Біографії</option>
          <option value="Science">Наука</option>
          <option value="Fantasy">Фентезі</option>
        </select>
        <button type="submit" className="btn dark">
          Знайти
        </button>
      </form>
    </div>
  );
};

export default SearchForm;

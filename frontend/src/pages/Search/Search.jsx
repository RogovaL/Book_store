import React, { useState } from "react";
import "./Search.css";
import SearchForm from "../../components/SearchForm/SearchForm";
import BooksDisplay from "../../components/BooksDisplay/BooksDisplay";

const Search = () => {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="search-page">
      <SearchForm setCategory={setCategory} setSearchTerm={setSearchTerm} />
      <BooksDisplay category={category} searchTerm={searchTerm} />
    </div>
  );
};

export default Search;

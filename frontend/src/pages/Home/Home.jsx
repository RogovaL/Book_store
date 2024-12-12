import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreLibrary from "../../components/ExploreLibrary/ExploreLibrary";
import BooksDisplay from "../../components/BooksDisplay/BooksDisplay";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreLibrary category={category} setCategory={setCategory} />
      <BooksDisplay category={category} />
    </div>
  );
};

export default Home;

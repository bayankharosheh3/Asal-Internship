import React from "react";
import "./styles.css";
import AlbumsSection from "./AlbumsSection";
import Header from "./Header";

const MainContent = () => {
  return (
    <div className="overlay">
      <Header />
      <AlbumsSection />
    </div>
  );
};

export default MainContent;

import React from "react";
import "./styles.css";

const SearchHistory = ({ searchHistory }) => {
  return (
    <div className="search-history">
      <ul className="search-history-list">
        {searchHistory.map((term, index) => (
          <li key={index} className="search-history-item">{term}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import SearchHistory from "./SearchHistory";
import "./styles.css";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const searchHistory = useSelector((state) => state.searchHistory);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <>
      <div className="listTitle">
        <p className="text">/ albums search</p>
        <input
          type="text"
          name=""
          id=""
          value={searchTerm}
          className="input"
          onChange={handleSearchTermChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {isInputFocused && <SearchHistory searchHistory={searchHistory} />}
      </div>
    </>
  );
};

export default SearchBar;

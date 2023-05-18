import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import SearchBar from "../../SearchBar";

const Navbar = ({ albumId, searchTerm, setSearchTerm }) => {
  return (
    <div className="nav">
      <div className="albumTitle">Album #{albumId} Photos</div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Link to="/" className="mainLink">
        -- Back to Main Page
      </Link>
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import "./styles.css";
import Photos from "./Photos";
import Navbar from "./Navbar";
import useSearch from "../useSearch";
import { useDispatch } from "react-redux";
import { addSearchHistory } from "./../../redux/searchHistorySlice";
import { resetData } from "../../redux/photosSlice";

const Album = ({ albumId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useSearch(searchTerm, 500);
  const dispatch = useDispatch();

  var id = albumId;

  useEffect(() => {
    if (debouncedSearchTerm !== "") {
      dispatch(addSearchHistory(debouncedSearchTerm));
      dispatch(resetData(id));
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="overlay">
      <div className="albumContainer">
        <Navbar
          albumId={albumId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Photos albumId={albumId} debouncedSearchTerm={debouncedSearchTerm} />
      </div>
    </div>
  );
};

export default Album;

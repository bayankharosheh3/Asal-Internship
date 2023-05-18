import React, { useEffect, useState } from "react";
import "./styles.css";
import useFetch from "../../useFetch";
import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import SearchBar from "../../SearchBar";
import useSearch from "../../useSearch";
import { useDispatch, useSelector } from "react-redux";
import { addSearchHistory } from "../../../redux/searchHistorySlice";
import { resetData } from "../../../redux/albumsSlice";

const AlbumsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useSearch(searchTerm, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    if (debouncedSearchTerm !== "") {
      dispatch(addSearchHistory(debouncedSearchTerm));
      dispatch(resetData());
    }
  }, [debouncedSearchTerm]);

  const {
    data: albums,
    hasMoreItems,
    isLoading,
    fetchData,
  } = useFetch(
    `https://jsonplaceholder.typicode.com/albums?q=${debouncedSearchTerm}&`,
    debouncedSearchTerm
  );

  const data = useSelector((state) => state.albums.data);
  const page = useSelector((state) => state.albums.lastPageCached);
  const url = useSelector((state) => state.albums.url);

  console.log(data, page, url);

  return (
    <div>
      <div className="listContainer">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="albumsList">
          <div className="listItem">
            <InfiniteScroll
              pageStart={0}
              loadMore={fetchData}
              hasMore={hasMoreItems}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              <div className="gridContainer">
                {data?.map((album) => {
                  const id = album.id;
                  return (
                    <div key={album.id} className="gridItem">
                      <span className="itemNum">{album.id}</span>
                      <Link className="itemLink" to={`/albums/${id}`}>
                        <span className="link">{album.title}</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AlbumsSection;

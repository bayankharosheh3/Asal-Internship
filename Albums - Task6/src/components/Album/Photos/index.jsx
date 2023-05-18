import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import Card from "./Card";
import "./styles.css";
import useFetchPhotos from "../../useFetchPhotos";
import { useDispatch, useSelector } from "react-redux";

const Photos = ({ albumId, debouncedSearchTerm }) => {
  const {
    data: photos,
    hasMoreItems,
    isLoading,
    fetchData,
  } = useFetchPhotos(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos?q=${debouncedSearchTerm}&`,
    albumId,
    debouncedSearchTerm,
  );

  const reduxPhotos = useSelector((state) => state.photos.data);


  const {
    cachedData: reduxData,
    lastPageCached: reduxPage,
    url: reduxUrl,
    cachingTime: reduxTime,
  } = reduxPhotos[albumId]|| {};


  return (
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
      <div className="photoContainer">
        {reduxData &&
          reduxData.map((photo) => (
            <Card
              id={photo.id}
              url={photo.thumbnailUrl}
              title={photo.title}
              key={photo.id}
            />
          ))}
      </div>
    </InfiniteScroll>
  );
};
export default Photos;

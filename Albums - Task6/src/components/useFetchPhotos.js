import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataSuccess, resetData } from "../redux/photosSlice";
import { useDispatch, useSelector } from "react-redux";

const useFetchPhotos = (url, albumId, debouncedSearchTerm) => {
  const [data, setData] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const cachingTime = new Date().getTime();
  const dispatch = useDispatch();

  const reduxPhotos = useSelector((state) => state.photos.data);


  const {
    cachedData: reduxData,
    lastPageCached: reduxPage,
    url: reduxUrl,
    cachingTime: reduxTime,
  } = reduxPhotos[albumId]|| {};

  console.log(reduxPhotos[albumId]);

  const fetchData = () => {
    console.log(url,'1')
    console.log(reduxUrl,'2')

    var id = albumId;
    if (
      url == reduxUrl &&
      page <= reduxPage - 1 &&
      (cachingTime - reduxTime) / 1000 < 15
    ) {
      setPage(page + 1);
      return;
    }

    if (
      url == reduxUrl &&
      page <= reduxPage - 1 &&
      (cachingTime - reduxTime) / 1000 >= 15
    ) {
      dispatch(resetData(id));
    }

    var data2;
    var page2;

    setIsLoading(true);
    axios
      .get(`${url}_page=${page}&_limit=20`)
      .then((response) => {
        const newData = response.data;
        if (newData.length === 0) {
          if (page === 1) {
            navigate("/not-found");
          } else {
            setHasMoreItems(false);
          }
        } else {
          setData([...data, ...newData]);
          setPage(page + 1);
          if (url != reduxUrl) {
            data2 = [...newData];
            page2 = page + 1;
            setPage(1);
            dispatch(fetchDataSuccess({ id, data2, cachingTime, page2, url }));
          } else {
            data2 = [...reduxData, ...newData];
            page2 = page + 1;
            dispatch(fetchDataSuccess({ id, data2, cachingTime, page2, url }));
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // navigate("/not-found");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setData([]);
    setHasMoreItems(true);
    setPage(1);
  }, [url]);

  useEffect(() => {
    setPage(1);
    fetchData();
  }, [url]);

  return { data, hasMoreItems, isLoading, fetchData };
};
export default useFetchPhotos;

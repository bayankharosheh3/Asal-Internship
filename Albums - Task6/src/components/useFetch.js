import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataSuccess, resetData } from "../redux/albumsSlice";
import { useDispatch, useSelector } from "react-redux";

const useFetch = (url, p) => {
  const [data, setData] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const cachingTime = new Date().getTime();
  const dispatch = useDispatch();

  const reduxData = useSelector((state) => state.albums.data);
  const reduxPage = useSelector((state) => state.albums.lastPageCached);
  const reduxUrl = useSelector((state) => state.albums.url);
  const reduxTime = useSelector((state) => state.albums.cachingTime);

  const fetchData = () => {
    if (
      url == reduxUrl &&
      page <= reduxPage - 1 &&
      (cachingTime - reduxTime) / 1000 < 60
    ) {
      setPage(page + 1);
      return;
    }

    if (
      url == reduxUrl &&
      page <= reduxPage - 1 &&
      (cachingTime - reduxTime) / 1000 >= 60
    ) {
      dispatch(resetData());
    }

    var data2;
    var page2 = page + 1;

    setIsLoading(true);
    setTimeout(() => {
      axios
        .get(`${url}_page=${page}&_limit=20`)
        .then((response) => {
          const newData = response.data;
          if (newData.length === 0) {
            setHasMoreItems(false);
          } else {
            setData([...data, ...newData]);
            setPage(page + 1);
            if (url != reduxUrl) {
              data2 = [...newData];
              page2 = page + 1;
              console.log(url);
              setPage(1);
              dispatch(fetchDataSuccess({ data2, cachingTime, page2, url }));
            } else {
              data2 = [...reduxData, ...newData];
              page2 = page + 1;
              console.log(url);
              dispatch(fetchDataSuccess({ data2, cachingTime, page2, url }));
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
export default useFetch;

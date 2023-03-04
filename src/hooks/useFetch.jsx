import { useEffect, useState } from "react";
import { fetchFromApi } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
//   console.log(backdrop)

  useEffect(() => {
    setLoading("Loading...");
    setData(null);
    setError(null);

    fetchFromApi(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong...");
      });
  }, [url]);

  return {
    loading,
    data,
    error,
  };
};

export default useFetch;

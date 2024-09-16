import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useGet = (url, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0);

  // const token = `${process.env.REACT_APP_API_TOKEN}`;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        params,
      });
      setData(response?.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, params]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url, fetchData, trigger]);

  const refetch = () => setTrigger((prev) => prev + 1);

  return { data, loading, error, refetch };
};

export default useGet;

import { useState } from "react";
import axios from "axios";

const usePut = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const putData = async (putData) => {
    // const token = `${process.env.REACT_APP_API_TOKEN}`;
    try {
      setLoading(true);
      const response = await axios.put(url, putData, {});
      setData(response?.data?.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, putData };
};

export default usePut;

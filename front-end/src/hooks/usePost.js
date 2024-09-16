import { useState } from "react";
import axios from "axios";

const usePost = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (body) => {
    // const token = `${process.env.REACT_APP_API_TOKEN}`;

    try {
      setLoading(true);
      const response = await axios.post(url, body, {});
      setData(response?.data?.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePost;

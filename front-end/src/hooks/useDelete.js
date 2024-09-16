import { useState } from "react";
import axios from "axios";

const useDelete = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const token = `${process.env.REACT_APP_API_TOKEN}`;

  const deleteData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url, {});
      setData(response?.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMultiple = async (body) => {
    try {
      setLoading(true);
      const response = await axios.post(url, body, {});
      console.log({ response });
      setData(response?.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, deleteData, deleteMultiple };
};

export default useDelete;

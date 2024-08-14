import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(url, query = "") {
  const [data, setdata] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${query}`);
        setdata(data);
      } catch (error) {
        // toast.error(err?.message)
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query, url]);

  return {
    isloading,
    data,
  };
}

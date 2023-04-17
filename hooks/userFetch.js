import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFetch(endpoint, query) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': 'd07f7146e6msh05360591c1ff768p18acd4jsn00f00dc418c3',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: { ...query },
  };

  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [query, endpoint])

  return { data, isLoading, error };
}
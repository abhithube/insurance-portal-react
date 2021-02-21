import { useCallback } from 'react';
import axios from 'axios';

const useAxios = () => {
  const get = useCallback(async (url) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      return null;
    }
  }, []);

  const post = useCallback(async (url, body) => {
    try {
      const res = await axios.post(url, body);
      console.log(res.status);
      return res.status;
    } catch (err) {
      return false;
    }
  }, []);

  const put = useCallback(async (url, body) => {
    try {
      const res = await axios.put(url, body);
      console.log(res.status);
      return res.status;
    } catch (err) {
      return false;
    }
  }, []);

  return { get, post, put };
};

export default useAxios;

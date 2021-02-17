import { useCallback } from 'react';

const useFetch = () => {
  const get = useCallback(async (url) => {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = res.json();
        return data;
      } else return null;
    } catch (err) {
      return null;
    }
  }, []);

  const post = useCallback(async (url, body) => {
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

    await fetch(url, requestOptions);
  }, []);

  const put = useCallback(async (url, body) => {
    let requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

    const res = await fetch(url, requestOptions);
    return res.ok;
  }, []);

  return { get, post, put };
};

export default useFetch;

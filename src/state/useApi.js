//V 1.0
// import { useState, useEffect } from 'react';

// function useApi(endpoint) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [cachedResponse, setCachedResponse] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);

//       // Check if response is already cached
//       if (cachedResponse) {
//         setData(cachedResponse);
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(endpoint);
//         const json = await response.json();
//         setData(json);

//         // Cache the response for future use
//         setCachedResponse(json);
//       } catch (e) {
//         setError(e);
//       }

//       setLoading(false);
//     };
    
//     fetchData();
//   }, [endpoint, cachedResponse]);

//   return [data, loading, error];
// }

// export default useApi;


//v 1.1
import { useState, useEffect } from 'react';

function useApi(endpoint, shouldUseCache = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cachedResponse, setCachedResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // Check if response is already cached and should be used
      if (cachedResponse && shouldUseCache) {
        setData(cachedResponse);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(endpoint);
        const json = await response.json();
        setData(json);

        // Cache the response for future use if shouldCache is true
        if (shouldUseCache) {
          setCachedResponse(json);
        }

      } catch (e) {
        setError(e);
      }

      setLoading(false);
    };

    fetchData();
  }, [endpoint, shouldUseCache, cachedResponse]);

  return [data, loading, error];
}

export default useApi;
/* this is how we use put in a main
 const [data, loading, error] = useApi('https://api.example.com/data', false); */
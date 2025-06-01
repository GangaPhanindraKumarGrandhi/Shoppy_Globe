import { useState, useEffect } from 'react';
import axios from 'axios';
// Custom hook to fetch product list from external API
const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => setProducts(res.data.products))
      .catch(err => setError(err.message));
  }, []);
  console.log(products)
  return { products, error };
};
export default useFetchProducts;
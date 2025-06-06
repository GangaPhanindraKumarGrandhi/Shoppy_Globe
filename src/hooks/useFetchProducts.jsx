import { useState, useEffect } from 'react';
import axios from 'axios';
// Custom hook to fetch product list from external API
const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => setProducts(res.data))
      .catch(err => setError(err.message));
  }, []);
  console.log(products)
  return { products, error };
};
export default useFetchProducts;
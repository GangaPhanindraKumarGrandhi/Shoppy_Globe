import React, { useState } from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import ProductItem from './ProductItem';
// Displays a list of products with search functionality
const ProductList = () => {
  const { products, error } = useFetchProducts();
  const [search, setSearch] = useState('');
// Filters products based on user input
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );
  if (error) return <div>Error: {error}</div>;
  return (
    <>
    <div className='search'>
        <input
        type="text"
        placeholder="  🔍 Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      </div>    
      <div className='productlist'>
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>   
  );
};
export default ProductList;
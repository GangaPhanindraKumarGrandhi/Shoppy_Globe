// components/ProductItem.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useState } from 'react';
// Represents an individual product card
const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate('/checkout');
  };
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} color="gold" />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} color="gold" />);
      else stars.push(<FaRegStar key={i} color="gold" />);
    }
    return stars;
  };
  // Includes Add to Cart and Buy Now buttons
  // Shows loading or error message while image loads
  return (
    <div className='productitem'>
      <Link to={`/product/${product.id}`}>
        {loading && !error && <p>Loading image...</p>}
        {error && <p>Image failed to load.</p>}
        <img
            src={product.thumbnail}
            alt={product.title}
            style={{
              width: '100%',
              height: '250px',
              display: loading || error ? 'none' : 'block'
            }}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
          />
        <h3>{product.title}</h3>
        <p>Price: ₹{product.price}</p>
        <p>Rating: {product.rating} {renderStars(product.rating)}</p>  
      </Link>
      <div className='purchase' >
        <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        <button onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
};
export default ProductItem;

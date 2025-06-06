import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    // Local state for image loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Item added to cart successfully!"); 
  };
   // Adds the product to cart and navigates to checkout
  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate('/checkout');
  };
  // Converts rating to stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} color="gold" />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} color="gold" />);
      else stars.push(<FaRegStar key={i} color="gold" />);
    }
    return stars;
  };
  return (
    <div className='productitem'>
      <Link to={`/product/${product._id}`}>
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
      <div className='purchase'>
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
};

export default ProductItem;

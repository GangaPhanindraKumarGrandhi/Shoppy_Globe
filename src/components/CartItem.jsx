import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
// Renders a single cart item with controls
// Allows user to increase or decrease quantity
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [loadingImage, setLoadingImage] = useState(true);
  const [imageError, setImageError] = useState(false);
  const increaseQty = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };
  const decreaseQty = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
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
  return (
    <div className='cartproduct'>
      <div className="cartitem">
      <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {loadingImage && !imageError && <p>Loading image...</p>}
        {imageError && <p>Image failed to load.</p>}
        <div className="image">
          <img
            src={item.thumbnail}
            alt={item.title}           
            className='product-image'
            onLoad={() => setLoadingImage(false)}
            onError={() => {
              setLoadingImage(false);
              setImageError(true);
            }}
          />
        </div>
        <h4>{item.title}</h4>
        <p>Price: ₹{item.price}</p>
        <p><strong>Rating:</strong> {item.rating} {renderStars(item.rating)}</p>
        <p><strong>Return Policy:</strong> 10-day return policy available</p>
      </Link>
      <div className="cart-controls">
        <button  onClick={decreaseQty}>-</button>
        <span> {item.quantity} </span>
        <button  onClick={increaseQty}>+</button>
      </div>
      <div>
        <p><strong>Total:</strong> ₹{item.price * item.quantity}</p>
        <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
      </div>
    </div>
    </div>
  );
};

export default CartItem;

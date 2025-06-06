import React, { useState } from 'react'; 
import { useDispatch } from 'react-redux';
import {  removeFromCart, updateQuantity } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import useFetchProducts from '../hooks/useFetchProducts';
import { toast } from 'react-toastify'; 
const CartItem = ({ item, onQuantityChange ,onRemove  }) => {
  const dispatch = useDispatch();
  const [loadingImage, setLoadingImage] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  // Handle increasing quantity
  const handleIncrease = async () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item._id, newQuantity); 
    dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }));
  };
  // Handle decreasing quantity 
  const handleDecrease = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item._id, newQuantity); 
      dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }));
    }
  };
    // Remove item from cart
  const handleRemoveClick = () => {
    onRemove(item._id); 
    dispatch(removeFromCart(item._id))
    toast.success("Item Removed from cart successfully!");
  };
  // Generate star rating icons
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} color="gold" />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} color="gold" />);
      else stars.push(<FaRegStar key={i} color="gold" />);
    }
    return stars;
  };
  const prodId = item.productId;
  const { products, error } = useFetchProducts();
  if (error) console.log("Error loading products:", error);
   // Get full product data from fetched products
  const filteredProducts = products.filter(product => product._id === prodId);
  const productFullData = filteredProducts[0] || item;  // fallback if full data not found
  console.log("filteredProducts : ",filteredProducts);
  console.log("productFullData : ",productFullData);
  return (
    <div className='cartproduct'>
      <div className="cartitem">
        <Link to={`/product/${item.productId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {loadingImage && !imageError && <p>Loading image...</p>}
          {imageError && <p>Image failed to load.</p>}
          <div className="image">
            <img
              src={productFullData.thumbnail}
              alt={productFullData.title}
              className='product-image'
              onLoad={() => setLoadingImage(false)}
              onError={() => {
                setLoadingImage(false);
                setImageError(true);
              }}
            />
          </div>
          <h4>{productFullData.title}</h4>
          <p>Price: ₹{productFullData.price}</p>
          <p><strong>Rating:</strong> {productFullData.rating} {renderStars(productFullData.rating)}</p>
          <p><strong>Return Policy:</strong> {productFullData.returnPolicy}</p>
        </Link>
        <div className="cart-controls">
           <button onClick={handleDecrease}>-</button>
          <span> {item.quantity} </span>
          <button onClick={handleIncrease}>+</button>
        </div>
        <div>
          <p><strong>Total:</strong> ₹{productFullData.price * item.quantity}</p>
          <button onClick={handleRemoveClick}>Remove</button>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
// Fetches and displays full details of a selected product
const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [dataError, setDataError] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => setDataError(err.message));
  }, [id]);
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} color="gold" />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} color="gold" />);
      else stars.push(<FaRegStar key={i} color="gold" />);
    }
    return stars;
  };
  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate('/checkout');
  };
  if (dataError) return <div>Error: {`Hello${dataError}`}</div>;
  if (!product) return <div>Loading product details...</div>;
// Shows product image, title, price, rating, and additional details
  return (
    <div className='detail'>
      <div className='producdetail'>
        {loadingImage && !imageError && <p>Loading image...</p>}
        {imageError && <p>Image failed to load.</p>}
        <div className='image'>
          <img
            src={product.thumbnail}
            alt={product.title}
            className='product-image'
            onLoad={() => setLoadingImage(false)}
            onError={() => {
              setLoadingImage(false);
              setImageError(true);
            }}
          />
        </div>
        <h3>{product.title}</h3>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Rating:</strong> {product.rating} {renderStars(product.rating)}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Stock:</strong> {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
        <p><strong>Weight:</strong> {product.weight || '1.5 kg (estimated)'}</p>
        <p><strong>Return Policy:</strong>{product.returnPolicy}</p>
        <p><strong>Shipping Information:</strong>{product.shippingInformation}</p>
        <p><strong>Warranty:</strong>{product.warrantyInformation}</p>
        <h4>Customer Reviews:</h4>
        {product.reviews && product.reviews.length > 0 ? (
          <ul>
            {product.reviews.map((review, index) => (
              <li key={index}>
                <strong>{review.user}:</strong> {review.comment} ({renderStars(review.rating)})
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews available for this product.</p>
        )}
        <div className='purchaseproduct'>
          <button onClick={handleBuyNow}>Buy Now</button>
          <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>        
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;

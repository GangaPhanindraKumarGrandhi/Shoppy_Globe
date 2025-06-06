import React from 'react';
//import { useSelector } from 'react-redux';
import  { useEffect, useState } from 'react';
import CartItem from './CartItem';
import useFetchProducts from '../hooks/useFetchProducts';
import axios from 'axios';
const Cart = () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDFmYmFlYTM2N2NhMDQ0NmU1OWVmNyIsImlhdCI6MTc0OTE4MDMyNSwiZXhwIjoxNzQ5MjY2NzI1fQ.1rVho9vVdMqnt8FNfn8S9Y1hCtkITPEivCvH2W3DttM"
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { products, error: productError } = useFetchProducts();
    const fetchCartItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/cart', {
          headers: {
          Authorization: `Bearer ${token}`,
           },
        });
      setCartItems(res.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
     };
      useEffect(() => {
      fetchCartItems();
      }, []);
      const handleRemove = async (id) => {
     try {
        await axios.delete(`http://localhost:5000/cart/${id}`, {
        headers: {
        Authorization: `Bearer ${token}`
        }
        });
      fetchCartItems(); // Refresh UI with updated cart
      } catch (err) {
      console.error('Failed to remove item:', err);
      }
      };
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  if (loading || !products.length) return <p>Loading cart...</p>;
  if (productError) return <p>Error loading product data</p>;
  const cartWithFullData = cartItems.map(item => {
    const fullProduct = products.find(p => p._id === item.productId);
    return {
      ...item,
      fullProduct: fullProduct || {}, 
    };
  });
  // Calculate total bill using full product price if available, else fallback to item.price
  const total = cartWithFullData.reduce(
    (acc, item) => acc + ((item.fullProduct.price ?? item.price) * item.quantity),
    0
    );
  return (
    <div className='cart'>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartWithFullData.map(item => (
            <CartItem
              key={item._id}
              item={item}
              fullProduct={item.fullProduct}
              onQuantityChange={handleQuantityChange} // ✅ Pass as prop
              onRemove={handleRemove}
            />
          ))}
          <h3>Total Bill: ₹{total}</h3>
        </>
      )}
    </div>
  );
};
export default Cart;
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
// Displays a form to collect shipping details from the user
const Checkout = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    district: '',
    hometown: '',
    houseno: '',
    contact: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleOrder = () => {
    const { name, state, district, hometown, houseno, contact } = formData;
    if (name && state && district && hometown && houseno && contact) {
      cart.forEach(item => dispatch(removeFromCart(item.id)));
      setOrderPlaced(true);
    } else {
      alert('Please fill all required fields.');
    }
  };
  if (orderPlaced) {
    return <h2>Thank you! Your order has been placed successfully.</h2>;
  }
// Clears cart after successful order
  return (
    <div className='checkoutTotal'>
        <div className='checkoutData'>
      <h2>Checkout</h2>
      <h3>Order Summary</h3>
      {cart.length === 0 ? <p>No items in cart.</p> : (
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.title} x {item.quantity} = ₹{item.price * item.quantity}
            </li>
          ))}
        </ul>
      )}
      <h4>Total: ₹{total}</h4>
      <h3>Shipping Details</h3>
      </div>
      <div className='inputcheck'>
        <div className='checkoutInput'> 
        <label htmlFor="name">Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} /><br />
        <label htmlFor="state">State:</label>
        <input name="state" value={formData.state} onChange={handleChange} /><br />
        <label htmlFor="district">District:</label>
        <input name="district" value={formData.district} onChange={handleChange} /><br />
        <label htmlFor="hometown">Home Town:</label>
        <input name="hometown" value={formData.hometown} onChange={handleChange} /><br />
        <label  htmlFor="houseno">House No:</label>
        <input name="houseno" value={formData.houseno} onChange={handleChange} /><br />
        <label htmlFor="contact">Contact:</label>
        <input name="contact" value={formData.contact} onChange={handleChange} /><br />
        <button onClick={handleOrder}>Place Order</button>
        </div>
      </div>
      </div>
  );
};
export default Checkout;

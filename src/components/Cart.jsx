import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
//It shows the number of items in the cart along with product details and the total bill.
const Cart = () => {
  const cart = useSelector(state => state.cart);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // Calculates total bill for all items
  return (
    <div className='cart'>
      <h2>Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty</p> : (
        <>
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
          <h3>Total Bill: ₹{total}</h3>
        </>
      )}
    </div>
  );
};
export default Cart;

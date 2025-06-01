import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Displays navigation links and cart icon
const Header = () => {
  const cart = useSelector(state => state.cart);
  const uniqueItemsCount = cart.length;
  return (
    <header className="header">
      <h2>Shoppy Globe</h2>
      <nav className="nav">
        <Link to="/" >Home</Link>
        <div>
          <Link to="/cart" className="cart-link">
          <span>Cart</span>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png" 
            alt="cart" 
            className="cart-icon" 
          />
          {uniqueItemsCount > 0 && (
            <span className="cart-badge">
              {uniqueItemsCount}
            </span>
          )}
        </Link>
        </div>
        <Link to="/checkout" >Checkout</Link>
      </nav>
    </header>
  );
};
export default Header;

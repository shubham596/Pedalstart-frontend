import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';


const Navbar = () => {

  const authState = useSelector(state => state.authReducer);

  const dispatch = useDispatch();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <header className="navbar">
      <h2 className="navbar-brand">
        <Link to="/"> Home </Link>
      </h2>
      <ul className="navbar-menu">
        {authState.isLoggedIn ? (
          <>
         
            <li className='logoutbtn' onClick={handleLogoutClick}>
              Logout
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
      <span className="navbar-toggle" onClick={toggleNavbar}>
        <i className="fa-solid fa-bars"></i>
      </span>
      <div className={`navbar-sidebar ${isNavbarOpen ? 'open' : 'closed'}`}>
        <div className="navbar-close">
          <span onClick={toggleNavbar}>
            <i className="fa-solid fa-xmark"></i>
          </span>
        </div>
        <ul className="navbar-sidebar-menu">
          {authState.isLoggedIn ? (
            <>
            
              <li onClick={handleLogoutClick}>
                Logout
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;

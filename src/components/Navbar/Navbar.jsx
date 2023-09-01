import React from 'react';
import { Link } from 'react-router-dom'; 
import Navbarcss from './Navbar.module.css';
import LoginButton from '../LoginButton/LoginButton';
import SignupButton from '../SignupButton/SignupButton';
import { useSelector } from 'react-redux';
import SignoutButton from '../SignoutButton/SignoutButton';
import ProfileButton from '../ProfileButton/ProfileButton';

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const searchClassName = isAuthenticated
    ? `${Navbarcss.search} ${Navbarcss['authenticated-search']}`
    : Navbarcss.search;

  return (
    <div className={Navbarcss.navbar}>
      <div className={Navbarcss.logo}>
        <Link to="/" className={Navbarcss['logo-link']}>
          <div className={Navbarcss['logo-text']}>opinion</div>
        </Link>
      </div>
      <div className={searchClassName}>
        <input type="text" placeholder="Search..." />
      </div>
      <div className={Navbarcss['auth-buttons']}>
        {
          isAuthenticated ?
            <>
              <ProfileButton />
              <SignoutButton />
            </>
             :
            <>
              <LoginButton />
              <SignupButton />
            </> 
        }
      </div>
    </div>
  );
}

export default Navbar;

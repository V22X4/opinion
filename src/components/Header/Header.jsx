import React from 'react'
import styles from'./Header.module.css';
import Navbar from '../Navbar/Navbar';

function Header() {
  return (
    <div className={styles['header-container']}>
      <Navbar/>
    </div>
  )
}

export default Header
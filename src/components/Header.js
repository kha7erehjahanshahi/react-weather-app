import React from 'react'
import styles from './Header.module.css'

function Header() {
  return (
    <div className={styles.header_container}>
      <h1 className={styles.header_title}>Weather App </h1>
      <img src='/react-weather-app/Images/app-logo.png' alt='app-logo' />
    </div>
  )
}

export default Header

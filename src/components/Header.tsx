import React from 'react'
import styles from './Header.module.css'
import { useAtom } from 'jotai'
import { showSidebarAtom } from '../utils/atoms'

function Header() {
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom)

  const handleClick = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className={styles.header_container}>
      <h1 className={styles.header_title}>Weather App </h1>
      <img src='/react-weather-app/Images/app-logo.png' alt='app-logo' />
      <button type="button" className={styles.menu_button} onClick={handleClick}>
        <img src='/react-weather-app/Images/menu.png' alt='menu' />
      </button>
    </div>
  )
}

export default Header

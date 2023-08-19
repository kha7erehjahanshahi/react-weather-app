import React from 'react'
import './Header.css'

function Header() {
  return (
    <div className='header-container'>
        <h1 className='header-title'>Weather App </h1>
        <img src='/Images/app-logo.png' alt='app-logo'/>
    </div>
  )
}

export default Header
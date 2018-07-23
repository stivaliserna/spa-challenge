import React from 'react'

import marvelLogo from '../img/MarvelLogo.svg'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <img src={marvelLogo} alt='marvel-logo' />
    </div>
  )
}

export default Header

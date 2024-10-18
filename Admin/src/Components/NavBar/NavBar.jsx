import React from 'react'
import './NavBar.css'
import {assets} from '../../assets/assets'

const NavBar = () => {
  return (
    <div className='navBar'>
      <img className='logo' src={assets.logo} alt="logo " />
      <img className='profile' src={assets.profile_image} alt="profile" />
    </div>
  )
}

export default NavBar
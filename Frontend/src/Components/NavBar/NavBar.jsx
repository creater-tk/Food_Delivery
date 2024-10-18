import React, { useContext } from 'react'
import './NavBar.css'
import {assets} from '../../assets/assets'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'


const NavBar = ({setShowLogin}) => {


  const [state, setState] = useState('home');

  const {getTotalCartAmount, token, setToken} = useContext(StoreContext)

  const changeStyle = (props) =>{
    setState(props)
  } 

  const navigate = useNavigate();

  const logout = () =>{
    localStorage.removeItem('token');
    setToken('');

    navigate('/')
  }

  return (
    <div className='NavBar'>
      <Link to='/'>
        <img src={assets.logo} alt="logo" className="logo-img" />
      </Link>

      <ul className='selector'>
        <Link to='/' className={state === 'home'?'active':''} onClick={() => {changeStyle('home')}}>Home</Link>
        <a href='#explore-menu' className={state === 'menu'?'active':''} onClick={() => {changeStyle('menu')}}>Menu</a>
        <a href='#app-download' className={state === 'mobile'?'active':''}  onClick={() => {changeStyle('mobile')}}>Mobile-app</a>
        <a href='#footer' className={state === 'contact'?'active':''} onClick={() => {changeStyle('contact')}}>Contact us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="search icon" />
        <Link to='/cart'>
          <div className="navbar-search-icon">
            <img className='cart-img' src={assets.basket_icon} alt="basket icon" />
            <div className="dot">*</div>
          </div>
        </Link>
        {!token? <button className='signIn-btn' onClick={()=>setShowLogin(true)}>Sign In</button>:
        <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="prifile" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')} className='sub-fields'>
                <img src={assets.bag_icon} alt="bag" />
                <p>Order</p>
              </li>
              <hr />
              <li className='sub-fields' onClick={logout}>
                <img src={assets.logout_icon} alt="logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>}
      </div>
    </div>
  )
}

export default NavBar
import React from 'react'
import './SideBar.css'
import { assets } from '../../assets/assets'
import {NavLink} from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/Add items' className="sidebar-option active">
          <img src={assets.add_icon} alt="add" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to='/List Items' className="sidebar-option active">
            <img src={assets.order_icon} alt="order" />
            <p>List Items</p>
        </NavLink>

        <NavLink to='/order items' className="sidebar-option active">
            <img src={assets.order_icon} alt="add" />
            <p>orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default SideBar
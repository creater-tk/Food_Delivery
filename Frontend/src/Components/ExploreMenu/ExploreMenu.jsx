import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Chooose from a diverse menu feturing a delectable array 
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div onClick={()=>setCategory(prev=> prev===item.menu_name?"all": item.menu_name)} key={index} className='explore-menu-list-item'>
              <img className={category === item.menu_name ? 'active-1':''} src={item.menu_image} alt="menu Item" />
              <p className={`${category === item.menu_name ? 'active':''} category`}>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
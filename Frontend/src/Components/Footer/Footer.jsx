import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="logo" />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id voluptatem obcaecati eum velit libero consequuntur accusantium alias, repellat illum eius magni adipisci animi. Ducimus expedita eius reiciendis facilis aut ipsum?</p>
            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="facebook" />
              <img src={assets.twitter_icon} alt="twitter" />
              <img src={assets.linkedin_icon} alt="linkedin" />
            </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
            <h2>Get In Touch</h2>
            <ul>
              <li>+1-232-322-8899-</li>
              <li>Contact@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024@ Tomato.com - All rights reserved.
      </p>
    </div>
  )
}

export default Footer
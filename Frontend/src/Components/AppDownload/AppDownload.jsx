import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For better Experience Download <br /> Tomatot app</p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="play Store" />
        <img src={assets.app_store} alt="app Store" />
      </div>
      <hr />
    </div>
  )
}

export default AppDownload
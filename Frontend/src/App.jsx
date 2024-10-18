import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import './App.css'
import Footer from './Components/Footer/Footer'
import { useState } from 'react'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import Verify from './Pages/Verify/Verify'
import MyOrders from './Pages/MyOrders/MyOrders'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
      <>
        {showLogin? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
          <div className='app'>
            <NavBar setShowLogin = {setShowLogin}/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/order' element={<PlaceOrder/>} />
              <Route path='/verify' element={<Verify/>}/>
              <Route path='/myorders' element={<MyOrders/>}/>
            </Routes>
          </div>
          <Footer/>
      </>
  )
}

export default App
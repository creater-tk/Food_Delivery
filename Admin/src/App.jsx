import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import SideBar from './Components/sideBar/sideBar'
import {Routes, Route} from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Order from './pages/Orders/Order.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const url = 'http://localhost:3000';

  return (
    <div>
      <ToastContainer/>
      <NavBar/>
      <hr />
      <div className="app-content">
        <SideBar/>
        <Routes>
            <Route path='/Add Items' element={<Add url={url}/>}/>
            <Route path='/List Items' element={<List url={url}/>}/>
            <Route path='/order Items' element={<Order url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
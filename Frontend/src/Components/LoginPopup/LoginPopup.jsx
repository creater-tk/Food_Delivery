import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import {StoreContext} from '../../Context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {

  const {url, setToken} = useContext(StoreContext)

  const [currentState, setCurrentState] = useState("Sign up")

  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setData(data=>({...data, [name]:value}))
  }


  const onLogin = async (e) =>{
    e.preventDefault();

    let newUrl = url;
    if(currentState === "Login"){
      newUrl += '/api/user/login'
    }else{
      newUrl += '/api/user/register'
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login/register:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">

        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="cross icon" className='cross'/>
        </div>

        <div className="login-popup-input">
          {currentState==="Login"? <></>: 
          <input type="text" placeholder='Your name' required onChange={onChangeHandler} name='name' value={data.name}/>}

          <input type="email" placeholder='Your email' required name='email' value={data.email} onChange={onChangeHandler} />

          <input type="password" placeholder='password' required name='password' value={data.password} onChange={onChangeHandler}/>
        </div>

        <button type='submit' className='btn'>{currentState==="Sign up"?"Create Account": "Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required id='condition' />
          <label htmlFor='condition'>By continuing, I agree to the terms of use privacy policy.</label>
        </div>

        { currentState === "Login"? <p>Create a new account? <span onClick={()=>setCurrentState("Sign up")}>Click here</span></p>
        : <p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>}

      </form>
    </div>
  )
}

export default LoginPopup
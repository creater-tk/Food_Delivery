import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const PlaceOrder = () => {

  const {cartTotal,token, food_list, cartItems, url} = useContext(StoreContext);

  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]: value}))
    
  }

  const placeOrder = async (event) => {
    event.preventDefault();
  
    try {
      let orderItems = [];
  
      // Use forEach for side effects instead of map
      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = { ...item, quantity: cartItems[item._id] };
          orderItems.push(itemInfo);
        }
      });
  
      let orderData = {
        address: data,
        items: orderItems,
        amount: cartTotal() + 2, // Ensure cartTotal() returns a number
      };
      
  
      let response = await axios.post(url+'/api/order/place', orderData, {headers:{token}});
  
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log("Error:", error.message);
      alert("Error: " + error.message);
    }
  };
  
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }else if(cartTotal()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First name' name='firstName' onChange={onChangeHandler} value={data.firstName} required/>
          <input type="text" placeholder='Last name' name='lastName' onChange={onChangeHandler} value={data.lastName} />
        </div>
        <input type="email" placeholder='Email address' name='email' onChange={onChangeHandler} value={data.email} required/>
        <input type="text" placeholder='Street' name='street' onChange={onChangeHandler} value={data.street} required/>
        <div className="multi-fields">
          <input type="text" placeholder='city' name='city' onChange={onChangeHandler} value={data.name} required/>
          <input type="text" placeholder='state' name='state' onChange={onChangeHandler} value={data.state} required/>
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip code' name='zipCode' onChange={onChangeHandler} value={data.zipCode} required/>
          <input type="text" placeholder='Country' name='country' onChange={onChangeHandler} value={data.country} required/>
        </div>
        <input type="text" placeholder='Phone' name='phone' onChange={onChangeHandler} value={data.phone} required/>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${cartTotal()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Delivery fee</b>
                <p>${cartTotal() === 0? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>TOTAL AMOUNT</b>
                <p>${cartTotal()===0? 0 : cartTotal()+2}</p>
              </div>
            </div>
          <button type='submit' className='checkout-btn button' >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
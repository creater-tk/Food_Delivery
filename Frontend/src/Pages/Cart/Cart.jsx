import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItems, food_list, removeFromCart, cartTotal} = useContext(StoreContext);

  const Navigation = useNavigate()

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index)=>{
          if(cartItems[item._id]>0){
            const image = `http://localhost:3000/images/${item.image}`; 
            return(
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={image} alt={item.image} />
                  
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price*cartItems[item._id]}</p>
                  <p className='cross' onClick={()=>removeFromCart(item._id)}>X</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
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
          <button className='checkout-btn button' onClick={()=>Navigation('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promocode' />
              <button className='submit-btn button'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
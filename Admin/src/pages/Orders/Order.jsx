import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import './Order.css';

const Order = ({url}) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
  
    try {
      // Ensure the API endpoint and HTTP method match what your backend expects
      const response = await axios.post(`http://localhost:3000/api/order/status`, {
        orderId,
        status: newStatus
      });
  
      if (response.data.success) {
        // Optionally, update the state locally instead of refetching all orders
        await fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating status");
    }
  };
  

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="parcel" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, idx) => (
                    `${item.name} X ${item.quantity}${idx < order.items.length - 1 ? ', ' : ''}`
                  ))}
                </p>
                <p className="order-item-name">
                  {order.address.firstName+' '+order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street+","}</p>
                  <p>{order.address.state+', '+order.address.country+', '+order.address.zipCode}</p>
                </div>
                <p className="order-item-phone">
                  {order.address.phone}
                </p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select 
                onChange={(event) => statusHandler(event, order._id)} 
                value={order.status || 'Food processing'} // Fallback to default if status is undefined
              >
                <option value="Food processing">Food processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Order;

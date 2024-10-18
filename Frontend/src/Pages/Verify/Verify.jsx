import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { StoreContext } from '../../Context/StoreContext.jsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className='verify'>
      <div className='Spinner'></div>
      <p>Loading...</p>
    </div>
  );
};

export default Verify;

import React, { useState, useEffect } from "react";
import { apiCall } from "../service/apiService";
import { emCheck } from '../auth/logincheck';

function OrderDetailsPopup({ order, onClose }) {
  return (
      <div className="orderpopup-overlay">
    <div className="order-details-popup">

      <h2>Order Details</h2>
      <p>Order Number: {order.merchantUid}</p>
      <p>Email: {order.buyerEmail}</p>
      <p>Paid At: {new Date(order.paidAt).toLocaleString()}</p> {/* 시간을 보기 좋게 포맷팅 */}
      <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default function FindOrderNum() { // 함수명 수정: camelCase 규칙을 따르도록 수정
  const [ecertificationcode, setEcertificationcode] = useState('');
  const [mailcode, setMailcode] = useState('');
  const [inputemail, setInputemail] = useState('');
  const [ecertificationcheck, setEcertificationcheck] = useState(1);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailConfirmClicked, setIsEmailConfirmClicked] = useState(false);
  const [checkmerchantuid, Setcheckmerchantuid] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const certificationhandle = (e) => {
    setEcertificationcode(e.target.value);
  }

  const handleEmailChange = (e) => {
    setInputemail(e.target.value);
    setIsEmailValid(emCheck(e.target.value));
  }

  const mailConfirm = async () => {
    try {
      const response = await apiCall('/api/user/mailConfirm', "POST", { email: inputemail }, null);
      alert("Please check your certification code in your email.");
      setMailcode(response.data);
      setIsEmailConfirmClicked(true);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiCall(`/api/orderinfo/findByEmail?email=${inputemail}`, 'GET', null, null);
        const sortedOrders = response.data.sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));
        setOrders(sortedOrders.slice(0, 10));
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    if (isEmailConfirmClicked) {
      fetchOrders();
    }
  }, [inputemail, isEmailConfirmClicked]);

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleMailcodeCheck = () => {
    alert(`Ecertification Complete`);
    setEcertificationcheck(2);
  }

  useEffect(() => {
    let asynccheck = true;

    const checkEmailExistence = async () => {
      try {
        const response = await apiCall(`/api/orderdetail/emailcheck?emailinput=${inputemail}`, "GET", null, null);
        if (asynccheck) {
          setIsEmailValid(!response.data);
        }
      } catch (error) {
        console.error('Error occurred while checking email existence:', error);
        if (asynccheck) {
          setIsEmailValid(true);
        }
      }
    };

    checkEmailExistence();
    return () => {
      asynccheck = false;
    };
  }, [inputemail]);

  const emailToMerchantUid = async () => {
    try {
      const response = await apiCall(`/api/orderinfo/findByEmail?email=${inputemail}`, "GET", null, null);
      handleMailcodeCheck();
      Setcheckmerchantuid(response);
    } catch (error) {
      console.error('Error occurred while fetching orders by email:', error);
    }
  };

  const handleClosePopup = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      {ecertificationcheck === 1 ?
        <>
          <div>
            <h2 className='member-guide'>
              Certification Email
            </h2>
          </div>

          <div className='confirm-email'>
            Please proceed after sending <br />
            And checking email certification

            <br /><br />

            <input
              className='input-email'
              type="text"
              placeholder="Insert Email"
              maxLength="20"
              onChange={handleEmailChange}
              value={inputemail}
            />
            {!isEmailValid || !emCheck(inputemail) || inputemail.length === 0 || inputemail.length > 20 ? null :
              <button onClick={mailConfirm} className="mail-code-send"><i className="xi-send" /></button>
            }
          </div>
          {!isEmailValid && emCheck(inputemail) ?
            <div className="existed-email">
              Email already exists. If you are a member, please use MyPage
            </div>
            : null}
          <br></br>
          {isEmailConfirmClicked &&
            <>
              <input
                className="input-certification"
                type="text"
                placeholder="Certification Code"
                onChange={certificationhandle}
                maxLength={12}
              />

              {(ecertificationcode !== mailcode || ecertificationcode.length < 1) ? null :
                <button onClick={emailToMerchantUid} className="mail-code-send"><i className="xi-send" /></button>
              }
            </>
          }
        </>

        : ecertificationcheck === 2 ?
          <>
            <div>
              <h2 className='member-guide'>
                Here's your Order Number
              </h2>
              <h3>For non-members, only 10 recent orders will be printed</h3>
              <div>
                <ul>
                  {orders.map((order, index) => (
                    <li key={index}>
                      <span>Order Number: {order.merchantUid}</span>
                      <button onClick={() => showOrderDetails(order)}>View Details</button>
                    </li>
                  ))}
                </ul>
                {selectedOrder && (
                  <OrderDetailsPopup order={selectedOrder} onClose={handleClosePopup} />
                )}
              </div>
            </div>

          </>

          : null}
    </>
  );
}

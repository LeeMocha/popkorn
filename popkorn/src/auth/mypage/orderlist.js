import { useState, useEffect } from 'react';
import './orderlist.css';
import axios from 'axios';

const imageSrc = process.env.PUBLIC_URL + "/productIMG/";

const OrderItem = ({ order, onClick }) => {
  return (
    <div className='orderlistcontainer'>
      <div className='orderlist1st'>
        <div className='orderdetaildate'>Order date : {new Date(order.paidAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</div>
        <div className='orderdetailcheck' onClick={() => onClick(order)}>Order detail</div>
      </div>
      <div className='orderlist2nd'>
        Buyer name: {order.buyerName} <br />
        Address: {order.buyerAddr} <br />
        Phone: {order.buyerTel} <br />
      </div>
      <div className='orderbtn'>
        <button className='refundbtn'>Refund</button>
        <button className='inquirementbtn'>Inquirement</button>
        <div className='ordertotalprice'>
          Total amount : {order.paidAmount} ₩
        </div>
      </div>
    </div>
  );
};


export const OrderList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    axios.get(`/api/pay/orders?status=paid`)
      .then(response => {
        const sortedOrders = response.data.sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));
        setOrders(sortedOrders);
      })
      .catch(err => console.log(err));
  }, []);

  const popupClick = (order) => {
    if (order) {
      axios.get(`/api/orderdetail/orderlist?merchantUid=${order.merchantUid}`)
        .then(response => {
          setOrderDetails(response.data);
          setSelectedOrder(order);
          setShowPopup(true);
        }).catch(err => console.log(err));
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setOrderDetails([]);
    setSelectedOrder(null);
  };

  return (
    <div className="orderlistwhole">
      <div className="account-header">
        My Order List
      </div>
      {orders.map((order, index) => (
        <OrderItem key={index} order={order} onClick={popupClick} />
      ))}
      {showPopup && selectedOrder && (
        <div className="orderpopup-overlay">
          <div className='orderdetailscontainer'>
            <div className='orderlist1st'>
              <div className='orderdetaildate'>Order date : <br />{new Date(selectedOrder.paidAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</div>
              <div className='orderdetailpcode'>Order number : {selectedOrder.merchantUid}</div>
            </div>
            {orderDetails.map((orderDetail, index) => (
              <div className='orderdetailproductinfo' key={index}>
                <div className='orderdetailinfo'>
                  <div className='orderdetailimg'><img src={imageSrc + orderDetail.image1} alt="product" /></div>
                  <div className='productmapvalue'>
                    <div className='orderdetailpname'>{orderDetail.productname}</div>
                    <div className='orderdetailalternative'>{orderDetail.alternative}</div>
                    <div className='orderdetailcount'>{orderDetail.detailcount} EA / {orderDetail.price}￦</div>
                  </div>
                </div>
              </div>
            ))}
            <div className='orderlist3rd'>
              <div className='ordertotalprice'>
                Total amount : {orderDetails.reduce((total, orderDetail) => total + (orderDetail.price * orderDetail.detailcount), 0)} ₩
              </div>
            </div>
            <button className="popup-close-btn" onClick={closePopup}>X</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default OrderList;

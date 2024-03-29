import { useState, useEffect } from 'react';
import './orderlist.css';
import axios from 'axios';


export const OrderList = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [orders, setOrders] = useState([]);

  const total = orders.reduce((sum, order) => sum + order.price, 0);

  useEffect(() => {
    axios.get(`/api/pay/orders?status=paid`)
      .then(response => {
        setOrders(response.data);
        console.log(response)
      }).catch(err => console.log(err))
  }, []);


  const popupclick = () => {
    setShowPopup(true);
  };

  return (

    <>
  <div className="orderlistwhole">
    <div className="account-header">
      My Order List
    </div>
    {orders.length === 0 ? (
      <div>No Order Detail</div>
    ) : (
      <>
        {orders.map((order, index) => (
          <div className='orderlistcontainer' key={index}>
            <div className='orderlist1st'>
              <div className='orderdetaildate'>주문 일자 : {order.paid_at}</div>
              <div className='orderdetailcheck' onClick={() => popupclick(order)}>주문 상세 보기</div>
            </div>

            <div className='orderlist2nd'>
              <div className='orderdetailimg'>일단 사진 들어가는곳</div>

              <div className='orderdetailproductinfo'>
                <div>{order.productname}</div>
                <div>{order.alternative}</div>
                <div>{order.detailcount}</div>
                <div>{order.price}￦</div>
              </div>
            </div>
            <button className='orderdetailreturnrequest'>반품 요청</button>
            <button className='orderdetailservice'>고객 문의</button>
          </div>
        ))}
      </>
    )}

    {showPopup && (

      <div className="orderpopup-overlay">
        <div className='orderdetailscontainer'>
          <div className='orderlist1st'>
            <div className='orderdetaildate'>주문 일자 : {order.paid_at} </div>
            <div className='orderdetailpcode'>주문번호 : {order.merchant_uid}</div>
          </div>
          <div className='orderlist2nd'>
            <div className='orderdetailimg'>일단 사진 들어가는곳</div>
            <div className='orderdetailproductinfo'>
              {order.products.map((product, index) => (
                <div key={index}>
                  {product.name}<br />
                  {product.price}&#36;
                </div>
              ))}
            </div>
          </div>
          <div className='orderdetailcustomerinfo'>
            주문자명 : {order.buyer_name} <br />
            주소지 : {order.buyer_addr} <br />
            전화번호 : {order.buyer_tel} <br />
          </div>
          <div className='orderlist3rd'>
            <div className='orderdetailprice'>
              총 결제금액 : {order.paid_amount}&#36;
            </div>
          </div>
          <button className="popup-close-btn" onClick={() => setShowPopup(false)}>X</button>
        </div>
      </div>
    )}
  </div>
</>


  );
};

export default OrderList;
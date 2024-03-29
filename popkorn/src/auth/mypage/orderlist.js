import { useState, useEffect } from 'react';
import './orderlist.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const OrderList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderdetails, setOrderdetails] = useState([]);

  const imageSrc = process.env.PUBLIC_URL + "/productIMG/";

  const total = orders.reduce((sum, order) => sum + order.price, 0);

  useEffect(() => {
    axios.get(`/api/pay/orders?status=paid`)
      .then(response => {
        const sortedOrders = response.data.sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt)); // 내림차순으로 정렬
        setOrders(sortedOrders);
      }).catch(err => console.log(err))
  }, []);

  useEffect(() => {
    if (orderdetails.length > 0) {
      axios.get(`/api/orderdetail/orderlist?merchantUid=${orderdetails[0].merchantUid}`)
        .then(response => {
          setOrderdetails(response.data);
          console.log(orderdetails);
        }).catch(err => console.log(err));
    }
  },[]);

  const popupclick = (order, ) => {
    setShowPopup(true);
    setOrderdetails([order]);
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
                  <div className='orderdetaildate'>주문 일자 : {new Date(order.paidAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</div>
                  <div className='orderdetailcheck' onClick={() => popupclick(order)}>주문 상세 보기</div>
                </div>
                <div className='orderlist2nd'>
                  <div className='orderdetailimg'><img src={imageSrc + orderdetails.image1} /></div>
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
      </div>

      {showPopup && (
        <div className="orderpopup-overlay">
          <div className='orderdetailscontainer'>
            <div className='orderlist1st'>
              <div className='orderdetaildate'>주문 일자 : <br />{new Date(orderdetails[0].paidAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</div>
              <div className='orderdetailpcode'>주문번호 : {orderdetails[0].merchantUid}</div>
            </div>
            <div className='orderlist2nd'>
              <div className='orderdetailimg'>일단 사진 들어가는곳</div>
              <div className='orderdetailproductinfo'>
                <div>
                  {orderdetails[0].productname}<br />
                  {orderdetails[0].price}
                </div>
              </div>
            </div>
            <div className='orderdetailcustomerinfo'>
              <div>
                주문자명 : {orderdetails[0].buyerName} <br />
                주소지 : {orderdetails[0].buyerAddr} <br />
                전화번호 : {orderdetails[0].buyerTel} <br />
              </div>
            </div>
            <div className='orderlist3rd'>
              <div className='orderdetailprice'>
                총 결제금액 : {orderdetails[0].paidAmount} ₩
              </div>
            </div>
            <button className="popup-close-btn" onClick={() => setShowPopup(false)}>X</button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;

import { useState } from 'react';
import './orderlist.css';

export const OrderList = () => {

  const orders = [
    { id: 1, product: 'Product A', price: 10},
    { id: 2, product: 'Product B', price: 30},
  ];
  const total = orders.reduce((sum, order) => sum + order.price, 0);
  const [showPopup, setShowPopup] = useState(false);

  const handleTermsClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="orderlistwhole">
      <div className="account-header">
        My Order List
      </div>


      <div className='orderlistcontainer'>
        <div className='orderlist1st'>
          <div className='orderdetaildate'>주문 일자 : 2024-03-27</div>
          <div className='orderdetailcheck' onClick={handleTermsClick}>주문 상세 보기</div>
        </div>
        <div className='orderlist2nd'>
          <div className='orderdetailimg'>일단 사진 들어가는곳</div>
          <div className='orderdetailproductinfo'>
            {orders.map(order => (
              <div key={order.id}>
                {order.product}<br/>
                {order.price}&#36;
              </div>
            ))}
          </div>
        </div>
        <button className='orderdetailreturnrequest'>반품 요청</button>
        <button className='orderdetailservice'>고객 문의</button>
      </div>

      {showPopup && (
        <div className="orderpopup-overlay">
          <div className='orderdetailscontainer'>
            <div className='orderlist1st'>
              <div className='orderdetaildate'>주문 일자 : 2024-03-27</div>
              <div className='orderdetailpcode'>주문번호 : 123456123</div>
            </div>
            <div className='orderlist2nd'>
              <div className='orderdetailimg'>일단 사진 들어가는곳</div>
              <div className='orderdetailproductinfo'>
                {orders.map(order => (
                  <div key={order.id}>
                    {order.product}<br/>
                    {order.price}&#36;
                  </div>
                ))}
              </div>
            </div>
            <div className='orderdetailcustomerinfo'>
              주문자명 : <br />
              주소지 : <br />
              전화번호 : <br />

            </div>
            <div className='orderlist3rd'>
              <div className='orderdetailprice'>
                총 결제금액 : 
                  {total}&#36;
              </div>
            </div>
            <button className="popup-close-btn" onClick={() => setShowPopup(false)}>X</button>
          </div>
        </div>
      )}
    </div>

  );
};

export default OrderList;
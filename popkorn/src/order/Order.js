import Orderproduct from './Orderproduct/Orderproduct';
import Header from '../header/Header';

import './Order.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Order() {

    const paymentsbtnSrc = process.env.PUBLIC_URL + "/paymentsbtnIMG/";
    const Location = useLocation();
    const items = Location.state.items; // Object Type으로 전달 받음.

    useEffect(() => {
        const preventRefresh = (event) => {
            event.preventDefault();
            event.returnValue = '';
        };
        window.addEventListener('beforeunload', preventRefresh);
        return () => {
            window.removeEventListener('beforeunload', preventRefresh);
        };
    }, []);

    const onClickPayment = () => {
        if (!window.IMP) return;
        /* 1. 가맹점 식별하기 */
        const { IMP } = window;
        IMP.init("imp71862281"); // 가맹점 식별코드

        /* 2. 결제 데이터 정의하기 */
        const data = {
            pg: "kakaopay", // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
            pay_method: "card", // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
            amount: 1000, // 결제금액
            name: "아임포트 결제 데이터 분석", // 주문명
            buyer_name: "홍길동", // 구매자 이름
            buyer_tel: "01012341234", // 구매자 전화번호
            buyer_email: "example@example.com", // 구매자 이메일
            buyer_addr: "신사동 661-16", // 구매자 주소
            buyer_postcode: "06018", // 구매자 우편번호
        };

        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
    };

    function callback(response) {
        const { success, error_msg, imp_uid } = response;
        if (success) {
            alert("결제 성공");
            sendImpUidToServer(imp_uid);
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    }

    function sendImpUidToServer(imp_uid) {
        fetch(`/api/pay/kakaopay/${imp_uid}`, {
            method: 'GET',
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <Header />
            <div className='orderBox'>
                <h1 style={{ color: ' #b2ecfd' }}>Oder</h1>
                <div className='orderWindow'>
                    <div>
                        <h3>Shipping Address</h3>
                        <div className="shippingAddressBox">
                            <p>Country/Region</p>
                            <select value='country' >
                                <option value=''>Country Selection</option>
                                <option value='South Korea'>South Korea</option>
                                <option value='United States'>United States</option>
                                <option value='Japan'>Japan</option>
                                <option value=''></option>
                                <option value=''></option>
                            </select>
                            <p>City</p>
                            <input type="text" ></input>
                            <p>Address1</p>
                            <input type="text"></input>
                            <p>Address2</p>
                            <input type="text"></input>
                            <p>Zip code</p>
                            <input type="text"></input>
                        </div>
                    </div>
                    <div className='OrderInformationMain'>
                        <h3>Order Information</h3>
                        <div className="orderInformationbox">
                            <p>Full Name</p>
                            <input type="text"></input>
                            <p>Email</p>
                            <input type="text"></input>
                            <p>Phone</p>
                            <input type="text"></input>
                            <p>Use Reword</p>
                            <input type="checkbox"></input>
                        </div >
                        <h3>PaymentMethod</h3>
                        <div className="paymentMethodMain">
                            <button type='button' onClick={onClickPayment}><img src={paymentsbtnSrc + "kakaopay.png"} alt="kakaopay.png" className='kakaopay' /></button>
                        </div>
                    </div>
                </div>
                <Orderproduct items={items} />
            </div>
        </>
    );
}
import Orderproduct from './Orderproduct/Orderproduct';

import './Order.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Logincontext } from './../App';

export default function Order() {

    const paymentsbtnSrc = process.env.PUBLIC_URL + "/paymentsbtnIMG/";
    const Location = useLocation();
    const items = Location.state.items; // Object Type으로 전달 받음.
    const [isLogined] = useContext(Logincontext);
    const [data, setData] = useState({
        merchant_uid: '',
        buyer_name: '',
        buyer_email: '',
        buyer_postcode: 0,
        buyer_tel: '',
        paid_amount: 0,
        country: '',
        city: '',
        address1: '',
        address2: '',
        buyer_addr: ``
    });

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

    const onClickPayment = (data) => {

        if (!data.buyer_name || !data.buyer_tel || !data.buyer_email || !data.address1 || !data.city || !data.country || !data.buyer_postcode) {
            alert("모든 필수 항목을 입력해주세요.");
            return;
        }

        if (!window.IMP) return;
        /* 1. 가맹점 식별하기 */
        const { IMP } = window;
        IMP.init("imp71862281"); // 가맹점 식별코드

        /* 2. 결제 데이터 정의하기 */
        const toImpData = {
            pg: "html5_inicis.INIpayTest", // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
            pay_method: "card", // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
            amount: 100, // 결제금액
            name: "아임포트 결제 데이터 분석", // 주문명
            buyer_name: data.buyer_name, // 구매자 이름
            buyer_tel: data.buyer_tel, // 구매자 전화번호
            buyer_email: data.buyer_email, // 구매자 이메일
            buyer_addr: `${data.address2} ${data.address1} ${data.city} ${data.country}`, // 구매자 주소
            buyer_postcode: data.buyer_postcode, // 구매자 우편번호
        };

        /* 4. 결제 창 호출하기 */
        IMP.request_pay(toImpData, callback);
    };

    function callback(response) {
        const { success, error_msg, imp_uid } = response;
        if (success) {
            alert("결제 성공");
            console.log(response)
            sendImpUidToServer(imp_uid);
            sendDataToServer(data)
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    }


    function sendImpUidToServer(imp_uid) {
        fetch(`/api/pay/datatoserver/${imp_uid}`, {
            method: 'GET',
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
    const sendDataToServer = (data) => {
        console.log(data)
    }

    const setDataHandler = useCallback((e) => {
        data[e.target.name] = e.target.value;
        setData({ ...data });
    }, [data])

    return (
        <div className='orderBox'>
            <h1 style={{ color: ' #b2ecfd' }}>Oder</h1>
            <div className='orderWindow'>
                <div>
                    <h3>Shipping Address</h3>
                    <div className="shippingAddressBox">
                        <p>Country/Region</p>
                        <select value='country' name='country' onChange={setDataHandler}>
                            <option value=''>Country Selection</option>
                            <option value='South Korea'>South Korea</option>
                            <option value='United States'>United States</option>
                            <option value='Japan'>Japan</option>
                        </select>
                        <p>City</p>
                        <input type="text" name='city' onChange={setDataHandler}></input>
                        <p>Address1</p>
                        <input type="text" name='address1' onChange={setDataHandler}></input>
                        <p>Address2</p>
                        <input type="text" name='address2' onChange={setDataHandler}></input>
                        <p>Zip code</p>
                        <input type="text" name='buyer_postcode' onChange={setDataHandler}></input>
                    </div>
                </div>
                <div className='OrderInformationMain'>
                    <h3>Order Information</h3>
                    <div className="orderInformationbox">
                        <p>Full Name</p>
                        <input type="text" name='buyer_name' onChange={setDataHandler}></input>
                        <p>Email</p>
                        <input type="text" name='buyer_email' onChange={setDataHandler}></input>
                        <p>Phone</p>
                        <input type="text" name='buyer_tel' onChange={setDataHandler}></input>
                        <p>Use Reword</p>
                        <input type="checkbox" name='rewordcheck'></input>
                    </div >
                    <h3>PaymentMethod</h3>
                    <div className="paymentMethodMain">
                        <button type='button' onClick={() => onClickPayment(data)}><img src={paymentsbtnSrc + "kakaopay.png"} alt="kakaopay.png" className='kakaopay' /></button>
                    </div>
                </div>
            </div>
            <Orderproduct items={items} />
        </div>
    );
}
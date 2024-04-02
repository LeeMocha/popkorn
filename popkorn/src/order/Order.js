import Orderproduct from './Orderproduct/Orderproduct';
import Header from '../header/Header';

import './Order.css';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderComplete from '../order/OrderComplete';

import PopkornBtn from '../useModules/PopkornBtn';
import { apiCall } from '../service/apiService';

export default function Order() {

    const Location = useLocation();
    const items = Location.state.items; // Object Type으로 전달 받음.
    const navigate = useNavigate();
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
            alert("모든 배송정보, 결제정보를 입력해주세요.");
            return;
        }

        apiCall(`/api/product/checkDetailCount`, "POST", items, null)
            .then(response => {
                if (response.data) {
                    if (!window.IMP) return;
                    /* 1. 가맹점 식별하기 */
                    const { IMP } = window;
                    IMP.init("imp71862281"); // 가맹점 식별코드

                    /* 2. 결제 데이터 정의하기 */
                    const toImpData = {
                        pg: "html5_inicis.INIpayTest", // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
                        pay_method: "card", // 결제수단
                        merchant_uid: `pop_${new Date().getTime()}`, // 주문번호
                        amount: 100, // 결제금액
                        buyer_name: data.buyer_name, // 구매자 이름
                        buyer_tel: data.buyer_tel, // 구매자 전화번호
                        buyer_email: data.buyer_email, // 구매자 이메일
                        buyer_addr: `${data.address2} ${data.address1} ${data.city} ${data.country}`, // 구매자 주소
                        buyer_postcode: data.buyer_postcode, // 구매자 우편번호
                    };

                    /* 4. 결제 창 호출하기 */
                    IMP.request_pay(toImpData, callback);

                    // 이 부분

                } else {
                    alert("Payment is not possible because the remaining items are less than the quantity you wish to purchase.")
                    return null;
                }
            })
            .catch(err => console.log(err))
    };

    function callback(response) {
        const { success, error_msg } = response;
        if (success) {
            try {
                items.map((item, i) => {
                    let newItem = { ...item };
                    delete newItem.ccode;
                    items[i] = { ...newItem, merchantUid: response.merchant_uid };
                })

                console.log(sendImpUidToServer(response.imp_uid, items, sessionStorage.getItem('loginID')))

            } catch (error) {
                alert("Order Failed !!");
                console.log(error)
                return null;
            }

        } else {
            alert(`Order Failed !! : ${error_msg}`);
        }
    }

    function sendImpUidToServer(imp_uid, items, id) {
        const request = {
            "imp_uid": imp_uid,
            "items": items,
            "id": id
        }
        apiCall(`/api/pay/datatoserver`, "POST", request)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                alert("Order Failed !!");
                console.log(error)
            });

    }

    const setDataHandler = useCallback((e) => {
        data[e.target.name] = e.target.value;
        setData({ ...data });
    }, [data])

    return (
        <>
            <Header />
            <div className='orderBox'>
                <h1 style={{ color: ' #7de4ff' }}>Oder</h1>
                <div className='orderWindow'>
                    <div>
                        <h3>Shipping Address</h3>
                        <div className="shippingAddressBox">
                            <p>Country/Region</p>
                            <select name='country' onChange={setDataHandler}>
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
                            <PopkornBtn btnName={"Order Now"} btntype={false} btnfun={() => onClickPayment(data)} />
                        </div>
                    </div>
                </div>
                <Orderproduct items={items} />
            </div>
        </>
    );
}
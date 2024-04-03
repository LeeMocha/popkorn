import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import PopkornBtn from '../useModules/PopkornBtn'
import './OrderComplete.css';
import { apiCall } from '../service/apiService';

export const OrderComplete = () => {
    const productimgSrc = process.env.PUBLIC_URL + "/productIMG/";
    const navigate = useNavigate();
    const Location = useLocation();
    const items = Location.state.items;
    const orderinfo = Location.state.response;
    const [randomString, setRandomString] = useState('');

    const completechek = () => {
        window.confirm('홈화면으로 돌아가시겠습니까?')
        navigate('/')
    }

    function generateRandomString() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }
        return randomString;
    }

    useEffect(() => {
        if (items && orderinfo?.merchant_uid) {
            const newRandomString = generateRandomString();
            setRandomString(newRandomString); // 상태 업데이트
            const request = {"id" : orderinfo.merchant_uid, "password" : newRandomString}
            apiCall(`/api/orderdetail/makeorderkey`, "POST" , request, null)
            .then(response => {
                console.log("주문키 생성");
                console.log(response);
                console.log(orderinfo.merchant_uid);
                console.log(newRandomString);
            })
            .catch(err => console.log(err));
        }
    }, [items, orderinfo]);

    return (
        <>
            <Header />
            <div className='completeMain'>
                <h1 style={{ color: ' #7de4ff' }}>Order complete</h1>
                <div className='completeBox'>
                    <h2><i className='xi-check-circle-o'></i> Your order is complete!</h2>
                    {items && (
                        <div className='ordercompleteinfo'>
                            <p>Order Number : {orderinfo.merchant_uid}</p>
                            <p><i className='xi-key'></i>Password : {randomString}</p>
                        </div>
                    )}
                </div>
                <h3><i className='xi-user'></i>Buyer Details</h3>
                <div className='completeWindow'>
                    {orderinfo && (
                        <>
                            <p>Order Number : <span style={{ color: 'red' }}>{orderinfo.merchant_uid}</span></p>
                            <p>Password : <span style={{ color: 'red' }}>{randomString}</span></p>
                            <p>Payment amount : {orderinfo.paid_amount}</p>
                            <p>Buyer's Name : {orderinfo.buyer_name}</p>
                            <p>Buyer's phone number : {orderinfo.buyer_tel}</p>
                            <p>Buyer's email : {orderinfo.buyer_email}</p>
                            <p>Buyer's Address : {orderinfo.buyer_addr}</p>
                            <p>Buyer's Postal Code : {orderinfo.buyer_postcode}</p>
                        </>
                    )}
                </div>
                <h3><i className='xi-basket'></i>Order product information</h3>
                <div className='completeMap'>
                    {items && items.map((item, index) => (
                        <span key={index} className='completeIndex'>
                            <img src={productimgSrc + item.image1} alt="" />
                            <div>
                                <span>{item.productname}</span>
                                <span className='alter'>[{item.alternative}]</span>
                            </div>
                            <span>{item.detailcount}</span>
                            <span>{item.price}￦</span>
                        </span>
                    ))}
                </div>
                <div className='popkornBtnbox'>
                    <PopkornBtn btnName={'Check'} btnfun={completechek} />
                </div>
            </div >
        </>
    );
}

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import PopkornBtn from '../useModules/PopkornBtn'

import './OrderComplete.css';

export const OrderComplete = () => {
    const productimgSrc = process.env.PUBLIC_URL + "/productIMG/";
    const navigate = useNavigate();
    const Location = useLocation();
    const items = Location.state.items;
    const oderinfo = Location.state.response;

    const completechek = () => {
        window.confirm('홈화면으로 돌아가시겠습니까?')
        navigate('/')
    }

    return (
        <>
            <Header />
            <div className='completeMain'>
                <h1 style={{ color: ' #7de4ff' }}>Order complete</h1>
                <div className='completeBox'>
                    <h2><i className='xi-check-circle-o'></i> Your order is complete!</h2>
                    {<>
                        <p>Order Number : {oderinfo.merchant_uid}</p>
                        <p><i className='xi-key'></i>Password : </p>
                    </>}
                </div>
                <h3><i className='xi-user'></i>Buyer Details</h3>
                <div className='completeWindow'>
                    <p>Order Number : <span style={{ color: 'red' }}>{oderinfo.merchant_uid}</span></p>
                    <p>Payment amount : {oderinfo.paid_amount}</p>
                    <p>Buyer's Name : {oderinfo.buyer_name}</p>
                    <p>Buyer's phone number : {oderinfo.buyer_tel}</p>
                    <p>Buyer's email : {oderinfo.buyer_email}</p>
                    <p>Buyer's Address : {oderinfo.buyer_addr}</p>
                    <p>Buyer's Postal Code : {oderinfo.buyer_postcode}</p>
                </div>
                <h3><i className='xi-basket'></i>Order product information</h3>
                <div className='completeMap'>
                    {items.map((item, index) => (
                        <span key={index} className='completeIndex'>
                            <img src={productimgSrc + item.image1} alt="" />
                            <div>
                                <span>{item.productname}</span>
                                <span className='alter'>[{item.alternative}]</span>
                            </div>
                            <span>{item.detailcount}</span>
                            <span>￦{item.price}</span>
                        </span>
                    ))}
                </div>
                <div className='popkornBtnbox'>
                    <PopkornBtn btnName={'Check'} btnfun={completechek} ></PopkornBtn>
                </div>
            </div >
        </>
    );
}
import { useNavigate } from 'react-router-dom';
import PopkornBtn from '../../useModules/PopkornBtn';

import "./CartListFrom.css";


const pData = {
    productName: "JAPAN 2nd Single [UNFORGIVEN] Solo Jacket",
}

export default function CartListFrom() {
    const navigate = useNavigate();

    function orderConfirm() {
        if (window.confirm('구매페이지로 이동하시겠습니까?')) {
            navigate('/Order'); //리액트es06 문법이후로만 적용됨.(페이지 이동)
        }
    }


    return (
        <>
            <h1 style={{ color: ' #b2ecfd' }}>Cart</h1>
            <label>
                <input type="checkbox" />
                <span style={{ color: ' #FE7CF3' }}>Select All</span>
            </label>
            <div className="CartListFrombox">
                <input type="checkbox" />
                <ul>
                    <li>이미지 넣을 곳</li>
                    <li>{pData.productName}</li>
                    <li>수량 넣을곳</li>
                    <li>총 가격 넣을곳</li>
                </ul>
            </div>
            <div className="cartPrice">
                <h3>Total(수량)</h3>
                <h3>\</h3>
            </div>
            <div className='popkornBtnbox'>
                <PopkornBtn btnName={'Order Execution!'} btntype={false} btnfun={orderConfirm} ></PopkornBtn>
            </div>
        </>
    )
}
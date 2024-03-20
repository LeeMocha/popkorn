import '../../productDetail/img/JAPAN 2nd Single [UNFORGIVEN] Solo Jacket.png';

import "./CartListFrom.css";

// 데이터를 받아와야하는거라 보류(틀만 잡음)
// <button> => 삭제/구매/전체삭제 

const pData = {
    productName: "JAPAN 2nd Single [UNFORGIVEN] Solo Jacket",
    price: 11000
}

export default function CartListFrom() {
    return (
        <div className="CartListFromMain">
            <div className="CartListFrombox">
                <ul>
                    <li>○</li>
                    <li>이미지 넣을곳</li>
                    <li>앨범명 넣을곳</li>
                    <li>수량 넣을곳</li>
                    <li>총 가격 넣을곳</li>
                </ul>
            </div>
            <button>Delete all product</button>
            <h3>Total(수량)</h3>
            <h3>\</h3>
        </div>
    )
}
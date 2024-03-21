import './Orderproduct.css';


export default function Orderproduct() {
    return (
        <>
            <h3>OrderProduct</h3>
            <div className="orderproductbox">
                <ul>
                    <li>이미지 넣는곳</li>
                    <li>상품명& 옵션명</li>
                    <li>Cout : 넣는곳</li>
                    <li>Price : 넣는곳</li>
                </ul>
            </div>
            <div className="orderproductPrice">
                <h3>Total(수량)</h3>
                <h3>\</h3>
            </div>
        </>
    );
}
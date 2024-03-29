import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './OrderComplete.css';



export const OrderComplete = () => {
    const productimgSrc = process.env.PUBLIC_URL + "/productIMG/";
    const navigate = useNavigate();
    const Location = useLocation();
    const items = Location.state.items;
    const oderinfo = Location.state.response;

    console.log(oderinfo)

    return (
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
            <table>

                <thead>
                    <tr>
                        <th></th>


                    </tr>
                </thead>
                {items.map((item, index) => (
                    <tbody>
                        <tr key={index}>
                            <img src={productimgSrc + item.image1} alt="" />
                            <td>{item.productname}</td>
                            <td>{item.alternative}</td>
                            <td>{item.detailcount}</td>
                            <td>￦{item.price}</td>
                        </tr>
                    </tbody>
                ))}
            </table>

            <button>Check</button>
        </div >
    );
}
import { useLocation } from 'react-router-dom';

import './OrderComplete.css';
import { useState } from 'react';


export const OrderComplete = () => {

    const Location = useLocation();
    const [items, setitems] = useState([]);

    return (
        <div className='completeMain'>
            <h2 style={{ color: '#b2ecfd' }}>Order complete details</h2>
            {
                // 1. 비회원 이면 Order Number가 나오게 해주고 
                <h3>Order Number : {Response.merchant_uid}</h3>
                // 2. 회원 이면 Order Number가 안나오게 해주기

            }
            <div className='completeWindow'>
                <p>🔐Password : </p>
                <table>
                    <thead>
                        <tr>
                            <th>Order number</th>
                            <th>Payment amount</th>
                            <th>Name</th>
                            <th>Phone number</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Postcode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.merchant_uid}</td>
                                <td>{item.amount}</td>
                                <td>{item.buyer_name}</td>
                                <td>{item.buyer_tel}</td>
                                <td>{item.email}</td>
                                <td>{item.addr}</td>
                                <td>{item.buyer_postcode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <button>Check(이부분 수정필요)</button>
        </div>
    );
}
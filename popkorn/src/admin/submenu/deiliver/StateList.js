import { useState } from 'react';
import './StateList.css'

export default function StateList() {
    const [satate, setsatate] = useState(['1', '2', '3']);
    // 디자인 제작을 위한 임시 정보

    return (
        <div className="statelistMain">
            <div className='statelistBox'>
                <div>
                    {satate.map((satate, i) => (
                        <div key={i} className='seateState'>
                            <h3>Order Number : {satate[0]}</h3>
                            <p>배송 날짜 :</p>
                        </div>
                    ))
                    }
                </div>
                <div className='stateDetail'>
                    <h3>Delivery progress</h3>
                </div>
            </div>

        </div>
    );
}
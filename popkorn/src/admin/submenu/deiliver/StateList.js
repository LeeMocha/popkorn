import { useState } from 'react';
import './StateList.css'

export default function StateList() {
    const [satate, setsatate] = useState(['1', '2', '3']);
    // 디자인 제작을 위한 임시 정보

    return (
        <div className="statelistMain">
            <div>
            {satate.map((satate, i) => (
                <div key={i}>
                    <h3>Order Number : {satate[0]}</h3>
                    <p>배송 날짜 :</p>
                </div>
            ))
            }
            </div>
            <div className='stateDetail'>
                이부분은 상태 상세

            </div>

        </div>
    );
}
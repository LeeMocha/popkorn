import { useState, useEffect } from 'react';
import './StateList.css'

export default function StateList() {
    const [state, setState] = useState(['1', '2', '3', '4', '5']);
    // 테스트(임시)



    return (
        <div className="statelistMain">
            <div className='statelistBox'>
                <div className='statei'>
                    {state.map((state, i) => (
                        <div key={i} className='seateState'>
                            <div className='seateShipping'>
                                <span>Shipping</span>
                            </div>
                            <h3>Order Number : {state[0]}</h3>
                            <p>Delivery Date :</p>
                        </div>
                    ))
                    }
                </div>
                
                <div className='stateDelivery'>
                    <h3><i className='xi-spinner-1 xi-spin'></i>Delivery progress</h3>
                    <div className='stateProgress'>
                        <div className='arrow'>
                            <span><i className='xi-check'></i></span>
                        </div>
                        <p />
                        <div className='arrow'>
                            <span><i className='xi-check'></i></span>
                        </div>
                        <p />
                        <div className='arrow'>
                            <span><i className='xi-check'></i></span>
                        </div>
                        <p />
                        <div className='arrow'>
                            <span><i className='xi-check'></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
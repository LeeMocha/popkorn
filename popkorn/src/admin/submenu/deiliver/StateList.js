import { useState, useEffect } from 'react';

import './StateList.css'

export default function StateList() {
    const [state, setState] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']);
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
                            <span>Order Number : {state}</span>
                            <p>Delivery Date :</p>
                        </div>
                    ))
                    }
                </div>
            </div>
            <div className='stateDelivery'>
                <h3><i className='xi-spinner-1 xi-spin'></i>Delivery progress</h3>
                <div className='informationDiv'>
                    <div className='stateInformation'>
                        <h4 className='xi-cart'>Order Information</h4>
                        <p>Order Number : </p>
                        <p>Payment amount :  </p>
                        <p>Date of order :  </p>
                    </div>
                    <div className='stateInformation1'>
                        <h4 className='xi-home'>Shipping Address</h4>
                        <p>Address : </p>
                        <p>phone number :  </p>
                    </div>
                    <div className='stateInformation2'>
                        <h4 className='xi-user'>Buyer Information</h4>
                        <p>Name : </p>
                        <p>email :  </p>
                        <p>phone number :  </p>
                    </div>
                </div>

                <div className='stateps'>
                    <h3><i className='xi-spinner-1 xi-spin'></i>Delivery status</h3>
                    <div className='stateProgressarrow'>
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

                    <div className='stepByStep'>
                        <div className='stepByStepStage'>
                            <div className='stage'>
                                <span>Order Process</span>
                                <p>Date of order</p>
                            </div>
                            <div className='stage'>
                                <span>Packaging progress</span>
                                <p>Packaging Date</p>
                            </div>
                            <div className='stage'>
                                <span>Shipment Start</span>
                                <p>Delivery start date</p>
                            </div>
                            <div className='stage'>
                                <span>Delivery completed</span>
                                <p>Delivery completion date</p>
                            </div>
                        </div>
                    </div>
                </div>

                <h3><i className='xi-spinner-1 xi-spin'></i>Map</h3>
                <div className="map-container">
                    
                </div>
            </div>
        </div>
    );
}
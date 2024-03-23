import Orderproduct from './Orderproduct/Orderproduct';

import './Order.css';

export default function Order() {
    return (
        <div className='orderBox'>
            <h1 style={{ color: ' #b2ecfd' }}>Oder</h1>
            <div className='orderWindow'>
                <div className='OrderInformationMain'>
                    <h3>Order Information</h3>
                    <div className="orderInformationbox">
                        <p>Country/Region</p>
                        <select value='country' >
                            <option value=''>Country Selection</option>
                            <option value='South Korea'>South Korea</option>
                            <option value='United States'>United States</option>
                            <option value='Japan'>Japan</option>
                            <option value=''></option>
                            <option value=''></option>
                        </select>
                        <p>Full Name</p>
                        <input type="text"></input>
                        <p>Email</p>
                        <input type="text"></input>
                        <p>Phone</p>
                        <input type="text"></input>
                    </div >
                </div>
                <div>
                    <h3>Shipping Address</h3>
                    <div className="shippingAddressBox">
                        <p>City</p>
                        <input type="text" ></input>
                        <p>Address</p>
                        <input type="text"></input>
                        <p>Zip code</p>
                        <input type="text"></input>
                        <p>Phone</p>
                        <input type="text"></input>
                    </div>
                </div>
            </div>
            <h3>PaymentMethod</h3>
            <div className="paymentMethodMain">
                <span>여기는 결제 수단 넣는곳</span>
            </div>
            <Orderproduct />
        </div>
    );
}
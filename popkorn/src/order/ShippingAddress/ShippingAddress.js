import React, { useState } from 'react';
import './ShippingAddress.css';

export default function ShippingAddress() {

    const [city, setCity] = useState('');

    const citySelection = (e) => {
        setCity(e.target.value);
    };

    return (
        <div>
            <h3>Shipping Address</h3>
            <div className="shippingAddressBox">
                <label>
                    <input type="checkbox"></input>
                    <span>Register with default shipping address</span>
                    <span></span>
                </label>
                <p>City</p>
                <input type="text"></input>
                <p>Address</p>
                <input type="text"></input>
                <p>Zip code</p>
                <input type="text"></input>
                <p>Phone</p>
                <input type="text"></input>
            </div>
        </div>
    );
}

import { useState } from 'react';
import './OrderInformation.css';

export default function OrderInformation() {
    const [country, setcountry] = useState('')

    const countrySelection = (e) => {
        setcountry(e.target.value);
    }

    return (
        <div className='OrderInformationMain'>
            <h3>Order Information</h3>
            <div className="orderInformationbox">
                <p>Country/Region</p>
                <select value={country} onChange={countrySelection}>
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
    );
}
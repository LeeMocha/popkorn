import './ShippingAddress.css';

export default function ShippingAddress() {
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
                <p>도시 선택 우쨰해요?</p>
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
import Orderproduct from './Orderproduct/Orderproduct';
import OrderInformation from './OrderInformation/OrderInformation';
import ShippingAddress from './ShippingAddress/ShippingAddress';
import PaymentMethod from './PaymentMethod/PaymentMethod';

import './Order.css';

export default function Order() {
    return (
        <div className='orderBox'>
            <h1 style={{ color: ' #b2ecfd' }}>Oder</h1>
            <div className='orderWindow'>
                <OrderInformation />
                <ShippingAddress />
            </div>
            <PaymentMethod />
            <Orderproduct />
        </div>
    );
}
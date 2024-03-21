import './OrderInformation.css';

export default function OrderInformation() {
    return (
        <div className='OrderInformationMain'>
            <h3>Order Information</h3>
            <div className="orderInformationbox">
                <p>Country/Region</p>
                <p>국가선택창 우쨰 넣어요?</p>
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
import { useState } from 'react';
import './customerservice.css';


export const Customerservice = () => {

    const [showcontent, setShowcontent] = useState(0);

    const servicecontentdisplay1 = () => {
        setShowcontent(1)
    }
    const servicecontentdisplay2 = () => {
        setShowcontent(2)
    }
    const servicecontentdisplay3 = () => {
        setShowcontent(3)
    }
    const servicecontentdisplay4 = () => {
        setShowcontent(4)
    }
    const servicecontentdisplay5 = () => {
        setShowcontent(5)
    }

    return (
        <div className="customerservicewhole">
            <div className="account-header">
                Customer Service
            </div>
            <div className="customerserviceheader">
                frequently asked question
            </div>
            <div className='frequentlyaskedcategory'>
                <div className="frequentlyaskedcategory1">Delivery</div>
                <div className="frequentlyaskedcategory2">Order</div>
                <div className="frequentlyaskedcategory3">Membership</div>
                <div className="frequentlyaskedcategory4">Exchange & Return</div>
            </div>
            <div>
                <button className='askservicebtn' onClick={servicecontentdisplay1}><span className='contentsmallheader'>1</span>How to check the delivery of the ordered product?</button>
                <div className='askservicecontent' style={showcontent === 1 ? { display: 'block' } : { display: 'none' }}>a1a1a1a1a1a1</div>
            </div>

            <div>
                <button className='askservicebtn' onClick={servicecontentdisplay2}><span className='contentsmallheader'>2</span>How many days does it usually take to ship?</button>
                <div className='askservicecontent' style={showcontent === 2 ? { display: 'block' } : { display: 'none' }}>b1b1b1b1b1b1b1</div>
            </div>
            <div>
                <button className='askservicebtn' onClick={servicecontentdisplay3}><span className='contentsmallheader'>3</span>ccccccccc</button>
                <div className='askservicecontent' style={showcontent === 3 ? { display: 'block' } : { display: 'none' }}>c1c1c1c1c1c1</div>
            </div>
            <div>
                <button className='askservicebtn' onClick={servicecontentdisplay4}><span className='contentsmallheader'>4</span>dddddddddd</button>
                <div className='askservicecontent' style={showcontent === 4 ? { display: 'block' } : { display: 'none' }}>d1d1d1d1d1d1</div>
            </div>
            <div>
                <button className='askservicebtn' onClick={servicecontentdisplay5}><span className='contentsmallheader'>5</span>eeeeeeeeeeee</button>
                <div className='askservicecontent' style={showcontent === 5 ? { display: 'block' } : { display: 'none' }}>e1e1e1e1e1</div>
            </div>


        </div>


    );
};

export default Customerservice;
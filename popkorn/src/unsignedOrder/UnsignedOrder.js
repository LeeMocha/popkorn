
import { useState } from "react";
import "./UnsignedOrder.css"
import Mainlogo from "../header/logo/Mainlogo/Mainlogo";
import Orderlist from "../auth/mypage/orderlist";
import Findorderinfo from "./findorderinfo";

export default function UnsugnedOrder(props) {

    const [showpw, setShowpw] = useState(false);
    const [unsignedorder, setUnsignedorder] = useState(1);

    const certificationroute = (e) => {
        setUnsignedorder(unsignedorder+1);
    }

    const resetroute = (e) => {
        setUnsignedorder(1);
    }

    const toggleShowpw = () => {
        showpw === false ? setShowpw(true) : setShowpw(false);
    }

    return (
        <div className="unsignedO_wrap">
            <div className="Memberbg">
                <div className='emailwhole'>
                    <Mainlogo />
                    <div className='emailbg'>
                        <h2 className='memberguide'>
                            <div>Order Inquiry</div>
                        </h2>

                        {unsignedorder === 1 ?
                            <>
                                <div className="inputcontainer">

                                    <div className='emaildetail'>
                                        <br />

                                        <input
                                            className='emailinput'
                                            type="text"
                                            placeholder="Insert Ordered Id"
                                            maxLength="25"
                                        />
                                    </div>

                                    <div className='orderpwdetail'>
                                        <br />

                                        <input
                                            className='pwinput'
                                            type={showpw === false ? "password" : "text"}
                                            placeholder="Password"
                                            maxLength="16"
                                        />

                                        <button onClick={toggleShowpw} className='toggleshow'>
                                            {showpw ? <i className='xi-eye' /> : <i className='xi-eye-off' />}</button>
                                        <button type='reset' className='memberreset' >
                                            <i className='xi-close-thin' /></button>

                                    </div>
                                    <div className='pwinfo'></div>
                                </div>
                                <button className='embtn'>Search Order</button><br /><br />
                                <br />
                                <button className='resetpw' onClick={certificationroute}>
                                    forgot OrderNumber or password?
                                </button>
                            </>
                            : unsignedorder === 2 ? 
                            <Findorderinfo/>
                           
                            : unsignedorder === 3 ? 
                            
                            <Orderlist/>
       
                            : null}
                    </div>
                    {unsignedorder < 2 ? null :
                    unsignedorder === 2 ? 
                    <button onClick={resetroute}className='embtn'>To Order Inquiry Page</button>
                    : 
                    <button></button>
                    }
                </div>
            </div>
        </div>
    );
}
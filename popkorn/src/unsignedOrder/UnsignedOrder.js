
import { useState } from "react";
import "./UnsignedOrder.css"
import Mainlogo from "../header/logo/Mainlogo/Mainlogo";

export default function UnsugnedOrder() {

    const [showpw, setShowpw] = useState(false);

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
                        <div className='emaildetail'>
                            <br />

                            <input
                                className='emailinput'
                                type="text"
                                placeholder="Insert Ordered Id"
                                maxLength="25"
                            />


                        </div>

                        <div className='pwdetail'>
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

                            <div className='pwinfo'></div>
                        </div>
                        <button className='embtn'>Search Order</button><br /><br />
                        <button className='embtn'>Back</button>
                        <br />
                        <button className='resetpw'>
                            forgot your password? Click and reset your password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
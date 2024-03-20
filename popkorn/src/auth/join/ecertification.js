import React, { useState } from 'react';
import PrevNextButtons from "./prevnextbtn";
import DisableprevNextButtons from './disableprevnextbtn';

export default function Ecertification(props) {

    const [ecertificationcode, setEcertificationcode] = useState('');

    const certificationhandle = (e) => {
        setEcertificationcode(e.target.value);
    }

    return (
        <>
            <div>
                <h2 className='memberguide'>
                    <div>Certification Email</div>
                </h2>
            </div>

            <div className='confirmemail'>
                Account : {props.emailinput} <br />
            </div>
            <div className="subguide">
            Please proceed after sending <br/>
            And checking email cerfitication
            </div>

            <button className="certificationbtn" onClick={() => (
                alert("Please check your certification code in your email.")
                )}>send certification Code</button>
                <br/><br/>
                <form>
                    <br></br>
                    <input className="certificationinput"
                    type="text"
                    placeholder="Certification Code"
                    value={ecertificationcode}
                    onChange={certificationhandle}
                    />
                </form>
                {!(ecertificationcode !== "") ? <DisableprevNextButtons onPrevClick={props.backjoinbutton} /> : <PrevNextButtons onPrevClick={props.backjoinbutton} onNextClick={props.joinbutton} />}
        </>
    )
}
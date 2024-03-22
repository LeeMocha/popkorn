import React, { useState } from 'react';
import PrevNextButtons from "./prevnextbtn";
import DisableprevNextButtons from './disableprevnextbtn';
import axios from 'axios';

export default function Ecertification(props) {

    const [ecertificationcode, setEcertificationcode] = useState('');

    const [join, setJoin] = props.joinState;

    const certificationhandle = (e) => {
        setEcertificationcode(e.target.value);
    }

    const memberjoin = async () => {
        try {
            const Response = await axios.post('/api/user/memberjoin', {
                id: join.id,
                password: join.password,
                nickname: join.nickname
              });
            if (Response.status === 200) {
                console.log('회원가입 성공');
            } else {
                console.log('회원가입 실패')
            }
        } catch (error) {
            console.log(error)
            console.error('오류 발생:', error);
        }
    };


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
                {!(ecertificationcode !== "") ? <DisableprevNextButtons onPrevClick={props.backjoinbutton} /> 
                : <PrevNextButtons onPrevClick={props.backjoinbutton} onNextClick={() => {props.joinbutton();memberjoin();}} />}
        </>
    )
}
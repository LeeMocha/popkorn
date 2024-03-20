import React, { useState } from 'react';
import Mainlogo from '../header/logo/Mainlogo/Mainlogo';
import { emCheck, pwCheck, resetChecks, areChecksValid } from './logincheck';
import Join from './join/join';
import MyPageMain from './mypage/mypagemain';

const Memberlist = {
  email: "agr4005@naver.com",
  password: "qwerty123!",
  nickname: "agr4005"
};

export const EmailCheck = () => {
  const [showpw, setShowpw] = useState(false);
  const [emailinput, setemailInput] = useState('');
  const [pwinput, setpwInput] = useState('');
  const [emailcheck, setemailcheck] = useState('1');
  const [emailinfo, setEmailinfo] = useState('');
  const [pwinfo, setPwinfo] = useState('');

  const ButtonCheck = () => {
    if (emailinput === Memberlist.email) {
      setemailcheck('2');
    } else if (emailinput !== Memberlist.email) {
      setemailcheck('3');
    }
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      if (emailcheck === '2') {
        ButtonClick();
      } else {
        ButtonCheck();
      }
    }
  };

  function ButtonClick() {
    if (pwinput === Memberlist.password) {
      return <MyPageMain emailinput={emailinput} />
    } else {
      setpwInput('');
      alert('Invalid Password. Please check your Email or Password.');
    }
  };


  const handleEmailChange = (e) => {
    const newEmailValue = e.target.value;
    setemailInput(newEmailValue);

    setemailcheck('1');

    const isValidEmail = emCheck(newEmailValue);
    if (!isValidEmail) {
      setEmailinfo('Invalid Email type');
    } else {
      setEmailinfo('');
    }
  };

  const handlePasswordChange = (e) => {
    const newpwValue = e.target.value;
    setpwInput(newpwValue);

    const isValidPassword = pwCheck(e.target.value, Memberlist);
    if (!isValidPassword) {
      setPwinfo('Invalid Password');
    } else {
      setPwinfo('');
    }
  };

  const toggleShowpw = () => {
    showpw === false ? setShowpw(true) : setShowpw(false);
  }

  const resetForm = () => {
    setemailInput('');
    setpwInput('');
    setemailcheck('1');
    resetChecks();
  };

  return (
    <div className='emailwhole'>
      <Mainlogo />

      <div className='emailbg'>
        {emailcheck === '1' ?
          <>
            <h2 className='memberguide'>
              Please enter your email <br />to login or sign up
            </h2>
            <div className='emaildetail'>
              <br />

              <input
                className='emailinput'
                type="text"
                placeholder="Insert Email"
                maxLength="25"
                value={emailinput}
                onChange={handleEmailChange}
                onKeyDown={handleKeyPress}
              />
              <input type="text" style={{ display: 'none' }} />
              <button type='reset' className='memberreset' onClick={() => setemailInput('')}><i className='xi-close-thin' /></button>

              <div className='emailinfo'>{emailinfo}</div>
            </div>
          </>
          : null}

        {emailcheck === '1' ?
          <button onClick={() => {
            ButtonCheck();
            areChecksValid();
          }}
            className='embtn' disabled={emailinfo !== '' || emailinput.length < 1}>Progress</button>
          : null
        }

        {emailcheck === '2' ?
          <>
            <h2 className='memberguide'>
              <div>Please login by email</div>
            </h2>
            <div className='emaildetail'>
              <br />

              <input
                className='emailinput'
                type="text"
                placeholder="Insert Email"
                maxLength="25"
                value={emailinput}
                onChange={handleEmailChange}
                readOnly
              /><i className='xi-lock' />


            </div>

            <div className='pwdetail'>
              <br />

              <input
                className='pwinput'
                type={showpw === false ? "password" : "text"}
                placeholder="Password"
                value={pwinput}
                onChange={handlePasswordChange}
                onKeyDown={handleKeyPress}
              />

              <button onClick={toggleShowpw} className='toggleshow'>
                {showpw === false ? <i className='xi-eye' /> : <i className='xi-eye-off' />}</button>
              {<button type='reset' className='memberreset' onClick={() => setpwInput('')}>
                <i className='xi-close-thin' /></button>}

              <div className='pwinfo'>{pwinfo}</div>
            </div>
            <button onClick={() => {
              ButtonClick();
              areChecksValid();
            }} className='embtn'>Login</button><br /><br />
            <button onClick={resetForm} className='embtn'>Back</button>
          </>
          : emailcheck === '3' ?
            <>
              <Join emailinput={emailinput} emailcheck={emailcheck} setemailcheck={setemailcheck} />
              <button onClick={resetForm} className='embtn'>To Start-up Page</button>
            </>
            : null}
      </div>
    </div>
  );
};



export default EmailCheck;

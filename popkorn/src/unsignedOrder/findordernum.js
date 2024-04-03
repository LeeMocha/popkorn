import { useState } from "react";
import { apiCall } from "../service/apiService";


export default function Findordernum() {

  const [ecertificationcode, setEcertificationcode] = useState();
  const [mailcode, setMailcode] = useState('');
  const [inputemail, setInputemail] = useState('');
  const [ecertificationcheck, setEcertificationcheck] = useState(1);

  const certificationhandle = (e) => {
    setEcertificationcode(e.target.value);
  }

  const handleEmailChange = (e) => {
    setInputemail(e.target.value);
  }

  const mailConfirm = async () => {
    try {
      const Response = await apiCall('/api/user/mailConfirm', "POST", { email: inputemail }, null);
      console.log('인증코드:', Response.data);
      setMailcode(Response.data);
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  const handlemailcodeCheck = () => {
    setEcertificationcheck(2);
  }
  return (
    <>
      {ecertificationcheck === 1 ?
        <>
          <div>
            <h2 className='memberguide'>
              <div>Certification Email</div>
            </h2>
          </div>

          <div className='confirmemail'>
            Input your email for certification<br />
            <input
              className='emailinput'
              type="text"
              placeholder="Insert Email"
              maxLength="25"
              onChange={handleEmailChange}

            />
          </div>
          <div className="subguide">
            Please proceed after sending <br />
            And checking email cerfitication
          </div>

          <button className="certificationbtn" onClick={() => {
            alert("Please check your certification code in your email.");
            mailConfirm();
          }}>Click to send certification Code</button>
          <br /><br />
          <form>
            <br></br>
            <input
              className="certificationinput"
              type="text"
              placeholder="Certification Code"
              value={ecertificationcode}
              onChange={certificationhandle}
              maxLength={12}
            />

            {(ecertificationcode !== mailcode || ecertificationcode.length < 1) ? null :
              <button onClick={handlemailcodeCheck} className="mailcodesend"><i className="xi-send" /></button>
            }
          </form>
        </>
        : ecertificationcheck === 2 ?
          <>
            <div>
              <h2 className='memberguide'>
                <div>Here's your OrderNumber</div>
              </h2>
            </div>



          </>

          : null}
    </>
  )
}

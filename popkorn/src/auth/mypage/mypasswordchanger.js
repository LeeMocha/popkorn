import { useState } from "react";
import './mypasswordchange.css';
import { charRegex, specialRegex, letterRegex, numRegex } from "../join/joinRegex";
import { Link } from "react-router-dom";

export default function Mypasswordchanger() {

        const [passwordrecheck, SetPasswordrecheck] = useState('1');
        const [showpw, setShowpw] = useState(false);
        const [pwconfirm, setpwconfirm] = useState('');
        const [newpassword, setNewpassword] = useState('');

        const pwvalidationhandle = (e) => {
                const newpwValue = e.target.value;
                setNewpassword(newpwValue);
        }

        const pwfinalcheck = () => {
                if (charRegex(newpassword) && specialRegex(newpassword) && letterRegex(newpassword) && numRegex(newpassword)) {
                        return true;
                } else {
                        return false;
                }
        }

        const toggleShowpw = () => {
                showpw === false ? setShowpw(true) : setShowpw(false);
        }

        const pwrecheckcomple = () => {
                SetPasswordrecheck(passwordrecheck + 1);
        }

        const pwconfirmHandler = (e) => {
                setpwconfirm(e.target.value);
        }

        const pwupdatecomple = () => {
                alert('비밀번호 변경 완료. 재로그인해주세요.');
        };

        const scrollToTop = () => {
                window.scrollTo(0, 0); 
        };

        return (
                <div className="passwordchangerwhole">
                        <div className="account-header">
                                Change Password
                        </div>
                        {passwordrecheck === 1 ?
                                <>
                                        <div className="passwordchangeguide">
                                                Check current password for password change
                                        </div>
                                        <div className="currentpassword">
                                                Current Password
                                                <input type={showpw === false ? "password" : "text"}
                                                        maxLength={16}
                                                        minLength={8}
                                                        className="currentpasswordinput"
                                                />
                                                <button onClick={toggleShowpw} className='toggleshowpw'>
                                                        {showpw === false ? <i className='xi-eye' /> : <i className='xi-eye-off' />}</button>
                                                <button onClick={pwrecheckcomple}><i className="xi-send" /></button>

                                        </div>
                                </>
                                :
                                <div>
                                        <div className="passwordchangeguide">
                                                Reset new password
                                        </div>

                                        <div className="newpasswordreset">
                                                New Password
                                                <input type={showpw === false ? "password" : "text"}
                                                        maxLength={16}
                                                        minLength={8}
                                                        className="newpasswordresetinput"
                                                        onChange={pwvalidationhandle}
                                                />
                                                <button onClick={toggleShowpw} className='toggleshowpw'>
                                                        {showpw === false ? <i className='xi-eye' /> : <i className='xi-eye-off' />}</button>
                                                <div className='pwvalid1' style={{ color: charRegex(newpassword) ? "#7de4ff" : "#fe7cf3" }}>
                                                        {charRegex(newpassword) || newpassword.length < 1 ? "" : !charRegex(newpassword) ? "Password must be 8 to 16 characters long." : null}
                                                </div>
                                                <div className='pwvalid3' style={{ color: letterRegex(newpassword) ? "#7de4ff" : "#fe7cf3" }}>
                                                        {letterRegex(newpassword) || newpassword.length < 1 ? "" : !letterRegex(newpassword) && charRegex(newpassword) ? "Password must contain at least one lowercase letter in English" : null}
                                                </div>
                                                <div className='pwvalid4' style={{ color: numRegex(newpassword) ? "#7de4ff" : "#fe7cf3" }}>
                                                        {numRegex(newpassword) || newpassword.length < 1 ? "" : !numRegex(newpassword) && charRegex(newpassword) && letterRegex(newpassword) ? "Password must contain at least one number." : null}
                                                </div>
                                                <div className='pwvalid2' style={{ color: specialRegex(newpassword) ? "#7de4ff" : "#fe7cf3" }}>
                                                        {specialRegex(newpassword) || newpassword.length < 1 ? "" : !specialRegex(newpassword) && charRegex(newpassword) && letterRegex(newpassword) && numRegex(newpassword) ? "Password must contain at least one special character." : null}
                                                </div>
                                        </div>
                                        <div className="newpasswordreset">
                                                New Password Confirm
                                                <input type={showpw === false ? "password" : "text"}
                                                        maxLength={16}
                                                        minLength={8}
                                                        className="newpasswordresetinput"
                                                        onChange={pwconfirmHandler}
                                                />
                                                <button onClick={toggleShowpw} className='toggleshowpw'>
                                                        {showpw === false ? <i className='xi-eye' /> : <i className='xi-eye-off' />}</button>
                                                <div className="pwvalid5" style={{
                                                        color: !charRegex(newpassword) || !specialRegex(newpassword) || !letterRegex(newpassword) || !numRegex(newpassword) ? "#fe7cf3"
                                                                : newpassword === pwconfirm && pwconfirm.length > 7 ? "#7de4ff" : "#fe7cf3"
                                                }}> {pwfinalcheck() && pwconfirm.length < 1 ? ""
                                                        : newpassword === pwconfirm && pwconfirm.length > 7 ? "Password matching"
                                                                : pwfinalcheck() && newpassword !== pwconfirm ? "Password mismatch" : null}
                                                </div> </div>
                                        <Link to='/' onClick={scrollToTop}>
                                                <button onClick={pwupdatecomple} className="resetpwconfirm" disabled={!(newpassword === pwconfirm && pwconfirm.length > 7)}>Change Password</button>
                                        </Link>
                                </div>
                        }
                </div >
        )
}
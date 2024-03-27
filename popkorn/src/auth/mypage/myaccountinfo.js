import React, { useState, useEffect } from 'react';
import './myaccountinfo.css';
import { UseTerms } from './useTerms';
import axios from 'axios';

const Myaccountinfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState(sessionStorage.getItem('loginID'));
  const [nickname, setNickname] = useState('');

  // 이메일이 변경되었을 때 실행되는 useEffect
  useEffect(() => {
    const checkNickname = async () => {
      try {
        const response = await axios.get(`/api/user/${email}/nickname`);
        if (response.status === 200) {
          setNickname(response.data);
        } else {
          console.log('닉네임 가져오기 실패');
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
    };

    // 이메일이 유효한 경우에만 닉네임 가져오기 요청
    if (email) {
      checkNickname();
    }
  }, [email]); // email이 변경될 때마다 실행

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const updatenickname = async () => {
    try {
      const response = await axios.post(`/api/user/updatenickname?nickname=${nickname}&email=${email}`);
      if (response.status === 200) {
        setNickname(response.data);
        return true;
      } else {
        console.log('닉네임 변경 실패');
        return false;
      }
    } catch (error) {
      console.error('오류 발생:', error);
      return false;
    }
}

  return (
    <div className="my-account-info">
      <div className="account-header">
        My Account Information
      </div>
      <button 
    onClick={() => { 
        
            if (nickname.length >= 6 && nickname.length <= 12) {
                toggleEditMode();
                updatenickname();
            } else {
                alert('닉네임은 6자 이상, 12자 이하여야 합니다.');
            }
        
    }} 
    className='toggleupdate' 
    disabled={!(nickname.length >= 6 && nickname.length <= 12)}>
    {editMode ? 'Save' : 'Modify'}
</button>


      <div className='accountemail'>
        Email &nbsp;

        <span>{email}</span>

      </div>

      <div className='accountnickname'>
        Nickname &nbsp;
        {editMode ? (
          <input value={nickname} onChange={handleNicknameChange} className='editnickname' maxLength={12} minLength={6}/>
        ) : (
          <span>{nickname}</span>
        )}
        <br /><br />
      </div>

      <br />
      <div className='termsheader'>
        Terms and conditions
      </div>
      <UseTerms />
    </div>
  );
};

export default Myaccountinfo;

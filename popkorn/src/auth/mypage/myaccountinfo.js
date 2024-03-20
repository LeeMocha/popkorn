import React, { useState } from 'react';
import './myaccountinfo.css';
import { UseTerms } from './useTerms';

const Myaccountinfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState('example@example.com');
  const [nickname, setNickname] = useState('User');
  const [name, setName] = useState('User');

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="my-account-info">
      <div className="account-header">
        My Account Information
      </div>
      <button onClick={toggleEditMode} className='toggleupdate'>{editMode ? 'Save' : 'Modify'}</button>

      <div className='accountemail'>
        Email &nbsp;
        {editMode ? (
          <input type="email" value={email} onChange={handleEmailChange} className='editemail' readOnly/>
        ) : (
          <span>{email}</span>
        )}
      </div>

      <div className='accountnickname'>
        Nickname &nbsp;
        {editMode ? (
          <input value={nickname} onChange={handleNicknameChange} className='editnickname' />
        ) : (
          <span>{nickname}</span>
        )}
        <br /><br />
        Name &nbsp;
        {editMode ? (
          <input value={name} onChange={handleNameChange} className='editnickname' />
        ) : (
          <span>{name}</span>
        )}
      </div>


      <br />
      <div className='termsheader'>
        Terms and conditions
      </div>
          <UseTerms/>
    </div>


  );
};

export default Myaccountinfo;

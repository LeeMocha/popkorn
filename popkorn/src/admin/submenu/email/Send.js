import { useState } from "react";
import './Send.css';
import { apiCall } from "../../../service/apiService";

export default function Send() {
  const [emailContent, setEmailContent] = useState('');
  const [emailTitle, setemailTitle] = useState('');
  const [emailRecipient, setemailRecipient] = useState('');
  const [checkRecipient, setcheckRecipient] = useState(false);

  const handleAllUsersCheck = (event) => {
    setcheckRecipient(event.target.checked);
    setemailRecipient('');
  };

  const handleEmailContentChange = (event) => {
    setEmailContent(event.target.value);
  };

  const handleEmailTitleChange = (event) => {
    setemailTitle(event.target.value);
  };

  const handleEmailRecipientChange = (event) => {
    setemailRecipient(event.target.value);
  };

  const sendEmail = async () => {
    try {
      const Response = await apiCall('/api/user/mailsend', "POST", { emailTitle: emailTitle, emailContent: emailContent, emailRecipient: emailRecipient }, null);
      alert("Email Send");
      setemailRecipient('');
      setEmailContent('');
      setemailTitle('');
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  const sendAlluser = async () => {
    try {
      const formData = new FormData();
      formData.append('emailTitle', emailTitle);
      formData.append('emailContent', emailContent);
      formData.append('emailRecipient', emailRecipient);

      const response = await apiCall('/api/user/sendtoallusers', "POST", formData, null);
      alert("Email Sent");
      setemailRecipient('');
      setEmailContent('');
      setemailTitle('');
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  return (
    <div className="stateEmail">
      <div className="EmailHeader">
        <h3>Send Email</h3>
        <button onClick={checkRecipient ? sendAlluser : sendEmail} className="sendemailbtn"
          disabled={!emailTitle || !emailContent || (!emailRecipient && !checkRecipient) ? true : false}>Send Email</button>
      </div>
      <div className="emailtitle">
        Email Title
        <input
          type="text"
          className="emailTitle-Input"
          value={emailTitle}
          onChange={handleEmailTitleChange}
          maxLength={30}
          placeholder="Title"
        />
      </div>
      <div className="recipientemail">
        Recipient-Email
        <input
          type="type"
          className="Recipient-Input"
          value={checkRecipient ? "For All Users" : emailRecipient}
          onChange={handleEmailRecipientChange}
          maxLength={30}
          placeholder={checkRecipient ? "For All Users" : "example@email.com"}
          readOnly={checkRecipient}
        />
        <div>
          All Users (May take some time) &nbsp; <input type="checkbox" className="allusercheck" onChange={handleAllUsersCheck} />

        </div>


      </div>
      <textarea
        className="emailcontent-Textarea"
        value={emailContent}
        onChange={handleEmailContentChange}
        rows={5}
        cols={50}
      />
    </div>
  );
}

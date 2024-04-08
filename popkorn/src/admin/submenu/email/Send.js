// Send 컴포넌트

import { apiCall } from "../../../service/apiService";
import { useState } from "react";
import './Send.css';

export default function Send() {
    const [emailContent, setEmailContent] = useState('');
    const [emailTitle, setemailTitle] = useState('');
    const [emailRecipient, setemailRecipient] = useState('');

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
            const Response = await apiCall('/api/user/mailsend', "POST", { emailTitle: emailTitle, emailContent: emailContent, emailRecipient: emailRecipient}, null);
            setemailRecipient('');
            setEmailContent('');
            setemailTitle('');
            console.log(Response);
            alert("Email Send");
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    return (
        <div>
            <input type="text" 
            className="emailTitle-Input" 
            value={emailTitle} 
            onChange={handleEmailTitleChange} 
            maxLength={30} 
            placeholder="Title"/>

            <input type="text" 
            className="Recipient-Input" 
            value={emailRecipient} 
            onChange={handleEmailRecipientChange} 
            maxLength={30} 
            placeholder="Email Recipient"/>

            <textarea
                className="emailcontent-Textarea"
                value={emailContent}
                onChange={handleEmailContentChange}
                rows={5}
                cols={50}
                placeholder="Type your email content here"
            />
            <br />
            <button onClick={sendEmail}>Send Email</button>
        </div>
    );
}

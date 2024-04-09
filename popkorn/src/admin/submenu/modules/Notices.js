import { useEffect, useState } from "react";
import "./Notices.css";
import { apiCall } from "../../../service/apiService";

export default function Notices() {

    const [isContent, setIsContent] = useState([]);
    const [inputContent, setInputContent] = useState(""); // textarea 입력값 저장


    useEffect(() => {
        apiCall(`/api/notices/getnotices`, "GET", null, null)
            .then(response => {
                setIsContent(response.data)
            }).catch(err => console.log)
    }, [])

    const handleClick = () => {
        apiCall(`/api/notices/insert`, "POST", { id: sessionStorage.getItem("loginID"), content: inputContent }, null)
            .then(response => {
                setIsContent(response.data)
                setInputContent("") // 전송 후 textare 초기화
            }).catch(err => console.log(err));
    }

    const textChange = (e) => {
        setInputContent(e.target.value);
    }

    const handlerEnter = (e) => {
        if (e.keyCode === 13) {
            handleClick();
        }
    }

    return (
        <div className="notices_warp">
            <div className="notices_header">
                <span>Notices</span>
                <div className="notices_title">Admin Chat</div>
            </div>
            <div className="notices_body">
                {
                    isContent.map((item) =>
                        sessionStorage.getItem("loginID") === item.id ?
                            <>
                                <div className="message_flex">
                                    <div className="my_message">{item.content}</div>
                                    <div className="message_date">{new Date(item.regdate).toLocaleTimeString()}</div>
                                </div>
                            </>
                            :
                            
                            <div className="message_flex_others">
                                <div className="mesaage_id">{item.id}</div>
                                <div className="others_message_wrap">

                                    <div className="others_message">{item.content}</div>
                                    <div className="message_date">{new Date(item.regdate).toLocaleTimeString()}</div>
                                </div>
                            </div>
                            
                    )
                }
            </div>
            <div className="notices_footer">
                <textarea cols="30" rows="10" className="notices_content" value={inputContent} onChange={textChange} onFocus={textChange} onKeyDown={handlerEnter}>
                </textarea>
                <button className="content_button" onClick={handleClick}>전송</button>
            </div>
        </div>
    );
}

/* 
1. content를 작성 하는 div 와 작성한 content 출력 div 생성
1-1. ASC 정렬(최근 content가 화면 하단 출력)
2. btn onClick 시 contnet div 박스에 작성한 내용이 api 요청을 통해 서버로 전달
3. 화면 출력 시 login 한 id와 chat id 가 동일한 경우 화면 오른쪽에 출력
3-1. 화면 출력 시 login 한 id 와 chat id 가 동일하지 않은 경우 화면 왼쪼게 출력 
4. 출력된 content div 위쪽에 작성자 표시, 옆면에 regdate 표시 

admin chat에 on focus가 되어 있을 때 엔터키 사용 가능
*/

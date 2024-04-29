import "./CelebList.css";
import { useEffect, useState } from "react";
import { apiCall } from "../../../service/apiService";
import TypeIt from 'typeit-react';

export default function CelebList() {
    // info & Delete
    const imageSrc = process.env.PUBLIC_URL + "/celebIMG/"
    const mainSrc = process.env.PUBLIC_URL + "/celebIMG/celebmainimg/"

    // Insert
    const [celebData, setCelebData] = useState([]);
    const [celebAddList, setCelebAddList] = useState([]);
    const noimage = process.env.PUBLIC_URL + "/noimage.png";
    const [celebLogoURL, setCelebLogoURL] = useState("");
    const [celebLogoFile, setCelebLogoFile] = useState(null);
    const [celebMainURL, setCelebMainURL] = useState("");
    const [celebMainFile, setCelebMainFile] = useState(null);

    const [artist, setArtist] = useState("");
    const [notice, setNotice] = useState("");

    // Insert Change
    const [isClick, setIsclick] = useState(false);

    const clickChageHandler = () => {
        setIsclick(true);
    }

    const handleCelebLogoUpload = (e) => {
        const fileL = e.target.files[0]; // 사용자가 선택한 첫 번째 파일 출력

        if (fileL) {
            setCelebLogoFile(fileL);
            const celebLogoURL1 = URL.createObjectURL(fileL);

            setCelebLogoURL(celebLogoURL1);
        } else {
            setCelebLogoFile(null);
            setCelebLogoURL('');
        }
    }

    const handleCelebMainUpload = (e) => {
        const fileM = e.target.files[0]; // 사용자가 선택한 첫 번째 파일 출력

        if (fileM) {
            setCelebMainFile(fileM);
            const celebMainURL1 = URL.createObjectURL(fileM);

            setCelebMainURL(celebMainURL1);
        } else {
            setCelebMainFile(null);
            setCelebMainURL('');
        }
    }

    const insertCelebListHandler = () => {
        const newItem = {
            artist: artist,
            celebimg: celebLogoURL,
            mainimg: celebMainURL,
            notice: notice,
            celebLogoFile: celebLogoFile,
            celebMainFile: celebMainFile
        };

        setCelebAddList([...celebAddList, newItem]);
    }

    // Celeb Data DB 저장
    const datatoServer = () => {

        celebAddList.map((item, i) => {
            const formdata = new FormData();

            // FormData 객체에 새로운 키 - 값 추가 
            formdata.append(`artist`, item.artist);
            formdata.append(`celebimg`, item.celebimg.substring(item.celebimg.lastIndexOf('/') + 1));
            formdata.append(`mainimg`, item.mainimg.substring(item.mainimg.lastIndexOf('/') + 1));
            formdata.append(`notice`, item.notice);
            formdata.append(`celebLogoFile`, item.celebLogoFile);
            formdata.append(`celebMainFile`, item.celebMainFile);

            apiCall('/api/celeb/celebSave', 'POST', formdata, null).then(response => {
                if (response.data) {
                    alert(`Upload Success Event FileName => ${item.celebimg}&${item.mainimg}`);
                } else {
                    alert(`Upload Failde Event FileName => ${item.celebimg}&${item.mainimg}`);
                }
            }).catch(err => {
                console.log("Celeb apiCall celebSave ERROR => " + err);
            })
        })
    }
    // 전체 삭제
    const celebDeleteAll = () => {
        setCelebAddList([]);
    }

    // 선택 삭제 (xi-close)
    const handleCelebInsertDelete = (index) => {
        const updatedCelebList = [...celebAddList];
        updatedCelebList.splice(index, 1); // 해당 인덱스의 항목을 배열에서 제거
        setCelebAddList(updatedCelebList); // 상태 업데이트
    }

    useEffect(() => {
        apiCall(`/api/celeb/celeblist`, "GET", null, null).then(response => {
            setCelebData(response.data);
        }).catch(err => {
            console.log("Celeb apiCall ERROR => " + err);
        });
    }, []);

    return (
        <div className="celebList_wrap">
            <div className="celebList_header">
                <TypeIt options={{ loop: false }} className="celebList_type">Celeb List</TypeIt>
            </div>
            <div className="celeb_infolist_wrap">
                <div className="celeb_insertBtn_plus" onClick={clickChageHandler}>
                    <p>Insert</p>
                </div>
                <div className="celeb_infolist_table_wrap">
                    <table className="celeb_infolist_table">
                        <thead>
                            <tr key="-1">
                                <th>
                                    <input type="checkbox" />
                                </th>
                                <th>Celeb Logo</th>
                                <th>Celeb Main Photo</th>
                                <th>Artist</th>
                                <th>Notice</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="celeb_infolist_container">
                            {
                                celebData.map((item, i) => (
                                    <tr key={i}>
                                        <td className="celeb_checkbox_container">
                                            <input type="checkbox" />
                                        </td>
                                        <td>
                                            <img src={imageSrc + item.celebimg} alt="celeb_IMG" className="celeb_infolist_image1" />
                                        </td>
                                        <td>
                                            <img src={mainSrc + item.mainimg} alt="celeb_IMG" className="celeb_infolist_image2" />
                                        </td>
                                        <td>{item.artist}</td>
                                        <td>{item.notice}</td>
                                        <td><i className="xi-trash" ></i></td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <form>
                <div className={`celebList_container ${isClick ? "active" : ""}`}>
                    <div className="celeblist_image_input">
                        <div className="celeblist_imagelist">
                            <img src={celebLogoURL ? celebLogoURL : noimage} alt="Upload Image" />
                            <img src={celebMainURL ? celebMainURL : noimage} alt="Upload Image" />
                        </div>
                        <div className="celeb_input_wrap">
                            <span>Celeb Logo File</span>
                            <input type="file" onChange={handleCelebLogoUpload} />
                            <span>Celeb Main File</span>
                            <input type="file" onChange={handleCelebMainUpload} />
                            <span>Artist</span>
                            <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
                            <span>Notice</span>
                            <input type="text" value={notice} onChange={(e) => setNotice(e.target.value)} />
                            <div className="celeb_btn_wrap1">
                                <button type="button" className="celeb_insert_btn" onClick={insertCelebListHandler}>Insert</button>
                            </div>
                        </div>
                    </div>
                    <div className="celeb_insert_list_wrap">
                        <span>Celeb List</span>
                        <div className="celeb_insert_list_contents">
                            <ul>
                                {
                                    celebAddList.map((item, index) => (
                                        <li key={index} className="celeb_insert_list_li">
                                            <img src={item.celebimg ? item.celebimg : noimage} alt="Celeb" />
                                            <img src={item.mainimg ? item.mainimg : noimage} alt="Celeb" />
                                            <p>{item.artist}</p>
                                            <p>{item.notice}</p>
                                            <p><i className="xi-close" onClick={() => handleCelebInsertDelete(index)}></i></p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="celeb_btn_wrap2">
                            <button type="reset" className="celeb_reset_btn" onClick={celebDeleteAll}>Erase All</button>
                            <button type="button" className="celeb_insert_btn2" onClick={datatoServer}>Add DB</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
import { useEffect, useState } from "react";
import "./SlideEvent.css";
import { apiCall } from "../../../service/apiService";

export default function SlideEvent() {
    const [eventData, setEventData] = useState([]);
    const imageSrc = process.env.PUBLIC_URL + "/event2IMG/";

    useEffect(() => {
        apiCall(`/api/event/eventlist`, "GET", null, null).then(response => {
            setEventData(response.data);
        }).catch(err => {
            console.log("SlideEvent apiCall ERROR => " + err);
        });
    }, []);

    const eventDelete = (ecode) => {
        apiCall(`/api/event/deleteByecode?ecode=${ecode}`, "GET", null, null).then(response => {
            setEventData(response.data);
        }).catch(err => {
            console.log("eventDelete apiCall ERROR => " + err)
        })
    }

    return (
        <div className="slideevent_wrap">
            <div className="event2_deleteList_wrap">
                <table className="event2_delete_table">
                    <thead>
                        <tr key="-1">
                            <th>
                                <input type="checkbox" />
                            </th>
                            <th>Thumbnail</th>
                            <th>Title</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody className="event2_deleteList_container">
                        {
                            eventData.map((item, i) => (
                                <tr key={i}>
                                    <td className="event2_checkbox_container">
                                        <input type="checkbox" />
                                    </td>
                                    <td>
                                    <img src={imageSrc + item.image1} alt="event2_IMG" className="event2_deleteList_image" />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.startdate}~{item.enddate}</td>
                                    <i className='xi-trash' onClick={() => eventDelete(item.ecode)}></i>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>

            </div>


        </div>
    );
}
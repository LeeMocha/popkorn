import "./Event2.css";
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import Event2Detail from "./Event2Detail";
import { Link } from 'react-router-dom';
import { apiCall } from "../service/apiService";

export default function Event2() {

   const imageSrc = process.env.PUBLIC_URL + "/event2IMG/";

   const [eventData, setEventData] = useState([]);

   useEffect(() => {
      apiCall(`/api/event/eventlist`, "GET", null, null).then(response => {
         setEventData(response.data);
      }).catch(err => {
         console.log("Event2 apiCall ERROR => "+err);
      })
   }, [])



   const dots = "●";

   const settings = {
      dots: false,
      infinite: true,
      speed: 700,
      autoplay: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      pauseOnHover: false,
      adaptiveHeight: true,
      variableWidth: true,
      draggable: true,
      responsive: [
         {
            breakpoint: 1500,
            settings: {
               slidesToShow: 2
            },
         },
         {
            breakpoint: 700,
            settings: {
               slidesToShow: 1
            },
         },
      ],
   };


   return (
      <div className="event2_wrap">
         <div>
            <Slider {...settings}>
               {
                  eventData.map((item, i) => {
                     return (
                        <div key={i} className="event2_slide_container">
                           <img src={item.image1} alt="event2_IMG" className="event2_IMG" />
                           <span className="event2_span1">
                              {item.title}</span><br></br>
                           <span className="event2_span2">{item.startdate}</span>
                        </div>
                     )
                  })
               }
            </Slider>
            <div className="event2_span_wrap">
               <Link to="/event2detail" />
            </div>
         </div>
      </div>
   );
}
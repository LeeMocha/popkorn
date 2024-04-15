import "./Event2.css";
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import Event2Detail from "./Event2Detail";
import { Link } from 'react-router-dom';

export default function Event2() {

   const imageSrc = process.env.PUBLIC_URL + "/event2IMG/";

   const [eventData, setEventData] = useState({
      // startData: ,
      // endData: ,
      title: "",
      type: 2,
      image1: "",
      content: ""
   });

   // useEffect(() => {
   //    apiCall(`/api/event/eventlist`, "GET", null, null).then(response => {
   //       setEventData({
   //          startData: response.data.startData,
   //          endData: response.data.endData,
   //          title: response.data.title,
   //          type: response.data.type,
   //          image1: response.data.image1,
   //          content: response.data.content
   //       })
   //    }).catch(err => {
   //       console.log("Event2 apiCall ERROR => "+err);
   //    })
   // }, [])

   const data = [
      {
         image: imageSrc + "event2_1.webp",
         title: "Welcom popKorn!! Let's push your Celeb!!",
         period: "2024-03-11 ~ 2024-05-01"
      },
      {
         image: imageSrc + "event2_2.webp",
         title: "Welcom popKorn!! Let's push your Celeb!!",
         period: "2024-03-11 ~ 2024-05-01"
      },
      {
         image: imageSrc + "event2_3.webp",
         title: "Welcom popKorn!! Let's push your Celeb!!",
         period: "2024-03-11 ~ 2024-05-01"
      },
      {
         image: imageSrc + "event2_4.webp",
         title: "Welcom popKorn!! Let's push your Celeb!!",
         period: "2024-03-11 ~ 2024-05-01"
      },
      {
         image: imageSrc + "event2_5.webp",
         title: "Welcom popKorn!! Let's push your Celeb!!",
         period: "2024-03-11 ~ 2024-05-01"
      },
      {
         image: imageSrc + "event2_6.webp",
         title: "Welcom popKorn!! Let's push your Celeb!!",
         period: "2024-03-11 ~ 2024-05-01"
      },
      {
         image: imageSrc + "event2_7.webp",
         title: "Welcom popKorn!! Let's push your Celeb!!",
         period: "2024-03-11 ~ 2024-05-01"
      },
      {
         image: imageSrc + "event2_8.webp",
         title: "Welcom popKorn!! Let's push your Celeb!!",
         period: "2024-03-11 ~ 2024-05-01"
      },
      {
         image: imageSrc + "event2_9.webp",
         title: "Welcom popKorn!! Let's push your Celeb!!",
         period: "2024-03-11 ~ 2024-05-01"
      },
      {
         image: imageSrc + "event2_10.webp",
         title: "Welcom popKorn!! Let's push your Celeb!!",
         period: "2024-03-11 ~ 2024-05-01"
      },
      {
         image: imageSrc + "event2_11.webp",
         title: "Welcom popKorn!! Let's push your Celeb!!",
         period: "2024-03-11 ~ 2024-05-01"
      },
      {
         image: imageSrc + "event2_12.webp",
         title: "Welcom popKorn!! Let's push your Celeb!!",
         period: "2024-03-11 ~ 2024-05-01"
      },
      {
         image: imageSrc + "event2_13.webp",
         title: "Welcom popKorn!! Let's push your Celeb!!",
         period: "2024-03-11 ~ 2024-05-01"
      },
   ]

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
                  data.map((item, i) => {
                     return (
                        <div key={i} className="event2_slide_container">
                           <img src={item.image} alt="event2_IMG" className="event2_IMG" />
                           <span className="event2_span1">
                              {item.title}</span><br></br>
                           <span className="event2_span2">{item.period}</span>
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
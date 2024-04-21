import { useEffect, useState } from "react";
import "./CelebComunity.css";
import { useLocation } from "react-router-dom";
import { apiCall } from "../service/apiService";
import Header from './../header/Header';
import Footer from './../footer/Footer';

export default function CelebComunity (){

   const imgSrc = process.env.PUBLIC_URL + "/celebIMG/"
   const Location = useLocation();
   const celeb = Location.state;
   const [dialoge, setDialoge] = useState([]);

   useEffect(()=>{
      apiCall(`/api/member/artistcomunity/artistfeed`, "GET", celeb, sessionStorage.getItem('token'))
      .then(response => setDialoge(response.data))
      .catch(err =>{
         if(err===403){
            alert('로그인 후 사용 가능합니다.')
            window.history.back()
         }
      })

   }, [])

   return (
      <>
      <Header />
      <div className="celeb_comunity_wrap">
         <div className="celeb_feed_wrap">
            <span className="celeb_feed_totallikey"><i className="xi-star"></i>Total Likey : </span>&nbsp;<span className="celeb_feed_totallikey_cnt">{100050}</span>
            <img src={imgSrc+celeb.celebimg} alt="" className="celeb_feed_logo"/>
         </div>
      </div>
      <Footer/>
      </>
   ); 
}
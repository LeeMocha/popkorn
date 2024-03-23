import { useState } from "react";
import "./Celeb.css";
import Slidebar from "./slidebar/Slidebar";
import MoreCeleb from "./moreceleb/MoreCeleb";
import { useEffect } from "react";
import axios from 'axios';


export default function Celeb() {

   const [isSlider, setIsSlider] = useState(true);
   const [celebs, setCelebs] = useState([]);

   const moreBTNHandler = () => {
      isSlider ? setIsSlider(false) : setIsSlider(true)
   }

   useEffect(()=> {
      axios.get("/api/celeb/celeblist")
      .then(response=>{
         console.log(response.data)
         setCelebs(response.data);
      }).catch( err => console.log(err))
      
   }, [])

   return (
      <div className="celeb_wrap">
         <div className="span_div">
            <span>CELEB for You !</span>
            <span className="celeb_morebtn" onClick={moreBTNHandler}>More...</span>
         </div>
         <div className={`celebbar ${isSlider ? '' : 'moreActive'}`}>
            <div className="celebbar_gradient1">
               <div className={`celebbar_gradient2 ${isSlider ? '' : 'moreActive'}`}>
                  {
                     isSlider ?
                        <Slidebar celebs={celebs}/>
                        : celebs.map((celeb,index)=><MoreCeleb celeb={celeb}/>)
                  }
               </div>
            </div>
         </div>
      </div>
   );
}
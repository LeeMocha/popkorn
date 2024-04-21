
import { useEffect, useState } from "react";
import Header from "../header/Header";
import "./CelebListPage.css"
import { apiCall } from "../service/apiService";
import CelebSlot from "./CelebSlot";


export default function CelebListPage() {

   const [celebList, setCelebList] = useState([]);

   useEffect(()=>{
      apiCall(`/api/celeb/celeblist`, "GET", null, null)
      .then(response => setCelebList(response.data))
      .catch(err => console.log(err))
   }, [])

   return (
      <>
         <Header></Header>
         <div className="celeblistpage_wrap">
            <span className="meet_new_celeb_span"><i className="xi-star-o"></i> Meet new Celebs here!</span>
            <div className="celebs_list_container">
            {
               celebList.map((celeb, index) => 
               <CelebSlot key={index} celeb={celeb} />
               )
            }

            </div>
         </div>
      </>
   );
}
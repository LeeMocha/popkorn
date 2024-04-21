import { Link } from "react-router-dom";
import "./CelebSlot.css";
import { apiCall } from "../service/apiService";


export default function CelebSlot({ celeb, isLike }) {

   const imgSrc = process.env.PUBLIC_URL + "/celebIMG/"

   const likeyHandler = () => {
      apiCall(`/api/member/likey/saveordelete`, 'POST', celeb, sessionStorage.getItem('token'))
      .then()
      .catch()
   }

   return (
      <div className="celeb_slot_wrap">
         {
            isLike?
            <i className="xi-star" onClick={likeyHandler}></i>
            :
            <i className="xi-star-o" onClick={likeyHandler}></i>
         }
         <Link to='/celebcomunity' state={celeb}>
            <div className="celeb_slot_imgwrap">
               <img src="" alt="" />
            </div>
            <div className="celeb_span_wrap">
               <img src={imgSrc + celeb.celebimg} alt="" />
            </div>
            <div className="celeb_span2_wrap">
               <span>{celeb.artist}</span>
            </div>
         </Link>
      </div>
   );
}
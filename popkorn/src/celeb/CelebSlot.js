import "./CelebSlot.css";

export default function CelebSlot({ celeb }) {

   const imgSrc = process.env.PUBLIC_URL + "/celebIMG/"

   return (
      <div className="celeb_slot_wrap">
         <div className="celeb_slot_imgwrap">
            <img src="" alt="" />
            <i className="xi-star-o"></i>
         </div>
         <div className="celeb_span_wrap">
            <img src={imgSrc + celeb.celebimg} alt="" />
         </div>
         <div className="celeb_span2_wrap">
            <span>{celeb.artist}</span>
         </div>
      </div>
   );
}
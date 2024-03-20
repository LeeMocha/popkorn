import "./Celeb.css";
import Slidebar from "./slidebar/Slidebar";


function Celebbar() {
   return (
      <div className="celebbar">
         <div className="celebbar_gradient1">
         </div>
            <div className="celebbar_gradient2">
               <Slidebar />
            </div>
      </div>
   );
}

export default function Celeb() {
   return (
      <div className="celeb_wrap">
         <div className="span_div">
            <span>CELEB for You !</span>
            <span>More...</span>
         </div>
         <Celebbar />
      </div>
   );
}
import { Link } from "react-router-dom";

export default function Menulist({ isScrolled }) {

   return (
      <div className={`menu_wrap ${isScrolled ? "fade-out" : ""}`}>
         <Link to="/celeblistpage"><span className="menuli" onClick={()=>window.scrollTo(0, 0)}>CELEB</span></Link>
         <Link to="/productpage"><span className="menuli"  onClick={()=>window.scrollTo(0, 0)}>PRODUCT</span></Link>
         <Link to="/AdminMain"><span className="menuli">ADMIN</span></Link>
      </div>
   );
}
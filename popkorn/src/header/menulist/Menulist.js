import { Link } from "react-router-dom";

export default function Menulist({ isScrolled }) {
   // const [scrollTarget, setScrollTarget] = useState(null);

   const handleLinkClick = (target) => {
      const targetElement = document.querySelector(target);
      if (targetElement) {
         targetElement.scrollIntoView({ behavior: "auto", block: "center"});
      };
   }
   return (
      <div className={`menu_wrap ${isScrolled ? "fade-out" : ""}`}>
         <span className="menuli" onClick={() => handleLinkClick(".celeb_wrap")}>CELEB</span>
         <Link to="/productpage"><span className="menuli">PRODUCT</span></Link>
         <span className="menuli" onClick={() => handleLinkClick(".event2_wrap")}>EVENT</span>
      </div>
   );
}
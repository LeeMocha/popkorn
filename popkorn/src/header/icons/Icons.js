
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Logincontext } from './../../App';

export default function Icons({isScrolled}) {

   const [isLoggedIn, setIsloggedIn] = useContext(Logincontext);


   const logOut = ()=>{
      sessionStorage.clear();
      setIsloggedIn(false);
   }

   return (
      <div className={`icons_wrap ${isScrolled? 'fade-out' : ''}`}>
         <Link to="/search"><i className="xi-search"></i></Link>
         <Link to={isLoggedIn?'/MyPageMain':'/AuthMain'}><i className="xi-user-o"></i></Link>
         <Link to="/cart"><i className="xi-cart-o"></i></Link>
         <i className="xi-log-out" onClick={logOut}></i>
      </div>
   );
}
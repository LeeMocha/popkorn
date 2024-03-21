
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Logincontext } from './../../App';
import axios from "axios";
export default function Icons({isScrolled}) {

   const [isLoggedIn, setIsloggedIn] = useContext(Logincontext);


   const logOut = async () => {
      try {
      await axios.get('/api/user/logout');
      alert(`로그아웃 되었습니다.`)
      sessionStorage.removeItem('loginID');
      setIsloggedIn(false);
      } catch (error) {
        console.error('로그인 확인 중 오류 발생:', error);
        return false;
      }
    };

   return (
      <div className={`icons_wrap ${isScrolled? 'fade-out' : ''}`}>
         <Link to="/search"><i className="xi-search"></i></Link>
         <Link to={isLoggedIn?'/MyPageMain':'/AuthMain'}><i className="xi-user-o"></i></Link>
         <Link to="/cart"><i className="xi-cart-o"></i></Link>
         <Link to ="/"><i className="xi-log-out" onClick={logOut}></i></Link>
      </div>
   );
}
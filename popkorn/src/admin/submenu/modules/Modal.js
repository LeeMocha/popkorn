
import "./Modal.css";

export default function Modal ({component}){
   return (
      <div className="modal_wrap">
         <div className="modal_header"></div>
         {component}
      </div>
   );
}
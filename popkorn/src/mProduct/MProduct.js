

import "./MProduct.css";
import Mcontents from "./contents/Mcontents";

export default function MProduct() {
   return (
      <div className="mproduct_wrap">
         <div className="span_div">
            <span className="mp_span">PRODUCT</span>
         </div>
         <Mcontents />
      </div>
   );
}
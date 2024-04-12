import { useEffect, useState } from "react";
import Slot from "../slot/Slot";
import { apiCall } from "../../service/apiService";

export default function Mcontents({selectCeleb}) {

   const [artistProducts, setArtistProducts] = useState([]);
   const logoSrc = process.env.PUBLIC_URL + '/celebIMG/';

   useEffect(()=>{
      apiCall(`/api/product/findByArtist?artist=${selectCeleb.artist}`, "GET", null, null)
      .then(response=>{
         setArtistProducts(response.data)
      }).catch(err => console.log)
   }, [selectCeleb.artist])

   const [elseKey, setElseKey] = useState(0); // Key 값을 변경하기 위한 상태

   useEffect(() => {
       // productData가 변경될 때마다 key 값을 업데이트하여 Else 컴포넌트를 새로 마운트
       setElseKey(prevKey => prevKey + 1);
   }, [artistProducts]);

   return (
      <div className="mcontent_grid_container">
         <div className="artistLogo" onClick={gotoCelebsProduct}>
            <img src={logoSrc+selectCeleb.celebimg} alt="celeb_img" className="mp_artistLogo_img"/>
            <span>{selectCeleb.artist}</span>
         </div>
         {
            artistProducts.map((item, i) => {
                  return <div key={i} className="mp_i_wrap"><Slot key={elseKey} item={item} index={i}/></div>;
            })
         }

      </div>
   );
}
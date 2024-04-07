
import { useState } from "react";
import "./SearchForm.css";

export default function SearchForm({setCurrKeyword}) {

   const [searchKeyword, setSearchKeyword] = useState('');

   const onChangeSearch = (e) => {
      setSearchKeyword(e.target.value);
   }

   const getSearchData = () => {
      setCurrKeyword(searchKeyword);
   }

   return (
      <div className="searchform_wrap">
         <div>
            <input type="text" className="searchform_input" placeholder="Search" onChange={onChangeSearch}/>
            <button type="button" className="searchform_btn" onClick={getSearchData}><i className="xi-search"></i></button>
         </div>
         <div>
            <button type="button" className="searchform_add_btn">delete</button>
         </div>
      </div>
   );
}
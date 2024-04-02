
import { useState } from "react";
import "./SearchForm.css";
import { apiCall } from "../../../service/apiService";

export default function SearchForm({setDataState, entity}) {

   const [searchKeyword, setSearchKeyword] = useState('');

   const onChangeSearch = (e) => {
      setSearchKeyword(e.target.value);
   }

   const getSearchData = () => {
      if(searchKeyword!==''){
         apiCall(`/api/${entity}/searchlist?keyword=${searchKeyword}&page=1`, "GET", null, null)
         .then(response => {
            console.log(response.data)
            setDataState(response.data);
         })
         .catch(err => {
            console.error('Error searching data:', err);
         })

      }
   }

   return (
      <div className="searchform_wrap">
         <div>
            <input type="text" className="searchform_input" placeholder="Search" onChange={onChangeSearch}/>
            <button type="button" className="searchform_btn" onClick={getSearchData}><i className="xi-search"></i></button>
         </div>
         <div>
            <button type="button" className="searchform_add_btn">Add</button>
         </div>
      </div>
   );
}
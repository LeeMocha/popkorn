
import { useEffect, useState } from "react";
import "./product.css";
import axios from "axios";
import TypeIt from "typeit-react";
import SearchForm from "../modules/SearchForm";
import ListForm from "../modules/ListForm";

export default function TotalList() {
   const [page, setPage] = useState(1);
   const [data, setDataState] = useState({
      productList: {
         content: []
      },
      totalstockcnt: 0,
      todaycnt: 0,
      monthcnt: 0
   });

   useEffect(() => {
      axios.get(`/api/product/productlist?page=${page}&size=20`)
         .then(response => {
            setDataState(response.data);
         })
         .catch(error => {
            console.error('Error fetching data:', error);
         });
   }, [page]);

   return (
      <div className="productlist_wrap">
         <div className="productlist_header">
            <TypeIt options={{ loop: false }} className="productlist_type">Total List</TypeIt>
         </div>
         <div className="productlist_statistical">
            <div><span>TOTAL PRODUCT</span><span>{data.dashboard1}</span></div>
            {/* <div><span>TODAY's SALES</span><span>{data.dashboard2}</span></div>
            <div><span>MONTHLY SALES</span><span>{data.dashboard3}</span></div> */}
         </div>
         <SearchForm setDataState={setDataState} entity={"product"} />
         <ListForm data={data.dtoList} setDataState={setDataState} setPage={setPage} pk={"pcode"} />
      </div>
   )
}
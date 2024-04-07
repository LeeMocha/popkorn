
import { useEffect, useRef, useState } from "react";
import "./product.css";
import TypeIt from "typeit-react";
import SearchForm from "../modules/SearchForm";
import ListForm from "../modules/ListForm";
import { apiCall } from "../../../service/apiService";

export default function TotalList() {

   const currCategoryl = useRef('all');
   const [currCategorym, setCurrCategorym] = useState('All');
   const [currKeyword, setCurrKeyword] = useState('');
   const [pageState, setPageState] = useState(1);
   const [productData, setProductData] = useState({
      servData: [],
      pageData: {
         page: 1,
         size: 0,
         prev: false,
         next: true,
         start: 0,
         end: 0,
         pageList: []
      }
   });
   const categoryList = [
      {
         name: "all",
         subcategorys: [
            { subCategorysId: 1, name: "all" }
         ]
      },
      {
         name: "album",
         subcategorys: [
            { subCategorysId: 3, name: "All" }
         ]
      },
      {
         name: "goods",
         subcategorys: [
            { subCategorysId: 4, name: "Official Fanlight" },
            { subCategorysId: 5, name: "Key Ring" },
            { subCategorysId: 6, name: "Phone Case" },
            { subCategorysId: 7, name: "ETC" }
         ]
      },

      {
         name: "photo",
         subcategorys: [
            { subCategorysId: 8, name: "Photo Book" },
            { subCategorysId: 9, name: "Photo Card" }
         ]
      }
   ]

   useEffect(() => {

      apiCall(`/api/product/searchlist?categoryl=${currCategoryl.current}&categorym=${currCategorym}&page=${pageState}&keyword=${currKeyword}`, "GET", null, null).then(response => {
         setProductData({
            servData: response.data.dtoList,
            pageData: {
               page: response.data.page,
               size: response.data.size,
               prev: response.data.prev,
               next: response.data.next,
               start: response.data.start,
               end: response.data.end,
               pageList: response.data.pageList,
               totalPage: response.data.totalPage
            }
         })
      }).catch(err => {
         console.log("ProductPage axios ERROR=>" + err);
      })
   }, [pageState, currKeyword, currCategorym])

   return (
      <div className="productlist_wrap">
         <div className="productlist_container">
            <div className="productlist_header">
               <TypeIt options={{ loop: false }} className="productlist_type">Total List</TypeIt>
            </div>
            <div className="productlist_statistical">
               <div><span>TOTAL PRODUCT</span><span></span></div>
               {/* <div><span>TODAY's SALES</span><span>{data.dashboard2}</span></div>
            <div><span>MONTHLY SALES</span><span>{data.dashboard3}</span></div> */}
            </div>
         </div>
         <div className="admincategory_wrap">
            <div>

               <select onChange={(e) => {
                  currCategoryl.current = e.target.value;
                  setCurrCategorym(categoryList.find(sub => sub.name === e.target.value)?.subcategorys[0].name);
                  setPageState(1);
               }} value={currCategoryl.current}>
                  <option value="all" key="0">All</option>
                  <option value="album" key="1">ALBUM</option>
                  <option value="goods" key="2">GOODS</option>
                  <option value="photo" key="3">PHOTO</option>
               </select>
               &nbsp;
               <select onChange={(e) => {
                  setCurrCategorym(e.target.value)
                  setPageState(1);
               }}>
                  <option value="all" key="0">All</option>
                  {categoryList.find(sub => sub.name === currCategoryl.current)?.subcategorys.map(subcategory =>
                     <option value={subcategory.name} key={subcategory.subCategorysId}>{subcategory.name}</option>
                  )}
               </select>
            </div>
            <SearchForm setCurrKeyword={setCurrKeyword} entity={"product"} />
         </div>
         <ListForm data={productData.servData} setDataState={setProductData} pk={"pcode"} entity={'product'} pageData={productData.pageData} setPageState={setPageState} />
      </div>
   )
}
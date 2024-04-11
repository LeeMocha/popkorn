import React from 'react';
import { useState } from 'react';

import "./ListForm.css";
import { apiCall } from '../../../service/apiService';
import AdminPaging from './AdminPaging';

// 공통된 컬럼 추출
function extractCommonColumns(data) {
   if (!Array.isArray(data) || data.length === 0) return [];

   // 첫 번째 데이터 항목의 속성을 기준으로 초기화
   const commonColumns = Object.keys(data[0]);

   // 나머지 데이터 항목과 비교하여 공통된 속성만 남기기
   for (let i = 1; i < data.length; i++) {
      Object.keys(data[i]).forEach(key => {
         if (!commonColumns.includes(key)) {
            const index = commonColumns.indexOf(key);
            if (index !== -1) {
               commonColumns.splice(index, 1);
            }
         }
      });
   }

   return commonColumns;
}

export default function ListForm({ data, setDataState, pk, entity, pageData, setPageState }) {

   const [tooltipContent, setTooltipContent] = useState(null);  // ellipse 를 표현하기위한 tooltip state
   const commonColumns = extractCommonColumns(data);
   const imageSrc = process.env.PUBLIC_URL + `/${entity}IMG/`
   

   if (!Array.isArray(data) || data.length === 0) {
      return <div className='listform_nodata'>No data provided.</div>;
   }

   const handleCellMouseEnter = (content) => {
      setTooltipContent(content);
   };

   const handleCellMouseLeave = () => {
      setTooltipContent(null);
   };

   const deleteDate = (id) => {
      apiCall(`/api/${entity}/delete?${pk}=${id}`, "GET", null, null)
         .then(response => {
            setDataState({
               ...response.data,
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
            });
            setPageState(response.data.page);
         })
         .catch(error => {
            console.error('Error fetching data:', error);
         });
   }

   return (
      <div className='listform_container'>
         <div className="listform_wrap">
            <table className="listform_table">
               <thead>
                  <tr key="-1">
                     <th>
                        <input type="checkbox" />
                     </th>
                     {commonColumns.map((columnName, index) => (
                        <th key={index}>
                           {columnName}
                           <i className="xi-caret-down-min"></i>
                        </th>
                     ))}
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody className='tbody'>
                  {data.map((item, rowIndex) => (
                     <tr key={rowIndex}>
                        <td className='checkboxcontainer'>
                           <input type="checkbox" />
                        </td>

                        {commonColumns.map((columnName, colIndex) => (
                           <td key={colIndex}>{
                              columnName === "image1" ?
                                 <div className='list_form_img_div'>
                                    <img className='list_form_img' src={imageSrc + item[columnName]} alt={item[columnName]}></img>
                                    <span>{item[columnName]}</span>
                                 </div>
                                 :
                                 columnName !== "status" && columnName !== "categoryl" ? (
                                    <span
                                       title={`${item[columnName]}`}
                                       onMouseEnter={() => handleCellMouseEnter(item[columnName])}
                                       onMouseLeave={handleCellMouseLeave}>{item[columnName]}</span>
                                 ) : (
                                    <div className={`status ${item[columnName].toLowerCase()}`}><span title={`${item[columnName]}`}
                                       onMouseEnter={() => handleCellMouseEnter(item[columnName])}
                                       onMouseLeave={handleCellMouseLeave}
                                    >{item[columnName]}</span>
                                    </div>
                                 )}
                           </td>
                        ))}
                        <td>
                           <i className='xi-pen-o' ></i>
                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           <i className='xi-trash' onClick={() => deleteDate(item[pk])}></i>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className='listform_pagenation'>
            <AdminPaging pageData={pageData} setPageState={setPageState} />
         </div>
      </div>
   );
}
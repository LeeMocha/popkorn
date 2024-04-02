import React from 'react';
import { useState } from 'react';

import "./ListForm.css";
import { apiCall } from '../../../service/apiService';

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

export default function ListForm({ data, setDataState, pk }) {

   const [tooltipContent, setTooltipContent] = useState(null);  // ellipse 를 표현하기위한 tooltip state
   const commonColumns = extractCommonColumns(data);

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
      apiCall(`/api/user/delete?id=${id}`, "GET", null, null)
      .then(response => {
         setDataState(response.data);
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
                        <td>
                           <input type="checkbox" />
                        </td>
                        {commonColumns.map((columnName, colIndex) => (
                           <td key={colIndex}
                              onMouseEnter={() => handleCellMouseEnter(item[columnName])}
                              onMouseLeave={handleCellMouseLeave}>
                              {columnName !== "status" && columnName !=="categoryl" ? item[columnName] : (
                                 <div className={`status ${item[columnName].toLowerCase()}`}><span>{item[columnName]}</span></div>
                              )}
                           </td>
                        ))}
                        <td>
                           <i className='xi-pen-o' ></i>
                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           <i className='xi-trash' onClick={()=>deleteDate(item[pk])}></i>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className='listform_pagenation'>
            <i className='xi-angle-left-min two'></i><i className='xi-angle-left-min one'></i>
            <span>12345</span>
            <i className='xi-angle-right-min one' ></i><i className='xi-angle-right-min two'></i>
         </div>
      </div>
   );
}
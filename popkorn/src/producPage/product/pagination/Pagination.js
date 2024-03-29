import { useState } from "react"

import "./Pagination.css";

export default function Pagination({ pageData, setPageData }) {

    const [page, setPage] = useState(pageData.page);

    const displayPageNo = 5;
    const spageNum = (epageNum - displayPageNo) + 1;
    const epageNum = Math.ceil(pageData.page / displayPageNo) * displayPageNo;
    
    const lastPageNo = Math.ceil(pageData.totalPage / pageData.size);
        if(epageNum > lastPageNo) {
            epageNum = lastPageNo;
        }
    
    const pageArray = () => {
        
    }


  
    return (
        <div className="paging_wrap">
            <ul className="paging_container">
                <li className="page_prev" onClick={() => setPage(page - 1)} disabled={page === 1}
                >
                    &lt;
                </li>
                <li>
                    

                </li>

            </ul>
        </div>
    )
}
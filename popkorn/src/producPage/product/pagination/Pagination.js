import { useState } from "react"

import "./Pagination.css";
import { Link } from "react-router-dom";

export default function Pagination({ pageData, setPageData, menuHandler }) {

    const [page, setPage] = useState(pageData.page);

    const displayPageNo = 5;
    const epageNum = Math.ceil(pageData.page / displayPageNo) * displayPageNo;
    const spageNum = Math.max(1, epageNum - displayPageNo) + 1;
    
    const lastPageNo = Math.ceil(pageData.totalPage / pageData.size);
        if(epageNum > lastPageNo) {
            epageNum = lastPageNo;
        }
    
    const handlePageChange = (pageNumber) => {
        setPageData({...pageData, page : pageNumber});
        menuHandler()
    }
    
    const pageArray = () => {
        const pages = [];
        for(let i = spageNum; i <= epageNum; i++) {
            pages.push(i);
        }
        return pages;
    }

    return (
        <div className="paging_wrap">
            <ul className="paging_container">
                <li className="page_prev" onClick={() => handlePageChange(page - 1)} disabled={page === 1}
                >
                    &lt;
                </li>
                <li>

                </li>
                {
                    pageArray().map((i) => 
                        <li key={i}>
                            {
                                i === page ? (
                                    <p>{i}</p>
                                ) : (
                                    <Link to={`#${i}`} onClick={() => handlePageChange(i)} >
                                        {i}
                                    </Link>
                                )
                            }
                        </li>
                    )
                }
                {/* {
                    pageData.pageList.map(page => (
                        <li key={page}>
                            <Link to={``}>

                            </Link>
                        </li>
                    ))
                } */}
                <li className="page_next" onClick={() => handlePageChange(page + 1)} disabled={page === lastPageNo}> 
                &gt;
                </li>
            </ul>
        </div>
    )
}


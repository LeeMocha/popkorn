

import "./Pagination.css";


export default function Pagination({ pageData, setPageData }) {

    const pageHandeler = (pagenum) => {
        setPageData({ ...pageData, page: pagenum });
    }

    return (
        <div className="paging_wrap">
            <div className="paging_prev_div">

            </div>
            <div className="paging_pagenum_div">
                {
                    pageData.pageList.map((pagenum) =>
                        <span className={pageData.page === pagenum ? 'currpagenum' : 'pagenum'} onClick={() => { pageHandeler(pagenum) }}>{pagenum}</span>
                    )
                }
            </div>
            <div className="paging_next_div">

            </div>
        </div>
    )
}


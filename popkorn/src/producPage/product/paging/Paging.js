import { useState } from "react"

export default function Paging({pageData , setPageData}) {
    const [page, setPage] = useState(pageData.page);

    return (
        <div className="paginationWrapper">
            {/* fa-angle-double-left */}
            <button onClick={() => setPage(1)} disabled={pageData.page===1}>
            &lt;&lt;
            </button>
            {/* angle-left */}
            <button onClick={() => setPage(pageData.page-1)} disabled={pageData.page===1}>
                &lt;
            </button>
            {/* pageArray */}
            <button 
                onClick={() => setPage(pageData.page)}
                aria-current={page === pageData.page ? "page" : null}>
                {pageData.page}
            </button>

            {
                // Array(4).fill().map((v, i) => {
                //     if(i <= 2) {    
                //         return (
                //             <button key={i+1} 
                //                 onClick={() => setPage(pageData.page+i)}
                //                 aria-current={page === pageData.page+i ? "page" : null}>
                //                 {pageData.page}
                //             </button>
                //         )
                //     }else if(i >= 3) {
                //         return (
                //             <button key={i+1}
                //                 onClick={() => setPage(pageData.end)}
                //                 aria-current={page === pageData.end ? "page" : null}>
                //                 {pageData.end}
                //             </button>
                //         )
                //     }
                // })
            }

            {/* <angle-right /> */}
            <button onClick={() => setPage(pageData.page+1)} disabled={pageData.page===pageData}>
            &gt;
            </button>
            {/* <fa-angle-double-right /> */}
            <button onClick={() => setPage(pageData)} disabled={pageData.page===pageData}>
            &gt;&gt;
            </button>
        </div>
    )
}


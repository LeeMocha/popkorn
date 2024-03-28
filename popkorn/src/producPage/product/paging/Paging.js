import { useState } from "react"

export default function Paging({pageData}) {
    const [page, setPage] = useState(pageData.page);

    const [currPage, setCurrPage] = useState(page);

    let firstNum = currPage - (currPage % 5) + 1
    let lastNum = currPage - (currPage % 5) + 5

    return (
        <div className="paginationWrapper">
            {/* fa-angle-double-left */}
            <button onClick={() => setPage(1)} disabled={page===1}>
            &lt;&lt;
            </button>
            {/* angle-left */}
            <button onClick={() => setPage(page-1)} disabled={page===1}>
                &lt;
            </button>
            {/* pageArray */}
            <button 
                onClick={() => setPage(pageData.start)}
                aria-current={page === pageData.start ? "page" : null}>
                {pageData.start}
            </button>

            {
                Array(4).fill().map((v, i) => {
                    if(i <= 2) {    
                        return (
                            <button key={i+1} 
                                onClick={() => setPage(firstNum+1+i)}
                                aria-current={page === firstNum+1+i ? "page" : null}>
                                {firstNum+1+i}
                            </button>
                        )
                    }else if(i >= 3) {
                        return (
                            <button key={i+1}
                                onClick={() => setPage(lastNum)}
                                aria-current={page === lastNum ? "page" : null}>
                                {lastNum}
                            </button>
                        )
                    }
                })
            }

            {/* <angle-right /> */}
            <button onClick={() => setPage(page+1)} disabled={page===servData}>
            &gt;
            </button>
            {/* <fa-angle-double-right /> */}
            <button onClick={() => setPage(servData)} disabled={page===servData}>
            &gt;&gt;
            </button>
        </div>
    )
}


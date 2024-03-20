import { useState } from "react"

export default function Paging({totalPage, limit, page, setPage}) {
    const [currPage, setCurrPage] = useState(page);
    const pagesNum = Math.ceil(totalPage/limit)

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
                onClick={() => setPage(firstNum)}
                aria-current={page === firstNum ? "page" : null}>
                {firstNum}
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
            <button onClick={() => setPage(page+1)} disabled={page===pagesNum}>
            &gt;
            </button>
            {/* <fa-angle-double-right /> */}
            <button onClick={() => setPage(pagesNum)} disabled={page===pagesNum}>
            &gt;&gt;
            </button>
        </div>
    )
}


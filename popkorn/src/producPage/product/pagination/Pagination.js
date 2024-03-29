

import "./Pagination.css";
import StackChart from '../../../admin/submenu/modules/chart/StackChart';

// pageData.prev 는 false 로 넘어옴 
// pageData.prev가 ture 일 때 pageData.page(1)로 이동


export default function Pagination({ pageData, setPageData, menuHandler }) {

    const pageHandeler = (pagenum) => {
        setPageData({ ...pageData, page: pagenum });
    }

    const prevHandeler = () => {
       if(pageData.page > 1) {
        setPageData({...pageData, page: 1});
       }
       return setPageData;
    }

    const nextHandeler = () => {
        if(pageData.page > 0) {
            setPageData({...pageData, page: pageData.end})
        }
        return setPageData;
    }


    console.log(pageData.prev)
    return (
        <div className="paging_wrap">
            <div className="paging_prev_div">
                <span className="fa_angle_double_left" onClick={prevHandeler}>
                &lt;&lt;
                </span>
                <span className="angle_left">

                </span>
            </div>
            <div className="paging_pagenum_div">
                {
                    pageData.pageList.map((pagenum) =>
                        <span className={pageData.page === pagenum ? 'currpagenum' : 'pagenum'} onClick={() => { pageHandeler(pagenum) }}>{pagenum}</span>
                    )
                }
            </div>
            <div className="paging_next_div">
                <span className="angle_right">

                </span>
                <span className="fa_angle_double_right" onClick={nextHandeler}>
                &gt;&gt;
                </span>
            </div>
        </div>
    )
}


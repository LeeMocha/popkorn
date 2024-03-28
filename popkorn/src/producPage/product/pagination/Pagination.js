
import { Link } from 'react-router-dom';

export default function Pagination({ pageData }) {
   


    return (
        <div className="paging_wrap">
            <ul className="paging_container">
                {
                    pageData.prev && (
                        <li className="page_prev">
                            <Link to={`/productpage/findByCategorylAndCategorym?page=${page}`} />
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
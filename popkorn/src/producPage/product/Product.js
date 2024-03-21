import { useEffect, useRef, useState } from "react";
// import axios from "axios";
import ProductItems from "./productItems/ProductItems";
import Paging from "./paging/Paging";

const Product = () => {
    // totalPage, maximum


    const [productInfo, setProductInfo] = useState([]);
    const [page, setPage] = useState(1); // 페이지



    const totalPage = useRef();
    const limit = 12;

    const begin = (page - 1) * limit
    
    return (
        <div>
            <div>
                <ProductItems info={productInfo} />
            </div>

            <div>
                <Paging
                    totalPage={totalPage} // 전체 페이지 
                    limit={limit} // 한 화면에 표시한 Product 갯 수 
                    page={page} // 페이지 상태 값
                    setPage={setPage} >
                </Paging>
            </div>

        </div>
    )
}

export default Product;
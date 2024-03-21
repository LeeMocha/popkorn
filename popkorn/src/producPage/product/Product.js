import Slot2 from "./slot2/Slot2";
import "./Product.css";

import Paging from "./paging/Paging";

import { useEffect, useState } from "react";
import axios from "axios";

const Product = ({ currCategoryl, currCategorym }) => {

    const [servData, setServDate] = useState([]);

    useEffect(() => {
        axios.get(`/api/product/productlist?categoryl=${currCategoryl}&categorym=${currCategorym}`)
            .then(response => {
                setServDate(response.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <>
            <div className="product_wrap">
                {
                    servData.map((item, index) =>
                            <Slot2 key={index} item={item} index={index} />
                    )
                }
            </div>
            {/* <div>
                <Paging
                totalPage={totalPage} // 전체 페이지 
                limit={limit} // 한 화면에 표시한 Product 갯 수 
                page={page} // 페이지 상태 값
                setPage={setPage} >
                </Paging>
            </div> */}
        </>
    )
}

export default Product;
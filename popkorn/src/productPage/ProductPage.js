import axios from "axios"
import { useEffect, useRef, useState } from "react"
import Header from "../header/Header";
import Category from "./category/Category";
import Popkornlogo from "./popkornlogo/Popkornlogo";
import Product from "./product/Product";
import { apiCall } from "../service/apiService";

export default function ProductPage() {
    const currCategoryl = useRef('new');
    const [currCategorym, setCurrCategorym] = useState('New');
    const [pageState, setPageState] = useState(1);
    const [productData, setProductData] = useState({
        servData: [],
        pageData: {
            page: 1,
            size: 0,
            prev: false,
            next: true,
            start: 0,
            end: 0,
            pageList: []
        }
    });

    useEffect(() => {
        apiCall(`/api/product/findByCategorylAndCategorym?categoryl=${currCategoryl.current}&categorym=${currCategorym}&page=${pageState}`,"GET",null,null).then(response => {
            setProductData({
                servData: response.data.dtoList,
                pageData: {
                    page: response.data.page,
                    size: response.data.size,
                    prev: response.data.prev,
                    next: response.data.next,
                    start: response.data.start,
                    end: response.data.end,
                    pageList: response.data.pageList,
                    totalPage: response.data.totalPage
                }
            })
        }).catch(err => {
            console.log("ProductPage axios ERROR=>" + err);
        })
    }, [currCategorym, pageState])

    return (
        <div className="product_page_wrap">
            <Header/>

            <Category currCategoryl={currCategoryl} setCurrCategorym={setCurrCategorym} setPageState={setPageState}/>

            <Product currCategoryl={currCategoryl} currCategorym={currCategorym} productData={productData} setPageState={setPageState}/>

            <Popkornlogo/>

        </div>
    )
}
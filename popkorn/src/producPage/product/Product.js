import Slot2 from "./slot2/Slot2";

import "./Product.css";

import { useEffect, useState } from "react";
import axios from "axios";

const Product = ({ currCategoryl, currCategorym }) => {

    const [servData, setServDate] = useState([]);

    useEffect(() => {
        axios.get(`/api/product/findByCategorylAndCategorym?categoryl=${currCategoryl}&categorym=${currCategorym}&page=1`)
            .then(response => {
                setServDate(response.data.dtoList)
            }).catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <>
            <div className="product_wrap">
                {
                    currCategoryl ==='new'&&currCategorym==='all'?
                    <>
                        <div className="pruduct_album_wrap">
                            <span className="pruduct_album_wrap_span"><i className="xi-album"></i> ALBUM</span>
                            <div className="pruduct_album_wrap_slot">
                                {
                                    servData.map((item, index) =>
                                        <Slot2 key={index} item={item} index={index} />
                                    )
                                }
                            </div>
                        </div>
                        <div className="pruduct_photo_wrap">
                            <span className="pruduct_album_wrap_span"><i className="xi-camera"></i> PHOTO</span>
                            <div className="pruduct_album_wrap_slot">
                                {
                                    servData.map((item, index) =>
                                        <Slot2 key={index} item={item} index={index} />
                                    )
                                }
                            </div>
                        </div>
                        <div className="pruduct_goods_wrap">
                            <span className="pruduct_album_wrap_span"><i className="xi-gift-o"></i> GODDS</span>
                            <div className="pruduct_album_wrap_slot">
                                {
                                    servData.map((item, index) =>
                                        <Slot2 key={index} item={item} index={index} />
                                    )
                                }
                            </div>
                        </div>
                    </>
                    :
                    <></>
                }
            </div>
        </>
    )
}

export default Product;
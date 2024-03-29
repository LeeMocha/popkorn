import Slot2 from "./slot2/Slot2";

import "./Product.css";
import SubProduct from "./SubProduct";

const Product = ({ currCategoryl, currCategorym, servData, setPageData, pageData }) => {


    return (
        <>
            <div className="product_wrap">
                {
                    currCategoryl === 'new' && currCategorym === 'All' ?
                        <>
                            <div className="pruduct_album_wrap">
                                <span className="pruduct_album_wrap_span"><i className="xi-album"></i> ALBUM</span>
                                <div className="pruduct_album_wrap_slot">
                                    {
                                        servData.map((item, index) => {
                                            if (item.categoryl === 'album') {
                                                return <Slot2 key={index} item={item} index={index} />
                                            } else{
                                                return null
                                            }
                                        }
                                        )
                                    }
                                </div>
                            </div>
                            <div className="pruduct_goods_wrap">
                                <span className="pruduct_album_wrap_span"><i className="xi-gift-o"></i> GOODS</span>
                                <div className="pruduct_album_wrap_slot">
                                    {
                                        servData.map((item, index) => {
                                            if (item.categoryl === 'goods') {
                                                return <Slot2 key={index} item={item} index={index} />
                                            } else{
                                                return null
                                            }
                                        }
                                        )
                                    }
                                </div>
                            </div>
                            <div className="pruduct_photo_wrap">
                                <span className="pruduct_album_wrap_span"><i className="xi-camera"></i> PHOTO</span>
                                <div className="pruduct_album_wrap_slot">
                                    {
                                        servData.map((item, index) => {
                                            if (item.categoryl === 'photo') {
                                                return <Slot2 key={index} item={item} index={index} />
                                            } else{
                                                return null
                                            }
                                        }
                                        )
                                    }
                                </div>
                            </div>
                        </>
                        :
                        <SubProduct servData={servData} setPageData={setPageData} pageData={pageData}/>
                }
            </div>
        </>
    )
}

export default Product;
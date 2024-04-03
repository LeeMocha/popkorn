import Slot2 from "./slot2/Slot2"
import "./Product.css";

export default function Product({ currCategoryl, currCategorym, productData }) {
    console.log(currCategoryl.current);
    return (
        <>
            <div className="product_wrap">
                {
                    currCategoryl.current === 'new' && currCategorym === 'all' ?
                        <>
                            <div className="pruduct_album_wrap">
                                <span className="pruduct_album_wrap_span"><i className="xi-album"></i> ALBUM</span>
                                <div className="pruduct_album_wrap_slot">
                                    {
                                        productData.servData.map((item, index) => {
                                            if (item.categoryl === 'album') {
                                                return <Slot2 key={index} item={item} index={index} />
                                            } else {
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
                                        productData.servData.map((item, index) => {
                                            if (item.categoryl === 'goods') {
                                                return <Slot2 key={index} item={item} index={index} />
                                            } else {
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
                                        productData.servData.map((item, index) => {
                                            if (item.categoryl === 'photo') {
                                                return <Slot2 key={index} item={item} index={index} />
                                            } else {
                                                return null
                                            }
                                        }
                                        )
                                    }
                                </div>
                            </div>
                        </>
                        :
                        <div className='subproduct_container'>
                            <div className="subproduct_wrap">
                                {
                                    productData.servData.map((item, index) =>
                                        <Slot2 key={index} item={item} index={index} />
                                    )
                                }
                            </div>
                            {/* <Pagination pageData={pageData} setPageData={setPageData} /> */}
                        </div>
                }
            </div>
        </>
    )
}
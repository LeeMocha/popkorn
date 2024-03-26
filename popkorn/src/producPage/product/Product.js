import Slot2 from "./slot2/Slot2";

import "./Product.css";
import SubProduct from "./SubProduct";

const Product = ({ currCategoryl, currCategorym, servData }) => {


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
                        <SubProduct servData={servData}/>
                }
            </div>
        </>
    )
}

export default Product;
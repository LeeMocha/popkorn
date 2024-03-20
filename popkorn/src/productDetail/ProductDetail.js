import DetailMainImg from "./DetailMainImg/DetailMainImg";
import DetailOrder from "./DetailOrder/DetailOrder";
import BodyImg from "./BodyImg/BodyImg";
import DetailRecommendation from "./DetailRecommendation/DetailRecommendation";
import DetailInformation from "./DetailInformation/DetailInformation";
import Header from '../header/Header';

import Cart from '../Cart/Cart';

import './ProductDetail.css';

export default function ProductDetail() {
    return (
        <>
            <Header />
            <div className="productDetailMain">
                <div className="orderMain">
                    <DetailMainImg>
                    </DetailMainImg>
                    <DetailOrder>
                    </DetailOrder>
                </div>
                <BodyImg>
                </BodyImg>
                <DetailRecommendation>
                </DetailRecommendation>
            </div>
        </>
    );
}
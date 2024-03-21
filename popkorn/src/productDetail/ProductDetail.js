import DetailMainImg from "./DetailMainImg/DetailMainImg";
import DetailOrder from "./DetailOrder/DetailOrder";
import BodyImg from "./BodyImg/BodyImg";
import DetailRecommendation from "./DetailRecommendation/DetailRecommendation";

import Header from '../header/Header';


import './ProductDetail.css';

export default function ProductDetail() {
    return (
        <>
            <Header />
            <div className="productDetailMain">
                <div className="orderMain">
                    <DetailMainImg />
                    <DetailOrder />
                </div>
                <BodyImg />
                <DetailRecommendation />
            </div>
        </>
    );
}
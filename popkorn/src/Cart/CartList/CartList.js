import "./CartList.css";



export default function CartList({ item, index }) {

    const imageSrc = process.env.PUBLIC_URL + "/productIMG/";

    return (
        <div key={index} className="cartListMain">
            <img src={imageSrc + item.image1} alt="productdetail_img" />
            <span>{item.productname}</span>
            <span>{item.detailcount}</span>
            <span>{item.price}</span>
        </div>
    )
}
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PopkornBtn from '../../useModules/PopkornBtn';
import "./CartListFrom.css";
import axios from 'axios';

export default function CartListFrom() {
    const imageSrc = process.env.PUBLIC_URL + "/productIMG/";

    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        axios.get(`/api/cart/selectlist?id=${sessionStorage.getItem('loginID')}`)
            .then(response => {
                setProduct(response.data);
            }).catch(err => console.log(err))
    }, []);

    // 전체 상품을 선택/해제
    const checkSelectAll = () => {
        setSelectAll(!selectAll);
    };

    // 주문 페이지로 이동
    function orderConfirm() {
        if (window.confirm('Are you sure you want to go to the purchase page?')) {
            navigate('/Order');
        }
    }

    return (
        <div className='CartListFromDiv'>
            <h1 style={{ color: ' #b2ecfd' }}>Cart</h1>
            <label>
                <input type="checkbox" onChange={checkSelectAll} />
                <span style={{ color: ' #FE7CF3' }}>Select All</span>
            </label>
            <div className="CartListFromitem">
                {product.length > 0 ? (
                    product.map((item, index) => (
                        <div key={index} item={item} index={index} className="cartListMain">
                            <input type="checkbox" onChange={checkSelectAll} checked={selectAll} />
                            <img src={imageSrc + item.image1} alt="productdetail_img" />
                            <div className="productnameclss">
                                <span>{item.productname}</span>
                                <span>[alternative : {item.alternative}]</span>
                            </div>
                            <span>{item.detailcount}</span>
                            <span>{item.detailcount * item.price}</span>
                        </div>
                    ))
                ) : (
                    <div className='noCartListFrom'>
                        <span>Your shopping cart is empty.</span>
                    </div>
                )}
            </div>
            {product.length !== 0 && (
                <div className="cartPrice">
                    <h3>Total()</h3>
                    <h3>\</h3>
                </div>
            )}
            <div className='popkornBtnbox'>
                <PopkornBtn btnName={'Order Execution!'} btntype={false} btnfun={orderConfirm} />
            </div>
        </div>
    )
}

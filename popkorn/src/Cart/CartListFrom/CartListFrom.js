import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PopkornBtn from '../../useModules/PopkornBtn';
import "./CartListFrom.css";
import axios from 'axios';

export default function CartListFrom() {
    const imageSrc = process.env.PUBLIC_URL + "/productIMG/";

    const navigate = useNavigate();
    const [items, setProduct] = useState([]);
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
        if (window.confirm('구매페이지로 이동하시겠습니까?')) {
            // navigate('/Order'); //리액트es06 문법이후로만 적용됨.(페이지 이동)
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
                {items.length > 0 ? (
                    items.map((item, index) => (
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
            {items.length !== 0 && (
                <div className="cartPrice">
                    <h3>Total()</h3>
                    <h3>\</h3>
                </div>
            )}
            <div className='popkornBtnbox'>
                <Link to="/order" state={{ items }}>
                    <PopkornBtn btnName={'Order Execution!'} btntype={false} btnfun={orderConfirm} ></PopkornBtn>
                </Link>
            </div>
        </div>
    )
}

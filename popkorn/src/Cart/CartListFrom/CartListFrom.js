import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PopkornBtn from '../../useModules/PopkornBtn';
import "./CartListFrom.css";
import axios from 'axios';

export default function CartListFrom() {
    const imageSrc = process.env.PUBLIC_URL + "/productIMG/";
    const navigate = useNavigate();
    const [items, setProduct] = useState([]);
    const [selectAll, setSelectAll] = useState(false); // 전체상품체크 초기화
    const [selectCheck, setselectCheck] = useState([]); // 각 각의 상품체크 초기화

    useEffect(() => {
        axios.get(`/api/cart/selectlist?id=${sessionStorage.getItem('loginID')}`)
            .then(response => {
                setProduct(response.data);
            }).catch(err => console.log(err))
    }, []);


    const deletHandler = () => {
        setProduct(items.filter(setselectCheck))
        // 상품전체 삭제(각각의 대한 상품은 삭제 불가 이부분은 수정예정)
    }


    // 전체 상품을 선택/해제 기능
    const checkSelectAll = () => {
        setSelectAll(!selectAll);
    };

    // 각 각의 상품을 선택/해제 가능
    const checkSelect = () => {
        //


        setSelectAll()
    }

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
                <button onClick={deletHandler}>ALL CD</button>
            </label>
            <div className="CartListFromitem">
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div key={index} item={item} index={index} className="cartListMain">
                            <input type="checkbox" onChange={checkSelect} checked={selectAll} />
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
            <div className='popkornBtnbox'>
                <Link to="/order" state={{ items }}>
                    <PopkornBtn btnName={'Order Execution!'} btntype={false} btnfun={orderConfirm} ></PopkornBtn>
                </Link>
            </div>
        </div>
    )
}

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
    const [selectCheck, setSelectCheck] = useState([]); // 각 각의 상품체크 초기화

    useEffect(() => {
        axios.get(`/api/cart/selectlist?id=${sessionStorage.getItem('loginID')}`)
            .then(response => {
                setProduct(response.data);
                setSelectCheck(new Array(response.data.length).fill(false));
            }).catch(err => console.log(err))
    }, []);

    const deleteHandler = () => {
        const updatedItems = items.filter((_, index) => !selectCheck[index]);
        setProduct(updatedItems);
        const checkedItemIds = selectCheck.reduce((acc, checked, index) => {
            if (checked) {
                acc.push(items[index].id);
            }
            console.log(items.filter((_, index) => selectCheck[index]));
            return acc;
        }, []);
        axios.delete('/api/cart/delete', { data: { itemIds: checkedItemIds } })
            .then(response => {
                console.log("상품 삭제 성공");
            })
            .catch(error => {
                console.error("상품 삭제 오류:", error);
            });
    }

    const checkSelectAll = () => {
        // 모든 상품이 선택되어 있는지 확인
        const allChecked = selectCheck.every(check => check);

        // 모든 상품이 선택되어 있으면 전체 선택 해제
        if (allChecked) {
            setSelectAll(false);
            setSelectCheck(new Array(items.length).fill(false));
        } else {
            // 모든 상품 선택
            setSelectAll(true);
            setSelectCheck(new Array(items.length).fill(true));
        }
    };

    // 각 상품을 선택/해제하는 함수
    const checkSelect = (index) => {
        const updatedSelectCheck = [...selectCheck];
        updatedSelectCheck[index] = !updatedSelectCheck[index];
        setSelectCheck(updatedSelectCheck);

        // 전체 상품이 선택되어 있는지 확인
        const allChecked = updatedSelectCheck.every(check => check);

        // 하나라도 선택 해제되어 있으면 전체 선택 해제
        if (!allChecked) {
            setSelectAll(false);
        } else {
            // 모든 상품이 선택되어 있으면 전체 선택
            setSelectAll(true);
        }
    };

    // 주문 페이지로 이동
    function orderConfirm() {
        if (window.confirm('구매페이지로 이동하시겠습니까?')) {
            // navigate('/Order'); //리액트es06 문법이후로만 적용됨.(페이지 이동)
            console.log(items);
        }
    }

    return (
        <div className='CartListFromDiv'>
            <h1 style={{ color: ' #b2ecfd' }}>Cart</h1>
            <label>
                <input type="checkbox" onChange={checkSelectAll} checked={selectAll} />
                <span style={{ color: ' #FE7CF3' }}>Select All</span>
                <button onClick={deleteHandler}>ALL CD</button>
            </label>
            <div className="CartListFromitem">
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div key={index} item={item} index={index} className="cartListMain">
                            <input type="checkbox" onChange={() => checkSelect(index)} checked={selectCheck[index]} />
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
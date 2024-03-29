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
                acc.push({ id: items[index].id, pcode: items[index].pcode, productname: items[index].productname });
            }
            return acc;
        }, []);

        checkedItemIds.forEach(({ id, pcode, productname }) => {
            axios.delete(`/api/cart/delete?id=${id}&pcode=${pcode}`)
                .then(response => {
                    console.log(`${productname} 삭제 성공`);
                })
                .catch(error => {
                    console.error(`상품 삭제 오류:`, error);
                });
        });
    }


    // 전체 상품을 선택/해제 기능
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
            // 체크된 상품들만을 필터링하여 새로운 배열에 추가
            const selectedItems = items.filter((item, index) => selectCheck[index]);
            console.log(selectedItems);
            // 선택된 상품들이 있는지 확인
            if (selectedItems.length > 0) {
                // 주문 페이지로 이동하며 선택된 상품들을 함께 전달
                navigate('/Order', { state: { items: selectedItems } });
            } else {
                alert('상품을 선택해주세요.');
            }
        }
    }
    


    return (
        <div className='CartListFromDiv'>
            <h1 style={{ color: ' #7de4ff' }}>Cart</h1>
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
                {/* 상품들의 배열. 메서드는 주어진 조건을 만족하는 요소들을 새로운 배열로 반환( 메서드에 전달되는 함수의 인자) =>
                열에서 현재 인덱스에 해당하는 항목의 checked 속성을 확인합니다. ?.는 옵셔널 체이닝 연산자로, 해당 항목이 존재하고 checked 속성이 존재하는 경우에만 접근합니다.
                 이것은 selectCheck[index]가 정의되지 않거나 checked 속성이 없는 경우를 방지 */}
                {/* <Link to="/order" state={{ items: items.filter((item, index) => selectCheck[index]?.checked) }}> */}
                    <PopkornBtn btnName={'Order Execution!'} btntype={false} btnfun={orderConfirm} />
                {/* </Link> */}

            </div>
        </div>
    )
}

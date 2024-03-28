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
                // items의 길이만큼 selectCheck 초기화
                const initialSelectCheck = response.data.map(item => ({ ...item, checked: false }));
                setProduct(response.data);
                setSelectCheck(initialSelectCheck);
            }).catch(err => console.log(err))
    }, []);

    const deletHandler = () => {
        // 체크된 상품들의 인덱스를 모읍니다.
        const checkedIndexes = selectCheck.reduce((acc, curr, index) => {
            if (curr.checked) {
                acc.push(index);
            }
            return acc;
        }, []);
        axios.delete(`/api/cart/deletecart`, {
            data: { checkedIndexes },
        })
            .then(response => {
                console.log("Selected items deleted successfully!");
            })
            .catch(error => {
                console.error("Error deleting selected items:", error);
            });
    }


    // 체크된 상품을 오더창으로 넘기게 끔 해주기(이부분 수정해줘야함 : 혜나)
    const recheck = () => {
        const allitems = selectCheck(items.checked)
    }


    // 전체 상품을 선택/해제 기능
    const checkSelectAll = () => {
        // 모든 상품이 선택되어 있는지 확인
        const allChecked = selectCheck.every(item => item.checked);

        // 모든 상품이 선택되어 있으면 전체 선택 해제
        if (allChecked) {
            setSelectAll(false);
            setSelectCheck(selectCheck.map(item => ({ ...item, checked: false })));
        } else {
            // 모든 상품 선택
            setSelectAll(true);
            setSelectCheck(selectCheck.map(item => ({ ...item, checked: true })));
        }
    };

    // 각 상품을 선택/해제하는 함수
    const checkSelect = (index) => {
        const updatedSelectCheck = [...selectCheck];
        updatedSelectCheck[index] = { ...updatedSelectCheck[index], checked: !updatedSelectCheck[index].checked };
        setSelectCheck(updatedSelectCheck);

        // 전체 상품이 선택되어 있는지 확인
        const allChecked = updatedSelectCheck.every(item => item.checked);

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
            // 필터링된 상품 정보를 담을 배열 초기화
            const selectedItems = [];
            // 선택된 상품의 인덱스를 추적하기 위한 변수
            let newIndex = 0;
            // 체크된 상품만 selectedItems 배열에 추가
            selectCheck.forEach((item, index) => {
                if (item.checked) {
                    selectedItems.push({ ...items[index], newIndex });
                    newIndex++; // 인덱스 증가
                }
            });
            // navigate('/Order', { state: { selectedItems } }); // 선택된 상품 정보를 주문 페이지로 전달
        } else {
            console.log(selectCheck);
        }
    }

    return (
        <div className='CartListFromDiv'>
            <h1 style={{ color: ' #b2ecfd' }}>Cart</h1>
            <label>
                <input type="checkbox" onChange={checkSelectAll} checked={selectAll} />
                <span style={{ color: ' #FE7CF3' }}>Select All</span>
                <button onClick={deletHandler}>ALL CD</button>
            </label>
            <div className="CartListFromitem">
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div key={index} item={item} index={index} className="cartListMain">
                            <input type="checkbox" onChange={() => checkSelect(index)} checked={selectCheck[index]?.checked || false} />
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
                <Link to="/order" state={{ items: items.filter((item, index) => selectCheck[index]?.checked) }}>
                    <PopkornBtn btnName={'Order Execution!'} btntype={false} btnfun={orderConfirm} />
                </Link>

            </div>
        </div>
    )
}
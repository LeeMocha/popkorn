import { useNavigate, Link } from 'react-router-dom';
import PopkornBtn from '../../useModules/PopkornBtn';

import "./CartListFrom.css";
import CartList from '../CartList/CartList';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function CartListFrom() {

    const navigate = useNavigate();
    const [items, setProduct] = useState([]);

    useEffect(() => {
        axios.get(`/api/cart/selectlist?id=${sessionStorage.getItem('loginID')}`)
            .then(response => {
                setProduct(response.data);
            }).catch(err => console.log(err))
    }, [])


    function orderConfirm() {
        if (window.confirm('구매페이지로 이동하시겠습니까?')) {
            // navigate('/Order'); //리액트es06 문법이후로만 적용됨.(페이지 이동)
        }
    }

    return (
        <>
            <h1 style={{ color: ' #b2ecfd' }}>Cart</h1>
            <label>
                <input type="checkbox" />
                <span style={{ color: ' #FE7CF3' }}>Select All</span>
            </label>
            <div className="CartListFrombox">
                <input type="checkbox" />
                {
                    items.length > 0 ?

                    items.map((item, index) => <CartList item={item} index={index} key={index} />)
                        :
                        <div>
                            <span></span>
                        </div>
                }
            </div>
            <div className="cartPrice">
                <h3>Total(수량)</h3>
                <h3>\</h3>
            </div>
            <div className='popkornBtnbox'>
                <Link to="/order"  state={ {items} }>
                    <PopkornBtn btnName={'Order Execution!'} btntype={false} btnfun={orderConfirm} ></PopkornBtn>
                </Link>
            </div>
        </>
    )
}
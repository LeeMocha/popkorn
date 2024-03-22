import { useNavigate } from 'react-router-dom';
import PopkornBtn from '../../useModules/PopkornBtn';

import "./CartListFrom.css";
import CartList from '../CartList/CartList';


export default function CartListFrom() {

    const product = [{
        id: 'dlgpsk1112@naver.com',
        pcode: 1,
        detailcount: 1,
        alternative: 'I WIN ver',
        price: 20800,
        image1: 'iu.png',
        productname: 'The Winning',
        ccode: 1
    },
    {
        id: 'dlgpsk1112@naver.com',
        pcode: 3,
        detailcount: 1,
        alternative: '0 ver',
        price: 18500,
        image1: 'gidle2ndfullalbum.png',
        productname: 'This Time Around',
        ccode: 2
    },
    {
        id: 'dlgpsk1112@naver.com',
        pcode: 6,
        detailcount: 3,
        alternative: 'Spakling ver',
        price: 21400,
        image1: 'tws1st.png',
        productname: 'TWS 1st Mini Album ‘Sparkling Blue’',
        ccode: 3
    },
    {
        id: 'dlgpsk1112@naver.com',
        pcode: 8,
        detailcount: 1,
        alternative: 'BALMY FLEX',
        price: 19300,
        image1: 'easy.png',
        productname: 'LE SSERAFIM',
        ccode: 4
    },
    {
        id: 'huck1217@naver.com',
        pcode: 26,
        detailcount: 5,
        alternative: 'KIM CHAEWON',
        price: 13400,
        image1: 'unforgiven.png',
        productname: 'JAPAN 2nd Single UNFORGIVEN Solo Jacket',
        ccode: 5
    }
    ]

    const navigate = useNavigate();

    function orderConfirm() {
        if (window.confirm('구매페이지로 이동하시겠습니까?')) {
            navigate('/Order'); //리액트es06 문법이후로만 적용됨.(페이지 이동)
        }
    }

    console.log(product);


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
                    product.length > 0 ?
                        product.map((item, index) => <CartList item={item} index={index} />)
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
                <PopkornBtn btnName={'Order Execution!'} btntype={false} btnfun={orderConfirm} ></PopkornBtn>
            </div>
        </>
    )
}
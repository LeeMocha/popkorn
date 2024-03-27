import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DetailInformation from '../DetailInformation/DetailInformation';
import PopkornBtn from '../../useModules/PopkornBtn'

import "./DetailOrder.css";
import { Logincontext } from './../../App';
import axios from 'axios';

export default function DetailOrder({ item }) {
    const Location = useLocation();
    const pData = Location.state.item; // Object Type으로 전달 받음.
    const [pcode, setPcode] = useState(0);
    const [cnt, setCnt] = useState(0);
    const [totalcnt, setTotalcnt] = useState(0);
    const [selectOption, setSelectOption] = useState("");
    const navigate = useNavigate();
    const [isLoggedIn] = useContext(Logincontext);
    const [alternative, setAlternative] = useState([]);

    const cntPlusHandler = () => {
        if (cnt < 10) {
            setCnt(cnt + 1);
            setTotalcnt(pData.price * (cnt + 1));
        } else {
            alert("최대 10개까지만 구매 가능합니다.");
        }
    }

    const cntMinusHandler = () => {
        if (cnt > 1) {
            setCnt(cnt - 1);
            setTotalcnt(pData.price * (cnt - 1));
        }
    }

    const optionHandler = (e) => {
        const selectedValue = e.target.value; // 선택된 옵션의 값
        const selectedItem = alternative.find(item => item.pcode === parseInt(selectedValue)); // 선택된 값에 해당하는 아이템 찾기
    
        if (selectedItem) {
            setSelectOption(selectedItem.alternative);
            setPcode(e.target.value)
        }else{
            setSelectOption("");
            setCnt(0);
            setTotalcnt(0);
        }
    }

    const deleteHandler = () => {
        setSelectOption(""); //삭제 시 null
        setTotalcnt(pData.price) // 삭제시 원가격으로 초기화
        setCnt(1); // 삭제하는 동시에 수량 초기화
    }

    const addCart = async () => {
        await axios.post(`/api/cart/addcart`, {
            id: sessionStorage.getItem('loginID'),
            pcode: pcode,
            detailcount: cnt,
            alternative: selectOption,
            price: pData.price,
            image1: pData.image1,
            productname: pData.productname
        }).then()
            .catch(err => console.log(err));
    }

    function cartConfirm() {
        if (isLoggedIn) {
            if (selectOption.length === 0) {
                window.confirm("옵션을 선택해주세요");
            } else {
                if (window.confirm("Do you want add into Cart?")) {
                    addCart();
                    navigate('/cart');
                }
            }
        } else {
            window.confirm("Do you want to log in and use it?");
            navigate('/authMain');
        }
    }

    function orderConfirm() {
        if (window.confirm('Are you sure you want to go to the purchase page?')) {
            navigate('/order'); //리액트es06 문법이후로만 적용됨.(페이지 이동)
        }
    }

    useEffect(() => {
        axios.get(`/api/product/selectoption?productname=${pData.productname}`)
            .then((response) => {
                setAlternative(response.data);
            }).catch(err => console.log(err));
    }, [])

    return (
        <div>
            <div className="mainTitle">
                <div className='singerwon'>
                    <p>{pData.artist}</p>
                    <h2>{pData.productname}</h2>
                    <h2>￦{pData.price.toLocaleString()}</h2>
                </div>
                <select id='optionselect' onChange={optionHandler}>
                    <option value={-1}>Please select an option.</option>
                    {alternative.map((item, index) => (
                        <option key={index} value={item.pcode}>{item.alternative}</option>
                    ))}
                </select>
                {selectOption && (
                    <div className='mainButton'>
                        <h6>{selectOption}</h6>
                        <button type="button" className='mainButton1' onClick={cntMinusHandler}>-</button>
                        <h5>{cnt}</h5>
                        <button type="button" className='mainButton1' onClick={cntPlusHandler}>+</button>
                        <button type="button" className='deletButton' onClick={deleteHandler}>x</button>
                    </div>
                )}
                <div className='total'>
                    <h3>Total({cnt})</h3>
                    <h2>￦{totalcnt.toLocaleString()}</h2>
                </div>
                <div className='maintwoButton'>
                    <PopkornBtn btnName='Cart' btntype={true} btnfun={cartConfirm} />
                    <PopkornBtn btnName='Oder' btntype={false} btnfun={orderConfirm} />
                </div>
                <DetailInformation />
            </div>
        </div>
    )
}

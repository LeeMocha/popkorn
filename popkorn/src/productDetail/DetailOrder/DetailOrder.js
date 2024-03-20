import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DetailInformation from '../DetailInformation/DetailInformation';
import Cart from '../../Cart/Cart';

import "./DetailOrder.css";

const pData = {
    singer: "LE SSERAFIM",
    productName: "JAPAN 2nd Single [UNFORGIVEN] Solo Jacket",
    optionpik: ['Required Selection', 'SAKURA', 'HUH YUNJIN', 'KAZUHA', 'HONG EUNCHAE'],
    Price: 11000,
    reserve: 0.50
}

export default function DetailOrder() {
    const [cnt, setCnt] = useState(0);
    const [totalcnt, setTotalcnt] = useState(0);
    const [selectOption, setSelectOption] = useState("");
    const navigate = useNavigate();

    const cntPlusHandler = () => {
        if (cnt < 10) {
            setCnt(cnt + 1);
            setTotalcnt(pData.Price * (cnt + 1));
        } else {
            alert("최대 10개까지만 구매 가능합니다.");
        }
    }

    const cntMinusHandler = () => {
        if (cnt > 1) {
            setCnt(cnt - 1);
            setTotalcnt(pData.Price * (cnt - 1));
        }
    }

    const optionHandler = (e) => {
        const selectOption = e.target.value;
        setSelectOption(selectOption === pData.optionpik[0] ? "" : selectOption);
    }

    const deleteHandler = () => {
        setSelectOption(""); //삭제 시 null
        setTotalcnt(0); // 삭제하는 동시에 총가격 초기화
        setCnt(0); // 삭제하는 동시에 수량 초기화
    }

    function handleConfirm() {

        if (window.confirm('장바구니로 이동하시겠습니까?')) {
            navigate('/Cart'); //리액트es06 문법이후로만 적용됨.(페이지 이동)
        }
    }

    return (
        <div>
            <div className="mainTitle">
                <div className='singerwon'>
                    <p>{pData.singer}</p>
                    <h2>{pData.productName}</h2>
                    <h2>\{pData.Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                </div>
                <p>Point : {pData.reserve}%</p>
                <select id='optionselect' onChange={optionHandler}>
                    {pData.optionpik.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
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
                    <h2>\{totalcnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                </div>
                <div className='maintwoButton'>
                    <button type='button' className='mainButton2' >Buy</button>
                    <button type='button' className='mainButton2' onClick={handleConfirm}>Cart</button>
                </div>
                <DetailInformation />
            </div>
        </div>
    )
}

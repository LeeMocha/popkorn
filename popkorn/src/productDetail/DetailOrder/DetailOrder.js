import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DetailInformation from '../DetailInformation/DetailInformation';
import PopkornBtn from '../../useModules/PopkornBtn'

import "./DetailOrder.css";

export default function DetailOrder({item}) {
    const Location = useLocation();
    const pData = Location.state.item; // Object Type으로 전달 받음.
    console.log(pData);

    const [cnt, setCnt] = useState(0);
    const [totalcnt, setTotalcnt] = useState(0);
    const [selectOption, setSelectOption] = useState("");
    const navigate = useNavigate();



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
        const selectOption = e.target.value;
        setSelectOption(selectOption === item.alternative[0] ? "" : selectOption);
    }

    const deleteHandler = () => {
        setSelectOption(""); //삭제 시 null
        setTotalcnt(0); // 삭제하는 동시에 총가격 초기화
        setCnt(0); // 삭제하는 동시에 수량 초기화
    }

    function cartConfirm() {
        if (window.confirm('장바구니로 이동하시겠습니까?')) {
            navigate('/Cart'); //리액트es06 문법이후로만 적용됨.(페이지 이동)
        }
    }

    function orderConfirm() {
        if (window.confirm('구매페이지로 이동하시겠습니까?')) {
            navigate('/Order'); //리액트es06 문법이후로만 적용됨.(페이지 이동)
        }
    }

    return (
        <div>
            <div className="mainTitle">
                <div className='singerwon'>
                    <p>{pData.artist}</p>
                    <h2>{pData.productname}</h2>
                    <h2>\{pData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                </div>
                {/* <p>Point : {pData.reserve}%</p> */}
                {/* <select id='optionselect' onChange={optionHandler}>
                    {alternative.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select> */}
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
                    <PopkornBtn btnName='Cart' btntype={true} btnfun={cartConfirm} />
                    <PopkornBtn btnName='Oder' btntype={false} btnfun={orderConfirm} />
                </div>
                <DetailInformation />
            </div>
        </div>
    )
}

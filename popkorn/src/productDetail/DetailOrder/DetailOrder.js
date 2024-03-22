import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DetailInformation from '../DetailInformation/DetailInformation';
import PopkornBtn from '../../useModules/PopkornBtn'

import "./DetailOrder.css";
import { Logincontext } from './../../App';
import axios from 'axios';

export default function DetailOrder({ item }) {
    const [cnt, setCnt] = useState(0);
    const [totalcnt, setTotalcnt] = useState(0);
    const [selectOption, setSelectOption] = useState("");
    const navigate = useNavigate();
    const [isLoggedIn] = useContext(Logincontext);
    const [userReserve, setUserReserve] = useState(0);
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
        setSelectOption(e.target.value);
    }

    const deleteHandler = () => {
        setSelectOption(""); //삭제 시 null
        setTotalcnt(0); // 삭제하는 동시에 총가격 초기화
        setCnt(0); // 삭제하는 동시에 수량 초기화
    }

    const addCart = async () => {
        await axios.get(`/api/cart/addcart`, null, { params: { ...item, alternative } })
            .then((response) => console.log(response.data))
            .catch
    }

    function cartConfirm() {
        if (isLoggedIn) {
            if (window.confirm("Do you want add into Cart?")) {
                // 엑시오스로 카트에 담기 & 담은 후 카트로 이동
                axios.get(`/api/cart/addcart`)
                navigate('/cart');
            }
        } else {
            window.confirm("로그인 후 이용하시겠습니까?")
            navigate('/authMain');
        }
    }



    function orderConfirm() {
        if (window.confirm('구매페이지로 이동하시겠습니까?')) {
            navigate('/order'); //리액트es06 문법이후로만 적용됨.(페이지 이동)
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            axios.get(`/api/user/selectone?id=${sessionStorage.getItem('loginID')}`)
                .then((response) => {
                    setUserReserve(response.data.reserve);
                }).catch(err => console.log(err))
        }

        axios.get(`/api/product/selectoption?productname=${item.productname}`)
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
                    <h2>\{pData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                </div>
                <p>Point : {userReserve}p</p>
                <select id='optionselect' onChange={optionHandler}>
                    {alternative.map((item, index) => (
                        <option key={index} value={item.alternative}>{item.alert}</option>
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
                    <PopkornBtn btnName='Cart' btntype={true} btnfun={cartConfirm} />
                    <PopkornBtn btnName='Oder' btntype={false} btnfun={orderConfirm} />
                </div>
                <DetailInformation />
            </div>
        </div>
    )
}

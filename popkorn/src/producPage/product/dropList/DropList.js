import React, {useState} from "react";

import './DropList.css';
import CategoryM from './../categoryM/CategoryM';

const DropList = () => {


    const [currCategory, setCurrCategory] = useState("main_list_new"); // onClick -> currCategory 전달
    const [isClicked, setIsClicked] = useState(false);

    
    const currCHandler = (event) => {
        setCurrCategory(event.target.className);
        setIsClicked(true);
    }
 

    return (
        <div className="dropList_wrap">
            <div className="dropList_container">
                <ul className="dropList_event">
                    <li className="main_list_new" onClick={(e)=>currCHandler(e)}>NEW</li>
                    <li className="main_list_cd" onClick={(e)=>currCHandler(e)}>CD</li>
                    <li className="main_list_goods" onClick={(e)=>currCHandler(e)}>GOODS</li>
                    <li className="main_list_photo" onClick={(e)=>currCHandler(e)}>PHOTO</li>
                </ul>
            </div>
            <CategoryM currCategory={currCategory} isClicked={isClicked} setIsClicked={setIsClicked}/>
        </div>
    )
}

export default DropList;
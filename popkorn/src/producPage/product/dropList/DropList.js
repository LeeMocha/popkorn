import React, { useState } from "react";

import './DropList.css';
import '../categoryM/CategoryM.css';
import CategoryS from "../categoryM/categoryS/CategoryS";


const DropList = ({ setCurrCategoryl, setCurrCategorym, setServData, isScrolled, setPageData }) => {

    const [isClicked, setIsClicked] = useState(false);
    const [categorylname, setCategortlname] = useState('new');


    const currCHandler = (e) => {
        setCategortlname(e.target.className);
        setIsClicked(true);
    }

    const leaveHandler = () => {
        setIsClicked(false);
    }


    return (
        <div className="dropList_wrap">
            <div className="dropList_container">
                <ul className="dropList_event">
                    <li className="new" onMouseOver={currCHandler}>NEW</li>
                    <li className="album" onMouseOver={currCHandler}>ALBUM</li>
                    <li className="goods" onMouseOver={currCHandler}>GOODS</li>
                    <li className="photo" onMouseOver={currCHandler}>PHOTO</li>
                </ul>
            </div>
            <div className={`categoryM_wrap ${isClicked ? "active" : ""} ${isScrolled ? "fade-out" : ""}`} onMouseLeave={leaveHandler}>
                <div className="categoryM_container">
                    <div className="category_wrap">
                        <div className="category_container">
                            <div className="sub_list">
                                <CategoryS categorylname={categorylname} setCurrCategorym={setCurrCategorym}
                                    setServData={setServData} setPageData={setPageData} setCurrCategoryl={setCurrCategoryl} />
                                <div className={`transform_Cwrap ${isClicked ? "active" : ""}`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DropList;
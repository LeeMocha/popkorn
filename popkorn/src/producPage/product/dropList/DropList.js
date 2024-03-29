import React, {useState} from "react";

import './DropList.css';
import CategoryM from './../categoryM/CategoryM';

const DropList = ({currCategoryl, setCurrCategoryl, setCurrCategorym, setServData, isScrolled}) => {

    const [isClicked, setIsClicked] = useState(false);

    
    const currCHandler = (event) => {
        setCurrCategoryl(event.target.className);
        setIsClicked(true);
    }
 

    return (
        <div className="dropList_wrap">
            <div className="dropList_container">
                <ul className="dropList_event">
                    <li className="new" onClick={currCHandler}>NEW</li>
                    <li className="album" onClick={currCHandler}>ALBUM</li>
                    <li className="goods" onClick={currCHandler}>GOODS</li>
                    <li className="photo" onClick={currCHandler}>PHOTO</li>
                </ul>
            </div>
            <CategoryM currCategoryl={currCategoryl} isClicked={isClicked} setIsClicked={setIsClicked} setCurrCategorym={setCurrCategorym} setServData={setServData}
            isScrolled={isScrolled}/>
        </div>
    )
}

export default DropList;
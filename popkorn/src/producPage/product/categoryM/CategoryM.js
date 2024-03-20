import { useState } from 'react';
import CategoryS from "./categoryS/CategoryS";

import "./CategoryM.css";

export default function CategoryM() {

    const [currCategory, setCurrCategory] = useState("main_list_new"); //onClick
    const [isMouseEnter, setIsMouseEnter] = useState(false); // onMouseEnter

    const currCHandler = (event) => {
        setCurrCategory(event.target.className);
    }

    const handleMouseEnter = () => {
       setIsMouseEnter(true);
    }

    const handleMouseLeave = () => {
        setIsMouseEnter(false);
    }


    return (
        <div className="categoryM_wrap">
            <div className="categoryM_container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <ul className="categoryM_main_list">
                    <li className="main_list_new" onClick={currCHandler} style={{ color: isMouseEnter ? 'white' : '#7de3ff' }}>NEW</li>
                    <li className="main_list_cd" onClick={currCHandler} style={{ color: isMouseEnter ? 'white' : '#7de3ff' }}>CD</li>
                    <li className="main_list_goods" onClick={currCHandler} style={{ color: isMouseEnter ? 'white' : '#7de3ff' }}>GOODS</li>
                    <li className="main_list_photo" onClick={currCHandler} style={{ color: isMouseEnter ? 'white' : '#7de3ff' }}>PHOTO</li>
                </ul>
                <div className="category_wrap" onMouseEnter={handleMouseEnter}>
                    <div className="category_container">
                        <div className="sub_list">
                            <CategoryS currCategory={currCategory} isMouseEnter={isMouseEnter}/><span></span>
                        </div>
                    </div>
                </div>
                <div className="transform_Cwrap"></div></div>
        </div>
    )
}
import Dropdown from "./dropdown/Dropdown";
import React, {useState} from "react";

import './DropList.css';
import CategoryS from "../categoryM/categoryS/CategoryS";

const DropList = props => {

    const [dropdownVisibility, setDropdownVisibility] = React.useState(false); // onClick -> dropdownVisibility 전달

    const [currCategory, setCurrCategory] = useState("main_list_new"); // onClick -> currCategory 전달
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
        <div className="dropList_wrap">
            <div className="dropList_container">
                <ul className="dropList_event" onClick={e => setDropdownVisibility(!dropdownVisibility)}>
                    <li className="main_list_new" onClick={currCHandler}  style={{ color: isMouseEnter ? 'white' : '#7de3ff' }}>NEW</li>
                    <li className="main_list_cd" onClick={currCHandler} style={{ color: isMouseEnter ? 'white' : '#7de3ff' }}>CD</li>
                    <li className="main_list_goods" onClick={currCHandler} style={{ color: isMouseEnter ? 'white' : '#7de3ff' }}>GOODS</li>
                    <li className="main_list_photo" onClick={currCHandler} style={{ color: isMouseEnter ? 'white' : '#7de3ff' }}>PHOTO</li>
                </ul>
            </div>
            <Dropdown visibility={dropdownVisibility}>
                <div className="subCategory_motion" onMouseLeave={handleMouseLeave}>
                    <CategoryS currCategory={currCategory}/>
                </div>
            </Dropdown>
        </div>
    )
}

export default DropList;

import CategoryS from "./categoryS/CategoryS";

import "./CategoryM.css";
import { useState } from "react";

export default function CategoryM({ currCategoryl, isClicked, setIsClicked, setCurrCategorym, setServData, isScrolled }) {

    const leaveHandler = (e) => {
        setIsClicked(false)
    }

    
    return (
        <div className={`categoryM_wrap ${isClicked ? "active" : ""} ${isScrolled ? "fade-out" : ""}`} onMouseLeave={leaveHandler}>
            <div className="categoryM_container">
                <div className="category_wrap">
                    <div className="category_container">
                        <div className="sub_list">
                            <CategoryS currCategoryl={currCategoryl} setCurrCategorym={setCurrCategorym}
                                setServData={setServData} />
                            <div className={`transform_Cwrap ${isClicked ? "active" : ""}`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
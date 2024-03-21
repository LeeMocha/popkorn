
import CategoryS from "./categoryS/CategoryS";

import "./CategoryM.css";

export default function CategoryM({ currCategoryl, isClicked, setIsClicked, setCurrCategorym }) {

    const leaveHandler = (e) => {
        setIsClicked(false)
    }

    return (
        <div className={`categoryM_wrap ${isClicked ? "active" : ""}`} onMouseLeave={leaveHandler}>
            <div className="categoryM_container">
                <div className="category_wrap">
                    <div className="category_container">
                        <div className="sub_list">
                            <CategoryS currCategoryl={currCategoryl} setCurrCategorym={setCurrCategorym}/>
                            <div className={`transform_Cwrap ${isClicked ? "active" : ""}`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
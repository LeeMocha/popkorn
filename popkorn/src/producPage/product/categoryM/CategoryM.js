
import CategoryS from "./categoryS/CategoryS";

import "./CategoryM.css";

export default function CategoryM({ currCategory, isClicked, setIsClicked }) {

    const leaveHandler = (e) => {
        setIsClicked(false)
    }

    return (
        <div className={`categoryM_wrap ${isClicked ? "active" : ""}`} onMouseLeave={leaveHandler}>
            <div className="categoryM_container">
                <div className="category_wrap">
                    <div className="category_container">
                        <div className="sub_list">
                            <CategoryS currCategory={currCategory} />
                            <div className={`transform_Cwrap ${isClicked ? "active" : ""}`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
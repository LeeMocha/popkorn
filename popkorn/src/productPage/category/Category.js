import { useEffect, useState } from "react";
import "./Category.css";


export default function Category({ currCategoryl, setCurrCategorym, setPageState }) {

    const categoryList = [
        {
            name: "new",
            subcategorys: [
                { subCategorysId: 1, name: "New" }
            ]
        },
        {
            name: "album",
            subcategorys: [
                { subCategorysId: 3, name: "All" }
            ]
        },
        {
            name: "goods",
            subcategorys: [
                { subCategorysId: 4, name: "Official Fanlight" },
                { subCategorysId: 5, name: "Key Ring" },
                { subCategorysId: 6, name: "Phone Case" },
                { subCategorysId: 7, name: "ETC" }
            ]
        },

        {
            name: "photo",
            subcategorys: [
                { subCategorysId: 8, name: "Photo Book" },
                { subCategorysId: 9, name: "Photo Card" }
            ]
        }
    ]

    const [categoryS, setCategoryS] = useState(categoryList[0])
    const [isHover, setIsHover] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY !== 0);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [isHover])

    const currHandler = (e, num) => {
        currCategoryl.current = e.target.className;
        setCategoryS(categoryList[num])
        setIsHover(true);
    }

    const leaveHandler = () => {
        setIsHover(false);
        setIsScrolled(false);
    }

    const categorySHandler = (e) => {
        if(currCategoryl.current==="new" && e.target.innerText==="New"){
            setCurrCategorym(e.target.innerText);
            setPageState(1);
        }else {
            setCurrCategorym(e.target.innerText);
            setPageState(1);
        }
    }

    return (
        <div className="category_wrap">
            <div className={`categoryM_container  ${isScrolled ? "fade-out" : ""}`}>
                <ul className="category_event">
                    <li className="new" onMouseOver={(e) => {
                        let num = 0
                        currHandler(e, num)
                    }}>NEW</li>
                    <li className="album" onMouseOver={(e) => {
                        let num = 1
                        currHandler(e, num)
                    }}>ALBUM</li>
                    <li className="goods" onMouseOver={(e) => {
                        let num = 2
                        currHandler(e, num)
                    }}>GOODS</li>
                    <li className="photo" onMouseOver={(e) => {
                        let num = 3
                        currHandler(e, num)
                    }}>PHOTO</li>
                </ul>
            </div>
            <div className={`categoryS_container ${isHover ? "active" : ""} ${isScrolled ? ()=>{setIsScrolled(false)
                 return "fade-out";} : ""}`} onMouseLeave={leaveHandler}>
                <div className={`transform_Cwrap ${isHover ? "active" : ""}`}></div>
                {
                    categoryS.subcategorys.map(subcategory =>
                        <div key={subcategory.subCategorysId} className="subcategory" onClick={categorySHandler}>
                            {subcategory.name}
                        </div>
                    )
                }
            </div>
        </div> /* category_wrap */
    )
}
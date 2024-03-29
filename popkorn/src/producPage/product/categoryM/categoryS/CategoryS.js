import axios from "axios";
import "./CategoryS.css";

export default function CategoryS({ currCategoryl, setCurrCategorym, setServData }) {

    const category = [
        {
            name: "new",
            subcategorys: [
                { subCategorysId: 1, name: "All" }
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
                {subCategorysId: 4, name: "Official Fanlight"},
                {subCategorysId: 5, name: "Key Ring"},
                {subCategorysId: 6, name: "Phone Case"},
                {subCategorysId: 7, name: "ETC"}
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

    const subCategorys = category.find(
        c => c.name === currCategoryl

    )

    const setCurrCategorymHandler = (categorym) => {
        setCurrCategorym(categorym)

        axios.get(`/api/product/findByCategorylAndCategorym?categoryl=${currCategoryl}&categorym=${categorym}&page=1`)
            .then(response => {
                setServData(response.data.dtoList)
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="categoryS_wrap">
            {subCategorys.subcategorys.map((subC) =>
                <div key={subC.subCategorysId} className="sub_container" >
                    <div className="sub_list" onClick={() => setCurrCategorymHandler(subC.name)}>{subC.name}</div>
                </div>
            )}
        </div>
    )
}
import axios from "axios";
import "./CategoryS.css";

export default function CategoryS({ categorylname, setCurrCategorym, setServData, setPageData, setCurrCategoryl}) {

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
        c => c.name === categorylname
    )

    const setCurrCategorymHandler = (categorym) => {
        setCurrCategorym(categorym)
        setCurrCategoryl(categorylname)

        axios.get(`/api/product/findByCategorylAndCategorym?categoryl=${categorylname}&categorym=${categorym}&page=1`)
            .then(response => {
                setServData(response.data.dtoList)
                setPageData({
                    page : response.data.page,
                    size : response.data.size,
                    start : response.data.start,
                    end : response.data.end,
                    prev : response.data.prev,
                    next : response.data.next,
                    totalpage : response.data.totalPage,
                    pageList : response.data.pageList
                })
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
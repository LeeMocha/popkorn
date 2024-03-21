import "./CategoryS.css";

export default function CategoryS({currCategory, isMouseEnter}) {

   

    const category = [
        {
            name: "main_list_new",
            subcategorys: [
                {subCategorysId: 1, name: "All"}
            ]
        },
        {
            name: "main_list_cd",
            subcategorys: [
                {subCategorysId: 3, name: "All"}
            ]
        },
        {
            name: "main_list_goods",
            subcategorys: [
                {subCategorysId: 4, name: "Officlal Fanlight"},
                {subCategorysId: 5, name: "Slogan"},
                {subCategorysId: 6, name: "Key Ring"},
                {subCategorysId: 7, name: "Phone Case"}
            ]
        },

        {
            name: "main_list_photo",
            subcategorys: [
                {subCategorysId: 8, name: "Photo Book"},
                {subCategorysId: 9, name: "Photo Card"}
            ]
        }
    ]

    const subCategorys = category.find (
        c => c.name === currCategory
    )

    console.log(currCategory.currCategory);
    console.log(subCategorys.subcategorys[0].name);    

    return (
        <div className="categoryS_wrap">
            {subCategorys.subcategorys.map((subC) =>
                <div key={subC.subCategorysId} className="sub_container" >
                    <div className="sub_list">{subC.name}</div>
                </div>
            )}
        </div>
    )
}
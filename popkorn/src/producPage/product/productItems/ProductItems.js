// import Slot from "../../../mProduct/slot/Slot"

export default function ProductItems({info}) {
    console.log(info.length)
    return (
       <div>
        {
            info.length > 0 ? info.map((item, index) => {
                return (
                    <div className="productItems_Content" key={index}> 
                        {/* <img src={item.src} alt="" /> */}
                        {/* <p>{item.artist}</p> */}
                        <p>{item.name}</p>
                        <h3>{item.price}</h3>
                    </div>
                )
            }) 
            : (
                <div className="productItems_out">
                    {/* <img src="" alt="Loading" /> */}
                    <p>상품 준비 중 입니다.</p>
                </div>
            )
        }
       </div>
    )
}
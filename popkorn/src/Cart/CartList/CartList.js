import "./CartList.css";



export default function CartList() {
    return (
        <div className="CartListMain">
            <h1>Cart</h1>
            <div className="CartListbox">
                <h3>There are no items in the shopping cart!</h3>
                <button>Go to the product page</button>
            </div>
        </div>
    )
}
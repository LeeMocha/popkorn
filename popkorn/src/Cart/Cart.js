import React from 'react';
import CartList from './CartList/CartList'
import CartListFrom from './CartListFrom/CartListFrom'

import './Cart.css'

// 장바구니에 상품이 담겨져 있을때 CartListFrom 페이지를 반환 없으면 
// CartList 페이지를 반환 하도록 할려고 페이지를 두개로 나눔(이렇게 하는게 맞아,,,?맞는겨..?)

function Cart() {
    return (
        <div className='Cartmain'>
            {/* <CartList /> */}
            <CartListFrom />
        </div>
    );
}

export default Cart;

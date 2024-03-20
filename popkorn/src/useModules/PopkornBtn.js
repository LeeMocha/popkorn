import { useState } from 'react';



export default function PopkornBtn({ btnName, btntype, btnfun }) {


    return (
        <div className='maintwoButton'>
            {
                btntype ?
                    <button onClick={btnfun} className='mainButton2'>{btnName}</button>
                    :
                    <button onClick={btnfun} className='mainButton2'>{btnName}</button>
            }
        </div>
    );

};
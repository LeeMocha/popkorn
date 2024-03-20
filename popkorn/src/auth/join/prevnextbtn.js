import React from 'react';

export default function PrevNextButtons({ onPrevClick, onNextClick }) {

    const onkeypresss = (event) => {
        if (event.keyCode === '13') {
            event.preventDefault();
            onNextClick();
        }
    }

    return (
        <div>
            <button onClick={onPrevClick} className='emprevstep'>Prev Step</button>
            <button onClick={onNextClick} onKeyDown={onkeypresss} className='emnextstep'>Next Step</button>
        </div>
    );
}

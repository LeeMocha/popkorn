import LESSERAFIMDetailMain from './LESSERAFIMDetailMain.png'

import './DetailMainImg.css'

const pData = {
    img: LESSERAFIMDetailMain
}


export default function DetailMainImg() {

    return (
        <div className='mainimg' >
            <img src={pData.img} alt='이미지'></img>
        </div>
    );
}

import Header from './header/Header';
import Event1 from './event/Event1';
import Event2 from './event/Event2';
import Celeb from './celeb/Celeb';
import MProduct from './mProduct/MProduct';
import Footer from './footer/Footer';
import { useState } from 'react';

export default function Main() {

    const [selectCeleb, setSelectCeleb] = useState("")


    return (
        <>
            <Header />
            <Event1>

            </Event1>
            <Celeb setSelectCeleb={setSelectCeleb}>

            </Celeb>
            <MProduct selectCeleb={selectCeleb}>

            </MProduct>
            <Event2>

            </Event2>
            <Footer />
        </>
    );
}
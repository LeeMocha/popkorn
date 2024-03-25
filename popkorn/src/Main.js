
import Header from './header/Header';
import Event1 from './event/Event1';
import Event2 from './event/Event2';
import Celeb from './celeb/Celeb';
import MProduct from './mProduct/MProduct';
import Footer from './footer/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Main() {

    const [celebs, setCelebs] = useState([]);
    const [selectCeleb, setSelectCeleb] = useState({})

    useEffect(()=> {
        axios.get("/api/celeb/celeblist")
        .then(response=>{
           setCelebs(response.data);
           setSelectCeleb(response.data[0]);
        }).catch( err => console.log(err))
        
     }, [])
     
    return (
        <>
            <Header />
            <Event1>

            </Event1>
            <Celeb celebs={celebs} setSelectCeleb={setSelectCeleb}>

            </Celeb>
            <MProduct selectCeleb={selectCeleb}>

            </MProduct>
            <Event2>

            </Event2>
            <Footer />
        </>
    );
}
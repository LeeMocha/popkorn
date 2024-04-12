
import Header from './header/Header';
import Event1 from './event/Event1';
import Event2 from './event/Event2';
import Celeb from './celeb/Celeb';
import MProduct from './mProduct/MProduct';
import Footer from './footer/Footer';
import { useState, useEffect } from 'react';
import { apiCall } from './service/apiService';

export default function Main() {

    const [celebs, setCelebs] = useState([]);
    const [selectCeleb, setSelectCeleb] = useState({})

    useEffect(()=> {
        apiCall("/api/celeb/celeblist", "GET", null, null)
        .then(response=>{
           setCelebs(response.data);
           setSelectCeleb(response.data[0]);
        }).catch( err => console.log(err))
        
     }, [])

     const [elseKey, setElseKey] = useState(0); // Key 값을 변경하기 위한 상태

     useEffect(() => {
         // productData가 변경될 때마다 key 값을 업데이트하여 Else 컴포넌트를 새로 마운트
         setElseKey(prevKey => prevKey + 1);
     }, [selectCeleb]);
     
    return (
        <>
            <Header />
            <Event1>

            </Event1>
            <Celeb celebs={celebs} setSelectCeleb={setSelectCeleb}>

            </Celeb>
            <MProduct key={elseKey} selectCeleb={selectCeleb}>

            </MProduct>
            <Event2>

            </Event2>
            <Footer />
        </>
    );
}
import { useEffect, useState } from 'react';
import Header from '../header/Header';
import DropList from './product/dropList/DropList';
import Product from './product/Product';

import "./ProductPage.css";

export default function ProductPage() {
    
    const [currCategoryl, setCurrCategoryl] = useState("new");
    const [currCategorym, setCurrCategorym] = useState("all");
    const popkornmainlogo = process.env.PUBLIC_URL + "/logoIMG/popkorn_logo.svg"
    const popkornlogos = process.env.PUBLIC_URL + "/logoIMG/logo_"
    const popkornlogossrc = ["p.svg","o.svg","p2.svg","o2.svg","r.svg","n.svg"]
    const [logoIndex, setLogoIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLogoIndex(prevIndex => (prevIndex + 1) % popkornlogossrc.length);
        }, 3000); // 주기마다 애니메이션을 변경하기 위한 시간 (3초 간격)

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
           <Header/>
           <DropList currCategoryl={currCategoryl} setCurrCategoryl={setCurrCategoryl} setCurrCategorym={setCurrCategorym}/>
           <Product currCategoryl={currCategoryl} currCategorym={currCategorym}/>
           {
               popkornlogossrc.map((src, index)=>
                   <img 
                       src={popkornlogos + src}
                       alt={`product_back_logos_${src}`} 
                       key={index} 
                       className={`product_back_logos poplogos${index % 2 === 0 ? '2' : '1'}`}
                       style={{ animationDelay: `${index * 1}s` }}
                   />
               )
           }
           <img src={popkornmainlogo} className='product_back_logo' alt="product_back_img" />
        </div>
       );
   }
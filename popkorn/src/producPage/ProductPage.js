import { useState } from 'react';
import Header from '../header/Header';
import DropList from './product/dropList/DropList';
import Product from './product/Product';

import "./ProductPage.css";


export default function ProductPage() {
    
    const [currCategoryl, setCurrCategoryl] = useState("new");
    const [currCategorym, setCurrCategorym] = useState("all");

    return (
     <div>
        <Header/>
        <DropList currCategoryl={currCategoryl} setCurrCategoryl={setCurrCategoryl} setCurrCategorym={setCurrCategorym}/>
        <Product currCategoryl={currCategoryl} currCategorym={currCategorym}/>
     </div>
    );
}




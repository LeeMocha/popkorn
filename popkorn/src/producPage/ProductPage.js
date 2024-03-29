import { useEffect, useState } from 'react';
import Header from '../header/Header';
import DropList from './product/dropList/DropList';
import Product from './product/Product';
import Paging from './product/paging/Paging';
import axios from "axios";

import "./ProductPage.css";
import Pagination from './product/pagination/Pagination';

export default function ProductPage() {

    const [currCategoryl, setCurrCategoryl] = useState("new");
    const [currCategorym, setCurrCategorym] = useState("All");
    const popkornmainlogo = process.env.PUBLIC_URL + "/logoIMG/popkorn_logo.svg"
    const popkornlogos = process.env.PUBLIC_URL + "/logoIMG/logo_"
    const popkornlogossrc = ["p.svg", "o.svg", "p2.svg", "o2.svg", "r.svg", "n.svg"]
    const [logoIndex, setLogoIndex] = useState(0);
    const [servData, setServData] = useState([]);

    const [pageData, setPageData] = useState({
        page : 1,
        size : 0,
        start : 0,
        end : 0,
        prev : 0,
        next : 0,
        totalPage : 0
    });

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMoveCategory, setIsMoveCategory] = useState(false);

    function moveCategory() {
        if (isMoveCategory !== window.scrollY) {
            try {
                document.querySelectorAll('.categoryM_wrap').classList.add('fade-out')
            } catch (e) {

            }
        }
    }

    const controlMove = () => {
        if (window.scrollY !== 0 || window.innerWidth <= 700) {
            document.querySelectorAll('.fade-out').forEach()

            setIsMoveCategory(window.scrollY);

            window.addEventListener('scroll', moveCategory);
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY !== 0);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    })

    useEffect(() => {
        menuHandler();
    }, [])

    const menuHandler = async () => {
        await axios.get(`/api/product/findByCategorylAndCategorym?categoryl=${currCategoryl}&categorym=${currCategorym}&page=${pageData.page}`)
            .then(response => {
                setServData(response.data.dtoList)
                setPageData({
                    page : response.data.page,
                    size : response.data.size,
                    start : response.data.start,
                    end : response.data.end,
                    prev : response.data.prev,
                    next : response.data.next,
                    totalpage : response.data.totalPage
                })
                console.log(response.data)
            }).catch(err => {
                console.log(err)
            })     
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setLogoIndex(prevIndex => (prevIndex + 1) % popkornlogossrc.length);
        }, 3000); // 주기마다 애니메이션을 변경하기 위한 시간 (3초 간격)

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Header />
            <div className={`dropList_wrap ${isScrolled ? "fade-out" : ""}`}>
                <DropList currCategoryl={currCategoryl} setCurrCategoryl={setCurrCategoryl} setCurrCategorym={setCurrCategorym} setServData={setServData} 
                isScrolled={isScrolled}/>
            </div>
            <Product currCategoryl={currCategoryl} currCategorym={currCategorym} servData={servData} />
            {
                popkornlogossrc.map((src, index) =>
                    <img
                        src={popkornlogos + src}
                        alt={`product_back_logos_${src}`}
                        key={index}
                        className={`product_back_logos poplogos${index % 2 === 0 ? '2' : '1'}`}
                        style={{ animationDelay: `${index * 1}s` }}
                    />
                )
            }
            <Pagination pageData={pageData} setPageData={setPageData}/> 
            {/* <Paging pageData={pageData} setPageData={setPageData}/> */}
            <img src={popkornmainlogo} className='product_back_logo' alt="product_back_img" />
        </div>
    );
}
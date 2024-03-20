import Slider from 'react-slick';

import celeb1 from "./celebIMG/lesserafim.png";
import celeb2 from "./celebIMG/ive.png";
import celeb3 from "./celebIMG/aespa.png";
import celeb4 from "./celebIMG/nct.png";
import celeb5 from "./celebIMG/newjeans.png";
import celeb6 from "./celebIMG/seventeen.png";
import celeb7 from "./celebIMG/straykids.png";
import celeb8 from "./celebIMG/zerobaseone.png";
import celeb9 from "./celebIMG/lesserafim.png";
import celeb10 from "./celebIMG/ive.png";
import celeb11 from "./celebIMG/aespa.png";
import celeb12 from "./celebIMG/nct.png";
import celeb13 from "./celebIMG/newjeans.png";
import celeb14 from "./celebIMG/seventeen.png";
import celeb15 from "./celebIMG/straykids.png";
import celeb16 from "./celebIMG/zerobaseone.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slidebar.css";

const slides = [
    { src: celeb1, target: "#", name: "Le sserafim" },
    { src: celeb2, target: "#", name: "Ive" },
    { src: celeb3, target: "#", name: "Aespa" },
    { src: celeb4, target: "#", name: "NCT" },
    { src: celeb5, target: "#", name: "NewJeans" },
    { src: celeb6, target: "#", name: "SevenTeen" },
    { src: celeb7, target: "#", name: "StrayKids" },
    { src: celeb8, target: "#", name: "ZeroBaseOne" },
    { src: celeb9, target: "#", name: "Le sserafim" },
    { src: celeb10, target: "#", name: "Ive" },
    { src: celeb11, target: "#", name: "Aespa" },
    { src: celeb12, target: "#", name: "NCT" },
    { src: celeb13, target: "#", name: "NewJeans" },
    { src: celeb14, target: "#", name: "SevenTeen" },
    { src: celeb15, target: "#", name: "StrayKids" },
    { src: celeb16, target: "#", name: "ZeroBaseOne" },
];



const Slideshow = () => {
    const settings = {
        slide: "itemLi",
        dots: false,
        infinite: true,
        speed: 700,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false, //화살표 없애기
        pauseOnHover : true,
        adaptiveHeight: true,
        variableWidth: true,
        draggable: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const gotoMproduct = ()=>{
        // const targetElement = document.querySelector(".mproduct_wrap");

        // // 엑시오스 자료 요청 받아서 mproduct 컴포넌트 해당 자료로 바꿔줘야 함.
        // // onClick 에서 해당 item 의 가수 이름 가져오고
        // // 요청명 / 클릭한 가수 이름  으로 요청 보내, select mproduct 메서드 호출
        // // 7가지 통계 최 상위 items 뽑아오기

        // if (targetElement) {
        //    targetElement.scrollIntoView({ behavior: "auto", block: "center"});
        // };
    }

    return (
        <ul className="slide_wrapper">
            <Slider {...settings}>
                {slides.map((s, i) => (
                    <li key={i} className='itemLi'>
                        <button className='itemLi_btn' onClick={()=>{gotoMproduct()}}>
                            <img src={s.src} alt="" className='item' />
                            <span className='itemname'>{s.name}</span>
                        </button>

                    </li>
                )
                )}
            </Slider>
        </ul>
    );
}

export default Slideshow;


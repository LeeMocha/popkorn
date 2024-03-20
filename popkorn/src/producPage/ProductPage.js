import Header from '../header/Header';
import DropList from './product/dropList/DropList';
import Product from './product/Product';



export default function ProductPage() {
    
    return (
     <div>
        <Header/>

        {/* <CategoryM/> */}
        <DropList/>

        <Product/>

     </div>
    );
}
// CategoryM과 DropList 연계 과정 진행 중 입니다. 
// 임시로 DropList 활성화 하여(CategoryM 주석 처리) 사용해 주세요 수정 전 일자 -2024.03.20
// pagination 수정 전(1-5 이 후 다시 1-5 반복 되는 문제)




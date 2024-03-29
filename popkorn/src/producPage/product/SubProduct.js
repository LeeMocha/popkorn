
import './SubProduct.css';
import Slot2 from './slot2/Slot2';
import Pagination from './pagination/Pagination';

export default function SubProduct({ servData, setPageData, pageData }) {
    return (
            <div className='subproduct_container'>
                <div className="subproduct_wrap">
                    {
                        servData.map((item, index) =>
                            <Slot2 key={index} item={item} index={index} />
                        )
                    }
                </div>
                    <Pagination pageData={pageData} setPageData={setPageData} />
            </div>
    );
}
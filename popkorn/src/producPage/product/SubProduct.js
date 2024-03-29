
import './SubProduct.css';
import Slot2 from './slot2/Slot2';

export default function SubProduct({ servData }) {
    return (
        <>
            <div className="subproduct_wrap">
                {
                    servData.map((item, index) =>
                        <Slot2 key={index} item={item} index={index} />
                    )
                }
            </div>
        </>
    );
}
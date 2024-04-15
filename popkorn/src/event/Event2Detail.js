import { useRef, useState } from "react"

export default function Event2Detail() {
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();

    
    return (
        <div className="modal_warp">
            <div className={btn_wrap} onClick={() => setModalOpen(true)}></div>
            {
                modalOpen && 
                <div className={modal_container} ref={modalBackground} onClick={e => {
                    if(e.target === modalBackground.current) {
                        setModalOpen(false);
                    }
                }}>
                <div className={modal_content}>

                </div>

                </div>
            }
        </div>
    )
}

import Slideshow from "./Slideshow";

import "./Slidebar.css";

export default function Slidebar({celebs}) {
    return (
        <div className="slide_container">
            <Slideshow celebs={celebs}/>
        </div>
    );
}
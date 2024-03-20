
import Slideshow from "./Slideshow";

import "./Slidebar.css";

export default function Slidebar() {
    return (
        <div className="slide_container">
            <Slideshow />
        </div>
    );
}


{/* <div
    className={"slide clone".concat(animate ? "" : " stop")}
>
    {slides.map((s, i) => (
        <li
            key={i}
            className={i % 2 === 0 ? "big" : "small"}
        >
          <img src={s.src} className="item" alt=""/>
          <span className="itemname">{s.name}</span>
        </li>
    ))}
</div> */}
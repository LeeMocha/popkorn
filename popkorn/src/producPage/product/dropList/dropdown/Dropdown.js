import { useEffect, useState } from "react";


const Dropdown = props => {

    const [visibilityAnimation, setVisibilityAnimation] = useState(false);

    useEffect(() => {
        if(props.visibility) {
            setVisibilityAnimation(true);
        }else {
            setTimeout(() => {
                setVisibilityAnimation(false);
            }, 400000);
        }
    }, [props.visibility])

    return (
        <article className="slide-fade-in-dropdown">
            { visibilityAnimation && props.children }
        </article>
    )
}

export default Dropdown;
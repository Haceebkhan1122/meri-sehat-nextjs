import React, { useState, useRef } from 'react';
import Status from "../status/Status";

// HOC => Component that manipulate it's child
function StatusWithoutBackground(props) {
    const scrollElement = useRef(null);
    const { status, icon, highlighted } = props;
    const [arrowsLeft, setArrowsLeft] = useState(false)
    const [arrowsRight, setArrowsRight] = useState(true)
    const [elementIndex, setElementIndex] = useState(0);
    const [highlightedNew, setHighlightedNew] = useState(null)


    const handleLeft = () => {
        const leftEndScroll = scrollElement.current.scrollLeft -= 100;
        let selectedElememt = document.querySelector('.hk_scroll').classList.add('hk_tag')
        if (scrollElement.current.scrollLeft) {
            setArrowsRight(false)
            setArrowsLeft(true)
            if (leftEndScroll <= 0) {
                setArrowsRight(true)
                setArrowsLeft(false)
            }
        }
        else if (!scrollElement.current.scrollLeft) {
            setArrowsRight(true)
            setArrowsLeft(false)
        }
    };

    const handleRight = () => {
        const rightEndScroll = scrollElement.current.scrollLeft += 100;
        let selectedElememt = document.querySelector('.hk_scroll').classList.add('hk_tag');

        // let scrollSpyLinks = document.querySelectorAll(".scrollSpyLink");

        if (scrollElement.current.scrollLeft > 0) {
            setArrowsRight(false)
            setArrowsLeft(true)
        }


        else {
            setArrowsRight(true)
            setArrowsLeft(false)

        }
    }

    const handleRemoveClass = () => {
        let selectedElememt = document.querySelector('.hk_scroll').classList.remove('hk_tag')
    }

    function scrollNavigator(e, url, index) {
        if (url) {
            let elemId = url?.split('#')[1];

            let elem = document.getElementById(elemId);

            const statusContainer = document.querySelector(".statusContainer");

            if (statusContainer) {
                if (statusContainer.classList.contains("_status")) {
                    const headerOffset = 160;
                    const elementPosition = elem.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                    });

                }
                else {
                    elem.scrollIntoView({ behavior: 'smooth' });

                    // here 280 is the value for appropriate scroll

                    let targetScrollPosition = elem.offsetTop - 280;

                    window.scrollBy({
                        top: targetScrollPosition,
                        behavior: "smooth"
                    });
                }
            }
        }
    }

    const handleTitleClick = (url) => {
        const highlightValue = url?.split('#')[1];
        setHighlightedNew(highlightValue); // Set the highlighted state
    };
    
    return (
        <div className="tags_container">
            <div className='hk_scroll hk_tag ' ref={scrollElement} onDrag={handleRemoveClass}>

                {status?.length >= 6 && (
                    arrowsLeft ? (
                        <span className='hk_left for_hidden' onClick={handleLeft}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                                <path d="M1.06019 5.31336L5.73471 0.28181C5.90294 0.100743 6.13076 -0.000627281 6.36808 2.92089e-06C6.6054 0.000633123 6.83277 0.103202 7.00017 0.28516C7.16756 0.467117 7.26128 0.713547 7.2607 0.970243C7.26012 1.22694 7.16528 1.47288 6.99706 1.65394L3.85828 5.03222H14.9388C15.1761 5.03222 15.4036 5.13417 15.5714 5.31567C15.7392 5.49716 15.8335 5.74333 15.8335 6C15.8335 6.25667 15.7392 6.50282 15.5714 6.68431C15.4036 6.86581 15.1761 6.96778 14.9388 6.96778H3.85828L6.99706 10.3461C7.16528 10.5271 7.26012 10.773 7.2607 11.0297C7.26128 11.2864 7.16756 11.5329 7.00017 11.7148C6.83277 11.8968 6.6054 11.9994 6.36808 12C6.13076 12.0006 5.90294 11.8993 5.73471 11.7182L1.06019 6.68662C0.976595 6.5966 0.910258 6.48961 0.864994 6.37178C0.81973 6.25394 0.796428 6.1276 0.796428 6C0.796428 5.8724 0.81973 5.74605 0.864994 5.62822C0.910258 5.51039 0.976595 5.40339 1.06019 5.31336Z" fill="#0F345A" />
                            </svg>
                        </span>
                    ) : null
                )}

                {status?.map(({ title, url }, index) => (
                    <>
                        {title && (
                            <>
                                <Status
                                    customClass={url?.split('#')[1] == highlightedNew ? 'active' : 'normal' || 'fff'}
                                    type={false}
                                    text={

                                        <a
                                            className={`scrollSpyLink`}
                                            data-to-scrollspy-id={url?.split('#')[1] || ''}
                                            href='javascript:;'
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent default anchor behavior
                                                handleTitleClick(url); // Call the function to set highlighted state
                                                scrollNavigator(e, url, index); // Call your scrollNavigator function
                                            }}
                                        >
                                            {title}
                                        </a>
                                    }
                                    progress="tags"
                                    icon={icon}
                                />
                            </>
                        )}
                    </>
                ))}

                {status?.length >= 6 ? (
                    <span className='hk_left __right for_hidden' onClick={handleRight}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                            <path d="M1.06019 5.31336L5.73471 0.28181C5.90294 0.100743 6.13076 -0.000627281 6.36808 2.92089e-06C6.6054 0.000633123 6.83277 0.103202 7.00017 0.28516C7.16756 0.467117 7.26128 0.713547 7.2607 0.970243C7.26012 1.22694 7.16528 1.47288 6.99706 1.65394L3.85828 5.03222H14.9388C15.1761 5.03222 15.4036 5.13417 15.5714 5.31567C15.7392 5.49716 15.8335 5.74333 15.8335 6C15.8335 6.25667 15.7392 6.50282 15.5714 6.68431C15.4036 6.86581 15.1761 6.96778 14.9388 6.96778H3.85828L6.99706 10.3461C7.16528 10.5271 7.26012 10.773 7.2607 11.0297C7.26128 11.2864 7.16756 11.5329 7.00017 11.7148C6.83277 11.8968 6.6054 11.9994 6.36808 12C6.13076 12.0006 5.90294 11.8993 5.73471 11.7182L1.06019 6.68662C0.976595 6.5966 0.910258 6.48961 0.864994 6.37178C0.81973 6.25394 0.796428 6.1276 0.796428 6C0.796428 5.8724 0.81973 5.74605 0.864994 5.62822C0.910258 5.51039 0.976595 5.40339 1.06019 5.31336Z" fill="#0F345A" />
                        </svg>
                    </span>
                ) : null}
            </div>
        </div >
    );
}

export default StatusWithoutBackground;

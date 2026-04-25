import React, { useEffect, useMemo, useRef, useState } from "react";


const WheelPickerComponent = ({
    dateItems,
    dateValue,
    onDateChange: handleDateChange,
    hourItems,
    hourValue,
    onHourChange: handleHourChange,
    minuteItems,
    minuteValue,
    onMinuteChange: handleMinuteChange,
    ampmItems,
    ampmValue,
    onAmpmChange: handleAmpmChange,
    containerHeight = 210,
    itemHeight = 32
}) => {
    const hourItemsContRef = useRef();
    const dateItemsContRef = useRef();
    const minuteItemsContRef = useRef();
    const ampmItemsContRef = useRef();
    const isScrolling = useRef(false);
    const dateRefs = useRef([]);
    const hourRefs = useRef([]);
    const minuteRefs = useRef([]);
    const ampmRefs = useRef([]);
    const [isMobile, setIsMobile] = useState(false);


    const [hourValues, setHourValues] = useState(/* default value here */);
    const [minValues, setMinValues] = useState(/* default value here */);
    const [amPmValues, setAmPmValues] = useState(/* default value here */);


    useEffect(() => {
        import("react-device-detect").then((item) => {
            setIsMobile(item.isMobile);
        });
    }, []);

    const dateItemsMap = useMemo(
        () =>
            dateItems.reduce(
                (map, item, index) => map.set(item.value, index),
                new Map()
            ),
        [dateItems]
    );
    const currentDateValue = useRef(dateItemsMap.get(dateValue) ?? 0);
    const hourItemsMap = useMemo(
        () =>
            hourItems.reduce(
                (map, item, index) => map.set(item.value, index),
                new Map()
            ),
        [hourItems]
    );
    const currentHourValue = useRef(hourItemsMap.get(hourValue) ?? 0);
    const minuteItemsMap = useMemo(
        () =>
            minuteItems.reduce(
                (map, item, index) => map.set(item.value, index),
                new Map()
            ),
        [minuteItems]
    );
    const currentMinuteValue = useRef(minuteItemsMap.get(minuteValue) ?? 0);
    const ampmItemsMap = useMemo(
        () =>
            ampmItems.reduce(
                (map, item, index) => map.set(item.value, index),
                new Map()
            ),
        [ampmItems]
    );
    const currentAmpmValue = useRef(ampmItemsMap.get(ampmValue) ?? 0);

    const visibleItemsCount = Math.floor(containerHeight / itemHeight);
    const offset = Math.round((visibleItemsCount + 1) / 2) + 1;
    const maxScrollOffset = (containerHeight - itemHeight) / 2;

    function rerenderDateElements(
        selectedElement,
        scrollTop,
        firstItemIndex = Math.max(selectedElement - offset, 0),
        lastItemIndex = Math.min(selectedElement + offset, dateItems.length)
    ) {
        if (dateRefs.current) {
            dateRefs.current
                .slice(firstItemIndex, lastItemIndex)
                .forEach((item, index) => {
                    const realIndex = index + firstItemIndex;
                    const scrollOffset = Math.min(
                        Math.abs(scrollTop - realIndex * itemHeight - itemHeight / 2),
                        maxScrollOffset
                    );
                    const sin = scrollOffset / maxScrollOffset;
                    const cos = Math.sqrt(1 - sin ** 2);
                    const [div] = item.getElementsByTagName("div");
                    div.style.transform = `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
                    div.style.transformOrigin = "right";
                });
        }
    }

    function rerenderHourElements(
        selectedElement,
        scrollTop,
        firstItemIndex = Math.max(selectedElement - offset, 0),
        lastItemIndex = Math.min(selectedElement + offset, dateItems.length)
    ) {
        if (hourRefs.current) {
            hourRefs.current
                .slice(firstItemIndex, lastItemIndex)
                .forEach((item, index) => {
                    const realIndex = index + firstItemIndex;
                    const scrollOffset = Math.min(
                        Math.abs(scrollTop - realIndex * itemHeight - itemHeight / 2),
                        maxScrollOffset
                    );
                    const sin = scrollOffset / maxScrollOffset;
                    const cos = Math.sqrt(1 - sin ** 2);
                    const [div] = item.getElementsByTagName("div");
                    div.style.transform = `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
                    div.style.transformOrigin = "center";
                });
        }
    }

    function rerenderMinuteElements(
        selectedElement,
        scrollTop,
        firstItemIndex = Math.max(selectedElement - offset, 0),
        lastItemIndex = Math.min(selectedElement + offset, dateItems.length)
    ) {
        if (minuteRefs.current) {
            minuteRefs.current
                .slice(firstItemIndex, lastItemIndex)
                .forEach((item, index) => {
                    const realIndex = index + firstItemIndex;
                    const scrollOffset = Math.min(
                        Math.abs(scrollTop - realIndex * itemHeight - itemHeight / 2),
                        maxScrollOffset
                    );
                    const sin = scrollOffset / maxScrollOffset;
                    const cos = Math.sqrt(1 - sin ** 2);
                    const [div] = item.getElementsByTagName("div");
                    div.style.transform = `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
                    div.style.transformOrigin = "left";
                });
        }
    }

    function rerenderAmpmElements(
        selectedElement,
        scrollTop,
        firstItemIndex = Math.max(selectedElement - offset, 0),
        lastItemIndex = Math.min(selectedElement + offset, dateItems.length)
    ) {
        if (ampmRefs.current) {
            ampmRefs.current
                .slice(firstItemIndex, lastItemIndex)
                .forEach((item, index) => {
                    const realIndex = index + firstItemIndex;
                    const scrollOffset = Math.min(
                        Math.abs(scrollTop - realIndex * itemHeight - itemHeight / 2),
                        maxScrollOffset
                    );
                    const sin = scrollOffset / maxScrollOffset;
                    const cos = Math.sqrt(1 - sin ** 2);
                    const [div] = item.getElementsByTagName("div");
                    div.style.transform = `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
                    div.style.transformOrigin = "left";
                });
        }
    }

    useEffect(() => {
        let isAnimating = false;

        function handleHourScroll(event) {
            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(() => {
                    const scrollTop = Math.max(event.target.scrollTop, 0);
                    const selectedElement = Math.min(
                        Math.max(Math.floor(scrollTop / itemHeight), 0),
                        hourItems.length - 1
                    );
                    window.clearTimeout(isScrolling.current);
                    rerenderHourElements(selectedElement, scrollTop);

                    currentHourValue.current = selectedElement;
                    isScrolling.current = setTimeout(function () {
                        handleHourChange(hourItems[selectedElement].value);
                    }, 20);

                    isAnimating = false;
                });
            }
        }
        hourItemsContRef.current?.addEventListener("scroll", handleHourScroll);
        hourRefs.current[currentDateValue.current]?.scrollIntoView({
            block: "center"
        });
        rerenderHourElements(
            currentHourValue.current,
            hourItemsContRef.current?.scrollTop,
            0,
            hourItems.length
        );
        return () => {
            hourItemsContRef.current?.removeEventListener("scroll", handleHourScroll);
        };
    }, [hourItemsContRef.current]);

    useEffect(() => {
        let isAnimating = false;

        function handleDateScroll(event) {
            if (!isAnimating) {
                isAnimating = true;

                requestAnimationFrame(() => {
                    const scrollTop = Math.max(event.target.scrollTop, 0);
                    const selectedElement = Math.min(
                        Math.max(Math.floor(scrollTop / itemHeight), 0),
                        dateItems.length - 1
                    );
                    window.clearTimeout(isScrolling.current);
                    rerenderDateElements(selectedElement, scrollTop);

                    currentDateValue.current = selectedElement;
                    isScrolling.current = setTimeout(function () {
                        handleDateChange(dateItems[selectedElement].value);
                    }, 20);

                    isAnimating = false;
                });
            }
        }

        dateItemsContRef.current?.addEventListener("scroll", handleDateScroll);
        dateRefs.current[currentDateValue.current]?.scrollIntoView({
            block: "center"
        });
        // rerenderDateElements(
        //     currentDateValue.current,
        //     dateItemsContRef.current?.scrollTop,
        //     0,
        //     dateItems.length
        // );

        return () => {
            dateItemsContRef.current?.removeEventListener("scroll", handleDateScroll);
        };
    }, [dateItemsContRef.current]);

    useEffect(() => {
        let isAnimating = false;

        function handleMinuteScroll(event) {
            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(() => {
                    const scrollTop = Math.max(event.target?.scrollTop, 0);
                    const selectedElement = Math.min(
                        Math.max(Math.floor(scrollTop / itemHeight), 0),
                        minuteItems.length - 1
                    );
                    window.clearTimeout(isScrolling.current);
                    rerenderMinuteElements(selectedElement, scrollTop);

                    currentMinuteValue.current = selectedElement;
                    isScrolling.current = setTimeout(function () {
                        handleMinuteChange(minuteItems[selectedElement].value);
                    }, 20);

                    isAnimating = false;
                });
            }
        }

        minuteItemsContRef.current?.addEventListener("scroll", handleMinuteScroll);
        // minuteRefs.current[currentDateValue.current]?.scrollIntoView({
        //     block: "center"
        // });
        // rerenderMinuteElements(
        //     currentMinuteValue.current,
        //     minuteItemsContRef.current?.scrollTop,
        //     0,
        //     minuteRefs.length
        // );
        return () => {
            // minuteItemsContRef.current?.removeEventListener(
            //     "scroll",
            //     handleMinuteScroll
            // );
        };
    }, [minuteItemsContRef.current]);

    useEffect(() => {
        let isAnimating = false;

        function handleAmpmScroll(event) {
            if (!isAnimating) {
                isAnimating = true;

                requestAnimationFrame(() => {
                    const scrollTop = Math.max(event.target.scrollTop, 0);
                    const selectedElement = Math.min(
                        Math.max(Math.floor(scrollTop / itemHeight), 0),
                        ampmItems.length - 1
                    );
                    window.clearTimeout(isScrolling.current);
                    rerenderAmpmElements(selectedElement, scrollTop);

                    currentAmpmValue.current = selectedElement;
                    isScrolling.current = setTimeout(function () {
                        handleAmpmChange(ampmItems[selectedElement].value);
                    }, 20);

                    isAnimating = false;
                });
            }
        }

        ampmItemsContRef.current?.addEventListener("scroll", handleAmpmScroll);
        ampmRefs.current[currentDateValue.current]?.scrollIntoView({
            block: "center"
        });
        rerenderAmpmElements(
            currentAmpmValue.current,
            ampmItemsContRef.current?.scrollTop,
            0,
            ampmRefs.length
        );
        return () => {
            ampmItemsContRef.current?.removeEventListener("scroll", handleAmpmScroll);
        };
    }, [ampmItemsContRef.current]);

    useEffect(() => {
        const index = dateItemsMap.get(dateValue);
        if (index !== currentDateValue.current) {
            currentDateValue.current = index;
            dateRefs.current[index]?.scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
            rerenderDateElements(
                currentDateValue.current,
                dateItemsContRef.current?.scrollTop,
                0,
                dateItems.length
            );
        }
    }, [dateValue]);

    useEffect(() => {
        const index = hourItemsMap.get(hourValue);
        if (index !== currentHourValue.current) {
            currentHourValue.current = index;
            hourRefs.current[index]?.scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
            rerenderDateElements(
                currentHourValue.current,
                hourItemsContRef.current?.scrollTop,
                0,
                hourItems.length
            );
        }
    }, [hourValue]);

    useEffect(() => {
        const index = minuteItemsMap.get(minuteValue);
        if (index !== currentMinuteValue.current) {
            currentMinuteValue.current = index;
            minuteRefs.current[index]?.scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
            rerenderDateElements(
                currentMinuteValue.current,
                minuteItemsContRef.current?.scrollTop,
                0,
                minuteItems.length
            );
        }
    }, [minuteValue]);

    useEffect(() => {
        const index = ampmItemsMap.get(ampmValue);
        if (index !== currentAmpmValue.current) {
            currentAmpmValue.current = index;
            ampmRefs.current[index]?.scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
            rerenderDateElements(
                currentAmpmValue.current,
                ampmItemsContRef.current?.scrollTop,
                0,
                ampmItems.length
            );
        }
    }, [ampmValue]);

    const handleMouseDrag = (event, ref) => {
        setMinValues('')
        setHourValues('')
        setAmPmValues('')
        let isDragging = false;
        let initialY = null;
        let initialScrollTop = null;

        const onMouseDown = (e) => {
            isDragging = true;
            initialY = e.clientY;
            initialScrollTop = ref.current.scrollTop;

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;

            const deltaY = e.clientY - initialY;
            const newScrollTop = initialScrollTop - deltaY;

            // Limit scrolling within the bounds of the container
            ref.current.scrollTop = Math.min(
                Math.max(newScrollTop, 0),
                ref.current.scrollHeight - ref.current.clientHeight
            );
        };

        const onMouseUp = () => {
            isDragging = false;
            initialY = null;
            initialScrollTop = null;

            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        event.preventDefault();
        onMouseDown(event);
    };

    const handleWheelScroll = (event, ref) => {
        setMinValues('')
        setHourValues('')
        setAmPmValues('')
        ref.current.scrollTop += event.deltaY;
        event.preventDefault();
    };

    useEffect(() => {
        if (hourValues !== "undefined") {
            const defaultHourValue = hourValue < 10 ? `0${hourValue}` : hourValue;
            setHourValues(defaultHourValue);

            const selectedElement = hourRefs.current.find((ref) => {
                const isMatch = ref && ref.dataset.value === defaultHourValue;
                return isMatch;
            });
            if (selectedElement) {
                selectedElement.scrollIntoView({
                    block: "center",
                });
            }
        }
    }, []);


    useEffect(() => {
        // Set the default value for hourValues in the useEffect
        const defaultHourValue = minuteValue;
        setMinValues(defaultHourValue);

        // Scroll to the selected item when the component mounts
        const selectedElement = minuteRefs.current.find(
            (ref) => ref && ref.dataset.value === defaultHourValue
        );

        if (selectedElement) {
            selectedElement.scrollIntoView({
                block: "center",
            });
        }
    }, []); // Empty dependency array ensures the useEffect runs only once on component mount

    useEffect(() => {
        // Set the default value for hourValues in the useEffect
        if (amPmValues !== "undefined") {
            const defaultHourValue = ampmValue;
            setAmPmValues(defaultHourValue);

            // Scroll to the selected item when the component mounts
            const selectedElement = ampmRefs.current.find(
                (ref) => ref && ref.dataset.value === amPmValues
            );
            if (selectedElement) {
                selectedElement.scrollIntoView({
                    block: "center",
                });
            }
        }

    }, [amPmValues]); // Empty dependency array ensures the useEffect runs only once on component mount

    return (
        <div className="container d-flex" style={{ height: `120px` }}>
            <ul
                className="items"
                ref={hourItemsContRef}
                onWheel={(e) => handleWheelScroll(e, hourItemsContRef)}
                onMouseDown={(e) => handleMouseDrag(e, hourItemsContRef)}
            >
                {hourItems.map((item, index) => (
                    <li
                        className={`item ${hourValues ? hourValues === item.value ? "selected" : "" : hourValue === item.value ? "selected" : ""}`}
                        key={item.value}
                        ref={(node) => (hourRefs.current[index] = node)}
                        data-value={item.value} // Adding data-value attribute for easy reference
                        style={{
                            height: `${itemHeight}px`,
                            lineHeight: `${itemHeight}px`,
                        }}
                    >

                        {isMobile ? (
                            <div>{item.label} <span className="colo n">:</span> </div>
                        ) : (
                            <div>{item.label} <span className="colon">:</span> </div>
                        )}
                    </li>
                ))}
            </ul>
            <ul
                className="items minn"
                ref={minuteItemsContRef}
                onWheel={(e) => handleWheelScroll(e, minuteItemsContRef)}
                onMouseDown={(e) => handleMouseDrag(e, minuteItemsContRef)}
            >
                {minuteItems.map((item, index) => (
                    <li
                        className={`item ${minValues ? minValues === item.value ? "selected" : "" : minuteValue === item.value ? "selected" : ""}`}
                        key={item.value}
                        ref={(node) => (minuteRefs.current[index] = node)}
                        data-value={item.value}
                        style={{
                            height: `${itemHeight}px`,
                            lineHeight: `${itemHeight}px`,
                        }}
                    >
                        <div>{item.label}</div>
                    </li>
                ))}
            </ul>
            <ul
                className="items"
                ref={ampmItemsContRef}
                onWheel={(e) => handleWheelScroll(e, ampmItemsContRef)}
                onMouseDown={(e) => handleMouseDrag(e, ampmItemsContRef)}
            >
                {ampmItems.map((item, index) => (
                    <li
                        className={`item ${amPmValues ? amPmValues === item.value ? "selected" : "" : ampmValue === item.value ? "selected" : ""}`}
                        key={item.value}
                        ref={(node) => (ampmRefs.current[index] = node)}
                        data-value={item.value}
                        style={{
                            height: `${itemHeight}px`,
                            lineHeight: `${itemHeight}px`,
                        }}
                    >
                        <div>{item.label}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const WheelPicker = React.memo(WheelPickerComponent);

import React, { useState, useEffect, useRef } from 'react'
import styles from '../trackHealth/trackHealth.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import CountUp from 'react-countup';


function trackHealth(props) {

    const [startCount, setStartCount] = useState(false);
    const sectionRef = useRef(null);

    const extractNumericValue = (heading) => {
        if (!heading) return { value: 0, hasK: false, hasDecimal: false, hasSlash: false, hasPlus: false };

        const numericValue = parseFloat(heading.replace(/[^\d.]/g, '')); // Extracts numeric part, including decimals
        const hasK = heading.toLowerCase().includes('k'); // Check if 'K' is present
        const hasDecimal = heading.includes('.'); // Check if a decimal point is present
        const hasSlash = heading.includes('/'); // Check if a slash is present
        const hasPlus = heading.includes('+'); // Check if '+' is present

        return { value: numericValue, hasK, hasDecimal, hasSlash, hasPlus, original: heading }; // Return all flags and original heading
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartCount(true);
                } else {
                    setStartCount(false);
                }
            },
            { threshold: 0.2 } // Adjust this value based on how much of the section should be visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);


    return (
        <>
            <section ref={sectionRef} className={`${styles.trackHealthSection} trackHealthSection mb-5`}
                style={{ '--card-color': props.widgetData?.data[0]?.card_1_color }}>
                <div className={`${styles.leftImageTrack} d-lg-block d-none trackAmb`}>
                    <Image src={props.widgetData?.data[0]?.image} width={860} height={818} className='img-fluid' />
                </div>
                <Container>
                    <Row>
                        <Col md={6} lg={6} className='ms-auto'>
                            <hr className='mb-5'></hr>
                            <ul className={`${styles.trackHealthListing} mb-128 trackHealthListing`}>
                                {props.widgetData?.data?.slice(1)?.map((item) => {
                                    return (
                                        <li>
                                            <h3>
                                                {startCount && (
                                                    <>
                                                        {extractNumericValue(item?.heading).hasSlash ? (
                                                            // If there's a slash, split the numbers and apply CountUp to both parts
                                                            <>
                                                                <CountUp
                                                                    start={0}
                                                                    end={parseInt(item?.heading.split('/')[0], 10)} // First number before the slash
                                                                    duration={2} // Adjust duration for counting
                                                                />
                                                                /
                                                                <CountUp
                                                                    start={0}
                                                                    end={parseInt(item?.heading.split('/')[1], 10)} // Second number after the slash
                                                                    duration={2} // Adjust duration for counting
                                                                />
                                                                {extractNumericValue(item?.heading).hasPlus && <span className={styles.plusSign}>+</span>} {/* Append '+' if present */}
                                                            </>
                                                        ) : (
                                                            <>

                                                                <CountUp
                                                                    start={0}
                                                                    end={extractNumericValue(item?.heading).value}
                                                                    decimals={extractNumericValue(item?.heading).hasDecimal ? 1 : 0} // Show 1 decimal if present
                                                                    duration={2} // Adjust duration for counting
                                                                />
                                                                {extractNumericValue(item?.heading).hasK && 'K'} {/* Append 'K' if present */}
                                                                {extractNumericValue(item?.heading).hasPlus && <span className={styles.plusSign}>+</span>} {/* Append '+' if present */}
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </h3>
                                            <p>{item?.description}</p>
                                        </li>
                                    )
                                })}
                            </ul>

                            <div className={`${styles.leftImageTrack} d-lg-none d-block mobileStyleBoxBg`}>
                                <Image src={props.widgetData?.data[0]?.image} width={860} height={818} className='img-fluid' />
                            </div>
                            <div className={styles.mainBoxBg}>
                                <h2>{props.widgetData?.data[0]?.heading}</h2>
                                <p>{props.widgetData?.data[0]?.description}</p>
                                <div className={`${styles.appstoreImages}`}>
                                    <a href={props.widgetData?.data[0]?.card_1_link} target="blank">
                                        <Image src={props.widgetData?.data[0]?.card_1_icon} width={200} height={60} className='img-fluid me-3' />
                                    </a>
                                    <a href={props.widgetData?.data[0]?.card_2_link} target="blank">
                                        <Image src={props.widgetData?.data[0]?.card_2_icon} width={200} height={60} className='img-fluid' />
                                    </a>
                                </div>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>
        </>
    )
}

export default trackHealth
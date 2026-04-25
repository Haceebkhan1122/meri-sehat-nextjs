import React, { useState, useEffect, useRef } from 'react'
import styles from './reachedWhere.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import parse from 'html-react-parser';
import CountUp from 'react-countup';


const ReachedWhere = (props) => {
    const [startCount, setStartCount] = useState(false);
    const sectionRef = useRef(null);
    const debounceTimeout = useRef(null);

    const extractNumericValue = (heading) => {
        if (!heading) return { value: 0, hasK: false, hasB: false, hasPercent: false, hasDecimal: false, hasSlash: false, hasPlus: false };
        const numericValue = parseFloat(heading.replace(/[^\d.]/g, '')); // Extracts numeric part, including decimals
        const hasK = heading.toLowerCase().includes('k'); // Check if 'K' is present (thousands)
        const hasB = heading.toLowerCase().includes('b'); // Check if 'b' is present (billions)
        const hasPercent = heading.includes('%'); // Check if '%' is present
        const hasDecimal = heading.includes('.'); // Check if a decimal point is present
        const hasSlash = heading.includes('/'); // Check if a slash is present
        const hasPlus = heading.includes('+'); // Check if '+' is present
        const hasM = heading.includes('M'); // Check if '+' is present
        const prefixMatch = heading.match(/^[^\d]+/);
        return { value: numericValue, hasK, hasB, hasPercent, hasDecimal, hasSlash, hasM, hasPlus, prefix: prefixMatch ? prefixMatch[0].trim() : "", original: heading }; // Return all flags and original heading
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                clearTimeout(debounceTimeout.current);
                debounceTimeout.current = setTimeout(() => {
                    setStartCount(entry.isIntersecting);
                }, 100); // Debounce time of 100ms
            },
            { threshold: 0.3 } // Adjust based on visibility requirement
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
            clearTimeout(debounceTimeout.current);
        };
    }, []);

    return (
        <div className={`${styles.wraperAllReachedCwp} wraperAllReachedCwp`} ref={sectionRef}>
            {
                (props?.widgetData?.slug == "corporate-wellness-v3" || props?.widgetData?.slug == "downloads-v3")
                && (<>
                    <Col lg={12}>
                        <h1> {props?.widgetData?.heading} </h1>
                        <div className={styles.wraperMainAll}>
                            <div className={styles.rating_bar_cwp}>
                                {["card_1_head", "card_2_head", "card_3_head"].map((cardKey, index) => {
                                    const cardHead = props?.widgetData?.data?.[0]?.[cardKey];
                                    const extractedValue = extractNumericValue(cardHead);
                                    return (
                                        <div className={styles.singleRate} key={index}>
                                            <h2>
                                                {startCount && (
                                                    <>
                                                        {extractedValue.hasSlash ? (
                                                            <>
                                                                <CountUp
                                                                    start={0}
                                                                    end={parseInt(cardHead.split('/')[0], 10)} // First number before the slash
                                                                    duration={2}
                                                                />
                                                                /
                                                                <CountUp
                                                                    start={0}
                                                                    end={parseInt(cardHead.split('/')[1], 10)} // Second number after the slash
                                                                    duration={2}
                                                                />
                                                                {extractedValue.hasPlus && <span className={styles.plusSign}>+</span>}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {extractedValue.prefix && <span>{extractedValue.prefix} </span>}
                                                                <CountUp
                                                                    start={0}
                                                                    end={extractedValue.value}
                                                                    decimals={extractedValue.hasDecimal ? 1 : 0}
                                                                    duration={2}
                                                                />
                                                                {extractedValue.hasK && 'K'}
                                                                {extractedValue.hasB && 'b'}
                                                                {extractedValue.hasPercent && '%'}
                                                                {extractedValue.hasM && 'M'}
                                                                {extractedValue.hasPlus && <span className={styles.plusSign}>+</span>}
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </h2>
                                            <p>
                                                {props?.widgetData?.data?.[0]?.[`card_${index + 1}_desc`]}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Col>
                </>)
            }
            <section className='connectingSection' style={{ backgroundColor: props?.widgetData?.data?.[0]?.card_1_inner_color }}>
                <Container className='h10'>
                    <div style={{ '--background-inner': props?.widgetData?.data?.[0]?.card_1_inner_color }} className={`${styles.wraper_reachedWhere} countingSection h10`}>
                        <h1> By the Numbers </h1>
                        <Row className='h10'>
                            <div style={{ '--background-reached': props?.widgetData?.data?.[0]?.card_1_color }} className={`${styles.box_center_align} connectingBoxing col-lg-12 h10`}>
                                <div className={`${styles.wraping_items} row wraping_itemsReac`} style={{ background: props?.widgetData?.slug == "sehat-scan-v3" ? props?.widgetData?.data?.[0]?.card_1_inner_color : "" }}>
                                    <Col lg={6} className='h-100'>
                                        <div className={`${styles.left_card} leftBoxConnecting`} style={{ background: props?.widgetData?.data?.[0]?.card_1_color }}>
                                            <h2 className='headingMain'>{parse(props?.widgetData?.data?.[0]?.heading)}</h2>
                                            <div className={`${styles.citiesWraper} citiesWraper`}>
                                                <div className="shape-0">
                                                    <div className={styles.wrape__single}>
                                                        <Image src={props?.widgetData?.data?.[0]?.card_1_icon || ""} alt='City Icon' width={540} height={100} className={styles.single_city_svg} />
                                                    </div>
                                                </div>
                                                <div className="shape-1">
                                                    <div className={styles.wrape__single}>
                                                        <Image src={props?.widgetData?.data?.[0]?.card_2_icon || ""} alt='City Icon' width={540} height={100} className={styles.single_city_svg} />
                                                    </div>
                                                </div>
                                                <div className="shape-2">
                                                    <div className={styles.wrape__single}>
                                                        <Image src={props?.widgetData?.data?.[0]?.card_3_icon || ""} alt='City Icon' width={540} height={100} className={styles.single_city_svg} />
                                                    </div>
                                                </div>
                                                <div className="shape-3">
                                                    <div className={styles.wrape__single}>
                                                        <Image src={props?.widgetData?.data?.[0]?.card_4_icon || ""} alt='City Icon' width={540} height={100} className={styles.single_city_svg} />
                                                    </div>
                                                </div>

                                                <div className="shape-4">
                                                    <div className={styles.wrape__single}>
                                                        <Image src={props?.widgetData?.data?.[0]?.card_5_icon || ""} alt='City Icon' width={540} height={100} className={styles.single_city_svg} />
                                                    </div>
                                                </div>

                                                <div className="shape-5">
                                                    <div className={styles.wrape__single}>
                                                        <Image src={props?.widgetData?.data?.[0]?.card_6_icon || ""} alt='City Icon' width={540} height={100} className={styles.single_city_svg} />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className={`${styles.para} overBox`}>
                                                <p>{props?.widgetData?.data?.[0]?.description && parse(props?.widgetData?.data?.[0]?.description)}</p></div>
                                        </div>
                                    </Col>
                                    <Col lg={1}></Col>
                                    <Col lg={4} className='h-100 my-auto'>
                                        <div className={`${styles.right_ratings_reached} mainBoxConnecting`}>
                                            {props?.widgetData?.data?.slice(1).map((item) => {
                                                const extractedValue = extractNumericValue(item?.heading);
                                                return (
                                                    <div className={styles.single_conect_ratings} key={item.id}>
                                                        <div className={`${styles.img__wrape_reached} imageBox01`}>
                                                            <Image src={item?.image || ""} width={100} height={100} alt='Icon' className={styles.single_city_svg} />
                                                        </div>
                                                        <div className={`${styles.singleCon} heaginRight`}>
                                                            <h2>
                                                                {startCount && (
                                                                    <>
                                                                        {extractedValue.hasSlash ? (
                                                                            <>
                                                                                <CountUp
                                                                                    start={0}
                                                                                    end={parseInt(item?.heading.split('/')[0], 10)} // First number before the slash
                                                                                    duration={2}
                                                                                />
                                                                                /
                                                                                <CountUp
                                                                                    start={0}
                                                                                    end={parseInt(item?.heading.split('/')[1], 10)} // Second number after the slash
                                                                                    duration={2}
                                                                                />
                                                                                {extractedValue.hasPlus && <span className={styles.plusSign}>+</span>}
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                {/* Display the prefix like 'Rs.' if present */}
                                                                                {extractedValue.prefix && <span>{extractedValue.prefix} </span>}
                                                                                <CountUp
                                                                                    start={0}
                                                                                    end={extractedValue.value}
                                                                                    decimals={extractedValue.hasDecimal ? 1 : 0}
                                                                                    duration={2}
                                                                                />
                                                                                {/* Append K, b, %, + if present */}
                                                                                {extractedValue.hasK && 'K'}
                                                                                {extractedValue.hasB && 'b'}
                                                                                {extractedValue.hasPercent && '%'}
                                                                                {extractedValue.hasM && 'M'}
                                                                                {extractedValue.hasPlus && <span className={styles.plusSign}>+</span>}
                                                                            </>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </h2>
                                                            <span> {item?.description} </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </Row>
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default ReachedWhere;

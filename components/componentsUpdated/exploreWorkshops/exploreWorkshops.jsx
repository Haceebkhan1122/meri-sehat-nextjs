import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import styles from './exploreWorkshops.module.scss';
import Image from 'next/image';
import parse from 'html-react-parser';
import Link from 'next/link';


const ExploreWorkshops = (props) => {
    return (
        <>
            <Container>

                <div className={`${styles.exploreWorkshops}  exploreWorkshopsSpacing pt-5 mt-4`}>
                    <Row>
                        <div className={`${styles.workshopHeading}`}>
                            <h4>
                                {props.widgetData.heading}
                            </h4>
                            <p>
                                {props.widgetData.description && parse(props.widgetData.description)}
                            </p>
                        </div>
                    </Row>
                    <Row className={`${styles.secondRowImages}`}>
                        {props?.widgetData?.data?.map((items) => (
                            <Col lg={4} className={`${styles.fiveFRem}`}>
                                <Link href={`/corporate-wellness-workshop-detail/${items?.id}`}>
                                    <Image src={items?.cover_image_url || ''} width={424} height={324} />
                                    <div className={`${styles.descriptionBox}`}>
                                        <p>{items.title}</p>
                                    </div>
                                    <div>
                                        <hr style={{ height: '1px', width: ' 100%', color: '#0F345A' }} className='' />
                                    </div>
                                    <div className={`${styles.belowImageLine}`}>
                                        <Col lg={3} className='me-4'>
                                            <div className={`${styles.firstBox}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M15.473 16.527L16.527 15.473L12.75 11.696V7H11.25V12.3038L15.473 16.527ZM12.0017 21.5C10.6877 21.5 9.45267 21.2507 8.2965 20.752C7.14033 20.2533 6.13467 19.5766 5.2795 18.7218C4.42433 17.8669 3.74725 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74933 15.7035 3.248C16.8597 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.13308 20.2528 7.13833 20.7518 8.294C21.2506 9.44967 21.5 10.6844 21.5 11.9983C21.5 13.3123 21.2507 14.5473 20.752 15.7035C20.2533 16.8597 19.5766 17.8653 18.7218 18.7205C17.8669 19.5757 16.8617 20.2528 15.706 20.7518C14.5503 21.2506 13.3156 21.5 12.0017 21.5ZM12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 9.78333 19.2208 7.89583 17.6625 6.3375C16.1042 4.77917 14.2167 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20Z" fill="#0F345A" />
                                                </svg>
                                                <p>{items.duration}</p>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className={`${styles.secondBox}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12.2368 11.621C11.0514 11.621 10.0367 11.199 9.19264 10.3549C8.3484 9.51069 7.92628 8.49588 7.92628 7.31049C7.92628 6.12511 8.3484 5.1104 9.19264 4.26636C10.0367 3.42212 11.0514 3 12.2368 3C13.4222 3 14.4369 3.42212 15.2809 4.26636C16.1251 5.1104 16.5473 6.12511 16.5473 7.31049C16.5473 8.49588 16.1251 9.51069 15.2809 10.3549C14.4369 11.199 13.4222 11.621 12.2368 11.621ZM3 21V18.2619C3 17.6589 3.1638 17.1003 3.4914 16.5864C3.81899 16.0724 4.25682 15.6773 4.80486 15.401C6.02207 14.8043 7.25004 14.3567 8.4888 14.0583C9.72755 13.7598 10.9769 13.6106 12.2368 13.6106C13.4967 13.6106 14.746 13.7598 15.9847 14.0583C17.2235 14.3567 18.4515 14.8043 19.6687 15.401C20.2167 15.6773 20.6545 16.0724 20.9821 16.5864C21.3097 17.1003 21.4735 17.6589 21.4735 18.2619V21H3ZM4.84735 19.1526H19.6262V18.2619C19.6262 18.0125 19.5539 17.7816 19.4094 17.5692C19.2649 17.3569 19.0688 17.1837 18.821 17.0494C17.7598 16.5268 16.6779 16.1309 15.5752 15.8616C14.4724 15.5925 13.3596 15.4579 12.2368 15.4579C11.114 15.4579 10.0012 15.5925 8.89829 15.8616C7.79563 16.1309 6.71369 16.5268 5.65249 17.0494C5.40474 17.1837 5.20861 17.3569 5.06411 17.5692C4.91961 17.7816 4.84735 18.0125 4.84735 18.2619V19.1526ZM12.2368 9.77363C12.9141 9.77363 13.494 9.53245 13.9764 9.05008C14.4587 8.56772 14.6999 7.98786 14.6999 7.31049C14.6999 6.63313 14.4587 6.05327 13.9764 5.5709C13.494 5.08854 12.9141 4.84735 12.2368 4.84735C11.5594 4.84735 10.9795 5.08854 10.4972 5.5709C10.0148 6.05327 9.77363 6.63313 9.77363 7.31049C9.77363 7.98786 10.0148 8.56772 10.4972 9.05008C10.9795 9.53245 11.5594 9.77363 12.2368 9.77363Z" fill="#0F345A" />
                                                </svg>
                                                <p>{items.min_participant}-{items.max_participant} participants</p>
                                            </div>
                                        </Col>
                                    </div>





                                </Link>
                            </Col>
                        ))}
                        <Col md={12}>
                            {props?.widgetData?.slug == "corporate-wellness-program-workshop" ? (
                                <>
                                    <Link href="/corporate-wellness-workshop-listing?page=1&cat=all" className={styles.showMore}>
                                        SHOW MORE
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link style={{width:'500px'}} href="/corporate-wellness-program-workshop" className={styles.showMore}>
                                        Explore our Workshops
                                    </Link>
                                </>
                            )}

                        </Col>
                    </Row>
                </div>

            </Container>
        </>
    )
}

export default ExploreWorkshops
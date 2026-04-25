import React from 'react'
import styles from '../crucialHealthVitals/crucialHealthVitals.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from "next/image";

function crucialHealthVitals(props) {
    const isMobile = useMediaQuery('(max-width:767px)');
    return (
        <>
            <section style={{ '--crucialMain': props?.widgetData?.data[0].card_1_color }} className={`${styles.crucialHealthVitals} crucialHealthVitalsSection pb-80 pt-80`}>
                <Container>
                    <Row>
                        <Col md={12} className='mx-auto'>
                            <Row>
                                {!isMobile ? (<Col md={12} className='position-relative'>
                                    <div className={`${styles.rowBox01} text-start d-flex rowBox01Global`}>
                                        <div className={`${styles.box01} ${styles.boxUIText} boxstyling position-relative`} data-aos="fade-right" data-aos-duration="3000">
                                            <button>
                                                <Image height={15} width={15} src={props?.widgetData?.data[0]?.card_1_icon} className={`${styles.linkIcon} img-fluid`}></Image>
                                                <div className={`${styles.mb_40} d-flex align-items-center `}>
                                                    <Image height={33} width={32} src={props?.widgetData?.data[0]?.image} className='img-fluid'></Image>
                                                    <h5>{props?.widgetData?.data[0]?.heading}</h5>
                                                </div>
                                                <p>{props?.widgetData?.data[0]?.card_1_head}</p>

                                                <p>{props?.widgetData?.data[0]?.card_2_head}</p>

                                                <p>{props?.widgetData?.data[0]?.card_3_head}</p>

                                                <p>{props?.widgetData?.data[0]?.card_4_head}</p>
                                            </button>
                                        </div>
                                        <div className={`${styles.rowBox0Inner} text-start d-flex rowBox01Global1`}>
                                            {/* Box 1 end */}
                                            <div className={`${styles.box02} ${styles.boxUIText}  ${styles.bgPink} boxstyling02 position-relative`} data-aos="fade-down" data-aos-duration="3000">
                                                <Image width={200} height={200} src={props?.widgetData?.data[1]?.image} className={`${styles.imageBox} img-fluid`}></Image>
                                                <button >{props?.widgetData?.data[1]?.heading}</button>
                                            </div>
                                            {/* Box 2 end */}
                                            <div className={`${styles.box03} ${styles.boxUIText}   boxstyling02 position-relative`} data-aos="fade-down" data-aos-duration="3000">
                                                <button>
                                                    <Image height={15} width={15} src={props?.widgetData?.data[2]?.card_1_icon} className={`${styles.linkIcon} img-fluid`}></Image>
                                                    <div className={`${styles.mb_4} `}>
                                                        <Image height={32} width={32} src={props?.widgetData?.data[2]?.image} className='img-fluid mb-3'></Image>
                                                        <h5 className='ms-0 text-center'>{props?.widgetData?.data[2]?.heading}</h5>
                                                    </div>
                                                </button>
                                            </div>
                                            {/* Box 3 end */}

                                            <div className={`${styles.box04} ${styles.boxUIText} boxstyling position-relative`} data-aos="fade-down" data-aos-duration="3000">
                                                <button>
                                                    <Image height={15} width={15} src={props?.widgetData?.data[3]?.card_1_icon} className={`${styles.linkIcon} img-fluid`}></Image>
                                                    <div className={` d-flex align-items-center`}>
                                                        <Image height={28} width={19} src={props?.widgetData?.data[3]?.image} className='img-fluid'></Image>
                                                        <h5>{props?.widgetData?.data[3]?.heading}</h5>
                                                    </div>
                                                    <p>{props?.widgetData?.data[3]?.card_1_head}</p>
                                                    <p>{props?.widgetData?.data[3]?.card_2_head}</p>
                                                </button>
                                            </div>
                                            {/* Box 4 end */}
                                            <div style={{ backgroundColor: props?.widgetData?.data[4]?.card_1_color }} className={`${styles.box03} ${styles.boxUIText} boxstyling02 position-relative`} data-aos="fade-down" data-aos-duration="3000">
                                                <button><Image height={15} width={16} src={props?.widgetData?.data[4]?.card_1_icon} className={`${styles.linkWhitebtn} img-fluid`}></Image>
                                                    <Image height={70} width={70} src={props?.widgetData?.data[4]?.image} className={`${styles.imageBox} img-fluid mb-3`}></Image>
                                                    <h6 >{props?.widgetData?.data[4]?.heading}</h6>
                                                </button>
                                            </div>
                                            {/* Box 5 end */}
                                            <div style={{ backgroundColor: props?.widgetData?.data[5]?.card_1_color }} className={`${styles.box05} ${styles.boxUIText5}   boxstyling05`} data-aos="zoom-in" data-aos-duration="3000">
                                                <p>{props?.widgetData?.data[5]?.sub_head}</p>
                                                <h4>{props?.widgetData?.data[5]?.heading}</h4>
                                            </div>
                                            {/* Box 6 end */}
                                        </div>
                                    </div>

                                    <div className={`${styles.rowBox01}  ${styles.rowBox0Bottom}  text-start d-flex rowBox01Global mt-3`}>

                                        <div className={`${styles.rowBox0Inner} text-start d-flex rowBoxForColum`}>
                                            <div className={`${styles.boxFor4}   text-start d-flex boxFor  `}>
                                                <div style={{ backgroundColor: props?.widgetData?.data[7]?.card_1_color }} className={`${styles.box011} smallBoxes`} data-aos="fade-right " data-aos-duration="3000">
                                                    <h6>{props?.widgetData?.data[7]?.heading}</h6>
                                                </div>
                                                <div style={{ backgroundColor: props?.widgetData?.data[8]?.card_1_color }} className={`${styles.box011} smallBoxes`} data-aos="fade-right " data-aos-duration="3000">
                                                    <h6>{props?.widgetData?.data[8]?.heading}</h6>
                                                </div>
                                                <div style={{ backgroundColor: props?.widgetData?.data[11]?.card_1_color }} className={`${styles.box011} smallBoxes`} data-aos="fade-up " data-aos-duration="3000">
                                                    <h6>{props?.widgetData?.data[11]?.heading}</h6>
                                                </div>
                                                <div style={{ backgroundColor: props?.widgetData?.data[12]?.card_1_color }} className={`${styles.box011} smallBoxes`} data-aos="fade-up " data-aos-duration="3000">
                                                    <h6>{props?.widgetData?.data[12]?.heading}</h6>
                                                </div>
                                            </div>
                                            {/* Box 7 end */}
                                            <div style={{ backgroundColor: props?.widgetData?.data[9]?.card_1_color }} className={`${styles.box03} ${styles.boxUIText}   ${styles.blue} boxstyling02 position-relative`} data-aos="fade-up" data-aos-duration="3000">
                                                <button><Image height={15} width={16} src={props?.widgetData?.data[9]?.card_1_icon} className={`${styles.linkWhitebtn} img-fluid`}></Image>
                                                    <Image height={70} width={70} src={props?.widgetData?.data[9]?.image} className={`${styles.imageBox} img-fluid mb-3`}></Image>
                                                    <h6 >{props?.widgetData?.data[9]?.heading}</h6>
                                                </button>
                                            </div>
                                            {/* Box 8 end */}

                                            <div style={{ backgroundColor: props?.widgetData?.data[10]?.card_1_color }} className={`${styles.box04}   ${styles.boxUIText} boxstyling position-relative pt-3 pb-3`} data-aos="fade-up" data-aos-duration="3000">
                                                <button>
                                                    <Image height={15} width={15} src={props?.widgetData?.data[10]?.card_1_icon} className={`${styles.linkIcon} img-fluid`}></Image>
                                                    <div className={` d-flex align-items-center`}>
                                                        <Image height={27} width={37} src={props?.widgetData?.data[10]?.image} className='img-fluid'></Image>
                                                        <h5 className='pe-3'>{props?.widgetData?.data[10]?.heading}</h5>
                                                    </div>
                                                    <p>{props?.widgetData?.data[10]?.card_1_head}</p>
                                                    <p>{props?.widgetData?.data[10]?.card_2_head}</p>
                                                </button>
                                            </div>
                                            {/* Box 9 end */}

                                        </div>
                                        <div className={`${styles.box01} ${styles.boxUIText} ${styles.boxLast} boxstyling pt-4 `} data-aos="fade-left" data-aos-duration="3000">
                                            <button>
                                                <Image height={15} width={15} src={props?.widgetData?.data[6]?.card_1_icon} className={`${styles.linkIcon} img-fluid`}></Image>
                                                <div className={`${styles.mb_40} d-flex align-items-center mb-4`}>
                                                    <Image width={29} height={40} src={props?.widgetData?.data[6]?.image} className='img-fluid'></Image>
                                                    <h5>{props?.widgetData?.data[6]?.heading}</h5>
                                                </div>
                                                <p>{props?.widgetData?.data[6]?.card_1_head}</p>

                                                <p>{props?.widgetData?.data[6]?.card_2_head}</p>

                                                <p>{props?.widgetData?.data[6]?.card_3_head}</p>
                                                <Image width={212} height={170} src={props?.widgetData?.data[6]?.card_3_icon} className={`${styles.imageBottom} img-fluid`}></Image>
                                            </button>
                                        </div>
                                    </div>

                                </Col>) : (
                                    <Col md={12} className='position-relative crucial-mobile'>
                                        <div className={`${styles.rowBox01}`}>
                                            <Row>
                                                <Col xs={7}>
                                                    <Row>
                                                        <Col xs={12}>
                                                            <div className={`${styles.box01} ${styles.boxUIText} boxstyling position-relative`} data-aos="fade-right" data-aos-duration="3000">
                                                                <button>
                                                                    <Image height={15} width={15} src={props?.widgetData?.data[0]?.card_1_icon} className={`${styles.linkIcon} img-fluid`}></Image>
                                                                    <div className={`${styles.mb_40} d-flex align-items-center `}>
                                                                        <Image height={33} width={32} src={props?.widgetData?.data[0]?.image} className='img-fluid'></Image>
                                                                        <h5>{props?.widgetData?.data[0]?.heading}</h5>
                                                                    </div>
                                                                    <p>{props?.widgetData?.data[0]?.card_1_head}</p>

                                                                    <p>{props?.widgetData?.data[0]?.card_2_head}</p>

                                                                    <p>{props?.widgetData?.data[0]?.card_3_head}</p>

                                                                    <p>{props?.widgetData?.data[0]?.card_4_head}</p>
                                                                </button>
                                                            </div>
                                                        </Col>
                                                        <Col xs={12}>
                                                            <div className={`${styles.box04} ${styles.boxUIText} boxstyling position-relative`} data-aos="fade-right" data-aos-duration="3000">
                                                                <button>
                                                                    <Image height={15} width={15} src={props?.widgetData?.data[3]?.card_1_icon} className={`${styles.linkIcon} img-fluid`}></Image>
                                                                    <div className={` d-flex align-items-center mb-4`}>
                                                                        <Image height={28} width={19} src={props?.widgetData?.data[3]?.image} className='img-fluid'></Image>
                                                                        <h5>{props?.widgetData?.data[3]?.heading}</h5>
                                                                    </div>
                                                                    <p>{props?.widgetData?.data[3]?.card_1_head}</p>
                                                                    <p>{props?.widgetData?.data[3]?.card_2_head}</p>
                                                                </button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={5}>
                                                    <div className={`${styles.rowBox0Inner} rowBox01Global1 `}>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <div className={`${styles.box02} ${styles.boxUIText}  ${styles.bgPink} boxstyling02 position-relative`} data-aos="fade-left" data-aos-duration="3000">
                                                                    <Image width={200} height={200} src={props?.widgetData?.data[1]?.image} className={`${styles.imageBox} img-fluid`}></Image>
                                                                    <button >{props?.widgetData?.data[1]?.heading}</button>
                                                                </div>
                                                            </Col>
                                                            <Col xs={12}>
                                                                <div className={`${styles.box03} ${styles.boxUIText}  boxstyling02 position-relative breath`} data-aos="fade-left" data-aos-duration="3000">
                                                                    <button>
                                                                        <Image height={15} width={15} src={props?.widgetData?.data[2]?.card_1_icon} className={`${styles.linkIcon} img-fluid`}></Image>
                                                                        <div className={`${styles.mb_4} `}>
                                                                            <Image height={32} width={32} src={props?.widgetData?.data[2]?.image} className='img-fluid mb-3 bg_heart'></Image>
                                                                            <h5 className='ms-0 text-center'>{props?.widgetData?.data[2]?.heading}</h5>
                                                                        </div>
                                                                    </button>
                                                                </div>
                                                            </Col>
                                                            <Col xs={12}>
                                                                <div style={{ backgroundColor: props?.widgetData?.data[4]?.card_1_color }} className={`${styles.box03} ${styles.boxUIText} boxstyling02 position-relative orange-box`} data-aos="fade-left" data-aos-duration="3000">
                                                                    <button><Image height={15} width={16} src={props?.widgetData?.data[4]?.card_1_icon} className={`${styles.linkWhitebtn} img-fluid`}></Image>
                                                                        <Image height={70} width={70} src={props?.widgetData?.data[4]?.image} className={`${styles.imageBox} img-fluid mb-3 heart_img`}></Image>
                                                                        <h6 >{props?.widgetData?.data[4]?.heading}</h6>
                                                                    </button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                                <Col xs={12}>
                                                    <div style={{ backgroundColor: props?.widgetData?.data[5]?.card_1_color }} className={`${styles.box05} ${styles.boxUIText5} boxstyling05`} data-aos="zoom-in" data-aos-duration="3000">
                                                        <p>{props?.widgetData?.data[5]?.sub_head}</p>
                                                        <h4>{props?.widgetData?.data[5]?.heading}</h4>
                                                    </div>
                                                </Col>
                                                <Col xs={12}>
                                                    <div className={`${styles.rowBox0Inner} rowBoxForColum`}>
                                                        <div className={`${styles.boxFor4} boxFor`}>
                                                            <Row>
                                                                <Col xs={6} data-aos="fade-right" data-aos-duration="3000">
                                                                    <div style={{ backgroundColor: props?.widgetData?.data[7]?.card_1_color }} className={`${styles.box011} `}>
                                                                        <h6>{props?.widgetData?.data[7]?.heading}</h6>
                                                                    </div>
                                                                </Col>
                                                                <Col xs={6} data-aos="fade-left" data-aos-duration="3000">
                                                                    <div style={{ backgroundColor: props?.widgetData?.data[8]?.card_1_color }} className={`${styles.box011} `}>
                                                                        <h6>{props?.widgetData?.data[8]?.heading}</h6>
                                                                    </div>
                                                                </Col>
                                                                <Col xs={6} data-aos="fade-right" data-aos-duration="3000">
                                                                    <div style={{ backgroundColor: props?.widgetData?.data[11]?.card_1_color }} className={`${styles.box011} `}>
                                                                        <h6>{props?.widgetData?.data[11]?.heading}</h6>
                                                                    </div>
                                                                </Col>
                                                                <Col xs={6} data-aos="fade-left" data-aos-duration="3000">
                                                                    <div style={{ backgroundColor: props?.widgetData?.data[12]?.card_1_color }} className={`${styles.box011} `}>
                                                                        <h6>{props?.widgetData?.data[12]?.heading}</h6>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xs={12}>
                                                    <Row>
                                                        <Col xs={7}>
                                                            <div className={`${styles.box01} ${styles.boxUIText} ${styles.boxLast} boxstyling pt-4`} data-aos="fade-right" data-aos-duration="3000">
                                                                <button>
                                                                    <Image height={15} width={15} src={props?.widgetData?.data[6]?.card_1_icon} className={`${styles.linkIcon} img-fluid`}></Image>
                                                                    <div className={`${styles.mb_40} d-flex align-items-center mb-4`}>
                                                                        <Image width={29} height={40} src={props?.widgetData?.data[6]?.image} className='img-fluid'></Image>
                                                                        <h5>{props?.widgetData?.data[6]?.heading}</h5>
                                                                    </div>
                                                                    <p>{props?.widgetData?.data[6]?.card_1_head}</p>

                                                                    <p>{props?.widgetData?.data[6]?.card_2_head}</p>

                                                                    <p>{props?.widgetData?.data[6]?.card_3_head}</p>
                                                                    <Image width={212} height={170} src={props?.widgetData?.data[6]?.card_3_icon} className={`${styles.imageBottom} img-fluid`}></Image>
                                                                </button>
                                                            </div>
                                                        </Col>
                                                        <Col xs={5}>
                                                            <Row>
                                                                <Col xs={12}>
                                                                    <div style={{ backgroundColor: props?.widgetData?.data[10]?.card_1_color }} className={`${styles.box04}   ${styles.boxUIText} boxstyling position-relative pt-3 pb-3`} data-aos="fade-left" data-aos-duration="3000">
                                                                        <button>
                                                                            <Image height={15} width={15} src={props?.widgetData?.data[10]?.card_1_icon} className={`${styles.linkIcon} img-fluid`}></Image>
                                                                            <div className={` d-flex align-items-center mb-3`}>
                                                                                <Image height={27} width={37} src={props?.widgetData?.data[10]?.image} className='img-fluid blood_pressure'></Image>
                                                                                <h5 className='pe-3'>{props?.widgetData?.data[10]?.heading}</h5>
                                                                            </div>
                                                                            <p>{props?.widgetData?.data[10]?.card_1_head}</p>
                                                                            <p>{props?.widgetData?.data[10]?.card_2_head}</p>
                                                                        </button>
                                                                    </div>
                                                                </Col>
                                                                <Col xs={12}>
                                                                    <div style={{ backgroundColor: props?.widgetData?.data[9]?.card_1_color }} className={`${styles.box03} ${styles.boxUIText}   ${styles.blue} boxstyling02 position-relative`} data-aos="fade-right" data-aos-duration="3000">
                                                                        <button><Image height={15} width={16} src={props?.widgetData?.data[9]?.card_1_icon} className={`${styles.linkWhitebtn} img-fluid`}></Image>
                                                                            <Image height={70} width={70} src={props?.widgetData?.data[9]?.image} className={`${styles.imageBox} img-fluid mb-3 brain_img`}></Image>
                                                                            <h6 >{props?.widgetData?.data[9]?.heading}</h6>
                                                                        </button>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default crucialHealthVitals
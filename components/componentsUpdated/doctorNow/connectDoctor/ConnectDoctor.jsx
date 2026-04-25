import React, { useState } from 'react'
import styles from './connectDoctor.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import parse from 'html-react-parser';
import useMediaQuery from '@mui/material/useMediaQuery';
import QRModal from '../../qRModal/QRModal';

const ConnectDoctor = (props) => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [qRModalIsShow, setQRModalIsShow] = useState(false);

    const QrModalHandler = () => {
        setQRModalIsShow(true)
    }

    return (
        <>
            <section className={`${styles.connectDoctor} connectDoctor`}>
                <Container className='h-100'>
                    <Row className='h-100  justify-content-center'>
                        <Col lg={12}>

                            <div className={`${styles.wraper_connec_wr} row`}>
                                <Col lg={5} className={`${styles.wrap_ll_con2} ${props?.pageName === "ambulatory" ? "my0" : "my-auto"} mobileorder1`}>
                                    <div className={`${styles.right__sec} right__sec`}>
                                        <Image width={526} height={596} src={props?.widgetData?.data[0]?.image} alt='' className={`${styles.img_img_conneccc} img-fluid`} />
                                        {isMobile && <>
                                            <ul>
                                                {props?.widgetData?.data?.slice(1)?.map((item) => {
                                                    return (<>
                                                        <li>
                                                            {item?.image && <Image width={50} height={50} src={item?.image} alt='' className={styles.svg__1} />}
                                                            <p> {item?.heading}  </p>
                                                        </li>
                                                    </>)
                                                })}
                                            </ul>
                                            <div className={styles.btnWrapeMob}>
                                                <a className='' href={props?.widgetData?.data[0]?.redirect_url} >
                                                    <button className='buttonWithBgColor_hover'>{props?.widgetData?.data[0]?.button_text}</button>
                                                </a>
                                            </div>
                                        </>}
                                    </div>
                                </Col>
                                <Col lg={6} className={`${styles.wrap_ll_con1} ${props?.pageName === "ambulatory" ? "mtnew" : "my-auto"}  ms-auto mobileorder2`}>
                                    <div className={`${styles.left__sec} left__sec`}>
                                        <h1> {parse(props?.widgetData?.data[0]?.heading)} </h1>
                                        <p> {props?.widgetData?.data[0]?.description} </p>

                                        <ul>
                                            {props?.widgetData?.data?.slice(1)?.map((item) => {
                                                return (<>
                                                    <li>
                                                        {item?.image && <Image width={50} height={50} src={item?.image} alt='' className={styles.svg__1} />}
                                                        <p> {item?.heading}  </p>
                                                    </li>
                                                </>)
                                            })}
                                        </ul>
                                        <a className='' href={props?.widgetData?.data[0]?.redirect_url}>
                                            <div className={`${styles.btnWrape} btnWrapeMobile`}>
                                                {props?.pageName == "ambulatory" ? (
                                                    <>{isMobile ? (
                                                        <>
                                                            <a href='tel:021111111111' className='buttonWithBgColor_hover'><span className='iconCall'></span>
                                                                {props?.widgetData?.data[0]?.button_text}<span className='iconArrow'></span>
                                                            </a>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <a onClick={() => QrModalHandler()} className='buttonWithBgColor_hover'><span className='iconCall'></span>
                                                                {props?.widgetData?.data[0]?.button_text}<span className='iconArrow'></span>
                                                            </a>
                                                        </>
                                                    )}

                                                        {/* <button className='buttonWithBgColor_hover'><span className='iconCall'>
                                                    </span>{props?.widgetData?.data[0]?.button_text}<span className='iconArrow'></span>
                                                    </button> */}
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className='buttonWithBgColor_hover'><span className='iconCall'>
                                                        </span>{props?.widgetData?.data[0]?.button_text}<span className='iconArrow'></span>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </a>
                                    </div>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <QRModal pageName={props.pageName} qRModalIsShow={qRModalIsShow} setQRModalIsShow={setQRModalIsShow} />
        </>
    )
}

export default ConnectDoctor

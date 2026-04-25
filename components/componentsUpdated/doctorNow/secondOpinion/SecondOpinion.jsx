import React from 'react'
import styles from './secondOpinion.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import doc__img_rightSec from '/public/svg/newPages/sec_right.png';
import Image from 'next/image';
import Cookies from "js-cookie";

const SecondOpinion = (props) => {
    function consultNowHandler() {
        const Authorization = Cookies.get("Authorization");
        if (!Authorization) {
            window.location.href = "/phone-number";
        } else {
            if (props?.widgetData?.slug === "at-home") {
                window.location.href = "/book-a-nurse?service=special_care";
            } else {
                window.location.href = "/subscribed-user";
            }
        }
        mixpanel.track('Doctor Now', {
            page: 'Consult now button clicked',
        });
    }
    return (
        <>
            {props?.widgetData?.slug == "at-home" && (
                <>
                    <div className={`${styles.mobileNursBox} d-lg-none d-block`}
                        style={{
                            backgroundColor: props?.widgetData?.data?.[0]?.card_2_color
                        }}>

                        <Image src={props?.widgetData?.data[0]?.image} layout='fill' alt='' className={"img-fluid position-relative"} />

                    </div>
                </>

            )}
            <section className={`${styles.secondOpinion} secondOpinion d`} style={{ background: props?.widgetData?.data[0]?.card_1_color }}>
                <Container className='h-100'>
                    <Row className={`h-100 align-items-center `}>
                        <Col lg={5} className={`my-auto`}>
                            <div className={styles.left__sec} style={{ background: props?.widgetData?.data[0]?.card_1_color }}>
                                <h1> {props?.widgetData?.data[0]?.heading}  </h1>
                                <p> {props?.widgetData?.data[0]?.description}  </p>
                                <div className={styles.btnWrape}>
                                    <button onClick={consultNowHandler} className='buttonWithBgColor_hover dd' style={{ background: props?.widgetData?.data[0]?.card_1_inner_color }}> {props?.widgetData?.data[0]?.button_text}  </button>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} className={`h-100`}></Col>
                    </Row>
                    <div className={`${styles.right__sec} ${props?.widgetData?.slug === "at-home" && "d-lg-block d-none"}`}>
                        <div className={styles.wrape__img}>
                            <Image src={props?.widgetData?.data[0]?.image} layout='fill' alt='' className={"img-fluid"} />
                        </div>
                    </div>

                </Container>
            </section>
        </>
    )
}

export default SecondOpinion

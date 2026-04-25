import React from 'react'
import styles from './readyBuild.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import parse from 'react-html-parser';
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/router';

const ReadyBuild = (props) => {
    const router = useRouter()

    return (
        <section className={`${styles.readyBuild}  readyBuild`}>
            <div className={`${styles.sec__con} sec__con`} style={{ background: props?.widgetData?.data?.[0]?.card_1_inner_color }}>  </div>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center'>
                    <Col lg={12}>
                        <h1 className={styles.head_read}> {props?.widgetData?.heading} </h1>
                        <Row className={`h-100 justify-content-center gx-0 ${styles.ro_reahccc} boxnewImg`}>
                            <Col lg={6} className={"col_left_ready"}>
                                <div className={`${styles.left_sec} left_sec`}>
                                    {props?.widgetData?.slug == "thrive" && (<>
                                        <div className={`${styles.readyThriveTop} buttonWithBgColor_hover`}>
                                            <span> {props?.widgetData?.data?.[0]?.heading && parse(props?.widgetData?.data?.[0]?.heading)} </span>
                                            <h2> {props?.widgetData?.data?.[0]?.sub_head && parse(props?.widgetData?.data?.[0]?.sub_head)}  </h2>
                                        </div>
                                    </>)}
                                    <ul>
                                        {props?.widgetData?.data?.slice(1)?.map((item) => {
                                            return (<>
                                                <li> {parse(item?.heading)} </li>
                                            </>)
                                        })}
                                    </ul>
                                    <button className='buttonWithBgColor_hover' onClick={() => router.push(`${props?.widgetData?.data?.[0]?.redirect_url ? props?.widgetData?.data?.[0]?.redirect_url : ''}`)} style={{ background: props?.widgetData?.data?.[0]?.card_1_color }} > {props?.widgetData?.data?.[0]?.button_text} </button>
                                </div>
                            </Col>
                            <Col lg={6} className={"col_right_ready"}>
                                <div className={`${styles.right_sec} right_sec`} style={{ background: props?.widgetData?.data?.[1]?.card_1_color }}>
                                    <Image src={props?.widgetData?.data?.[0]?.image} width={566} height={743} alt='' className={`${styles.img_right_ready} img-fluid`} />
                                    {props?.widgetData?.slug == "thrive"
                                        &&
                                        <div className={styles.bottomBar}>
                                            {isMobile ? (
                                                <span>{parse(props?.widgetData?.data?.[0]?.description)} </span>
                                            ) :
                                                <span>{parse(props?.widgetData?.data?.[0]?.description)} </span>
                                            }

                                        </div>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ReadyBuild;

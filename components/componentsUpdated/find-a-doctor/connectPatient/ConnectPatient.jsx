import styles from './connectPatient.module.scss';
import { Col, Row, Container } from 'react-bootstrap';
import Image from 'next/image';
import parse from 'react-html-parser';
import { isMobile } from 'react-device-detect';
import Cookies from 'js-cookie';

const ConnectPatient = (props) => {

    const handleModalShow = () => {
        Cookies.set('specDiseaseModal', 1);
    };

    return (
        <section className={`${styles.connectPatient} connectPatient`} style={{ background: props?.widgetData?.data?.[0]?.card_1_color }} >
            <Container className='h-100'>
                <Row className='h-100 justify-content-center'>
                    {isMobile &&
                        (<>
                            <h1> {props?.widgetData?.data?.[0]?.heading && parse(props?.widgetData?.data?.[0]?.heading)} </h1>
                            <span className={styles.mobDesc}> {props?.widgetData?.data?.[0]?.description && parse(props?.widgetData?.data?.[0]?.description)} </span>
                        </>)}
                    <Col lg={12}>
                        <Row>
                            <Col lg={5} xs={12} className={styles.coll__leftt}>
                                <h1>{props?.widgetData?.data?.[0]?.heading && parse(props?.widgetData?.data?.[0]?.heading)} </h1>
                                {isMobile && <span className={styles.mobDesc}> {props?.widgetData?.data?.[0]?.description && parse(props?.widgetData?.data?.[0]?.description)} </span>}
                                <div className={styles.wrape__ratings}>
                                    {props?.widgetData?.data?.slice(1)?.map((item) => {
                                        return (<>
                                            <Col lg={4} xs={5} className={styles.singleCon}>
                                                <h2> {item?.heading} </h2>
                                                <span> {item?.description} </span>
                                            </Col>
                                        </>)
                                    })}
                                </div>
                                <button className='buttonWithBgColor_hover' onClick={() => handleModalShow()} style={{ background: props?.widgetData?.data?.[0]?.card_1_inner_color }}> {props?.widgetData?.data?.[4]?.button_text} </button>
                            </Col>
                            <Col lg={1}></Col>
                            <Col lg={6} xs={12} className={`ms-auto ${styles.coll_rigttt}`}>
                                <div className={`${styles.img_wrape_conn} img-fluid`}>
                                    <Image src={props?.widgetData?.data?.[0]?.image} width={647} height={594} alt="" className={styles.img_conec} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ConnectPatient

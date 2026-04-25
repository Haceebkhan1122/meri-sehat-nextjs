import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import parse from 'html-react-parser';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import styles from './DataExclusive.module.scss';

const DataExclusive = (props) => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const { widgetData } = props;

    return (
        <section className={`${styles.dataExclusive} dataExclusive`}>
            <Container className='h-100'>
                <Row className='h-100  justify-content-center'>
                    <Col lg={12}>
                        <div className={`${styles.wraper_connec_wr} row`}>

                            <Col lg={6} className={`${styles.wrap_ll_con2} my-auto`}>
                                <div className={`${styles.right__sec} right__sec`}>
                                    <Image width={526} height={596} src={props?.widgetData?.data[0]?.image} alt='' className={`${styles.img_img_conneccc} img-fluid`} />
                                    {isMobile && <>
                                        <ul>
                                            {props?.widgetData?.data?.slice(1)?.map((item) => {
                                                return (<>
                                                    <li>
                                                        {item?.image && <Image width={50} height={50} src={item?.image} alt='' className={styles.svg__1} />}
                                                        <p> {item?.description && parse(item?.description)} </p>
                                                    </li>
                                                </>)
                                            })}
                                        </ul>
                                        <div className={styles.btnWrapeMob}>
                                            <button href={props?.widgetData?.data[0]?.redirect_url} className='buttonWithBgColor_hover'>{props?.widgetData?.data[0]?.button_text}</button>
                                        </div>
                                    </>} 
                                </div>
                            </Col>
                            <Col lg={6} className={`${styles.wrap_ll_con1} my-auto ms-auto`}>
                                <div className={`${styles.left__sec} left__sec`}>
                                    <h1> {parse(props?.widgetData?.data[0]?.heading)} </h1>
                                    <p> {props?.widgetData?.data[0]?.description && parse(props?.widgetData?.data[0]?.description)} </p>
                                    <ul>
                                        {props?.widgetData?.data?.slice(1)?.map((item) => {
                                            return (<>
                                                <li className={styles.wraper_singleList}>
                                                    {item?.image !== null && <Image width={50} height={50} src={item?.image || ""} alt='' className={styles.svg__1} />}
                                                    <div className={styles.wrape_single_l}>
                                                        <h5> {item?.heading && parse(item?.heading)} </h5>
                                                        <span> {item?.description && parse(item?.description)} </span>
                                                    </div>
                                                </li>
                                            </>)
                                        })}
                                    </ul>
                                </div>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section >
    )
}

export default DataExclusive;

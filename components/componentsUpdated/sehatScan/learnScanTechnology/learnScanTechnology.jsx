import React from 'react'
import styles from '../learnScanTechnology/learnScanTechnology.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import scanTech from '../../../../public/svg/newPages/scanTech.svg'
import parse from 'html-react-parser';
import Link from "next/link";
import arrowRight from '../../../../public/svg/newPages/arrowRight.svg'

function learnScanTechnology(props) {

    return (
        <>
            <section className={`${styles.learnScanTechnology} learnScanTechnologySection pt-80 `}>
                <Container>
                    <Row>
                        <Col md={6} className='mt-auto'>
                            <h2>{props?.widgetData?.data[0]?.heading && parse(props?.widgetData?.data[0]?.heading)}</h2>
                            <Link href={props?.widgetData?.data[0]?.redirect_url} >  
                                <button>
                                    <div className={`${styles.boxButton} d-flex align-items-center`}>
                                        <Image width={80} height={70}  src={props?.widgetData?.data[0]?.card_1_icon} className={`${styles.imagescan} img-fluid`} ></Image>
                                             <h5>{props?.widgetData?.data[0]?.button_text}</h5>
                                    <   Image width={14} height={24} src={arrowRight} className={`${styles.imageArrow} img-fluid`} ></Image>
                                    </div>
                                </button>
                            </Link>
                        </Col>
                        <Col md={5} className='mt-auto ms-auto'>
                            <Image width={536} height={534} src={props?.widgetData?.data[0]?.image}  className='img-fluid' ></Image>
                        </Col>

                    </Row>
                </Container>
            </section>
        </>
    )
}

export default learnScanTechnology
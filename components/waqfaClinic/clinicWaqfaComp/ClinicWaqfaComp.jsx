import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import styles from './clinicWaqfaComp.module.scss';
import Image from 'next/image';
import PathBetter from '../pathBetter/PathBetter';
import useMediaQuery from '@mui/material/useMediaQuery';

const WaqfaClinic = (props) => {
    const {widgetData} = props;
    const isMobile = useMediaQuery('(max-width:768px)');
        
    return (
        <>
            <section className={`${styles.waqfaClinicWraper} waqfaClinicWraper`}>
                <Container className='h-100'>
                    <Row className='justify-content-center h-100'>
                        <Col lg={12}>
                            <Row className={"justify-content-center h-100"}>
                                <Col lg={6} className={"coling_mobb"}>
                                    <Image src={widgetData?.data[0]?.image} width={516} height={637} alt='image_clinic' className={" coling_img_in img-fluid " } />
                                    {
                                        isMobile && 
                                        (<>
                                            <h5>{widgetData?.data[0]?.card_1_head}  
                                                <span> {widgetData?.data[0]?.card_1_desc}  </span>
                                            </h5>
                                        </>)
                                    }
                                </Col>
                                <Col lg={6} className='my-auto'>
                                    <div className={styles.waqfaClinicRight}>
                                        <h2> {widgetData?.data[0]?.heading} </h2>
                                        <p>{widgetData?.data[0]?.description}  </p>
                                        {!isMobile && (<>
                                            <h5>{widgetData?.data[0]?.card_1_head}   </h5>
                                            <span> {widgetData?.data[0]?.card_1_desc}  </span>
                                        </>)}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
            <PathBetter widgetData = {widgetData} />
        </>
    )
}

export default WaqfaClinic

import React from 'react'
import styles from '../services/services.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image"; 
import Service01 from '../../../../public/svg/newPages/service01.svg'
import Service02 from '../../../../public/svg/newPages/service02.svg'
import Service03 from '../../../../public/svg/newPages/service03.svg'
import ArrowLogo from '../../../../public/svg/newPages/arrowBtn.svg'
function services() {
  return (
   <>
    <section  className={`${styles.servicesSection}`}>
        <Container>
            <Row>
                <Col md={10} className='mx-auto'>
                    <Row>
                        <Col md={12}>
                         <h2>Our Services</h2>   
                        </Col> 
                    </Row>
                    <Row className={styles.serviceRow}> 
                        <Col md={4} className={styles.serviceBox}> 
                            <div className={styles.serviceImage}>
                                <div className={styles.serviceImageSize}>
                                    <Image src={Service01} className='img-fluid' alt='image service 01'></Image>
                                    <button><Image src={ArrowLogo} className={styles.arrowLogo} alt='arrow'></Image></button>
                                </div>
                            </div>
                            <div className={styles.serviceName}>
                                <p>Lab Tests</p>
                            </div>
                        </Col>

                        <Col md={4} className={styles.serviceBox}> 
                            <div className={styles.serviceImage}>
                                <div className={styles.serviceImageSize}>
                                    <Image src={Service02} className='img-fluid' alt='image service 01'></Image>
                                    <button><Image src={ArrowLogo} className={styles.arrowLogo} alt='arrow'></Image></button>
                                </div>
                            </div>
                            <div className={styles.serviceName}>
                                <p>Doctor Consults</p>
                            </div>
                        </Col>


                        <Col md={4} className={styles.serviceBox}> 
                            <div className={styles.serviceImage}>
                                <div className={styles.serviceImageSize}>
                                    <Image src={Service03} className='img-fluid' alt='image service 01'></Image>
                                    <button><Image src={ArrowLogo} className={styles.arrowLogo} alt='arrow'></Image></button>
                                </div>
                            </div>
                            <div className={styles.serviceName}>
                                <p>Sehat Scan</p>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </section>
   </>
  )
}

export default services
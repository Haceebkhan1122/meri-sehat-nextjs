import React from 'react'
import styles from '../toplogoSectionDoctor/toplogoSectionDoctor.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import logo01 from '../../../../public/svg/newPages/bar_1.png'
import logo02 from '../../../../public/svg/newPages/bar_2.png'
import logo03 from '../../../../public/svg/newPages/bar_3.png'
import logo04 from '../../../../public/svg/newPages/bar_4.png'
import logo05 from '../../../../public/svg/newPages/bar_5.png'
import Image from 'next/image';

function ToplogoSectionDoctor() {
  return (

    <section className={`${styles.sliderLogoes} sliderLogoes`}>
      <Container>
        <Row>
          <Col md={11} className='mx-auto text-center '>
            <div className={styles.topLogoes}>
              <div className='text-center'>
                <Image src={logo01} className='img-fluid'></Image>
              </div>
              <div className='text-center'>
                <Image src={logo02} className='img-fluid'></Image>
              </div>
              <div className='text-center'>
                <Image src={logo03} className='img-fluid'></Image>
              </div>
              <div className='text-center'>
                <Image src={logo04} className='img-fluid'></Image>
              </div>
              <div className='text-center'>
                <Image src={logo05} className='img-fluid'></Image>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ToplogoSectionDoctor;
import React from 'react'
import styles from './toplogoSectionSehat.module.scss';
import { Container, Row, Col } from "react-bootstrap";
import logo01 from '../../../../public/svg/newPages/logo01.svg'
import logo02 from '../../../../public/svg/newPages/logo007.svg'
import logo03 from '../../../../public/svg/newPages/logo008.svg'
import logo04 from '../../../../public/svg/newPages/logo02.svg'
import logo05 from '../../../../public/svg/newPages/logo009.svg'
import logo06 from '../../../../public/svg/newPages/logo05.svg'
import logo07 from '../../../../public/svg/newPages/logo10.svg'

import Image from 'next/image';



const ToplogoSectionSehat = () => {
  return (
    <section className={styles.sliderLogoesSehat}>
      <Container>
        <Row>
          <Col md={12} className='mx-auto text-center'>
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
                <Image src={logo06} className='img-fluid'></Image>
              </div>
              <div className='text-center'>
                <Image src={logo05} className='img-fluid'></Image>
              </div>
              <div className='text-center'>
                <Image src={logo07} className='img-fluid'></Image>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ToplogoSectionSehat;
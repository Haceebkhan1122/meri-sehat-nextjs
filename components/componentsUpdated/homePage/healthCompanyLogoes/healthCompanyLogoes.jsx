import React from 'react'
import styles from '../toplogoSection/toplogoSection.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import LogoSlider from '../logoSlider/logoSlider';

function healthCompanyLogoes(props) {
  console.log(props?.widgetData, "career logoes");

  return (

    <section className={`${styles.sliderLogoes} ${props?.widgetData?.slug == 'careers-v3' ? 'pt-50' : 'pt-80'} pb-80 sliderLogoesHomeBottom`}>
      <Container>
        <Row>
          <Col md={12} className='mx-auto text-center '>
            <div className={styles.topLogoes}><LogoSlider slider={props?.widgetData} /></div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default healthCompanyLogoes
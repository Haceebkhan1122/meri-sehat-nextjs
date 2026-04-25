import React from 'react'

import styles from '../toplogoSection/toplogoSection.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import LogoSlider from '../logoSlider/logoSlider';


function toplogoSection(props) {

  return (
    <section className={`${styles.sliderLogoes} sliderLogoes dds`} data-aos="fade-up" data-aos-duration="3000">
      {props?.widgetData?.card_type == "widget-40-v3" ? (
         <Row>
          <Col className="mt-2" >
                    <div className={styles.shortDescription}>
            <p>
              Trusted by some of the biggest names
            </p>
          </div>
            <div className={styles.newWidget}>
              <LogoSlider slider={props?.widgetData} />
            </div>
          </Col>
        </Row>
      ) : (
        <Container>
        <Row>
          <Col className={props?.page === "sehat-scan" ? "mx-auto text-center col-md-10" : props?.page === "doctor-now" ? "mx-auto text-center col-md-11" : "mx-auto text-center col-md-10"}  >
            <div className={styles.topLogoes}>
              <LogoSlider slider={props?.widgetData} />
            </div>
          </Col>
        </Row>
      </Container>
      )}
    </section>
  )
}

export default toplogoSection
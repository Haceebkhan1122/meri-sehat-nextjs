import React, { useEffect, useRef, useState } from "react";
import { Col, Container, NavItem, Row } from "react-bootstrap";
import styles from './commonHealth.module.scss';
import SliderGetHelp from '../../doctorNow/sliderGetHelp/SliderGetHelp';
import parse from 'react-html-parser';

const CommonHealthFad = (props) => {
  return (
    <>
      <section className={`${styles.commonHealthFad} commonHealthFad`}>
        <Container className='h-100'>
          <Row className='h-100 justify-content-center'>
            <Col lg={12} className='mx-auto'>
              <div className={`${styles.common_main_wraper} common_main`}>
                <h1> {props?.widgetData?.heading && parse(props?.widgetData?.heading)} </h1>
                <p className="pera01"> {props?.widgetData?.description && parse(props?.widgetData?.description)} </p>
                <SliderGetHelp widgetData={props?.widgetData} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default CommonHealthFad;

import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import styles from './getHelp.module.scss';
import SliderGetHelp from '../sliderGetHelp/SliderGetHelp';
import parse from 'react-html-parser';

const GetHelp = (props) => {
    let data = props.widgetData;
    return (
        <section className={`${styles.getHelp} getHelp`}>
            <Container className='h-100'>
                <Row className='h-100'>
                    <Col lg={12} className='mx-auto'>
                        <div className={styles.wrape__getHelp}>
                            <h1> {props?.widgetData?.heading} </h1>
                            <p> {props?.widgetData?.description && parse(props?.widgetData?.description)} </p>
                            <SliderGetHelp widgetData = {data} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default GetHelp

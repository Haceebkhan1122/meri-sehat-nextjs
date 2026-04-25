import React from 'react'
import styles from './supportedGetz.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';

const SupportedGetz = (props) => {
    const { widgetData } = props;

    return (
        <section className={`${styles.video_waqfaWraper} video_waqfaWraper`}>
            <Container>
                <Row className='justify-content-center'>
                    <Col lg={12}>
                        <div className={styles.suportWraper}>
                            <h3> {widgetData?.data[0]?.heading} </h3>
                            <Image src={widgetData?.data[0]?.image} alt='' width={300} height={120} className={`${styles.mg__mob} img-fluid`} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default SupportedGetz

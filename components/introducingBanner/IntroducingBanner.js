import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiChevronRight } from 'react-icons/fi';
import BloodPressure from '../../public/png/bloodpressue.png'
import { SectionHeadingMed } from '../SectionHeadingMed';


function IntroducingBanner(props) {
    const { widgetData = [], key } = props;
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(widgetData?.data);
    }, [widgetData]);


    return (
        <>
            <section className="introducingBanner">
                <Container>
                    <Row>
                        <Col md={6} className="px-3 m-auto">
                            {/* <Image crossorigin="anonymous" width={500} height={500} src={widgetData?.data?.[0].image} alt="brands" className='left_side img-fluid' /> */}
                            <Image crossorigin="anonymous" width={400} height={400} src={BloodPressure} alt="brands" className='img-fluid ps-5 ms-5' />
                        </Col>
                        <Col md={6} className='m-auto pb-5 mt-5'>
                            <div className='card'>
                                <SectionHeadingMed text={`Introducing: Blood Pressure Monitoring`} />
                                <p>Introducing blood pressure monitoring (systolic / diastolic). Just look at your camera and SehatScan will monitor your blood pressure for you.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default IntroducingBanner;

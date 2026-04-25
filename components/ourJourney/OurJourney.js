import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Image from 'next/image';
import consultant from '../../public/svg/consu.svg'
import heart from '../../public/svg/heart_home.svg'
import location from '../../public/svg/location_home.svg'
import rating from '../../public/svg/rating_home.svg'
import extraArt from '../../public/svg/healthimage.svg'
import doc from '../../public/svg/doc_home.png'



function OurJourney(props) {

    const { widgetData = [], key } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(widgetData?.data);
    }, [widgetData]);


    return (
        <>
            <Container>
                <section className='our_journey mt-80 pt-5 mb-5'>
                    <Row>
                        <h2>Our Journey</h2>
                        <Col md={12}>
                            <Tabs
                                defaultActiveKey="profile"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                            >
                                <Tab eventKey="today" title="Today">
                                    <div className='main_wrapper_jounery'>
                                        <Row>
                                            <Col md={12}>
                                                <div className='for_inner_wrapper text-center mb-5'>
                                                    <Image src={consultant} width={62} height={62} alt='Patients' />
                                                    <h3>500 Patients</h3>
                                                    <p>Consulting right now</p>
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <Row>
                                                    <Col md={3}>
                                                        <div className='for_inner_wrapper text-center'>
                                                            <Image src={heart} alt='Heart' />
                                                            <h3>1,204,000+</h3>
                                                            <p>Total Treated Patients</p>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className='for_inner_wrapper text-center'>
                                                            <Image src={extraArt} alt='Art' />
                                                        </div>
                                                    </Col>
                                                    <Col md={3}>
                                                        <div className='for_inner_wrapper text-center'>
                                                            <Image src={doc} alt='Doctors' width={42} height={42} className='doc_home' />
                                                            <Image src={doc} alt='Doctors' width={42} height={42} className='doc_home' />
                                                            <Image src={doc} alt='Doctors' width={42} height={42} className='doc_home' />
                                                            <h3>60 Doctors</h3>
                                                            <p>Currently Available</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md={6}>
                                                <div className='for_inner_wrapper text-center'>
                                                    <Image src={rating} alt='Ratings' />
                                                    <h3>4.8 Rating</h3>
                                                    <p>Top rated Health app</p>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='for_inner_wrapper text-center'>
                                                    <Image src={location} alt='Ratings' />
                                                    <h3>150 Cities</h3>
                                                    <p>All over Pakistan</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Tab>
                                <Tab eventKey="week" title="Last Week">
                                    React Bootstrap 5 Tab 2
                                </Tab>
                                <Tab eventKey="month" title="Last Month">
                                    React Bootstrap 5 Tab 3
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </section >
            </Container>
        </>
    )
}

export default OurJourney;

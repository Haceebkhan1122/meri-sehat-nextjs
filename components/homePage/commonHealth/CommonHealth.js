import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { TopicHeading } from "../../TopicHeading";
import Image from 'next/image';


function CommonHealth(props) {

    const { widgetData = [], key } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        if (widgetData?.data?.length > 0) {
            setData(widgetData?.data);
        }
    }, [widgetData]);



    return (
        <section className='health_common mt-80 self_common_health' data-aos="fade-up" data-aos-duration="800">
            <Container>
                <Row>
                    <Col lg={12}>
                        <h2 className='mb-3'>{widgetData?.heading}</h2>
                        <hr className='mb-4'></hr>
                    </Col>
                    {data?.length > 0 && data?.map((item) => {
                        return (
                            <Col lg={3}>
                                <div className='box_health01 text-center px-4 pb-4 '>
                                    <Image width={200} height={200} src={item?.image} alt="instantConsultant" className='mb-4  mt-60' />
                                    <TopicHeading text={item?.heading}></TopicHeading>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </section>
    );
}

export default CommonHealth;

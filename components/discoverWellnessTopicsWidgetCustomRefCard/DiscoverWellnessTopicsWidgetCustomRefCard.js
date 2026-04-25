import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import img1 from '../../public/svg/right-arrow-border.svg'
import Image from 'next/image';


function DiscoverWellnessTopicsWidgetCustomRefCard(props) {
    const { widgetData = [], key } = props;
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(widgetData?.data);
    }, [widgetData]);


    return (
        <>
            <section className={`categories_beauty mt-5 mt-md-0 ${widgetData?.data?.[0]?.card_type === 'sehat-a-to-z-custom-disease' ? 'disease_banner_atoz' : ''}`}>
                <Container>
                    <Row>
                        <Col md={12} className="px-3">
                            <h2 className="borderBottoms  text-initial fw-600 border-bottom-0">{widgetData.heading}</h2>
                        </Col>
                    </Row>

                    <Row >
                        <>
                            {widgetData?.data?.map((itemm) => {
                                return (
                                    <Col md={4} className="mt-5">
                                        <Card className='hk_wellness_types_cat'>
                                            <Card.Img alt={itemm?.alt} variant="top" src={itemm?.image} />
                                            <Card.Body className='px-0'>
                                                <Card.Title>{itemm?.heading}</Card.Title>
                                                <Card.Text>
                                                    {itemm?.description}
                                                </Card.Text>
                                                {itemm?.redirect_url && (
                                                    <>
                                                        <Link href={itemm?.redirect_url || ''}><Image src={img1} width={50} height={50} alt="icon" /><span className='underline_ancer'>{itemm?.button_text}</span> </Link>
                                                    </>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default DiscoverWellnessTopicsWidgetCustomRefCard;

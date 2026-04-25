import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from "react-redux";

const BakhabarBanner = () => {
    let i18nDataTwo = useSelector((state) => state.translation.i18n);
    const [i18nData, setI18nData] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setI18nData(i18nDataTwo);
        }
    }, [i18nDataTwo]);

    return (
        <section className="bakhabar_banner">
            <Container>
                <Row>
                    <Col md={12} sm={12} lg={12}>
                        <div className='bakhabar_banner_inner'>
                            <h3>{i18nData?.bakhabar_noujawan} - <a href='/bakhabar-noujawan'>{i18nData?.bakhabar_noujawan_button}</a></h3>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default BakhabarBanner;
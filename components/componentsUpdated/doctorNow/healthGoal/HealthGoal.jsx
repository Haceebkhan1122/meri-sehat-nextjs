import styles from './healthGoal.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import Slider from 'react-slick';
import parse from 'html-react-parser';

const HealthGoal = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <section className={`${styles.healthGoal} healthGoal`}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center gx-0'>
                    <Col lg={12}>
                        <h1>{props?.widgetData?.heading} </h1>
                        <Row className='gx-0'>
                            <Col lg={6}>
                                <div className={`${styles.left__sec}`}>
                                    <Image width={546} height={410} src={props?.widgetData?.data[0]?.image} alt='' className={`${styles.img_right_sec} mx-auto img-fluid`} />
                                    <hr />
                                    <p>{parse(props?.widgetData?.data[0]?.heading)}</p>
                                </div>
                            </Col>
                            <Col lg={6} className='my-auto'>
                                <div className={`${styles.wraping_sliding_healthGoal} row`}>
                                    <Row>
                                        <Col md={9} className='mx-auto'>
                                            <Slider {...settings} className='wraping_sliding_healthGoal'>
                                                {props?.widgetData?.data?.slice(1)?.map((item) => (
                                                    <div className={`${styles.slide_health} my-auto`}>
                                                        <h2> {parse(item?.heading)} </h2>
                                                    </div>
                                                ))}
                                            </Slider>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default HealthGoal;

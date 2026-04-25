import styles from './howItWorksDoctor.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import HiwImg from '/public/svg/newPages/howItImg.svg';
import Image from 'next/image';
import parse from 'react-html-parser';
import isMobile from 'react-device-detect';
import useMediaQuery from '@mui/material/useMediaQuery';
import Slider from "react-slick";
import { useState } from 'react';
import { useRouter } from 'next/router';


const HowItWorksDoctor = (props) => {

    const [image, setImage] = useState(props?.widgetData?.data[0]?.image)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const isMobile = useMediaQuery('(max-width:767px)');

    const callFunction = (item) => {
        setImage(item.image)
    }

    const { pathname } = useRouter();

    return (
        <section className={`${styles.howItWorksDoctor} howItWorksDoctor`}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center '>
                    <Col lg={5} className=''>
                        {isMobile && <h1> {props?.widgetData?.data[0]?.heading} </h1>}
                        <div className={`${styles.right__sec}`}>
                            <Image src={image || ""} width={536} height={529.3} alt='' className={(isMobile && pathname == "/doctor-now") ? 'd-none' : `${styles.img_right_sec} mx-auto img-fluid`} />
                        </div>
                    </Col>
                    <Col lg={6} className='ms-auto'>
                        <div className={styles.left__sec}>
                            <h1> {props?.widgetData?.data[0]?.heading} </h1>
                            {!isMobile ? (
                                <ul className='list-doctor'>
                                    {props?.widgetData?.data?.map((item, i) => {
                                        return (<>
                                            <li onMouseEnter={() => callFunction(item)}>
                                                <div className={styles.numWraper}>
                                                    <span> {i + 1} </span>
                                                </div>
                                                <p> {item?.description && parse(item?.description)} </p>
                                            </li>
                                        </>)
                                    })}
                                </ul>
                            ) :
                                (<div className={`${styles.wraper_slider_main_doctor} wraper_slider_main_doctor `}>
                                    <Slider {...settings}>
                                        {props?.widgetData?.data?.map((item, i) => {
                                            return (<>
                                                <div className={styles.wrape_slide_doctor}>
                                                    <img src={props?.widgetData?.data[i]?.image} alt='' className={styles.img_sliderMob} />
                                                    <div className='slider-doctor'>
                                                        <div className={`${styles.numWraper} numWraper`}>
                                                            <span> {i + 1} </span>
                                                        </div>
                                                        <p> {item?.description && parse(item?.description)} </p>
                                                    </div>
                                                </div>
                                            </>)
                                        })}
                                    </Slider>
                                </div>)
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default HowItWorksDoctor;

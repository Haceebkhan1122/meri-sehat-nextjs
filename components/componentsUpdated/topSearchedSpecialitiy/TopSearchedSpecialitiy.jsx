import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './topSearchedSpecialitiy.module.scss';
import Image from 'next/image';
import Slider from 'react-slick';
import Link from 'next/link';
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

const TopSearchedSpeciality = (props) => {
    const [selectedCity, setSelectedCity] = useState(Cookies.get('selectedCity') ? JSON.parse(Cookies.get('selectedCity')) : '');

    useEffect(() => {
        // Function to update the state when the cookie changes
        const handleCookieChange = () => {
            const city = Cookies.get('selectedCity');
            if (city !== undefined && city !== selectedCity) {
                setSelectedCity(JSON.parse(city));
            }
        };

        // Check the cookie on component mount
        handleCookieChange();

        // Set an interval to check for changes in the cookie value
        const interval = setInterval(handleCookieChange, 1000); // Adjust interval time as necessary

        // Cleanup function to clear the interval
        return () => clearInterval(interval);
    }, [selectedCity?.name]);


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "70px",
                    infinite: true,
                },
            },
        ],
    };

    return (
        <section className={`${styles.topSpecialityWraper} topSpecialityWraper`}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center'>
                    <h2>{props?.widgetData?.heading}</h2>
                    <Col lg={12}>
                        <Row className={``}>
                            <div className={`${styles.wrape__sliderCityFad} wrape__sliderCityFad`}>
                                {/* <Slider {...settings}>
                                    {props?.widgetData?.data?.map((data) => {
                                        let item = data?.speciality;
                                        return (
                                            <Link key={item?.link} href={`/doctors/${selectedCity?.name}/${item?.link || ''}`}>
                                                <div className={styles.wrapeSingleBox}>
                                                    <div className={styles.singleBox}>
                                                        <Image
                                                            src={item?.image_url}
                                                            alt=''
                                                            width={180.83}
                                                            height={126.63}
                                                            className={`${styles.singleCity} img-fluid`}
                                                        />
                                                    </div>
                                                    <h3>{item?.name}</h3>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </Slider> */}
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default TopSearchedSpeciality;

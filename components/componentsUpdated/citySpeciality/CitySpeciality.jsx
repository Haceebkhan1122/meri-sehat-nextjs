import React, {useState} from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import styles from './citySpeciality.module.scss';
import Image from 'next/image';
import Slider from 'react-slick';
import Cookies from 'js-cookie';
import {  useSelector } from "react-redux";
import { useRouter } from "next/router";

const CitySpeciality = (props) => {
    const [selectedCity, setSelectedCity] = useState();
    let myCities = useSelector((state) => state.cities.cities);
    const router = useRouter();

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
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding : "70px",
                    infinite:true,
                },
            },
        ],
    };
    
    const handleSpecialityByCity = async (city) => {
        var storedCity = Cookies.get('selectedCity');
        Cookies.set('findASpecialist', 1)
        Cookies.set('speciality', 1)

        // If the cookie is not set, set the default city to Karachi
        if (!storedCity) {
            const defaultCity = myCities?.find(cityObj => cityObj.name === 'Karachi');
            if (defaultCity) {
                Cookies.set('selectedCity', JSON.stringify(defaultCity));
                setSelectedCity(defaultCity);
            } else {
                console.error('Default city not found: Karachi');
            }
        } else {
            // If the cookie is set, parse and set the selected city
            const parsedData = JSON.parse(storedCity);
            setSelectedCity(parsedData);
        }

        // If the selected city is different from the current city, update the cookie
        if (city && selectedCity?.name !== city) {
            var newSelectedCity = myCities?.find(cityObj => cityObj.name === city);
            if (newSelectedCity) {
                Cookies.set('selectedCity', JSON.stringify(newSelectedCity));
                setSelectedCity(newSelectedCity);
            } else {
                console.error(`City not found: ${city}`);
            }
        }
        router.push(`/doctors/${newSelectedCity?.name ? newSelectedCity?.name?.toLowerCase() : selectedCity?.name?.toLowerCase()}`);

    };

    const handleOtherCities = () => {
        Cookies.set('OtherCities', 1)
        Cookies.set('speciality', 1)
        router.push('/doctors/others')
    }

    return (
        <section className={`${styles.citySpecialityWraper} citySpecialityWraper`} >
            <Container className='h-100'>
                <Row className='h-100 justify-content-center'>
                    <h2>{props?.widgetData?.heading} </h2>
                    <Col lg={12}>
                        <Row className={``}>
                            <div className={`${styles.wrape__sliderCityFad} wrape__sliderCityFad`}>
                                <Slider {...settings}>
                                    {props?.widgetData?.data?.slice(1)?.map((item, index) => {
                                        return (<>
                                            <div className={styles.wrapeSingleBox} onClick={index == 3 ? handleOtherCities  : () => handleSpecialityByCity(`${item?.heading}`)}>
                                                <div className={styles.singleBox}>
                                                    <Image src={item?.image} alt='' width={180.83} height={126.63} className={`${styles.singleCity} img-fluid`} />
                                                </div>
                                                <h3>{item?.heading}</h3>
                                            </div>
                                        </>)
                                    })}
                                </Slider>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default CitySpeciality;

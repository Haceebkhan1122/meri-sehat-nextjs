import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import Image from 'next/image';
import { Col, Row } from "react-bootstrap";
import drImage from '../../../public/svg/drImage.svg'
import staricon from '../../../public/svg/staricon.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/fontawesome-free-solid';
import Star from 'public/svg/star_reviews_profile.svg';
import EmptyStar from 'public/svg/empty_star.svg';
function DoctorTestimonial({ corporateData }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [widgets, setWidgets] = useState([])
    const [widgetsData, setWidgetsData] = useState([])
    useEffect(() => {
        if (corporateData) {
            let widjets = corporateData.widgets.map((item) => {
                return item;
            })
            let widjetsData = widjets[7]?.data.map((item) => {
                return item;
            })
            setWidgets(widjets)
            setWidgetsData(widjetsData)
        }
    }, [])
    const settings = {
        dots: true,
        // infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        afterChange: current => setCurrentSlide(current)
    };
    const slideData = [
        {
            doctorName: 'Dr. Ismail Munir',
            specialization: 'General Physician - MBBS',
            description: 'From Burnout to balance - The perfect Corporate Wellness Program for nurturing employees well-being both physically and mentally.',
            image: drImage
        },
        {
            doctorName: 'Dr. Another Doctor',
            specialization: 'Specialization - Degree',
            description: 'Description of another doctor.',
            image: drImage // Replace with actual image
        },
        {
            doctorName: 'Dr. Ismail Munir',
            specialization: 'General Physician - MBBS',
            description: 'From Burnout to balance - The perfect Corporate Wellness Program for nurturing employees well-being both physically and mentally.',
            image: drImage
        },
        {
            doctorName: 'Dr. Another Doctor',
            specialization: 'Specialization - Degree',
            description: 'Description of another doctor.',
            image: drImage // Replace with actual image
        }
    ];
    const generateStarIcons = (rating) => {
        const filledStars = Math.round(rating);
        const emptyStars = 5 - filledStars;
        const filledStarIcons = Array.from({ length: filledStars }, (_, index) => (
            <Image key={index} width={24} height={23} src={Star} alt='' className='hegiht__img' />
        ));
        const emptyStarIcons = Array.from({ length: emptyStars }, (_, index) => (
            <Image key={index + filledStars} width={24} height={24} src={EmptyStar} alt='' className='hegiht__img' />
        ));
        return [...filledStarIcons, ...emptyStarIcons];
    };
    return (
        <>
            <div className='sliderDr mt100'>
                <Row>
                    <Col md="11" className='ms-auto'>
                        <h2 className='drHeading'> {widgets[7]?.data[0]?.heading}  </h2>
                    </Col>
                </Row>
                <Slider {...settings} className="slick-slider">
                    {widgetsData?.map((item, index) => (
                        <div className="slidDr" key={index}>
                            <Row>
                                <Col lg={5} className='ms-auto or2'>
                                    <div className='boxDrDetail newBoxss'>
                                        <h4> {item.reviewer_name} </h4>
                                        <h6> {item.description} </h6>
                                        <div className="starsWraper">
                                        {generateStarIcons(item.rating)}
                                        </div>
                                        <p>{item.rating_text}</p>
                                    </div>
                                </Col>
                                <Col lg={6} className='or1'>
                                    <img src={item.image} className='img-fluid' />
                                </Col>
                            </Row>
                            <span className="slide-number">0{index + 1}</span>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    )
}
export default DoctorTestimonial
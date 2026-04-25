import React from 'react'
import styles from './highlits.module.scss';
import Slider from "react-slick";
import Image from 'next/image';


export default function Highlits({ workshop }) {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024, // Screen width <= 1024px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 768, // Screen width <= 768px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480, // Screen width <= 480px
                settings: {
                    slidesToShow: 1.1,
                    slidesToScroll: 1,

                }
            }
        ]
    };

    return (
        <div className={`${styles.highlights}`}>
            <h5>Highlights from our previous workshops</h5>
            <div className={`${styles.highlightsSlider} sliderHighlights`}>
                <Slider {...settings}>
                        {workshop?.details?.map((item) => {
                            return (
                                <>
                                    <div className={`${styles.imageSlider}`}>
                                        <Image src={item?.image_url} className="img-fluid" width={338} height={220} />
                                    </div>
                                </>
                            )
                        })}
                </Slider>
            </div>
        </div>
    )
}

import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import logo1 from "../../public/png/logo-1.png";
import logo2 from "../../public/png/logo-2.png";
import logo3 from "../../public/png/logo-3.png";
import logo4 from "../../public/png/logo-4.png";
import logo5 from "../../public/png/logo-5.png";

function Partners(props) {
    const { widgetData = [], key } = props;
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(widgetData?.data);
    }, [widgetData]);

    const settings = {
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 3500,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },

            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    return (
        <>
            <section className="logosSlider">
                <Container>
                    <Slider {...settings} className="mobile-class scrollDists">
                        {data?.length > 0 && data?.map((item) => {
                            return (
                                <>
                                    <div className="p-3">
                                        <div className="">
                                            <Image
                                                src={item?.image}
                                                alt="logos"
                                                className="img-fluid m-auto"
                                                width={170}
                                                height={90}
                                            />
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                        <div className="p-3">
                            <div className="">
                                <Image
                                    src={logo1}
                                    alt="logos"
                                    className="img-fluid m-auto"
                                    width={170}
                                    height={90}
                                />
                            </div>
                        </div>
                        <div className="p-3">
                            <div className="">
                                <Image
                                    src={logo2}
                                    alt="logos"
                                    className="img-fluid m-auto"
                                    width={202}
                                    height={72}
                                />
                            </div>
                        </div>
                        <div className="p-3">
                            <div className="">
                                <Image
                                    src={logo3}
                                    alt="logos"
                                    className="img-fluid m-auto"
                                    width={120}
                                    height={120}
                                />
                            </div>
                        </div>
                        <div className="p-3">
                            <div className="">
                                <Image
                                    src={logo4}
                                    alt="logos"
                                    className="img-fluid m-auto"
                                    width={200}
                                    height={90}
                                />
                            </div>
                        </div>
                        <div className="p-3">
                            <div className="">
                                <Image
                                    src={logo5}
                                    alt="logos"
                                    className="img-fluid m-auto"
                                    width={300}
                                    height={96}
                                />
                            </div>
                        </div>
                    </Slider>
                </Container>
            </section>
        </>
    );
}

export default Partners;

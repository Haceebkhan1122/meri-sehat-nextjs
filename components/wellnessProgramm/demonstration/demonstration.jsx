import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import Image from 'next/image';
import { Col, Row } from "react-bootstrap";
import logo001 from '../../../public/svg/logo001.svg'
import logo002 from '../../../public/svg/logo002.svg'
import logo003 from '../../../public/svg/logo003.svg'
import logo004 from '../../../public/svg/logo004.svg'
import logo005 from '../../../public/svg/logo005.svg'
import ReactPlayer from 'react-player'


function Demonstration({ corporateData }) {
  const [widgets, setWidgets] = useState([])
  const [widgetsData, setWidgetsData] = useState([])

  useEffect(() => {
    if (corporateData) {
      let widjets = corporateData.widgets.map((item) => {
        return item;
      })
      let widjetsData = widjets[6].data.map((item) => {
        return item;
      })
      setWidgets(widjets)
      setWidgetsData(widjetsData)
    }
  }, [])


  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
          autoplay: true,

        }
      }
    ]
  };

  return (
    <div>
      <Row className='mt100 demonstration'>
        <Col lg={12}>
          <h2 className='mb-4 text-center'>{widgets[5]?.heading}</h2>
          <div className='boxVideo'>
            {/* <iframe src={widgets[5]?.data[0]?.source} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen /> */}
            <ReactPlayer url={widgets[5]?.data[0]?.source} className="box_video_player" style={{borderRadius:"30px"}} playIcon />
          </div>
        </Col>
      </Row>
      <Row className="mt100  ">
        <Col lg={8} className="mx-auto">
          <div className="slider-container">
            <Slider {...settings}>
              {widgetsData?.map((item) => {
                return (<>
                  <div className="imageSlider">
                    <img src={item.image} className='img-fluid' />
                  </div>
                </>)
              })}
            </Slider>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Demonstration;
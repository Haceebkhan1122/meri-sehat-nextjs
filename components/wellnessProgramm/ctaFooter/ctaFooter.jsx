import React, {useState, useEffect} from 'react'
import { Col, Row } from "react-bootstrap"; 

function ctaFooter({corporateData}) {

  const [widgets, setWidgets] = useState([])

  useEffect(() => {
    if (corporateData) {
      let widjets = corporateData.widgets.map((item) => {
        return item;
      })
      setWidgets(widjets)
    }
  }, [])

  const handleRouteRegister = () => {
    window.scroll(0,0)
  }

  return (
    <div className='mt-3'>
      <div className='boxCtaFooter mt100'>
          <Row className='h-100 '>
              <Col md={2} className='ms-auto position-relative'>
                <img src={widgets[8]?.data[0].image}  className='img-fluid imgCta'/>
              </Col>
              <Col md={3} className='my-auto ms-auto'>
                  <h2 className='registerTodayBanner'> {widgets[8]?.data[0]?.heading} </h2>
                  <div className='d-flex align-items-center justify-content-evenly boxResponsive'>
                  <p className='registerTodaySubBanner'> {widgets[8]?.data[0]?.sub_head} </p>
                  <p className='registerTodayDiscount'> {widgets[8]?.data[0]?.description} </p>
                  </div>

              </Col>
              <Col md={5} className='position-relative my-auto text-center btnRegisterMob' >
                  <div className='boxButton'><button className='register mx-auto hovering_green_btn_MA' onClick={handleRouteRegister}> {widgets[8]?.data[0]?.button_text} </button></div>
              </Col>
          </Row>
      </div>
    </div>
  )
}

export default ctaFooter
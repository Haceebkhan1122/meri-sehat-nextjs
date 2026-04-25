import React, {useState, useEffect} from 'react'
import { Col, Row } from "react-bootstrap"; 

function ctaBanner({corporateData}) {
  const [widgets, setWidgets] = useState([])

  useEffect(() => {
    if(corporateData) {
      let widjets = corporateData.widgets.map((item)=> {
        return item;
      })
      setWidgets(widjets)
    }
  }, [])


  return (
    <div className='boxCta mt100'>
        <Row className='h-100 '>
        <Col md={7} className='my-auto '>
            <h2>
              {widgets[2]?.data[0].heading.split(" ").map((item, index) => {
                if (item.toUpperCase() === "CASHBACK") {
                  return <span key={index} className='middleBoldCashBack'>CASHBACK </span>;
                } else {
                  return <span className='wordStreamAvail' key={index}>{item}{index !== item.length  ? ' ' : ' '}</span>;
                }
              })}
            </h2>
          </Col>
            <Col md={5} className='position-relative' >
                <img src={widgets[2]?.data[0].image}  className='img-fluid imgCta'/>
            </Col>
        </Row>
    </div>
  )
}

export default ctaBanner
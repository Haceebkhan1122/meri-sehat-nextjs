/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import HeadingDesc from "../HeadingDesc/HeadingDesc";
import SectionHeadingLarge from "../sectionHeadingLarge/SectionHeadingLarge";
// import './imageWithPoints.css';
import Image from 'next/image';


function ImageWithPoints(props) {
  const { image, iconImage, title, iconpoints, icon } = props;
  return (
    <div className="imageWithPoints">
      <Container>
        <Row>
          <Col md={3}>
            <div className="leftBox">
              <div className="imgBox">
                <Image crossorigin="anonymous" src={image} alt="leftimg" />
                <Image crossorigin="anonymous" src={iconImage} alt="iconImage" className="iconImage" />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="rightBox">
              <SectionHeadingLarge text={title} />
              <ul className="iconpoints">
                {iconpoints.map((iconPoint, index) => {
                  const { heading, desc } = iconPoint;
                  return (
                    <li key={index}>
                      <div className="icon">
                        <Image crossorigin="anonymous" src={icon} alt="icon" />
                      </div>
                      <div className="textBox">
                        <HeadingDesc text={heading} />
                        <HeadingDesc text={desc} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ImageWithPoints;

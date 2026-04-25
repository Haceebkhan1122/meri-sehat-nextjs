/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import HeadingDesc from "../HeadingDesc/HeadingDesc";
import SectionHeadingSmall from "../SectionHeadingSmall/SectionHeadingSmall";
import SubSectionHeading from "../SubSectionHeading/SubSectionHeading";
import Image from 'next/image';

function HealthDataPlatform(props) {
  const { widgetData = [], key } = props;
  return (
    <section
      key={key}
      className="healthDataPlatform dynamic-widget"
      data-reference_widget_id={widgetData?.id}
      data-widget_id={widgetData?.widget_id}
    >
      <Container>
        <div className="heading_header">
          <Row>
            <Col md={7}>
              {widgetData?.heading && (
                <SubSectionHeading text={widgetData?.heading} />
              )}
              {widgetData?.description && (
                <HeadingDesc
                  text={
                    <p
                      dangerouslySetInnerHTML={{
                        __html: widgetData?.description
                      }}
                    />
                  }
                />
              )}
            </Col>
          </Row>
        </div>
      </Container>
      <Container>
        <Row className="second" style={{ backgroundColor: widgetData?.data?.[0]?.card_color }}>
          <Col
            md={5}
            className={
              widgetData?.data?.[0]?.image_position == 'left'
                ? `order-1`
                : 'order-2'
            }
          >
            <div className="content">
              <SectionHeadingSmall text={widgetData?.data?.[0]?.heading} />
              <HeadingDesc
                text={
                  <p
                    dangerouslySetInnerHTML={{
                      __html: widgetData?.data?.[0]?.description
                    }}
                  />
                }
              />
            </div>
          </Col>
          <Col
            md={7}
            className={
              widgetData?.data?.[0]?.image_position == 'left'
                ? `order-2 pe-0`
                : 'order-1 ps-0'
            }
          >
            <div className="imgBox">
              <Image crossorigin="anonymous" src={widgetData?.data?.[0]?.image} alt="contentImg" className='img-fluid' />

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HealthDataPlatform;

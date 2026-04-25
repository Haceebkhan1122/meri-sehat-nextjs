import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import IconCard from "../icons/IconCard/IconCard";
import SubSectionHeading from "../SubSectionHeading/SubSectionHeading";
import styles from "../../styles/HowOurTechWorks.module.css";

function HowOurTechWorks(props) {
  const { widgetData = [], key } = props;
  return (
    <section key={key} className={`${styles.howOurTechWorks} dynamic-widget`} data-reference_widget_id={widgetData?.id}
    data-widget_id={widgetData?.widget_id}>
      <Container>
        <SubSectionHeading text={widgetData?.heading} />
        <Row>
          {widgetData?.data?.map((techWork, index) => {
            return (
              <Col md={4} key={index}>
                <IconCard img={techWork?.image} heading={techWork?.header} desc={techWork?.description} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}

export default HowOurTechWorks;

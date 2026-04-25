import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import './sectionWithTwoCards.css';
import { useRouter } from "next/router";

function SectionWithTwoCards(props) {
  const { secTopContent, rightCardContent, leftCardContent } = props;
  const router = useRouter();

  return (
    <section className="doctor_now_home">
      <Container>
        <div className="sec_with_two_cards cardRemovePadding">
          <Row className="justify-content-center ">
            {secTopContent && (
              <Col md={7}>
                <div className="heading_header">{secTopContent || ""}</div>
              </Col>
            )}
            <Col xl={6} lg={12} className=" mb-20 ">
              {leftCardContent || ""}
            </Col>
            <Col xl={6} lg={12} className="  mb-20 last_box_wellness ss">
              {rightCardContent || ""}
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}

export default SectionWithTwoCards;

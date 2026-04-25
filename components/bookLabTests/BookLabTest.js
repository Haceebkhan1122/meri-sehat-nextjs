import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TrustedLabPartners from "../trustedLabPartners/trustedLabPartners";

function BookLabTest(props) {
  const { widgetData } = props;

  return (
    <>
      <section className="bookLabTests mt-4 mb-3 ">
        <Container className="mt-3 mob-p0 p-0">
          <Row>
            <Col lg={12}>
              <div className="mob_book">
                <h2 className="mt-2 mb-3">{widgetData?.heading}</h2>
                <p className="border-top pt-3 font_labs_text">{widgetData?.description}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className=" ">
        {/* <TrustedLabPartners data={widgetData?.data?.[0]} /> */}
      </div>
    </>
  );
}

export default BookLabTest;

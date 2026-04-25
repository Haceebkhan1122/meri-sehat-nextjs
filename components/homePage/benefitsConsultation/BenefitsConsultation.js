import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HeadingDescSmall } from "../../headingDescSmall";
// import consultation1 from "../../../public/png/consultation1.png";
// import consultation2 from "../../../public/png/consultation2.png";
// import consultation3 from "../../../public/png/consultation3.png";
// import consultation4 from "../../../public/png/consultation4.png";
import Image from "next/image";
import ImageLoader from "../../ImageLoader";

function BenefitsConsultation(props) {
  const { widgetData = [], key } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (widgetData?.data?.length > 0) {
      setData(widgetData?.data);
    }
  }, [widgetData]);

  return (
    <section
      className="health_common mt-80 benefits_consultation pb-5 homepage"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <Container>
        <Row>
          <Col lg={12}>
            <h2 className="mb-3 heading-mobile">{widgetData?.heading}</h2>
            <hr className="mb-4"></hr>
          </Col>
        </Row>
        <Row className="mob_slider_health healthConditions doctor_now new_change">
          {data?.length > 0 &&
            data?.map((item) => {
              return (
                <Col lg={3} xs={7} className="box_benefits01">
                  <div className="box_health01 text-center px-4 pb-4 mob_box_health" style={{border: '0.3px solid #80808061', borderRadius:'4.57px'}}>
                    {item?.image ? (
                      <Image
                        src={item?.image}
                        alt={item?.alt ? item?.alt : null}
                        className="mb-5 mt-30"
                        width={250}
                        height={200}
                      />
                    ) : (
                      <ImageLoader />
                    )}
                    <h3 className="topicHeading mob_heading_topic">
                      {item?.heading}
                    </h3>
                    <p className="topicHeadingDesc">{item?.description}</p>
                  </div>
                </Col>
              );
            })}
        </Row>
      </Container>
    </section>
  );
}

export default BenefitsConsultation;

import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function TrustedByTheBest(props) {
  const { widgetData = [], key } = props;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    import("react-device-detect").then((item) => {
      setIsMobile(item.isMobile);
    });
  }, []);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(widgetData?.data);
  }, [widgetData]);

  return (
    <>
      <section className="trusted_partners logoImgSet mt-0" data-aos="fade-up" data-aos-duration="800">
        <Container>
          <Row>
            <Col md={12} >
              <div className="d-md-flex icon_logos">
                {/* <h2 className="text-initial fw-600 border-bottom-0">{widgetData?.data?.[0].heading}</h2>
                            <h5 className='heading_desc'>{widgetData?.data?.[0].description}</h5> */}
                {data?.length > 0 &&
                  data?.map((item) => {
                    return (
                      <>
                        {isMobile ? (
                          <span className="logo_icon">
                            <Image
                              crossorigin="anonymous"
                              src={item?.image}
                              width={52}
                              height={52}
                              alt="brands"
                              style={{ margin: "auto" }}
                              className="img-fluid"
                            />
                          </span>
                        ) : (

                          <Image
                            crossorigin="anonymous"
                            src={item?.image}
                            width={52}
                            height={52}
                            alt="brands"
                            style={{ margin: "auto" }}
                            className="img-fluid"
                          />

                        )}

                      </>
                    );
                  })}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default TrustedByTheBest;

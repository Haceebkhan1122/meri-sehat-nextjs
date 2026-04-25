import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Image from "next/image";
import Slider from "react-slick";
import { getLabPartnersApi } from "@/utils/endpoints";
import API from "@/utils/httpService";

const trustedLabPartners = ({ data }) => {
  const [labPartners, setLabPartners] = useState();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  return (
    <StyledTrustedLab>
      <Container className="">
        <StyledTrustedLabRow className="testpartner">
          <Row>
            <Col className="textpartners" md={3}>
              <h2>Our Trusted Lab Partners</h2>
            </Col>
            <Col className=" ms-auto " md={6}>
              <div className="labs_slider">
                <Slider {...settings}>
                  <div className="labsicon">
                    <Image
                      src={data?.card_1_icon || ""}
                      width={70}
                      height={70}
                      className="labimg"
                    />
                  </div>

                  <div className="labsicon">
                    <Image
                      src={data?.card_2_icon || ""}
                      width={70}
                      height={70}
                      className="labimg"
                    />
                  </div>

                  <div className="labsicon">
                    <Image
                      src={data?.card_3_icon || ""}
                      width={70}
                      height={70}
                      className="labimg"
                    />
                  </div>

                  <div className="labsicon">
                    <Image
                      src={data?.card_4_icon || ""}
                      width={70}
                      height={70}
                      className="labimg"
                    />
                  </div>
                </Slider>
              </div>
            </Col>
          </Row>
        </StyledTrustedLabRow>
      </Container>
    </StyledTrustedLab>
  );
};

export const StyledTrustedLab = styled.div`
  margin-top: 1.575rem;
  margin-bottom: 1rem;
`;

export const StyledTrustedLabRow = styled.div`
  background: #f7f7f7;
  height: 80px;
  padding: 4px 15px;
  border-radius: 16px;

  .textpartners {
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
      font-family: "Nunito";
      font-size: 24px;
      font-weight: 500;
      line-height: 31.2px;
      color: #313131;
      white-space: nowrap;
    }
  }

  .partnersIcons {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export default trustedLabPartners;

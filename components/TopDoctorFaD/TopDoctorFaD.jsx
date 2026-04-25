import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import doctor01 from "../../public/png/doctor01.png";
import style from '../../components/findADoctor/style.module.scss'


function TopDoctorFaD(props) {
  const { widgetData } = props;
  return (
    <>
      <section className={`${style.pb_80} ${style.pt_80}  ${style.faDTopDr} `} data-aos="fade-up" data-aos-duration="800" >
        <Container>
          <Row className="hk_Top_doctors_fad">
            <Col lg={5}>
              <Image src={widgetData?.data?.[0]?.image} width={547} height={458} className="img-fluid left_big_fad" />
            </Col>
            <Col lg={6} xs={12} className="ms-auto my-auto">
              <h2 className={`${style.headindFindaDR} mb-4 mt-5`}>{widgetData?.heading}</h2>
              <div className="d-lg-none d-block">
                <hr></hr>
              </div>
              <p className="mb-4 me-5 desc_hk">{widgetData?.data?.[0]?.card_1_desc}</p>
              <ul className="pt-3">
                <li className="mb-4 d-flex align-items-center">
                  <Image src={widgetData?.data?.[0]?.card_2_icon} width={25} height={25} className="img-fluid me-3" />
                  <p>{widgetData?.data?.[0]?.card_2_desc}</p>
                </li>
                <li className="mb-4 d-flex align-items-center">
                  <Image src={widgetData?.data?.[0]?.card_3_icon} width={25} height={25} className="img-fluid me-3" />
                  <p>{widgetData?.data?.[0]?.card_3_desc}</p>
                </li>
                <li className="mb-4 d-flex align-items-center">
                  <Image src={widgetData?.data?.[0]?.card_4_icon} width={25} height={25} className="img-fluid me-3" />
                  <p>{widgetData?.data?.[0]?.card_4_desc}</p>
                </li>
              </ul>

            </Col>
          </Row>

        </Container>
      </section>
    </>
  );
}

export default TopDoctorFaD;

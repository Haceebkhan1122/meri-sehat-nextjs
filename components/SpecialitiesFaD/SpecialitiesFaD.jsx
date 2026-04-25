import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Image from "next/image";

import style from '../../components/findADoctor/style.module.scss'

import link01 from "../../public/svg/link01.svg";
import icon011 from "../../public/svg/icon011.svg";
import icon012 from "../../public/svg/icon012.svg";
import icon013 from "../../public/svg/icon013.svg";
import icon014 from "../../public/svg/icon014.svg";
import ModalForFaDSpecialties from "../modalForFaD/ModalForFaDSpecialties";

function specialitiesFaD() {

  const [specialtiesModal, setSpecialtiesModal] = useState(false);

  return (
    <>
      <section className={`${style.pb_80} ${style.specialitiesFaD} homepage`} data-aos="fade-up" data-aos-duration="800" >
        <Container>
          <Row>
            <Col lg={4}>
              <h2 className={`${style.headindFindaDR} mb-5`}> Top Searched  Specialities</h2>
              <div className={`${style.viewMore} justify-content-start`} >
                <button className="d-flex align-items-center " onClick={() => setSpecialtiesModal(true)}>
                  <Image src={link01} className="icon-right me-3" width="35" height="35" />
                  <span>VIEW ALL</span></button>
              </div>

            </Col>
            <Col lg={8} xs={12}>
              <Row className={`${style.mainboxImageSpScroll}`}>
                <Col lg={3} xs={2} className={`${style.mainboxImageSp}`}>
                  <div className={`${style.boxImageSp} mb-2 d-flex align-items-center justify-content-center`}>
                    <Image src={icon011} className="img-fluid" />
                  </div>
                  <p>General Physician</p>
                </Col>
                <Col lg={3} xs={2} className={`${style.mainboxImageSp}`}>
                  <div className={`${style.boxImageSp} mb-2 d-flex align-items-center justify-content-center`}>
                    <Image src={icon012} className="img-fluid" />
                  </div>
                  <p>Dermatologist</p>
                </Col>
                <Col lg={3} xs={2} className={`${style.mainboxImageSp}`}>
                  <div className={`${style.boxImageSp} mb-2 d-flex align-items-center justify-content-center`}>
                    <Image src={icon013} className="img-fluid" />
                  </div>
                  <p>Child Specialist</p>
                </Col>
                <Col lg={3} xs={2} className={`${style.mainboxImageSp}`}>
                  <div className={`${style.boxImageSp} mb-2 d-flex align-items-center justify-content-center`}>
                    <Image src={icon014} className="img-fluid" />
                  </div>
                  <p>Gynecologist</p>
                </Col>
              </Row>
            </Col>
          </Row>

        </Container>
        <ModalForFaDSpecialties specialtiesModal={specialtiesModal} setSpecialtiesModal={setSpecialtiesModal} />
      </section>

    </>
  );
}

export default specialitiesFaD;

import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TopicHeading } from "../TopicHeading";
import Image from "next/image";
import circleFour from "../../public/png/arrow-right01.png";
import { useSelector } from "react-redux";
import ImageLoader from "../ImageLoader";
import style from '../../components/findADoctor/style.module.scss'
import des01 from "../../public/png/des01.png"; 
import des02 from "../../public/png/des02.png"; 
import des03 from "../../public/png/des03.png"; 
import des04 from "../../public/png/des04.png";  
import link01 from "../../public/svg/link01.svg"; 
import DiseasesModalFAD from '../diseasesModalFAD/diseasesModalFAD';

function CommonHealthFad(props) {

  const [diseasesModal , setDiseasesModal] = useState(false);

  return (
     <>
       <section className={`${style.pb_80} ${style.findaDR} health_common self_common_health homepage `} data-aos="fade-up" data-aos-duration="800" >
        <Container>
          <Row>
            <Col lg={8}>
              <h2 className={`${style.headindFindaDR} heading-mobile mb-0`}> Most common diseases</h2>
              
            
            </Col>
            <Col lg={4} className="text-end">
              <div className={`${style.viewMore}`} >
                
                <button className="d-flex align-items-center" onClick={() => setDiseasesModal(true)}>
                  <Image src={link01} className="icon-right me-3" width="35" height="35"/>
                  <span> VIEW ALL</span></button>
              </div>
            </Col>
            <Col lg={12}>
            <hr className="mb-4"></hr>
            </Col>
          </Row>
          <Row className="mob_slider_health healthConditions doctor_now">
              <Col lg={3} xs={7} className="mob_slid ">
                    <a href="">
                      <div className="box_health01 text-center px-4 pb-4 ">
                        <Image
                          width={250}
                          height={213}
                          src={des01}
                          alt="image"
                          className="mb-4 mt-60"
                        />
                        <div className=" d-none position-relative ">
                          <Image src={circleFour} className="icon-right" />
                        </div>
                        <h3 dir="auto" class="topicHeading">Cold &amp; Flu</h3>
                      </div>
                    </a>
              </Col>
              <Col lg={3} xs={7} className="mob_slid ">
                    <a href="">
                      <div className="box_health01 text-center px-4 pb-4 ">
                        <Image
                          width={250}
                          height={213}
                          src={des02}
                          alt="image"
                          className="mb-4 mt-60"
                        />
                        <div className="d-block d-lg-none position-relative">
                          <Image src={circleFour} className="icon-right" />
                        </div>
                        <h3 dir="auto" class="topicHeading">Blood Pressure</h3>
                      </div>
                    </a>
              </Col>
              <Col lg={3} xs={7} className="mob_slid ">
                    <a href="">
                      <div className="box_health01 text-center px-4 pb-4 ">
                        <Image
                          width={250}
                          height={213}
                          src={des03}
                          alt="image"
                          className="mb-4 mt-60"
                        />
                        <div className="d-block d-lg-none position-relative">
                          <Image src={circleFour} className="icon-right" />
                        </div>
                        <h3 dir="auto" class="topicHeading">Allergies</h3>
                      </div>
                    </a>
              </Col>
              <Col lg={3} xs={7} className="mob_slid ">
                    <a href="">
                      <div className="box_health01 text-center px-4 pb-4 ">
                        <Image
                          width={250}
                          height={213}
                          src={des04}
                          alt="image"
                          className="mb-4 mt-60"
                        />
                        <div className="d-block d-lg-none position-relative">
                          <Image src={circleFour} className="icon-right" />
                        </div>
                        <h3 dir="auto" class="topicHeading">Gastritis</h3>
                      </div>
                    </a>
              </Col>
            
          </Row>
        </Container>
        <DiseasesModalFAD diseasesModal = {diseasesModal} setDiseasesModal = {setDiseasesModal} />
      </section>
      </>
  );
}

export default CommonHealthFad;

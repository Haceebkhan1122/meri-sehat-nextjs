import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TopicHeading } from "../TopicHeading";
import Image from "next/image";
import city01 from "../../public/svg/city01.svg";
import city02 from "../../public/svg/city02.svg";
import city03 from "../../public/svg/city03.svg";
import city04 from "../../public/svg/city04.svg";
import rightIcon from "../../public/svg/rightIcon.svg";
import { useSelector } from "react-redux";
import ImageLoader from "../ImageLoader";
import CitiesModalFAD from '../modalCitiesFAD/ModalCities';
import style from '../../components/findADoctor/style.module.scss'
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

function specialitiesFaD({ handleSpecialityByCity }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    import("react-device-detect").then((item) => {
      setIsMobile(item.isMobile);
    });
  }, []);
  const router = useRouter();
  const [citiesModal, setCitiesModal] = useState(false)

  const handleOtherCities = () => {
    // Cookies.set('findASpecialist', 1)
    Cookies.set('OtherCities', 1)
    Cookies.set('speciality', 1)
    router.push('/doctors/others')
  }


  return (
    <>
      <section className={`${style.pb_80} ${style.specialitiesFaDCity} homepage  fadBoxspe`} data-aos="fade-up" data-aos-duration="800" >
        <Container>
          <Row>
            <Col lg={12}>
              <h2 className={`${style.headindFindaDR} mb-2`}>
                {isMobile ? `Find a Specialist by City` : `Find a specialist by city`}
              </h2>
              <hr />
            </Col>
            <Col lg={12} xs={12}>
              <Row className={`${style.mainboxImageSpScroll}`}>
                <Col lg={3} xs={6} className={`${style.mainCityBox}`}>
                  <div className={`${style.boxCity}  d-flex align-items-center justify-content-between`} onClick={() => handleSpecialityByCity("Karachi")}>
                    <div className="d-flex align-items-center justify-content-center" >
                      <Image src={city01} className="img-fluid me-1" />
                      <p className="ms-3">Karachi</p>
                    </div>
                    <Image src={rightIcon} className="img-fluid me-4" />
                  </div>
                </Col>
                <Col lg={3} xs={6} className={`${style.mainCityBox}`}>
                  <div className={`${style.boxCity}  d-flex align-items-center justify-content-between`} onClick={() => handleSpecialityByCity("Lahore")}>
                    <div className="d-flex align-items-center justify-content-center" >
                      <Image src={city02} className="img-fluid me-1" />
                      <p className="ms-3"> Lahore</p>
                    </div>
                    <Image src={rightIcon} className="img-fluid me-4" />
                  </div>

                </Col>
                <Col lg={3} xs={6} className={`${style.mainCityBox}`}>
                  <div className={`${style.boxCity}  d-flex align-items-center justify-content-between`} onClick={() => handleSpecialityByCity("Islamabad")}>
                    <div className="d-flex align-items-center justify-content-center" >
                      <Image src={city03} className="img-fluid me-1" />
                      <p className="ms-3">Islamabad</p>
                    </div>
                    <Image src={rightIcon} className="img-fluid me-4" />
                  </div>

                </Col>
                <Col lg={3} xs={6} className={`${style.mainCityBox}`}>
                  <div className={`${style.boxCity}  d-flex align-items-center justify-content-between`} onClick={handleOtherCities}>
                    <div className="d-flex align-items-center justify-content-center" >
                      <Image src={city04} className="img-fluid me-1" />
                      <p className="ms-3">Other Cities</p>
                    </div>
                    <Image src={rightIcon} className="img-fluid me-4" />
                  </div>

                </Col>


              </Row>
            </Col>
          </Row>

        </Container>
        <CitiesModalFAD citiesModal={citiesModal} setCitiesModal={setCitiesModal} />
      </section>
    </>
  );
}

export default specialitiesFaD;

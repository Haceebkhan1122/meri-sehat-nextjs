import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TopicHeading } from "../TopicHeading";
import Image from "next/image";
import circleFour from "../../public/png/arrow-right01.png";
import { useSelector, useDispatch } from "react-redux";
import ImageLoader from "../ImageLoader";
import Arrow from "../../public/svg/right-arrow-border.svg";
import { useRouter } from "next/router";
import { fetchSpecialitiesDiseaseDoctor, fetchCities } from '../../store/citySpecialityDiseaseDoctorLayout';
import Cookies from "js-cookie";
import Loader from "../Loader";
import Link from "next/link";
import useMediaQuery from '@mui/material/useMediaQuery';
function CommonHealth(props) {
  const { widgetData = [], key } = props;
  const [data, setData] = useState([]);
  const [selectedCityCookie, setSelectedCityCookie] = useState()
  const [selectedCity, setSelectedCity] = useState();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [fromFad, setFromFad] = useState(false);
  var storedCity = Cookies.get('selectedCity');
  let myCities = useSelector((state) => state.cities.cities);
  const karachiCity = myCities?.find(city => city.name == 'Karachi');
  useEffect(() => {
    Cookies.remove('findASpecialist')
  }, [])
  useEffect(() => {
    try {
      if (loading) {
        if (karachiCity) {
          Cookies.set('selectedCity', JSON.stringify(karachiCity));
          setSelectedCity(karachiCity);
          setLoading(false);
        }
      } else if (storedCity) {
        const parsedData = JSON.parse(storedCity);
        setSelectedCity(parsedData);
      } else {
      }
    } catch (error) {
      console.error('Error parsing JSON from the cookie:', error);
    }
  }, [storedCity, karachiCity])
  const router = useRouter();
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);
  useEffect(() => {
    if (widgetData?.data?.length > 0) {
      setData(widgetData?.data);
    }
  }, [widgetData]);
  useEffect(() => {
    dispatch(fetchSpecialitiesDiseaseDoctor())
    dispatch(fetchCities())
  }, []);

  useEffect(() => {
    if (router.query.disease) {
      setDiseaseValue(router.query.disease)
    }
  }, [])

  // get cookie city id and set in state locally
  useEffect(() => {
    const storedCity = Cookies.get('selectedCity');
    try {
      if (storedCity) {
        const selectedCityCookie = JSON.parse(storedCity);
        setSelectedCityCookie(selectedCityCookie)
      } else {
      }
    } catch (error) {
      console.error('Error parsing JSON from the cookie:', error);
    }
  }, [selectedCity])
  const DiseaseModal = () => {
    Cookies.set('diseaseModal', 1)
    // Trigger a custom event to notify other components about the change
    const event = new Event('specModalCookieChange');
    window.dispatchEvent(event);
  }
  useEffect(() => {
    if (router.pathname === "/find-a-doctor") {
      setFromFad(true)
    }
    else {
      setFromFad(false)
    }
  }, [router.pathname]);
  return (
    <>
      {loading && (
        <Loader />
      )}
      <section
        className="health_common mt-80 self_common_health homepage "
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <Container>
          <Row>
            <Col lg={12} className="for_doctor_now_show">
              <h2 className="mb-3 heading-mobile ">{widgetData?.heading}</h2>
              <hr className="mb-4"></hr>
              <p className="d-block d-sm-none">{i18nData?.show_details1}</p>
            </Col>
            <Col lg={12}>
              <div className="for_find_docc">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="heading_areaa">
                    <h2 className="mb-3 heading-mobile ">{widgetData?.heading}</h2>
                  </div>
                  <div className="d-flex forBorder-wellness justify-content-between">
                    {router?.pathname === '/find-a-doctor' ? (
                      <a onClick={DiseaseModal} className="btn_icon_box">
                        <Image src={Arrow} width={30} height={30} alt="arrow" />
                        <span className="underline_ancer">
                          View All
                        </span>
                      </a>
                    ) :
                      <a href={widgetData?.redirect_url || ''} className="btn_icon_box">
                        <Image src={Arrow} width={30} height={30} alt="arrow" />
                        <span className="underline_ancer">
                          View All
                        </span>
                      </a>
                    }
                  </div>
                </div>
                <hr className="mb-4"></hr>
              </div>
            </Col>
          </Row>
          {router?.pathname === '/find-a-doctor' ? (
            <Row className="mob_slider_health healthConditions doctor_now">
              {data?.length > 0 &&
                data?.map((item) => {
                  return (
                    <Col lg={3} xs={7} className="mob_slid" >
                      <Link href={`/doctors/${selectedCityCookie?.name}?disease=${item?.heading}&page=1` || ''}>
                        <div  className="box_health01 text-center px-4 pb-4 " style={{ border: '0.2px solid #8e8e8e4f', borderRadius: '8px' }}>
                          {item?.image ?
                            <Image
                              width={250}
                              height={240}
                              src={item?.image}
                              alt={item?.alt ? item?.alt : null}
                              className="mb-4 mt-800"
                            />
                            :
                            <ImageLoader />
                          }

                          {fromFad && !isMobile && (
                            <div className="d-block d-lg-none position-relative">
                              <Image
                                src={circleFour}
                                className="icon-right"
                                width={40}
                                height={40}
                              />
                            </div>
                          )}
                          {!fromFad && (
                            <div className="d-block d-lg-none position-relative">
                              <Image
                                src={circleFour}
                                className="icon-right"
                                width={40}
                                height={40}
                              />
                            </div>
                          )}
                          {/* 
              <div className="d-block d-lg-none position-relative">
                <Image src={circleFour} className="icon-right" width={40} height={40} />
              </div> */}
                          <TopicHeading text={item?.heading}></TopicHeading>
                        </div>
                      </Link>
                    </Col>
                  );
                })}
            </Row>
          ) :
            <Row className="mob_slider_health healthConditions doctor_now">
              {data?.length > 0 &&
                data?.map((item) => {
                  return (
                    <Col lg={3} xs={7} className="mob_slid ">
                      <a href={item?.redirect_url || ""}>
                        <div className="box_health01 text-center px-4 pb-4">
                          {item?.image ?
                            <Image
                              width={250}
                              height={213}
                              src={item?.image}
                              alt={item?.alt ? item?.alt : null}
                              className="mb-4 mt-60"
                            />
                            :
                            <ImageLoader />
                          }
                          <div className="d-block d-lg-none position-relative">
                            <Image src={circleFour} className="icon-right" width={40} height={40} />
                          </div>
                          <TopicHeading text={item?.heading}></TopicHeading>
                        </div>
                      </a>
                    </Col>
                  );
                })}
            </Row>
          }
        </Container>
      </section>
    </>
  );
}
export default CommonHealth;
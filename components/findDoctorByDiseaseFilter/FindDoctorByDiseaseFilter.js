import { useEffect, useState, useRef, useCallback } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import React from 'react';
const arrowUp = "/svg/arrow-up-white.svg";
import HeadingDesc from "../HeadingDesc/HeadingDesc";
import HeadingDescSmall from "../headingDescSmall/HeadingDescSmall";
// import './findDoctorByDiseaseFilter.css';
// import i18n from '../../../i18n';
// import { getDoctorListingBySpecialityAPI } from '../../../api/doctorListingBySpeciality';
import HeaderSearch from '../headerSearch/HeaderSearch';
import Link from 'next/link';
// import core_ad from '../../public/png/core_ad.png'
// import core_ad1 from '../../public/png/core_ad1.png'
// import core_ad2 from '../../public/png/core_ad2.png'
// import core_ad3 from '../../public/png/core_ad3.png'
// import loaderGif from '../../public/gif/loader_gif.gif'
import Image from 'next/image';


function FindDoctorByDiseaseFilter(props) {
  const { widgetData } = props;
  const [specialityListing, setSpecialityListing] = useState({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyForTabs, setKeyForTabs] = useState('speciality');
  const ForTop = useRef(null);


  const [imageCollection, setImageCollection] = useState([
    { image: '../../public/png/core_ad.png', link: 'https://getzpharma.com/product/core24/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat' },
    { image: '../../public/png/core_ad1.png', link: 'https://getzpharma.com/product/livity/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat' },
    { image: '../../public/png/core_ad2.png', link: 'https://getzpharma.com/product/agnar/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat' },
    { image: '../../public/png/core_ad3.png', link: 'https://getzpharma.com/product/olcuf/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat' },

  ])

  const [imageIndexToShow, setImageIndexToShow] = useState(null);

  useEffect(() => {

    setImageIndexToShow(Math.floor(Math.random() * imageCollection.length));

  }, [])

  // const fetchDiseases = useCallback(
  //   async (qs = '') => {
  //     try {
  //       setLoading(true);
  //       const res = await getDoctorListingBySpecialityAPI(qs);
  //       if (res.code === 200) {
  //         setSpecialityListing(res.data);
  //         setLoading(false);
  //       } else {
  //         return;
  //       }
  //     } catch (error) {

  //       setLoading(false);
  //     }
  //   },
  //   [specialityListing]
  // );

  // useEffect(() => {
  //   fetchDiseases(keyForTabs);
  // }, [keyForTabs]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length >= 3) {
        // fetchDiseases(`${keyForTabs}&search=${search}`);
      } else if (search.length === 0) {
        // fetchDiseases(`${keyForTabs}&search=`);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // _____________API WORK____________________

  const letters = specialityListing?.headings;
  const listing = { ...specialityListing };
  const findAlphabetKey = useCallback(
    (alphabet) => {
      let singleList = listing[alphabet];
      return singleList?.length > 0 ? singleList : [];
    },
    [specialityListing]
  );

  const scrollClick = () => {
    ForTop.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="findDoctorByDiseaseFilter"
      className="findDoctorByDiseaseFilter"
    >
      <Container>
        <div className="tabContainer" ref={ForTop}>
          {/* <SlideSearchIcon icon={searchIcon} /> */}
          <HeaderSearch
            className="Sddsdsd"
            onSearch={(e) => setSearch(e.target.value)}
            resetSearch={() => setSearch('')}
          />
          <Tabs
            id="controlled-tab-speciality"
            activeKey={keyForTabs}
            transition
            onSelect={(k) => setKeyForTabs(k)}
            className="mb-3 customTabs"
          >
            <Tab eventKey="speciality" title={i18n.t('by_speciality')}>
              {loading ? (
                <div className="speciality_loader">
                  {/* <DotLoader /> */}
                  <Image
                    className="loading_gif m-auto"
                    src='../../public/gif/loader_gif.gif'
                    alt="loader"
                  />
                </div>
              ) : (
                <>
                  <div className="filter_btns">
                    {letters?.map((item, index) => (
                      <a
                        type="button"
                        className="filter_btn"
                        href={`#${item.toLowerCase()}`}
                        key={index}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                  <Row>
                    <Col lg={8} md={12}>
                      {letters?.map((item, index) => {
                        return (
                          <div
                            id={item.toLowerCase()}
                            className="filterContent"
                            key={index}
                          >
                            <h2 dir="auto" className="filterLetter">
                              {item}
                            </h2>
                            <ul className="filterList">
                              {findAlphabetKey(item)?.map((list, index) => {
                                return (
                                  <li key={index}>
                                    <Link
                                      dir="auto"
                                      to={
                                        `/doctors/karachi/${list?.slug}` || '#'
                                      }
                                    >
                                      <div className="listBox">
                                        {list?.image && (
                                          <div className="imgBox">
                                            <Image crossorigin="anonymous" src={list?.image} alt="icon" />
                                          </div>
                                        )}
                                        <div>
                                          <HeadingDesc text={list?.name} />
                                          <HeadingDescSmall
                                            text={`${list?.doctor_count
                                              } ${i18n.t('doctors_available')}`}
                                          />
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                      <button
                        type="button"
                        className="simple_btn"
                        onClick={scrollClick}
                      >
                        <Image
                          src={arrowUp}
                          width={30}
                          height={30}
                          alt="arrowUp"
                          className="arrowUpWhite"
                        />
                        {i18n.t('back_to_top')}
                      </button>
                    </Col>
                    <Col lg={4} md={12}>
                      <div className="add">
                        <a href={imageCollection[imageIndexToShow]?.link} target='blank' ><Image src={imageCollection[imageIndexToShow]?.image} className='img-fluid w-100' alt="advertisement" /></a>
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </Tab>
            <Tab eventKey="condition" title={i18n.t('by_condition')}>
              {loading ? (
                <div className="speciality_loader">
                  {/* <DotLoader /> */}
                  <Image
                    className="loading_gif m-auto"
                    src='../../public/gif/loader_gif.gif'
                    alt="loader"
                  />
                </div>
              ) : (
                <>
                  <div className="filter_btns">
                    {letters?.map((item, index) => (
                      <a
                        type="button"
                        className="filter_btn"
                        href={`#${item.toLowerCase()}`}
                        key={index}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                  <Row>
                    <Col lg={8} md={12}>
                      {letters?.map((item, index) => {
                        return (
                          <div
                            id={item.toLowerCase()}
                            className="filterContent"
                            key={index}
                          >
                            <h2 dir="auto" className="filterLetter">
                              {item}
                            </h2>
                            <ul className="filterList">
                              {findAlphabetKey(item)?.map((list, index) => {
                                return (
                                  <li key={index}>
                                    <Link
                                      dir="auto"
                                      to={
                                        `/doctors/karachi/?service=${list?.slug}` ||
                                        '#'
                                      }
                                    >
                                      <div className="listBox">
                                        {list?.image && (
                                          <div className="imgBox">
                                            <Image crossorigin="anonymous" src={list?.image} alt="icon" />
                                          </div>
                                        )}
                                        <div>
                                          <HeadingDesc text={list?.name} />
                                          <HeadingDescSmall
                                            text={`${list?.doctor_count
                                              } ${i18n.t('doctors_available')}`}
                                          />
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                      <button
                        type="button"
                        className="simple_btn"
                        onClick={scrollClick}
                      >
                        <Image
                          src={arrowUp}
                          alt="arrowUp"
                          className="arrowUpWhite"
                        />
                        {i18n.t('back_to_top')}
                      </button>
                    </Col>
                    <Col lg={4} md={12}>
                      <div className="add">
                        <a href={imageCollection[imageIndexToShow]?.link} target='blank' ><Image src={imageCollection[imageIndexToShow]?.image} alt="advertisement" className='img-fluid w-100' /></a>
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </Tab>

            <Tab eventKey="city" title={i18n.t('by_city')}>
              {loading ? (
                <div className="speciality_loader">
                  {/* <DotLoader /> */}
                  <Image
                    className="loading_gif m-auto"
                    src='../../public/gif/loader_gif.gif'
                    alt="loader"
                  />
                </div>
              ) : (
                <>
                  <div className="filter_btns">
                    {letters?.map((item, index) => (
                      <a
                        type="button"
                        className="filter_btn"
                        href={`#${item.toLowerCase()}`}
                        key={index}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                  <Row>
                    <Col lg={8} md={12}>
                      {letters?.map((item, index) => {
                        return (
                          <div
                            id={item.toLowerCase()}
                            className="filterContent"
                            key={index}
                          >
                            <h2 dir="auto" className="filterLetter">
                              {item}
                            </h2>
                            <ul className="filterList">
                              {findAlphabetKey(item)?.map((list, index) => {
                                return (
                                  <li key={index}>
                                    <Link
                                      dir="auto"
                                      to={`/doctors/${list?.slug}` || '#'}
                                    >
                                      <div className="listBox">
                                        {list?.image && (
                                          <div className="imgBox">
                                            <Image crossorigin="anonymous" src={list?.image} alt="icon" />
                                          </div>
                                        )}
                                        <div>
                                          <HeadingDesc text={list?.name} />
                                          <HeadingDescSmall
                                            text={`${list?.doctor_count
                                              } ${i18n.t('doctors_available')}`}
                                          />
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                      <button
                        type="button"
                        className="simple_btn"
                        onClick={scrollClick}
                      >
                        <Image
                          src={arrowUp}
                          alt="arrowUp"
                          className="arrowUpWhite"
                        />
                        {i18n.t('back_to_top')}
                      </button>
                    </Col>
                    <Col lg={4} md={12}>
                      <div className="add">
                        <a href={imageCollection[imageIndexToShow]?.link} target='blank' ><Image src={imageCollection[imageIndexToShow]?.image} alt="advertisement" className='img-fluid w-100' /></a>
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </Tab>
          </Tabs>
        </div>
      </Container>
    </section>
  );
}

export default FindDoctorByDiseaseFilter;

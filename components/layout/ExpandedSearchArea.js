import React, { useEffect, useState, useRef } from "react";
// import "./expandedSearchArea.css";
import { FiChevronRight } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { Col, Row, Container } from "react-bootstrap";
import API from "../../utils/httpService";
// import Loader from "../../Components/customLoader/Loader";
import { useRouter } from "next/router";
import Loader from "../Loader";
import featuredDoc from "../../public/svg/featured-doc-search.svg";
import searchCloseIcon from "../../public/svg/searchCloseIcon.svg";
import videoBtnCall from "../../public/svg/video-btn-icon.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

function ExpandedSearchArea({ setIsSearchActive }) {
  const router = useRouter();

  const [suggestedSearches, setSuggestedSearches] = useState();
  const [popularSearches, setPopularSearches] = useState();
  const [popularSymptoms, setPopularSymptoms] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState();
  const [apiLoading, setApiLoading] = useState(false);
  const [searchApiLoading, setSearchApiLoading] = useState(false);
  const myRefsearch = useRef(null);
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

  useEffect(() => {
    let data = [];
    API.get(`/search/suggested?lang_id=1`).then((res) => {
      if (res?.code === 200) {
        data.push(res?.data);
        setSuggestedSearches(data);
      }
    });
  }, []);

  useEffect(() => {
    let data = [];
    setApiLoading(true);
    API.get(`/search/popular?lang_id=1`)
      .then((res) => {
        setApiLoading(false);
        if (res?.code === 200) {
          data.push(res?.data);
          setPopularSearches(data);
        }
      })
      .catch((err) => {
        setApiLoading(false);
      });
  }, []);



  async function handleSearch(e) {
    setSearchValue(e.target.value);

    let data = [];

    if (e.target.value.length >= 3) {
      setSearchApiLoading(true);
      const response = await API.get(
        `/search/symptoms?search=${e.target.value}&lang-id=1`
      );

      if (response?.code === 200) {
        setSearchApiLoading(false);
        data.push(response?.data);
        setSearchData(data);
      }
    }
  }

  useEffect(() => {
    myRefsearch.current.focus();
  }, []);

  const handleRedirect = () => {
    router.push("/doctor-now");
  };

  const languageChecker = Cookies.get('lang');

  return (
    <div className="expanded-search-area container text-center px-0 pt-0 ">
      <Container>
        <Col md={7} className="m-md-auto col-12 pb-4 pb-md-0">
          <h4 className="d-md-none topSearchTopHeading">{i18nData?.search}</h4>
          <div className="position-relative zj-search pt-4">
            <input
              type="text"
              ref={myRefsearch}
              placeholder={i18nData?.type_symptoms}
              className="expanded-search-input"
              value={searchValue}
              onChange={handleSearch}
            />
            <span className="searchIconInExpSearch">
              {" "}
              <BsSearch />{" "}
            </span>
          </div>

          {!searchData || !searchValue ? (
            <div className="expanded-search-items">
              {apiLoading ? (
                <Loader />
              ) : (
                <Row className="d-flex justify-content-between w-100">
                  <Col md={4} className="col-6">
                    <div className="popular-area">
                      <p className="expanded-search-items-heading">
                        {i18nData?.popular}
                      </p>
                      {popularSearches &&
                        popularSearches?.[0]?.map((item) => (
                          <a
                          href={languageChecker === '2' ? `/ur${item?.redirect_url}` : item?.redirect_url}
                            className="expanded-search-text"
                            style={{ display: "block" }}
                          >
                            {" "}
                            {item?.name}{" "}
                          </a>
                        ))}
                    </div>
                  </Col>
                  <Col md={4} className="col-6">
                    <div className="suggested-area">
                      <p className="expanded-search-items-heading">
                        {i18nData?.suggested}
                      </p>
                      {suggestedSearches &&
                        suggestedSearches?.[0]?.map((item) => (
                          <a
                          href={languageChecker === '2' ? `/ur${item?.redirect_url}` : item?.redirect_url}
                            className="expanded-search-text"
                            style={{ display: "block" }}
                          >
                            {" "}
                            {item?.name}{" "}
                          </a>
                        ))}
                    </div>
                  </Col>
                  <Col md={4} className="">
                    <div className="image-area text-left">
                      <p className="expanded-search-items-heading">
                        {i18nData?.teleHealth_specialists_waiting}
                      </p>
                      <Image
                        src={featuredDoc}
                        className="img-fluid w-100 hk_search_big"
                        alt="Featured Doctor"
                      />
                      <button
                        onClick={handleRedirect}
                        className="mt-4 search-doctor-medical-records review-button add-record-btn text-uppercase w-100"
                        type="submit"
                      >
                        <span className="video_text">
                          <Image
                            src={videoBtnCall}
                            alt="video-call"
                            className="img-fluid me-2"
                          />
                          <span className="pt-1">{i18nData?.consult_now}</span>
                        </span>
                      </button>
                    </div>
                  </Col>
                </Row>
              )}
            </div>
          ) : (
            <>
              {searchApiLoading ? (
                <Loader />
              ) : (
                <div className="parent-searchData">
                  {searchData?.[0].length > 0 ? (
                    searchData?.[0].map((item) => (
                      <div className="mt-4 searchedData">
                        <a
                          href={
                            languageChecker === '2'
                              ? item.page
                                ? `/ur/disease/${item?.slug}`
                                : `/ur/article/${item?.slug}`
                              : item.page
                              ? `/disease/${item?.slug}`
                              : `/article/${item?.slug}`
                          }
                        >
                          {item?.name}
                        </a>
                        <p>
                          {item?.page ? item?.description : item?.descripton}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div>
                      <h3>{i18nData?.no_result_search}</h3>
                      <p className="fs-16-mobile fs-20 mt-3 col-md-8 m-auto">
                        {i18nData?.you_may_try}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* <div className='pagination' >
                            <Pagination count={10} color="primary" />
                        </div> */}
            </>
          )}
        </Col>
      </Container>
      <div className="closeSearchBtn">
        <Image
          src={searchCloseIcon}
          alt="Close search"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            setIsSearchActive(false);
          }}
        />
        <p>{i18nData?.close}</p>
      </div>
    </div>
  );
}

export default ExpandedSearchArea;

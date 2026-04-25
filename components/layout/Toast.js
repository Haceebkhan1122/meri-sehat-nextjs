import React from "react";
import { useState, useEffect, useCallback } from "react";
// import './toast.css';
import { Dropdown } from "react-bootstrap";
import { Modal } from "antd";
import { APIV3 } from "../../utils/httpService";
import { Router, useRouter } from "next/router";
import call from "../../public/svg/call_icon.svg";
import closeModal from "../../public/png/cross__.png";
import instantVideo from "../../public/png/instant-video.png";
import Image from "next/image";
import Loader from '../Loader';
import useLoading from "../../utils/customHooks/use-loading";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import vectorUp from '../../public/png/vector-up.svg'
import { FiChevronRight } from "react-icons/fi";
import optionTwo from '../../public/svg/newPages/registerDoctor.svg';
import optionOne from '../../public/svg/newPages/cloudAuditing.svg';


library.add(faAngleDown);
function Toast(props) {
  const { text, link } = props;
  const [stickyClass, setStickyClass] = useState("relative");
  const [visible, setVisible] = useState(true);
  const [addClass, setAddClass] = useState("");
  const [defLang, setDefLang] = useState(null);
  let [checked, setChecked] = useState(false);
  const [myclass, changeclass] = useState("");
  const [myclassUr, changeclassUr] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showToggleModal, setToggleModal] = useState(false);
  const [notificationData, setNotificationData] = useState();
  const [countDown, setCountDown] = useState("12:57");
  const [hasInstantStarted, setHasInstantStarted] = useState(false);
  const [uanNumber, setUanNumber] = useState("");
  const [languageLoader, setLanguageLoader] = useState(false);
  const [currentLang, setCurrentLang] = useState("");
  const [optionsLang, setOptionsLang] = useState([]);
  const [showHead, setShowHead] = useState(false)
  const { i18n } = useSelector((state) => state.translation);
  const [isMobile, setIsMobile] = useState(false);
  const [pendingAppointment, setPendingAppointment] = useState(null);
  const router = useRouter();
  const isLoading = useLoading();
  const { slug } = router.query;

  // NOTIFICATION STARTS
  const Authorization = Cookies.get('Authorization');
  const doctorDomain = process.env.NEXT_PUBLIC_DOCTOR_URL;

  useEffect(() => {
    import("react-device-detect").then((item) => {
      setIsMobile(item.isMobile);
    });
  }, []);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const number = window.localStorage.getItem("uan_number");
      if (number) {
        setUanNumber(number);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
      setOptionsLang([
        {
          label: i18n?.lang_eng,
          value: "1",
        },
        {
          label: i18n?.lang_ur,
          value: "2",
        },
      ]);
    }
  }, [i18n]);

  useEffect(() => {
    (async () => {
      if (Authorization) {
        try {
          const response = await APIV3.get(`/notifications?page=1`);
          if (response?.status == 200) {
            setNotificationData(response?.data?.data);
          }
        } catch (error) {
          // console.log(error);
        }
        pendingCall();
      }
    })();
  }, []);

  useEffect(() => {
    if (Authorization) {
      const interval = setInterval(async () => {
        try {
          const response = await APIV3.get(`/notifications?page=1`);
          if (response?.status == 200) {
            setNotificationData(response?.data?.data);
          }
        } catch (error) {
          // console.log(error);
        }
      }, 10000);
      return () => {
        clearInterval(interval);
      };
    }
  });

  useEffect(() => {
    let interval;
    if (hasInstantStarted === false) {
      let timer;

      if (notificationData?.waiting_time) {
        timer = notificationData?.waiting_time || 800;
      }
      let minutes = 0;
      let seconds = 0;

      interval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        setCountDown(`${minutes}:${seconds}`);
        if (--timer < 0) {
          clearInterval(interval);
          setCountDown("00:00");
          setHasInstantStarted(true);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [hasInstantStarted, notificationData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", stickNavbar);
      return () => {
        window.removeEventListener("scroll", stickNavbar);
      };
    }
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      const windowHeight = window.scrollY;
      windowHeight > 50
        ? setStickyClass("position-fixed w-100")
        : setStickyClass("wait");
    }
  };

  const checkLocalStorageValue = Cookies.get("lang");

  useEffect(() => {
    const checkLocalStorageValue = Cookies.get("lang");

    if (checkLocalStorageValue === "1") {
      setChecked(false);
      changeclass(`lng_eng`);
      changeclassUr("");
    } else if (checkLocalStorageValue === "2") {
      if (router?.pathname !== '/wellness' && router?.pathname !== '/find-a-doctor') {
        setChecked(true);
      }
      changeclassUr(`lng_ur`);
      changeclass("");
    }
  }, [checkLocalStorageValue]);


  const toggleChecked = useCallback(
    async ({ target: { value } }) => {
      if (checked) {
        setCurrentLang("en");
        const currentPathName = router.pathname;
        const basePath = window.location.host;
        const protocol = window.location.protocol + "//";
        try {
          setLanguageLoader(true);
          Cookies.set("lang", "1");
          let diseaseArticleUrl = `${protocol}${basePath}${currentPathName}`;
          if (router.pathname.includes("/doctor/")) {
            let doctorProfilePath = `${router.asPath}`;
            window.location.href = `${doctorProfilePath}`;
          }
          if (diseaseArticleUrl.includes('[slug]')) {
            diseaseArticleUrl = diseaseArticleUrl.replace(/\[slug\]/, slug);
            window.location.href = `${diseaseArticleUrl}`;
          } else if (!router.pathname.includes("/doctor/") && !diseaseArticleUrl.includes('[slug]')) {
            window.location.href = `${protocol}${basePath}${currentPathName}`;
          }
          setLanguageLoader(false);
        } catch (error) {
          setLanguageLoader(false);
        }
      } else {
        if (router.pathname.includes("/doctors/")) {
          setToggleModal(true)
        }
        if (router?.pathname !== '/wellness' && router?.pathname !== '/find-a-doctor' && !router.pathname.includes("/doctors/")) {
          Cookies.set("lang", "2");
          const currentPathName = router.pathname;
          const basePath = window.location.host;
          const protocol = window.location.protocol + "//";
          changeclass("");
          let diseaseArticleUrl = `${protocol}${basePath}/ur${currentPathName}`;
          if (router.pathname.includes("/doctor/")) {
            let doctorProfilePath = `/ur${router.asPath}`;
            window.location.href = `${doctorProfilePath}`;
          }
          if (diseaseArticleUrl.includes('[slug]')) {
            diseaseArticleUrl = diseaseArticleUrl.replace(/\[slug\]/, slug);
            window.location.href = `${diseaseArticleUrl}`;
          }
          else if (!router.pathname.includes("/doctor/") && !diseaseArticleUrl.includes('[slug]')) {
            window.location.href = `${protocol}${basePath}/ur${currentPathName}`;
          }
        }
        else {
          setToggleModal(true)
        }

      }
    },
    [checked, i18n]
  );

  /////---------Urdu/ENglish---------------/////////////////////

  useEffect(() => {
    setTimeout(() => {
      if (Cookies.get("lang") === "2") {
        document.body.classList.add("urdu"); // Add class for 'ur' language
        document.body.classList.remove("english"); // Remove class for 'en' language if it exists
      } else {
        document.body.classList.remove("urdu"); // Remove class for 'ur' language if it exists
        document.body.classList.add("english"); // Add class for 'en' language
      }
    }, 100000);

  }, [currentLang]);

  useEffect(() => {
    if (router.pathname === "/corporate-wellness-program") {
      setShowHead(true)
    }
  }, [])

  const handleCancel = () => {
    setToggleModal(false);
  };

  const redirectSearchDoctor = () => {
    if (pendingAppointment?.booked_via_subscription == 'subscription') {
      Cookies.set('rejoin', 1)
      window.location.href = `/search-for-doctor?specialty=${pendingAppointment?.speciality}`;
    }
    else if (pendingAppointment?.booked_via_subscription == 'mental-health') {
      Cookies.set('AppointIDFromMentalDashboard', pendingAppointment?.id)
      window.location.href = `/search-for-doctor`;
    }
    else if (pendingAppointment?.booked_via_subscription == 'fad') {
      Cookies.set('AppointIDFromDashboard', pendingAppointment?.id)
      window.location.href = `/search-for-doctor`;
    }
  }


  const pendingCall = async () => {
    try {
      const response = await APIV3.get('/appointment/pending-call');
      if (response?.status == 200) {
        setPendingAppointment(response?.data?.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section
      className={`notificationToastContainer hk_ for_doctorss topBarr ${addClass} ${stickyClass}`}
    >
      {isLoading && <Loader />}
      {!isMobile && (
        <div className="notificationToast">
          {uanNumber && (
            <a
              href={`tel:${uanNumber}`}
              className="d-flex align-items-center"
            >
              <Image src={call} alt="close-icon" className="me-2" />
              {uanNumber}
            </a>
          )}
          <div className="dropdown-doctors w-auto corp">
            <a className="downloadBtnHom blueWithBgColor_hover" href="/download"> Download </a>
            {/* <div className='shareArticleDropdown  for-doctors corporatelink'>
              <Link href="/corporate">For Corporates</Link>
            </div> */}
            <Dropdown className="shareArticleDropdown shareArticleDropdownAlgin for-doctors forrrr-dd">
              {/* <Link href='/corporate-wellness-program'><p className="for_corpo"> For Corporates  </p> </Link> */}
              <Dropdown.Toggle
                // className="main-style me-md-3 me-1 text text-decoration-none"
                className="main-style text text-decoration-none"
                id="dropdown-basic"
              >
                <span className="for_ddddddd">For Doctors</span>
                {/* <FontAwesomeIcon icon="angle-down" /> */}
                {/* <FontAwesomeIcon icon="fa-light fa-angle-down" /> */}
                <Image src={vectorUp} width={20} height={20} alt="Icon" />
              </Dropdown.Toggle>

              <Dropdown.Menu show={showDropdown}>
                <Dropdown.Item
                  // target="blank"
                  href={`${doctorDomain}/signup-number`}
                  className="option-one ps-0"
                >
                  <div className='d-flex align-items-center justify-content-around'>
                    <Image src={optionTwo} alt="icon" />
                    <span>Register as Doctor </span>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  // target="blank"
                  href={`https://pro.merisehat.pk/`}
                  className="option-one ps-0"
                >
                  <div className='d-flex align-items-center justify-content-around'>

                    <Image src={optionOne} alt="icon" />
                    <span>Software for Clinic <br />/ Hospitals</span>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/*  TOAST FOR ENG/URDU TOGGLe*/}
          {/* {optionsLang && (
            <div className="control_lang fff">
              <span className={`${myclass}`}>Eng</span>
              <label className="switch">
                <input
                  type="checkbox"
                  id="togBtn"
                  key={"langID"}
                  name="toggleSwitch"
                  options={optionsLang}
                  checked={checked}
                  onChange={toggleChecked}
                  defaultValue={defLang}
                />

                <div className="slider round"></div>
              </label>
              <span className={`${myclassUr}`}>اردو</span>
            </div>
          )} */}
          {/*  TOAST FOR ENG/URDU TOGGLe*/}

        </div>
      )}
      {/* ------------------------------------------ */}
      {pendingAppointment !== null && (
        <div className="instant-notification-area newInstantNotificationArea">
          <div className="d-flex align-items-center">
            <div className="inner_item">
              <div className="icon_bg">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M5.6 26.3996C4.885 26.3996 4.27292 26.145 3.76375 25.6359C3.25458 25.1267 3 24.5146 3 23.7996V8.19961C3 7.48461 3.25458 6.87253 3.76375 6.36336C4.27292 5.85419 4.885 5.59961 5.6 5.59961H21.2C21.915 5.59961 22.5271 5.85419 23.0362 6.36336C23.5454 6.87253 23.8 7.48461 23.8 8.19961V14.0496L29 8.84961V23.1496L23.8 17.9496V23.7996C23.8 24.5146 23.5454 25.1267 23.0362 25.6359C22.5271 26.145 21.915 26.3996 21.2 26.3996H5.6ZM5.6 23.7996H21.2V8.19961H5.6V23.7996Z" fill="white" />
                </svg>
              </div>
            </div>
            <div className="inner_item">
              <p>Instant Consult</p>
              <p className="me-2 countDownTimeRemaing">
                {/* {countDown == "NaN:NaN" ? '0:00' : countDown} minutes left to start */}
              </p>
            </div>
          </div>

          <button
            className="text-white"
            onClick={(e) => redirectSearchDoctor()}
          >
            {" "}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9.37578 17.9992L8.30078 16.9242L13.2508 11.9742L8.30078 7.02422L9.37578 5.94922L15.4008 11.9742L9.37578 17.9992Z" fill="#0F345A" />
            </svg>
          </button>
        </div>
      )}
      {/* ------------------------------------------------------------ */}
      <Modal
        className="coming_wellness_in_urdu"
        centered
        visible={showToggleModal}
        footer={null}
        closeIcon={
          <Image
            onClick={() => setToggleModal(false)}
            className="img-fluid mt-3"
            src={closeModal}
            alt="image"
          />
        } // Choose any icon you need.
      >
        <div>
          <div className="coming-soon text-center mt-4">
            <h3>
              یہ صفحہ صرف انگریزی میں دستیاب ہے۔ کیا آپ جاری رکھنا چاہتے ہیں؟
            </h3>
            <div className="comingButton">
              <button
                onClick={handleCancel}
                className={`mobile_btn_01 review-button add-review-btn text-uppercase max-width-300 fw-700 mt-3 mb-3 position-relative simple-btn-mobile instantBannerNewBtn`}
              >
                <span className="cons_now">جی ہاں</span>
                <span
                  className={`add-review-chevron position-absolute mob_hide`}
                  style={{
                    height: "53px",
                    left: "0",
                    right: "auto",
                    width: "50px",
                  }}
                >
                  <FiChevronRight />
                </span>
              </button>
            </div>

          </div>
        </div>
      </Modal>
    </section>
  );
}

export default Toast;

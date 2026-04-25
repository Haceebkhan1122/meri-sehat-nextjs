import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Badge,
  Col,
  NavDropdown,
  NavLink,
  Row,
  Container,
  Nav,
  Dropdown,
  Navbar as Navbarr,
} from "react-bootstrap";
import { SectionHeading } from "../SectionHeading";
import { checkLinkType, goToHome } from "@/utils/powerFunctions";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import HeaderLogo from "./HeaderLogo";
import { BsChevronUp, BsSearch, BsChevronDown } from "react-icons/bs";
import { isUserSignedIn } from "@/utils/utilFunctions";
const iconRight = "/svg/right-arrow-border.svg";
const videoIconBlue = "/svg/videoo.svg";
import { slide as Menu } from "react-burger-menu";
import { isMobile, isAndroid, isIOS } from "react-device-detect";
import Router, { useRouter } from "next/router";
import ExpandedSearchArea from "./ExpandedSearchArea";
// import mixpanel from 'mixpanel-browser';
import userIcon from "../../public/svg/mobile-login-user-icon.svg";
import homeIcon from "/public/png/new-images/homeNavbar.png";
import homeIconNew from "/public/svg/newPages/homeicon.svg";
import dashboardIcon from "../../public/svg/dashboard-icon-menu.svg";
import dashboardIconNew from "/public/png/mydashboardnvbar.png";
import notificationIconSvvv from "/public/png/new-images/notifications_iconNavbar.png";
import termsConditionsIcon from "../../public/svg/terms-conditions-icon.svg";
import toggleIcon from "../../public/svg/hambruger_menu.svg";
import SearchIcon from "../../public/svg/search_icon.svg";
import doctorProfile from "../../public/gif/mob_float.gif";
import homeIcon1 from "../../public/svg/newPages/homeIcon.svg";
import doctorNew from "../../public/png/doctor-now-menu.svg";
import sehatScanMenu from "../../public/png/sehat-scan-menu.png";
import findDoctorMenu from "../../public/svg/find-a-doc-menu.svg";
import sehatAZMenu from "../../public/svg/sehat-a-z-menu.svg";
import Image from "next/image";
import {
  Form as AntForm,
  notification,
  Button,
  Badge as AntdBadge,
  Divider,
  Modal,
} from "antd";
import notificationIcon from "../../public/svg/notification.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/userSlice";
import LoginDropdownBtn from "../../components/loginDropdownBtn/LoginDropdownBtn";
import { logoutUser } from "../../utils/utilFunctions";
import closeModal from "../../public/png/cross__.png";
import { APIV3 } from "@/utils/httpService";
import NotificationPop from "../notifications/notificationsPop";
import trashCan from "../../public/svg/trashCan.svg";
import deleteUser from "../../public/svg/deleteUser.svg";
import styles from "../loginDropdownBtn/loginDropDown.module.scss";
import { BsX } from "react-icons/bs";
import Loader from '../Loader'
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CancelDropModal from "../../public/svg/CancelDropModal.svg";
import mixpanel from "mixpanel-browser";
import RightArrowImgNew from '/public/svg/newPages/chevronRigg.png';
import UserIconSv from '/public/png/new-images/userIconNavbar.png';
import PersonAreUDoc from '/public/png/new-images/personDoct.svg';
import LogoutPers from '/public/svg/newPages/logoutNavbar.svg';


function Navbar({ data }) {
  const router = useRouter();
  const [stickyClass, setStickyClass] = useState("relative");
  const [mobileNvaber, setMobileNvaber] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [Authorization, setAuthorization] = useState(false);

  // ----------------
  const [defLang, setDefLang] = useState(null);
  let [checked, setChecked] = useState(false);
  const [myclass, changeclass] = useState("");
  const [myclassUr, changeclassUr] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [notificationPop, setNotificationPop] = useState(false);
  const [expandInstantArea, setExpandInstantArea] = useState(false);
  const [notificationData, setNotificationData] = useState();
  const [hasInstantStarted, setHasInstantStarted] = useState(false);
  const [countDown, setCountDown] = useState("12:57");
  const [markAsReadSignal, setMarkAsReadSignal] = useState(false);
  const [showToggleModal, setToggleModal] = useState(false);
  const [showToggleModalWellness, setShowToggleModalWellness] = useState(false);

  // --------------------------------
  const [openPop, setOpenPop] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hState, sethState] = useState("top");
  const dispatch = useDispatch();
  const { userData, error } = useSelector((state) => state.user);
  const [i18nData, setI18nData] = useState(null);
  const { i18n } = useSelector((state) => state.translation);
  const [languageLoader, setLanguageLoader] = useState(false);
  const [optionsLang, setOptionsLang] = useState([]);
  const [currentLang, setCurrentLang] = useState("");
  const [hideBottomBar, setHideBottomBar] = useState(false)
  const [isFad, setIsFad] = useState(false)
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [dropOtpModal, setDropOtpModal] = useState(false);
  const [Otp, setOtp] = useState("");
  const [OTPInput, setOTPInput] = useState(null);
  const [ResendOTP, setResendOTP] = useState(null);
  const [errorData, setErrorData] = useState(false);
  const [hideError, setHideError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);
  const doctorDomain = process.env.NEXT_PUBLIC_DOCTOR_URL;
  const patientDomain = process.env.NEXT_PUBLIC_PATIENT_URL;
  const maskedPhoneNumber = maskPhoneNumber(userData?.user?.phone);
  const [mobileNavbar, setMobileNavbar] = useState(true);
  const myRef = useRef(null);
  const addClass = useRef(null);
  const [fromFad, setFromFad] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  const getActiveClass = (path) => (router.pathname === path ? 'active' : '');
  // ----------------------notification-----------------------
  const [api, contextHolder] = notification.useNotification();

  const walletAmount = userData?.user?.wallet?.wallet;

  useEffect(() => {
    if (router.pathname === "/doctor-profile") {
      setHideBottomBar(true)
    }
  }, [router.pathname])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = Cookies.get("Authorization");

      setAuthorization(auth);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("otp-input-react").then((item) => {
        setOTPInput(() => item.default)
        setResendOTP(() => item.ResendOTP);
      })
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

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
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    setIsLoggedIn(isUserSignedIn());
  }, []);

  const mixPanelTracking = () => {
    // mixpanel.track('Start Scan', {
    //   'Name': user?.name, 'Email': user?.email, 'Number': user?.phone
    // });
  };

  const logout = (e) => {
    e.preventDefault();
    logoutUser({
      cb() {
        setRedirect(true);
      },
    });
  };

  useEffect(() => {
    let interval;
    if (dropOtpModal) {
      interval = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [dropOtpModal, remainingTime]);

  useEffect(() => {
    if (!dropOtpModal) {
      setRemainingTime(60)
      setHideError(true);
      setOtpError('')
      setOtpError()
      setOtp('')
    }
  }, [dropOtpModal])

  const openDeleteAccount = (e) => {
    setLoading(false);
    setDeleteUserModal(true);
  };

  const redirectToWallet = () => {
    window.location.href = ('/wallet');
  }


  function maskPhoneNumber(phoneNumber) {

    const phoneStr = phoneNumber?.toString();

    const maskedNumber = phoneStr?.slice(0, 3) + '******' + phoneStr?.slice(9);

    return maskedNumber;
  }

  const generateOtp = async () => {
    try {
      const response = await APIV3.get("/user/delete")
      if (response?.status == 200) {
        setDeleteUserModal(false);
        setDropOtpModal(true)
      }
      else if (response?.status == 400) {
        setDeleteUserModal(false);
        toast.error(`${response?.data?.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error, 'errorState')
    }
  }

  const hideOtpError = () => {
    setHideError(true);
    setErrorData(false);
    setOtpError(false);
  };

  const handleOTP = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      phone: userData?.user?.phone,
      otp: Otp
    };
    if (Otp.length === '' || Otp.length < 4) {
      setOtpError('')
      setLoading(false);
      setErrorData('please enter valid OTP');
    } else if (Otp.length === 4) {
      setLoading(true);
      setHideError(false);
      setTimeout(() => {
        setLoading(false);
      }, 5000);
      try {
        const response = await APIV3.post("/verify-otp/delete", data)
        if (response?.status == 400) {
          setErrorData('');
          setLoading(false);
          setOtpError(response?.data?.message)
        }
        else if (response?.status == 200) {
          Cookies.set('accountDeleted', true)
          Cookies.remove('Authorization');
          Cookies.remove('Authorization', { domain: '.merisehat.pk' });
          // setDropOtpModal(false);
          window.location.href = ('/');
          setLoading(false);
        }
      } catch (error) {
        console.log(error, 'errorState')
      }
    }
  }

  async function resendOTPHandler() {
    setErrorData(false)
    setOtpError(false)
    setRemainingTime(60)
    const payload = {
      phone: userData?.user?.phone,
    };
    setLoading(true);

    const result = await APIV3.get('/resend-otp/delete', payload);

    if (result?.status == 200) {
      setOtp('');
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  let inputStyle = {
    height: '40px',
    width: '40px',
    borderRadius: '4px',
    marginRight: '15px',
    // marginLeft: '8px',
    border: errorData || otpError ? '0.5px solid #C20203' : '0.26px solid #0F345A',
    justifyContent: 'center',
    color: errorData || otpError ? '#C20203' : '#4F4F4F',
  };

  const renderInstantTime = (remainingTime) => {
    return (
      <span>
        {' '}
        {remainingTime === 0
          ? <span style={{ color: '#0F345A', fontSize: '14px' }} > Code Expired - Click Resend </span>

          : ` 00:${remainingTime < 10 ? `0` : ''}${remainingTime} ${i18nData.seconds}`}
      </span>
    );
  };

  const renderInstantButton = (buttonProps) => {
    return (
      <button {...buttonProps}>
        {remainingTime === 0 ? (
          <a style={{ color: '#E9406A', borderBottom: '1.5px solid #E9406A' }} onClick={resendOTPHandler}
          >
            {i18nData?.resent_sms}
          </a>
        ) : (
          i18nData?.resend_sms_in
        )}
      </button>
    );
  };

  const emailPattern =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

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
        setCountDown(`${minutes} min ${seconds} sec`);
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
      }
    })();
  }, [markAsReadSignal]);

  useEffect(() => {
    if (Authorization) {
      const interval = setInterval(async () => {
        try {
          const response = await APIV3.get(`/notifications?page=1`);
          if (response?.status == 200) {
            setNotificationData(response?.data?.data);
          }
        } catch (error) {
          console.log(error);
        }
      }, 10000);
      return () => {
        clearInterval(interval);
      };
    }
  });

  const callNotifications = async () => {
    try {
      const response = await APIV3.get(`/notifications?page=1`);
      if (response?.status == 200) {
        setNotificationData(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (Authorization) {
      callNotifications()
    }
  }, [Authorization])


  useEffect(() => {
    var lastVal = 0;
    window.onscroll = function () {
      let y = window.scrollY;
      if (y > lastVal) {
        sethState("down");
      }
      if (y < lastVal) {
        sethState("up");
      }
      if (y === 0) {
        sethState("top");
      }
      lastVal = y;
    };
  }, []);
  // ---------------------------------

  useEffect(() => {
    const body = document.querySelector("body");

    body.addEventListener("click", function (e) {
      const target = document.querySelector(".notification-btn");
      const innerTarget = document.querySelector(".notificationPop");

      // const withinBoundaries = e.composedPath().includes(target);

      if (target && innerTarget) {
        const withinBoundaries = target.contains(e.target);
        const withinInnerBoundaries = innerTarget.contains(e.target);

        if (withinBoundaries || withinInnerBoundaries) {
          setNotificationPop(!notificationPop);
        } else {
          setNotificationPop(false);
        }
      }
    });
  }, []);

  const SideNotificationsPop = (e) => {
    const target = document.querySelector(".notification-btn");

    // const withinBoundaries = e.composedPath().includes(target);

    const withinBoundaries = target.contains(e.target);

    if (withinBoundaries) {
      setNotificationPop(!notificationPop);
    } else {
      setNotificationPop(false);
    }
  };

  useEffect(() => {
    var externalResource = document.getElementsByClassName(
      "videoask-embed__button_right--V-il1"
    );
    for (var i = 0; i < externalResource.length; i++) {
      externalResource[i]?.remove();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", stickNavbar);
      return () => {
        window.removeEventListener("scroll", stickNavbar);
      };
    }
  }, []);

  useEffect(() => {
    const lang = "en";
  }, [defLang]);

  useEffect(() => {
    if (router.locale === "en") {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [router.locale]);

  const toggleChecked = useCallback(
    async ({ target: { value } }) => {
      setChecked((prev) => !prev);
      if (checked) {
        changeclass("lng_eng");
        changeclassUr("");
        setCurrentLang("en");
        const currentPathName = router.pathname;
        const basePath = window.location.host;
        const protocol = window.location.protocol + "//";
        try {
          setLanguageLoader(true);
          Cookies.set("lang", "1");
          // localStorage.setItem('lang', 'ur');
          // router.push({ pathname: currentPathName }, router.asPath, {
          //   locale: "en",
          // });
          window.location.href = `${protocol}${basePath}${currentPathName}`;
          setLanguageLoader(false);
        } catch (error) {
          setLanguageLoader(false);
        }
      } else {
        Cookies.set("lang", "2");
        const currentPathName = router.pathname;
        const basePath = window.location.host;
        const protocol = window.location.protocol + "//";
        // router.push({ pathname: currentPathName }, router.asPath, {
        //   locale: "ur",
        // });
        window.location.href = `${protocol}${basePath}/ur${currentPathName}`;
        setCurrentLang("ur");
        changeclassUr("lng_ur");
        changeclass("");
      }
    },
    [checked, i18n]
  );

  const stickNavbar = () => {
    if (window !== undefined) {
      const windowHeight = window.scrollY;
      windowHeight > 50 ? setStickyClass("active2") : setStickyClass("wait");
    }
  };

  const dropDownHandler = (event) => {
    if (window.screen.width < 768) {
      if (event === true) {
        // myRef.current.style.height = '100vh';
        myRef.current.style.overflow = "auto";
      } else {
        // myRef.current.style.height = 'auto';
      }
    }
  };

  const toggleHandler = (event) => {
    if (event == true) {
      setMobileNvaber("mobileNav");
    } else {
      setMobileNvaber("");
    }
  };

  const handleLoginNavigation = () => {
    window.location.href = `${patientDomain}/phone-number`;
  };

  const renderColumns = (columns) => {
    if (columns === 1) {
      return 12;
    } else if (columns === 2) {
      return 6;
    } else if (columns === 3) {
      return 4;
    } else if (columns === 4) {
      return 3;
    } else if (columns === 5) {
      return 2;
    } else {
      return 3;
    }
  };

  function searchClickHandler(e) {
    setIsSearchActive(true);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // mixpanel.track('Search Bar', {
    //   'Name': userDetailsInfo?.name, 'Email': userDetailsInfo?.email, 'Number': userDetailsInfo?.phone
    // });
  }

  const expandInstantNotification = (e) => {
    setExpandInstantArea(!expandInstantArea);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkLocalStorageValue = window.localStorage.getItem("lang");

      if (checkLocalStorageValue === "1") {
        setChecked(false);
        changeclass(`lng_eng`);
        changeclassUr("");
      } else if (checkLocalStorageValue === "2") {
        setToggleModal(true);

        // setChecked(true)
        // changeclassUr(`lng_ur`)
        // changeclass("")
      }
    }
  }, []);

  const handleRedirectPopUp = () => {
    setOpenPop(true);
    mixPanelTracking();
  };

  const mixPanelTrackingWellness = () => {
    mixpanel.track('Wellness landing page',
      //  {
      //   'Name': userDetailsInfo?.name, 'Email': userDetailsInfo?.email, 'Number': userDetailsInfo?.phone
      // }
    );
  };

  const mixPanelTrackingSehatAtoZ = () => {
    // mixpanel.track('Sehat A to Z landing page', {
    //   'Name': userDetailsInfo?.name, 'Email': userDetailsInfo?.email, 'Number': userDetailsInfo?.phone
    // });
  };

  const mixPanelTrackingFindADoctor = () => {
    // mixpanel.track('Find A Doctor landing page', {
    //   'Name': userDetailsInfo?.name, 'Email': userDetailsInfo?.email, 'Number': userDetailsInfo?.phone
    // });
  };

  /////---------Urdu/ENglish---------------/////////////////////
  useEffect(() => {
    if (Cookies.get("lang") === "2") {
      document.body.classList.add("urdu"); // Add class for 'ur' language
      document.body.classList.remove("english"); // Remove class for 'en' language if it exists
    } else {
      document.body.classList.remove("urdu"); // Remove class for 'ur' language if it exists
      document.body.classList.add("english"); // Add class for 'en' language
    }
  }, [currentLang]);

  const handleCancel = () => {
    if (isFad) {
      setShowToggleModalWellness(false);
      Cookies.set("lang", "1");
      setLoading(true);
      window.location.href = "/find-a-doctor";
      return;
    }
    else {
      setShowToggleModalWellness(false);
      Cookies.set("lang", "1");
      setLoading(true);
      window.location.href = "/wellness";
      return;
    }

  };

  const wellnessModalHander = () => {
    setLoading(false);
    setShowToggleModalWellness(true);
  };

  useEffect(() => {
    if (router.pathname === "/find-a-doctor") {
      setFromFad(true)
    }
    else {
      setFromFad(false)
    }
  }, [router.pathname]);

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  // Function to close the menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Function to open the menu
  const openMenu = () => {
    setMenuOpen(true);
  };

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [menuOpen]); // This effect runs whenever menuOpen changes

  return (
    <>
      <section id="navbar">
        {/*-------------------------- for desktop nav----------------- */}
        <Navbarr
          expand="lg"
          onToggle={(event) => toggleHandler(event)}
          className={`stickyNavbar d-none d-lg-block ${stickyClass} ${mobileNvaber}`}
          ref={myRef}
        >
          <Container fluid ref={addClass}>
            <Navbarr.Toggle
              aria-controls="basic-navbar-nav"
              className="x navbar-toggle"
            >
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </Navbarr.Toggle>
            <Link href={goToHome(defLang) || ""}>
              <HeaderLogo />
            </Link>
            <div
              style={{ position: "relative" }}
              className="search-bar-container d-md-none m-0 d"
            >
              <span
                className="search-icon-span position-relative"
              // onClick={searchClickHandler}
              >
                <BsSearch />
              </span>
            </div>

            <Navbarr.Collapse id="basic-navbar-nav">
              <Nav className="">
                {data?.data?.length > 0 &&
                  data?.data?.map((item, index) => {
                    return item?.type === "nav-link-with-dropdown" ? (
                      <NavDropdown
                        key={index}
                        className="noHover menuDropdown"
                        title={item?.name}
                        renderMenuOnMount
                        id="megaMenuDropDown"
                        onToggle={(event) => dropDownHandler(event)}
                        align="end"
                      >
                        <div>
                          {item?.children.map((listing) => {
                            return (
                              <div
                                style={{ padding: 0 }}
                                key={listing?.id}
                                lg={renderColumns(item?.children?.length)}

                                // className={`${listing?.link === "page/sehat-a-z/" ? 'atoz_dropdown_customization' : ''} `}
                                className={`find_doc_menu test ${listing?.link === "/page/sehat-a-z/" ||
                                  listing?.link === "/ur/sehat-a-z"
                                  ? "atoz_dropdown_customization"
                                  : "false"
                                  }`}
                              >
                                <Link href={listing?.link}><SectionHeading heading={listing?.name} /></Link>
                                <>
                                  {listing?.children?.name ===
                                    "{best_doctor}" ||
                                    listing?.children?.name ===
                                    "{teleheath_specialist}" ? (
                                    <div
                                      className={
                                        listing?.children?.name ===
                                          "{teleheath_specialist}"
                                          ? "find_doctors_hk teletooth_doctors"
                                          : "find_doctors_hk"
                                      }
                                    >
                                      {listing?.children?.image_url && (
                                        <Image
                                          crossorigin="anonymous"
                                          src={listing?.children?.image_url}
                                          className="img-fluid"
                                          alt="find the best doctors"
                                          width={300}
                                          height={300}
                                        />
                                      )}

                                      <Link
                                        prefetch={false}
                                        href="/doctors"

                                        className="review-button mt-4 w-100 add-continue-btn cont-btn text-uppercase position-relative"
                                      >
                                        {listing?.children?.name ===
                                          "{teleheath_specialist}" && (
                                            <>
                                              <Image
                                                src={videoIconBlue}
                                                alt="video"
                                                width={17}
                                                height={17}
                                                style={{ marginLeft: "0.5rem" }}
                                              />
                                            </>
                                          )}
                                        <span className="some_left ss">
                                          {listing?.children?.button_text}
                                        </span>
                                        <span
                                          className="add-continue-chevron confirm-span s"
                                          style={{ height: "43px" }}
                                        >  {listing?.children?.button_text}
                                          <FiChevronRight />
                                        </span>
                                      </Link>
                                    </div>
                                  ) : null}
                                </>
                                <ul className="mega_menu mt-4">
                                  {listing?.length > 0 && (
                                    <>
                                      <Link
                                        prefetch={false}
                                        href={listing[0]?.slug || ""}
                                        className="no_hoverr"
                                      >
                                        <div className="d-flex align-items-center bg-hk-mega-menu-wellness justify-content-between mb-4">
                                          <div className="inner_well">
                                            <h3 className="fs-18">
                                              {listing[0]?.name}
                                            </h3>
                                            <p className="fs-16">
                                              {listing[0]?.descripton}
                                            </p>
                                          </div>
                                          {listing[0]?.image_url && (
                                            <Image
                                              crossorigin="anonymous"
                                              src={listing[0]?.image_url}
                                              alt="character"
                                              height={300}
                                              width={300}
                                            />
                                          )}
                                        </div>
                                      </Link>
                                      <Link
                                        href={listing[1]?.slug || ""}
                                        className="no_hoverr"
                                        prefetch={false}
                                      >
                                        <div className="d-flex align-items-center bg-hk-mega-menu-wellness justify-content-between">
                                          <div className="inner_well">
                                            <h3 className="fs-18">
                                              {listing[1]?.name}
                                            </h3>
                                            <p className="fs-16">
                                              All of our tips and tricks -
                                              Filtered by your gender.
                                            </p>
                                          </div>
                                          {listing[1]?.image_url && (
                                            <Image
                                              crossorigin="anonymous"
                                              src={listing[1]?.image_url}
                                              alt="character"
                                              height={300}
                                              width={300}
                                            />
                                          )}
                                        </div>
                                      </Link>
                                    </>
                                  )}
                                  {listing?.children?.length > 0 &&
                                    listing?.children?.map(
                                      (submenuLinks, index) => {
                                        return (
                                          <>
                                            <li
                                              key={submenuLinks?.id}
                                              className={
                                                (submenuLinks?.type ===
                                                  "sub-topic" &&
                                                  "featured_box") ||
                                                (submenuLinks?.name ===
                                                  "The Winter Blues" &&
                                                  "featured_box") ||
                                                (submenuLinks?.type ===
                                                  "recent-articles" &&
                                                  "recent_box") ||
                                                (listing?.name ===
                                                  "Categories" &&
                                                  "wellness_listingss")
                                              }
                                            >
                                              {checkLinkType(
                                                submenuLinks?.link,
                                                submenuLinks?.name,
                                                true,
                                                <Link
                                                  prefetch={false}
                                                  href={`${submenuLinks?.link ||
                                                    (listing?.name ===
                                                      "Featured Article" &&
                                                      listing?.children?.[0]
                                                        ?.redirect_url) ||
                                                    (listing?.name ===
                                                      "Featured Articles" &&
                                                      listing?.children?.[0]
                                                        ?.redirect_url)
                                                    }`}
                                                >
                                                  {submenuLinks?.type ===
                                                    "sub-topic" ||
                                                    submenuLinks?.name ===
                                                    "The Winter Blues"
                                                    ? submenuLinks?.image_url && (
                                                      <>
                                                        {submenuLinks?.image_url && (
                                                          <Image
                                                            crossorigin="anonymous"
                                                            src={
                                                              submenuLinks?.image_url
                                                            }
                                                            alt="Featured-Image"
                                                            height={300}
                                                            width={300}
                                                            className="thumbnail_hk"
                                                          />
                                                        )}
                                                      </>
                                                    )
                                                    : null}
                                                  {listing?.name ===
                                                    "Featured Article" ||
                                                    listing?.name ===
                                                    "Featured Articles" ||
                                                    listing?.name ===
                                                    "نمایاں مضمون"
                                                    ? listing?.children?.[0]
                                                      ?.image && (
                                                      <>
                                                        <Image
                                                          height={300}
                                                          width={300}
                                                          crossorigin="anonymous"
                                                          src={
                                                            listing
                                                              ?.children?.[0]
                                                              ?.image
                                                          }
                                                          alt="Featured-Image"
                                                          className="thumbnail_hk"
                                                        />
                                                      </>
                                                    )
                                                    : null}
                                                  <div>
                                                    <h3 className="pt-0 font_up out_of_recent_art">
                                                      {submenuLinks?.name}
                                                    </h3>
                                                    <p>
                                                      {submenuLinks?.name ===
                                                        "The Winter Blues" ? (
                                                        <>
                                                          {
                                                            submenuLinks?.description
                                                          }
                                                        </>
                                                      ) : null}
                                                    </p>
                                                    {listing?.name ===
                                                      "Categories" &&
                                                      listing?.type ===
                                                      "dropdown-header" ? (
                                                      <>
                                                        {submenuLinks?.image_url && (
                                                          <Image
                                                            height={300}
                                                            width={300}
                                                            crossorigin="anonymous"
                                                            src={
                                                              submenuLinks?.image_url
                                                            }
                                                            alt="category-image"
                                                          />
                                                        )}
                                                      </>
                                                    ) : null}
                                                    {submenuLinks?.type ===
                                                      "sub-topic" ? (
                                                      <>
                                                        <p>
                                                          {
                                                            submenuLinks?.descripton
                                                          }
                                                        </p>
                                                        <div>
                                                          <Link
                                                            href={
                                                              listing
                                                                ?.children?.[0]
                                                                ?.redirect_url || ""
                                                            }
                                                            className="hk_read_more"
                                                            prefetch={false}
                                                          >
                                                            <Image
                                                              height={50}
                                                              width={50}
                                                              src={iconRight}
                                                              alt="Icon"
                                                            />
                                                            <span className="underline_ancer">
                                                              {
                                                                i18nData?.read_more
                                                              }
                                                            </span>
                                                          </Link>
                                                        </div>
                                                      </>
                                                    ) : null}
                                                  </div>
                                                </Link>
                                              )}
                                            </li>
                                          </>
                                        );
                                      }
                                    )}
                                  {listing?.children?.length > 0 &&
                                    listing?.children?.map((itemm) => {
                                      if (itemm?.type === "recent-articles") {
                                        return (
                                          <li className="for_only_recent_articles">
                                            <Link
                                              prefetch={false}
                                              href={itemm?.redirect_url || ""}
                                            >
                                              {itemm?.image && (
                                                <Image
                                                  height={300}
                                                  width={300}
                                                  crossorigin="anonymous"
                                                  src={itemm?.image}
                                                  alt="Featured-Image"
                                                  className="thumbnail_hk"
                                                />
                                              )}

                                              <h3 className="pt-0 font_up">
                                                {itemm?.name}
                                              </h3>

                                              <Link
                                                href={itemm?.redirect_url || ""}
                                                className="hk_read_more"
                                                prefetch={false}
                                              >
                                                <Image
                                                  height={50}
                                                  width={50}
                                                  src={iconRight}
                                                  alt="Icon"
                                                />
                                                <span
                                                  style={{
                                                    whiteSpace: "nowrap",
                                                  }}
                                                  className="underline_ancer"
                                                >
                                                  {i18nData?.read_more}
                                                </span>
                                              </Link>
                                            </Link>
                                          </li>
                                        );
                                      }
                                    })}
                                </ul>
                                {listing?.children?.[0]?.type !== "sub-topic" &&
                                  listing?.children?.[0]?.type !==
                                  "recent-articles" &&
                                  listing?.children?.name !== "{best_doctor}" &&
                                  listing?.children?.name !==
                                  "{teleheath_specialist}" &&
                                  listing[0]?.slug !== "mens-wellness" &&
                                  listing?.name !== "Categories" &&
                                  item?.name !== "Find A Doctor" &&
                                  item?.link !== "/doctors/karachi" &&
                                  listing?.link !== "/ur/sehat-a-z" &&
                                  listing?.link !== "/sehat-a-z/" &&
                                  listing?.link !== "/page/sehat-a-z/" ? (
                                  <Link
                                    href="/wellness"
                                    className="hk_read_more d-none"
                                    onClick={mixPanelTrackingWellness}
                                    prefetch={false}
                                  >
                                    <Image
                                      src={iconRight}
                                      height={50}
                                      width={50}
                                      alt="Icon"
                                    />
                                    <span className="underline_ancer text-uppercase">
                                      {i18nData?.view_all}
                                    </span>
                                  </Link>
                                ) : null}
                                {listing?.link === "/page/sehat-a-z/" ||
                                  listing?.link === "/sehat-a-z/" ? (
                                  <Link
                                    href="/sehat-a-z/"
                                    className="hk_read_more"
                                    onClick={mixPanelTrackingSehatAtoZ}
                                    prefetch={false}
                                  >
                                    <Image
                                      src={iconRight}
                                      height={50}
                                      width={50}
                                      alt="Icon"
                                    />
                                    <span className="underline_ancer text-uppercase">
                                      {i18nData?.view_all}
                                    </span>
                                  </Link>
                                ) : null}
                                {item?.link === "/doctors/karachi" ||
                                  item?.name === "Find A Doctor" ? (
                                  <Link
                                    href="/doctors/karachi"
                                    className="hk_read_more"
                                    onClick={mixPanelTrackingFindADoctor}
                                    prefetch={false}
                                  >
                                    <Image
                                      src={iconRight}
                                      height={50}
                                      width={50}
                                      alt="Icon"
                                    />
                                    <span className="underline_ancer text-uppercase">
                                      {i18nData?.view_all}
                                    </span>
                                  </Link>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                      </NavDropdown>
                    ) : item?.type === "nav-link" ? (
                      checkLinkType(
                        item?.link,
                        item?.name,
                        item?.target,
                        <>
                          <a
                            className={`nav-link ${router.pathname == item?.link ? "active" : ""}`}
                            prefetch={false}
                            onClick={(e) => {
                              if (
                                i18nData?.langDetectForNonServerComponents ===
                                "ur" &&
                                item?.link === "/wellness"
                              ) {
                                e.preventDefault(); // Prevent the default link behavior
                                wellnessModalHander(); // Call your custom handler
                              } else if (i18nData?.langDetectForNonServerComponents ===
                                "ur" &&
                                item?.link === "/find-a-doctor") {
                                setIsFad(true)
                                e.preventDefault(); // Prevent the default link behavior
                                wellnessModalHander(); // Call your custom handler
                              }
                            }}
                            key={item?.id}
                            target={item?.target || ""}
                            href={
                              i18nData?.langDetectForNonServerComponents ===
                                "ur" && (item?.link === "/wellness" || item?.link === "/find-a-doctor")
                                ? ""
                                : `${item?.link}`
                            }
                          >
                            {item?.link == '/wallet' && !Authorization ? null : item?.name}
                          </a>
                        </>
                      )
                    ) : (
                      ""
                    );
                  })}
              </Nav>

              {/* <HeaderSearch
              content={searchData}
              onSearch={(e) => handleChange(e)}
              reset={() => {
                setSearchValue('');
                setSearchData([]);
              }}
              searchValue={searchValue}
            /> */}
              {/* <div
                style={{ position: "relative" }}
                className="search-bar-container d-none d-md-block"
              >
                <input
                  className="form-control search-area"
                  type="text"
                  placeholder={i18nData?.type_symptoms}
                  disabled={isSearchActive ? "disabled" : ""}
                  onClick={searchClickHandler}
                />
                <span className="search-icon-span">
                </span>
                  <Image height={15} width={15} src={searchNewIcon} />
              </div> */}

              <span className="search__icon_navbar" onClick={searchClickHandler}></span>

              {isLoggedIn ? (
                <>
                  <div className="notificationBtns">
                    <AntdBadge count={notificationData?.unread_count}>
                      <Button
                        type=""
                        className="notification-btn"
                        onClick={SideNotificationsPop}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                          <path d="M4.8916 19V17H6.8916V10C6.8916 8.61667 7.30827 7.3875 8.1416 6.3125C8.97494 5.2375 10.0583 4.53333 11.3916 4.2V3.5C11.3916 3.08333 11.5374 2.72917 11.8291 2.4375C12.1208 2.14583 12.4749 2 12.8916 2C13.3083 2 13.6624 2.14583 13.9541 2.4375C14.2458 2.72917 14.3916 3.08333 14.3916 3.5V4.2C15.7249 4.53333 16.8083 5.2375 17.6416 6.3125C18.4749 7.3875 18.8916 8.61667 18.8916 10V17H20.8916V19H4.8916ZM12.8916 22C12.3416 22 11.8708 21.8042 11.4791 21.4125C11.0874 21.0208 10.8916 20.55 10.8916 20H14.8916C14.8916 20.55 14.6958 21.0208 14.3041 21.4125C13.9124 21.8042 13.4416 22 12.8916 22ZM8.8916 17H16.8916V10C16.8916 8.9 16.4999 7.95833 15.7166 7.175C14.9333 6.39167 13.9916 6 12.8916 6C11.7916 6 10.8499 6.39167 10.0666 7.175C9.28327 7.95833 8.8916 8.9 8.8916 10V17Z" fill="#0F345A" fill-opacity="0.6" />
                        </svg>
                      </Button>
                    </AntdBadge>
                  </div>
                  {notificationPop && (
                    <div className="notificationPop">
                      <NotificationPop
                        notifications={notificationData}
                        setMarkAsReadSignal={setMarkAsReadSignal}
                      />
                    </div>
                  )}
                  <LoginDropdownBtn
                    userData={userData}
                    title={userData?.user?.name}
                  />
                </>
              ) : (
                <a
                  onClick={handleLoginNavigation}
                  className="btn__login  text-initial fw-400 fs-16 letter-spacing-0"
                >
                  {i18nData?.login_signup}
                </a>
              )}
            </Navbarr.Collapse>
          </Container>
        </Navbarr>

        {mobileNavbar && (
          <>
            {/*-------------------------- for mobile nav----------------- */}

            <Navbarr
              expand="lg"
              onToggle={(event) => toggleHandler(event)}
              className={fromFad ? `d-lg-none stickyNavbar mobileNewCustomMenu dropShadowFad ${stickyClass} ${mobileNvaber}` : `d-lg-none stickyNavbar mobileNewCustomMenu ${stickyClass} ${mobileNvaber}`}
              ref={myRef}
            // style={{zIndex:'99999999'}}
            >
              <Menu className="hkkkkk" isOpen={menuOpen} onStateChange={(state) => handleStateChange(state)}>
                <Navbarr.Collapse id="basic-navbar-nav">
                  <div className="d-flex align-items-center justify-content-between align-items-start p-4 border-bottom-2-black mobileMenuFix mobileMenuFixBorder" onClick={() => Router.push("/dashboard")}>
                    {isLoggedIn && (
                      <LoginDropdownBtn
                        userData={userData}
                        title={userData?.user?.name}
                      />
                    )}
                    <Navbarr.Toggle
                      aria-controls="basic-navbar-nav"
                      className="x navbar-toggle"
                      onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu open/close
                    >
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                    </Navbarr.Toggle>
                    {!Authorization ? (
                      <>
                        <div className="wraper_top_end_nav">
                          <div className="d-flex align-items-center" style={{ gap: "6px" }}>
                            <div className={"wrape_navicon"}>
                              <Image
                                src={UserIconSv}
                                alt="user icon"
                                className="img-fluid"
                                width={51}
                                height={51}
                              />
                            </div>
                            <a
                              onClick={handleLoginNavigation}
                              className="ms-3 underline_ancer text-initial fw-400 fs-18 letter-spacing-0 txt_login nav-link title_nav_login"
                            >
                              {i18nData?.login_signup}
                            </a>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9.3748 18L8.2998 16.925L13.2498 11.975L8.2998 7.02495L9.3748 5.94995L15.3998 11.975L9.3748 18Z" fill="#0F345A" />
                          </svg>
                        </div>
                      </>
                    ) : null}
                  </div>
                  {Authorization && <div onClick={redirectToWallet} className={"cardTop_drop"}>
                    <div className="left__drop">
                      <span className="laptopppp_svg"></span>
                      <div className="left_ri">
                        <h3> Wallet </h3>
                        <h2> PKR {walletAmount} </h2>
                      </div>
                    </div>
                    <span className="arrow_right_drop"></span>
                  </div>}
                  <div className="mobileMenuFixBorder ">

                  </div>
                  <Nav className="mt-0 newNavbarMobile">
                    {/* {Authorization ? (
                      <>
                        <a href={"/wallet"} class="nav-link blueCardWallet  " target="_self">
                          <div className={"cardTop_drop"}>
                            <div className="left__drop">
                              <span className="laptopppp_svg"></span>
                              <div className="left_ri">
                                <h3> MeriSehat Pay </h3>
                                <h2> PKR {userData?.user?.wallet?.wallet} </h2>
                              </div>
                            </div>
                            <span className="arrow_right_drop"></span>
                          </div>
                        </a>
                      </>
                    ) : null} */}
                    {Authorization ? (
                      <>
                        <Link
                          class="nav-link mobileMenuFixBorder "
                          href={"/notifications"}
                          target="_self"
                          prefetch={false}
                        >
                          <AntdBadge count={notificationData?.unread_count}>
                            <Image
                              height={300}
                              width={300}
                              src={notificationIconSvvv}
                              alt="dashboard"
                              className="img-fluid notificationIconSvvv"
                              color="action"
                            />
                          </AntdBadge>
                          <span style={{ marginLeft: "18px" }}>Notifications </span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9.3748 18L8.2998 16.925L13.2498 11.975L8.2998 7.02495L9.3748 5.94995L15.3998 11.975L9.3748 18Z" fill="#0F345A" />
                          </svg>
                        </Link>
                      </>
                    ) : null}
                    {Authorization ? (
                      <>
                        <Link
                          class="nav-link mobileMenuFixBorder dd"
                          href={"/dashboard"}
                          target="_self"
                          prefetch={false}
                        >
                          <Image
                            height={300}
                            width={300}
                            src={dashboardIconNew}
                            alt="dashboard"
                            className="img-fluid me-4"
                          />
                          {i18nData?.dashboard}
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9.3748 18L8.2998 16.925L13.2498 11.975L8.2998 7.02495L9.3748 5.94995L15.3998 11.975L9.3748 18Z" fill="#0F345A" />
                          </svg>
                        </Link>
                      </>
                    ) : null}
                    <a
                      prefetch={false}
                      class="nav-link mobileMenuFixBorder"
                      href={`${router.locale === "ur" ? '/ur' : '/'}`}
                      target="_self"
                    >
                      <Image
                        height={300}
                        width={300}
                        src={homeIconNew}
                        alt="home"
                        className="img-fluid me-4"
                      />
                      {i18nData?.menu_home}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9.3748 18L8.2998 16.925L13.2498 11.975L8.2998 7.02495L9.3748 5.94995L15.3998 11.975L9.3748 18Z" fill="#0F345A" />
                      </svg>
                    </a>

                    {data?.data?.map((item, index) => {
                      return item?.type === "nav-link-with-dropdown" ? (
                        <NavDropdown
                          key={index}
                          className="noHover MenuDropdown "
                          title={
                            <div className="pull-left"
                              onClick={(e) => {
                                if (window.innerWidth < 992) { // Bootstrap lg breakpoint
                                  e.preventDefault(); // Prevent anchor default behavior
                                  dropDownHandler(true); // Manually toggle dropdown
                                }
                              }}
                            >
                              {item?.image && (
                                <Image
                                  crossorigin="anonymous"
                                  height={300}
                                  width={300}
                                  className="thumbnail-image me-4 img-fluid"
                                  src={item?.image}
                                  alt="user pic"
                                />
                              )}

                              {item?.name}
                            </div>
                          }
                          renderMenuOnMount
                          id="megaMenuDropDown"
                          onToggle={(event) => dropDownHandler(event)}

                        >
                          <Row className="mobileMenuBox">
                            {item?.children.map((listing) => {
                              return (
                                <Col
                                  style={{ padding: 0 }}
                                  key={listing?.id}
                                  lg={renderColumns(item?.children?.length)}
                                  md={6}
                                  className={`find_doc_menu tesv ${listing?.link === "/page/sehat-a-z/" ||
                                    (listing?.link === "/ur/sehat-a-z" &&
                                      "atoz_dropdown_customization")
                                    }`}
                                ><Link href={listing?.link}><SectionHeading heading={listing?.name} /></Link>

                                  <>
                                    {listing?.children?.name ===
                                      "{best_doctor}" ||
                                      listing?.children?.name ===
                                      "{teleheath_specialist}" ? (
                                      <div
                                        className={
                                          listing?.children?.name ===
                                            "{teleheath_specialist}"
                                            ? "find_doctors_hk teletooth_doctors"
                                            : "find_doctors_hk"
                                        }
                                      >
                                        {listing?.children?.image_url && (
                                          <Image
                                            crossorigin="anonymous"
                                            height={300}
                                            width={300}
                                            src={listing?.children?.image_url}
                                            className="img-fluid"
                                            alt="find the best doctors"
                                          />
                                        )}

                                        <Link
                                          prefetch={false}
                                          href={listing?.children?.button_link}
                                          className="review-button mt-4 w-100 add-continue-btn cont-btn text-uppercase position-relative"
                                        >
                                          {listing?.children?.name ===
                                            "{teleheath_specialist}" && (
                                              <>
                                                <Image
                                                  height={300}
                                                  width={300}
                                                  src={videoIconBlue}
                                                  alt="video"
                                                  style={{ marginLeft: "0.5rem" }}
                                                />
                                              </>
                                            )}
                                          <span className="some_left sa" >
                                            {listing?.children?.button_text}
                                          </span>
                                          <span
                                            className="add-continue-chevron confirm-span "
                                            style={{ height: "43px" }}
                                          >
                                            <FiChevronRight />
                                          </span>
                                        </Link>
                                      </div>
                                    ) : null}
                                  </>
                                  <ul className="mega_menu mt-4">
                                    {listing?.length > 0 && (
                                      <>
                                        <Link
                                          href={listing[0]?.slug}
                                          className="no_hoverr"
                                          prefetch={false}
                                        >
                                          <div className="d-flex align-items-center bg-hk-mega-menu-wellness justify-content-between mb-4" >
                                            <div className="inner_well">
                                              <h3 className="fs-18">
                                                Discover Men's Wellness
                                                {/* {listing[0]?.name} */}
                                              </h3>
                                              <p className="fs-16">
                                                {listing[0]?.descripton}
                                              </p>
                                            </div>
                                            {listing[0]?.image_url && (
                                              <Image
                                                height={300}
                                                width={300}
                                                crossorigin="anonymous"
                                                src={listing[0]?.image_url}
                                                alt="character"
                                              />
                                            )}
                                          </div>
                                        </Link>
                                        <Link
                                          href={listing[1]?.slug}
                                          className="no_hoverr"
                                          prefetch={false}
                                        >
                                          <div className="d-flex align-items-center bg-hk-mega-menu-wellness justify-content-between">
                                            <div className="inner_well">
                                              <h3 className="fs-18">
                                                Discover Women's Wellness
                                                {/* {listing[1]?.name} */}
                                              </h3>
                                              <p className="fs-16">
                                                All of our tips and tricks -
                                                Filtered by your gender.
                                              </p>
                                            </div>
                                            {listing[1]?.image_url && (
                                              <Image
                                                height={300}
                                                width={300}
                                                crossorigin="anonymous"
                                                src={listing[1]?.image_url}
                                                alt="character"
                                              />
                                            )}
                                          </div>
                                        </Link>
                                      </>
                                    )}
                                    {listing?.children?.length > 0 &&
                                      listing?.children?.map(
                                        (submenuLinks, index) => {
                                          return (
                                            <>
                                              <li
                                                key={submenuLinks?.id}
                                                className={
                                                  (submenuLinks?.type ===
                                                    "sub-topic" &&
                                                    "featured_box") ||
                                                  (submenuLinks?.name ===
                                                    "The Winter Blues" &&
                                                    "featured_box") ||
                                                  (submenuLinks?.type ===
                                                    "recent-articles" &&
                                                    "recent_box") ||
                                                  (listing?.name ===
                                                    "Categories" &&
                                                    "wellness_listingss")
                                                }
                                              >
                                                {checkLinkType(
                                                  submenuLinks?.link,
                                                  submenuLinks?.name,
                                                  true,
                                                  <Link
                                                    prefetch={false}
                                                    href={`${submenuLinks?.link ||
                                                      (listing?.name ===
                                                        "Featured Article" &&
                                                        listing?.children?.[0]
                                                          ?.redirect_url) ||
                                                      (listing?.name ===
                                                        "Featured Articles" &&
                                                        listing?.children?.[0]
                                                          ?.redirect_url)
                                                      }`}
                                                  >
                                                    {submenuLinks?.type ===
                                                      "sub-topic" ||
                                                      submenuLinks?.name ===
                                                      "The Winter Blues"
                                                      ? submenuLinks?.image_url && (
                                                        <>
                                                          {submenuLinks?.image_url && (
                                                            <Image
                                                              height={300}
                                                              width={300}
                                                              crossorigin="anonymous"
                                                              src={
                                                                submenuLinks?.image_url
                                                              }
                                                              alt="Featured-Image"
                                                              className="thumbnail_hk"
                                                            />
                                                          )}
                                                        </>
                                                      )
                                                      : null}
                                                    {listing?.name ===
                                                      "Featured Article" ||
                                                      listing?.name ===
                                                      "Featured Articles" ||
                                                      listing?.name ===
                                                      "نمایاں مضمون"
                                                      ? listing?.children?.[0]
                                                        ?.image && (
                                                        <>
                                                          {listing
                                                            ?.children?.[0]
                                                            ?.image && (
                                                              <Image
                                                                height={300}
                                                                width={300}
                                                                crossorigin="anonymous"
                                                                src={
                                                                  listing
                                                                    ?.children?.[0]
                                                                    ?.image
                                                                }
                                                                alt="Featured-Image"
                                                                className="thumbnail_hk"
                                                              />
                                                            )}
                                                        </>
                                                      )
                                                      : null}
                                                    <div>
                                                      <h3 className="pt-0 font_up out_of_recent_art">
                                                        {submenuLinks?.name}
                                                      </h3>
                                                      <p>
                                                        {submenuLinks?.name ===
                                                          "The Winter Blues" ? (
                                                          <>
                                                            {
                                                              submenuLinks?.description
                                                            }
                                                          </>
                                                        ) : null}
                                                      </p>
                                                      {listing?.name ===
                                                        "Categories" &&
                                                        listing?.type ===
                                                        "dropdown-header" ? (
                                                        <>
                                                          {submenuLinks?.image_url && (
                                                            <Image
                                                              height={300}
                                                              width={300}
                                                              crossorigin="anonymous"
                                                              src={
                                                                submenuLinks?.image_url
                                                              }
                                                              alt="category-image"
                                                            />
                                                          )}
                                                        </>
                                                      ) : null}
                                                      {submenuLinks?.type ===
                                                        "sub-topic" ? (
                                                        <>
                                                          <p>
                                                            {
                                                              submenuLinks?.descripton
                                                            }
                                                          </p>
                                                          <div>
                                                            <Link
                                                              prefetch={false}
                                                              href={
                                                                listing
                                                                  ?.children?.[0]
                                                                  ?.redirect_url
                                                              }
                                                              className="hk_read_more"
                                                            >
                                                              <Image
                                                                height={50}
                                                                width={50}
                                                                src={iconRight}
                                                                alt="Icon"
                                                              />
                                                              <span className="underline_ancer">
                                                                {
                                                                  i18nData?.read_more
                                                                }
                                                              </span>
                                                            </Link>
                                                          </div>
                                                        </>
                                                      ) : null}
                                                    </div>
                                                  </Link>
                                                )}
                                              </li>
                                            </>
                                          );
                                        }
                                      )}

                                    {listing?.children?.length > 0 &&
                                      listing?.children?.map((itemm) => {
                                        if (itemm?.type === "recent-articles") {
                                          return (
                                            <li className="for_only_recent_articles">
                                              <Link
                                                href={itemm?.redirect_url}
                                                prefetch={false}
                                              >
                                                {itemm?.image && (
                                                  <Image
                                                    height={300}
                                                    width={300}
                                                    crossorigin="anonymous"
                                                    src={itemm?.image}
                                                    alt="Featured-Image"
                                                    className="thumbnail_hk"
                                                  />
                                                )}

                                                <h3 className="pt-0 font_up">
                                                  {itemm?.name}
                                                </h3>

                                                <Link
                                                  href={itemm?.redirect_url}
                                                  className="hk_read_more"
                                                  prefetch={false}
                                                >
                                                  <Image
                                                    height={50}
                                                    width={50}
                                                    src={iconRight}
                                                    alt="Icon"
                                                  />
                                                  <span className="underline_ancer">
                                                    {i18nData?.read_more}
                                                  </span>
                                                </Link>
                                              </Link>
                                            </li>
                                          );
                                        }
                                      })}
                                  </ul>
                                  {listing?.children?.[0]?.type !==
                                    "sub-topic" &&
                                    listing?.children?.[0]?.type !==
                                    "recent-articles" &&
                                    listing?.children?.name !== "{best_doctor}" &&
                                    listing?.children?.name !==
                                    "{teleheath_specialist}" &&
                                    listing[0]?.slug !== "mens-wellness" &&
                                    listing?.name !== "Categories" &&
                                    item?.name !== "Find A Doctor" &&
                                    listing?.link !== "/sehat-a-z/" &&
                                    listing?.link !== "/sehat-a-z" &&
                                    listing?.link !== "/page/sehat-a-z/" ? (
                                    <Link
                                      href="/wellness"
                                      className="hk_read_more d-none"
                                      prefetch={false}
                                    // onClick={mixPanelTrackingWellness}
                                    >
                                      <Image
                                        src={iconRight}
                                        alt="Icon"
                                        height={50}
                                        width={50}
                                      />

                                      <span className="underline_ancer text-uppercase">
                                        {i18nData?.view_all}
                                      </span>
                                    </Link>
                                  ) : null}

                                  {listing?.link === "/sehat-a-z/" ||
                                    listing?.link === "/sehat-a-z" ||
                                    listing?.link === "/page/sehat-a-z/" ? (
                                    <a
                                      // onClick={mixPanelTrackingSehatAtoZ}
                                      href="/sehat-a-z/"
                                      prefetch={false}
                                      className="hk_read_more s_atoz"
                                    >
                                      <Image
                                        src={iconRight}
                                        height={50}
                                        width={50}
                                        alt="Icon"
                                      />
                                      <span className="underline_ancer text-uppercase">
                                        {i18nData?.view_all}
                                      </span>
                                    </a>
                                  ) : null}
                                  {item?.name === "Find A Doctor" ? (
                                    <Link
                                      href="/doctors/karachi"
                                      onClick={mixPanelTrackingFindADoctor}
                                      className="hk_read_more"
                                      prefetch={false}
                                    >
                                      <Image
                                        src={iconRight}
                                        height={50}
                                        width={50}
                                        alt="Icon"
                                      />
                                      <span className="underline_ancer text-uppercase">
                                        {i18nData?.view_all}
                                      </span>
                                    </Link>
                                  ) : null}
                                </Col>
                              );
                            })}
                          </Row>
                        </NavDropdown>
                      ) : item?.type === "nav-link" ? (
                        checkLinkType(item?.link, item?.name, item?.target,
                          <>
                            {item?.link == '/wallet' && !Authorization ? null : (
                              <>
                                <NavLink

                                  onClick={
                                    i18nData?.langDetectForNonServerComponents ===
                                    "ur" &&
                                    item?.link === "/wellness" &&
                                    wellnessModalHander
                                  }
                                  key={item?.id}
                                  className={"nav-link mobileMenuFixBorder ff"}
                                  target={item?.target || ""}
                                  href={
                                    i18nData?.langDetectForNonServerComponents ===
                                      "ur" && item?.link === "/wellness"
                                      ? ""
                                      : `${item?.link}`
                                  }
                                >


                                  {/* {item?.link === "/sehat-scan/" && (
                                    <Badge bg="secondary hk_new_badge">
                                      {i18nData?.new}
                                    </Badge>
                                  )} */}
                                  {/* {item?.link === "/sehat-scan" && (
                                    <Badge bg="secondary hk_new_badge">
                                      {i18nData?.new}
                                    </Badge>
                                  )} */}
                                  {/* {item?.link === "/doctor-now" && (
                                    <Badge bg="secondary hk_new_badge">
                                      {i18nData?.video}
                                    </Badge>
                                  )} */}
                                  {/* {item?.link === "/bakhabar-noujawan" && (
                                    <Badge bg="secondary hk_new_badge bakhabar_self">
                                      {i18nData?.new}
                                    </Badge>
                                  )} */}
                                  {item?.image && (
                                    <Image
                                      crossorigin="anonymous"
                                      src={item?.image}
                                      alt="Icon"
                                      height={300}
                                      width={300}
                                      className="me-4 kkkk img-fluid"
                                    />
                                  )}
                                  <span>{item?.name}</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M9.3748 18L8.2998 16.925L13.2498 11.975L8.2998 7.02495L9.3748 5.94995L15.3998 11.975L9.3748 18Z" fill="#0F345A" />
                                  </svg>
                                </NavLink>
                              </>
                            )}
                          </>
                        )
                      ) : (
                        ""
                      );
                    })}
                    {/* <Link
                      class="nav-link mobileMenuFixBorder"
                      href={"/terms-conditions"}
                      target="_self"
                      prefetch={false}
                    >
                      <Image
                        height={300}
                        width={300}
                        src={termsConditionsIcon}
                        alt="Terms and Conditions"
                        className="img-fluid me-4"
                      />
                      {i18nData?.term_condition}
                      <Image
                        src={RightArrowImg}
                        alt="user icon"
                        className="img_arrow-nav"
                        width={51}
                        height={51}
                      />
                    </Link> */}
                    <Link
                      class="nav-link mobileMenuFixBorder"
                      href={"https://dr.merisehat.pk/signup-number"}
                      target="_self"
                      prefetch={false}
                    >
                      <Image
                        height={300}
                        width={300}
                        src={PersonAreUDoc}
                        alt="Terms and Conditions"
                        className="img-fluid me-4"
                      />
                      <div className="wrape_areudoc">
                        Are you a Doctor?
                        <span className="joinText"> Join us now </span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9.3748 18L8.2998 16.925L13.2498 11.975L8.2998 7.02495L9.3748 5.94995L15.3998 11.975L9.3748 18Z" fill="#0F345A" />
                      </svg>
                    </Link>
                    {Authorization ? (
                      <>
                        <div className="loguotPersWra">
                          <Image src={LogoutPers} width={28} height={28} />
                          <p onClick={(e) => logout(e)} class="nav-link">
                            Logout
                          </p>
                        </div>
                      </>
                    ) : null}
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
                    {/* {defLang && (
                      <div className="control_lang">
                        <span className={`${myclass}`}>Eng</span>
                        <label className="switch">
                          <input
                            type=""
                            id="togBtn"
                            key={"langID"}
                            name="toggleSwitch"
                            onClick={() => setToggleModal(true)}
                            defaultValue={defLang}
                          />
                          <div className="slider round"></div>
                        </label>
                        <span className={`${myclassUr}`}>اردو</span>
                      </div>
                    )} */}
                    {/*  TOAST FOR ENG/URDU TOGGLe*/}

                    {Authorization ? (
                      <div className="deleteText">

                        <Image src={trashCan} width={15} height={15} />
                        <a
                          onClick={(e) => openDeleteAccount(e)}
                          class="DeleteAccountLink">
                          Delete Account
                        </a>
                      </div>
                    ) : null}
                    <Modal
                      title=""
                      className={`${styles.deleteUserModal} deleteUserModal`}
                      centered
                      open={deleteUserModal}
                      onOk={() => setDeleteUserModal(false)}
                      onCancel={() => setDeleteUserModal(false)}
                      footer={null}
                      closeIcon={<Image style={{ width: '8px', height: '8px' }} src={CancelDropModal} />}

                    >
                      <div>
                        {loading === true && (
                          <>
                            <Loader />
                          </>
                        )}
                        <div className="mt-5">
                          <Image src={deleteUser} width={140} height={140} />
                        </div>
                        <div className={styles.contentDeleteUser}>
                          <h3>Are you sure you want to delete your account?</h3>
                          <div className="mt-4">
                            <p>
                              Once your account is deleted, your details will be cleared and
                              you cannot reactivate it or recover any data.
                            </p>
                          </div>
                          <div className={styles.buttontDeleteUser}>
                            <button onClick={generateOtp}>Delete Account</button>
                          </div>
                        </div>
                      </div>
                    </Modal>

                    {dropOtpModal && (
                      <>
                        <Modal
                          title=""
                          className={`${styles.wrape_otp_drop_modal} wrape_otp_drop_modal`}
                          centered
                          open={dropOtpModal}
                          onOk={() => setDropOtpModal(false)}
                          onCancel={() => setDropOtpModal(false)}
                          footer={null}
                          closeIcon={<Image style={{ width: '8px', height: '8px' }} src={CancelDropModal} />}

                        >
                          {loading === true && (
                            <>
                              <Loader />
                            </>
                          )}
                          <div className="wrape_otp_drop">
                            {errorData || otpError ? (
                              <p>An error has occurred</p>
                            ) :
                              <p>
                                {" "}
                                An SMS has been sent to the following phone number: <span className="num_sll">{maskedPhoneNumber}</span>
                              </p>}
                            <form className="form" autoComplete="off" onSubmit={handleOTP}>
                              <div className="px-md-0 otp-login-box otpInputDeleteUser">
                                <OTPInput
                                  value={Otp}
                                  onChange={setOtp}
                                  className="otp-input"
                                  autoFocus
                                  hasErrored
                                  OTPLength={4}
                                  otpType="number"
                                  disabled={false}
                                  secure={false}
                                  inputStyles={inputStyle}
                                />
                                <div className="error-otp-login ">
                                  {otpError && !hideError && (
                                    <div
                                      className="forUrduReversing"
                                      style={{
                                        color: '#B11B1B',
                                      }}
                                    >
                                      <p> {otpError} </p>
                                      <BsX style={{
                                        color: '#B11B1B',
                                      }} onClick={hideOtpError} className="bsX" />
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* <div className="my-5 mb-3 confirm-paragraph d-md-none">
                            <p className="fs-19 line-height-26 mt-3">
                              {i18nData?.sms_has_been_sent}
                              <b>
                                {modifiedPhone}
                              </b>
                            </p>
                          </div> */}
                              <div className="error-otp-login ">
                                {errorData && !hideError && !otpError && (
                                  <div
                                    className="forUrduReversing"
                                    style={{
                                      color: '#B11B1B',
                                    }}
                                  >
                                    <p> {errorData} </p>
                                    <BsX style={{
                                      color: '#B11B1B',
                                    }} onClick={hideOtpError} className="bsX" />
                                  </div>
                                )}
                              </div>
                              <div className="resend-sms-otp px-4">
                                <ResendOTP
                                  maxTime={60}
                                  className="OtpCounting"
                                  style={{ display: "grid", justifyContent: "center" }}
                                  renderButton={renderInstantButton}
                                  renderTime={() => renderInstantTime(remainingTime)}
                                />
                              </div>
                              <div className="Otp-continue-btn">
                                <button
                                  type="submit"
                                  className="review-button text-uppercase loginOtp-phone-btn position-relative fw-700 fs-17"
                                >
                                  {i18nData?.continue_btn}
                                  {/* <span
                    className="loginOtp-phone-chevron"
                    style={{ height: "53px" }}
                    >
                    <FiChevronRight />
                    </span> */}
                                </button>
                              </div>
                            </form>
                          </div>
                        </Modal>
                      </>
                    )}

                    {/* <div className="dropdown-doctors mobileDoctorClick p-4 border-bottom">
                      <Dropdown className="shareArticleDropdown  for-doctors">
                        <Dropdown.Toggle
                          className="main-style p-0"
                          id="dropdown-basic"
                        >
                          <span className="fw-600">{i18nData?.dr_click_here}</span>
                          <Badge bg="meri-sehat-pro hk_new_badge">
                            {i18nData?.meri_sehat}    {" "}
                            <strong>
                              <i> {i18nData?.pro}</i>
                            </strong>
                          </Badge>
                        </Dropdown.Toggle>

                        <Dropdown.Menu show={showDropdown}>
                          <Dropdown.Item
                            target="blank"
                            href={`${doctorDomain}/signup-number`}
                            className="option-one"
                          >
                            {i18nData?.register}
                          </Dropdown.Item>
                          <Dropdown.Item
                            target="blank"
                            href={`${doctorDomain}/login`}
                            className="option-one"
                          >
                            {i18nData?.signin}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div> */}
                  </Nav>

                  <div
                    style={{ position: "relative" }}
                    className="search-bar-container d-none d-md-block"
                  >
                    <input
                      className="form-control search-area"
                      type="text"
                      placeholder={i18nData?.type_symptoms}
                      disabled={isSearchActive ? "disabled" : ""}
                      onClick={searchClickHandler}
                    />
                    <span className="search-icon-span">
                      <BsSearch />
                    </span>
                  </div>
                </Navbarr.Collapse>
              </Menu>


              <Container fluid ref={addClass}>
                <div className="d-flex align-items-center w-100 justify-content-between hideWhenNavOpen py-3">
                  <Navbarr.Toggle
                    aria-controls="basic-navbar-nav"
                    className="x navbar-toggle bg-white p-0 border-0"
                  >
                    <Image
                      src={toggleIcon}
                      height={300}
                      width={300}
                      alt="user icon"
                      className="img-fluid"
                    />
                  </Navbarr.Toggle>
                  <Link href={goToHome(defLang) || ""}>
                    <HeaderLogo />
                  </Link>
                  <div className="d-flex align-items-center">
                    {/* isMobile wala code */}
                    <div
                      style={{ position: "relative" }}
                      className="search-bar-container d-md-none m-0 ss"
                    >
                      <span
                        className="search-icon-span position-relative"
                        onClick={searchClickHandler}
                      >
                        {/* <BsSearch /> */}
                        <Image src={SearchIcon}
                          alt="user icon"
                          className="img-fluid"
                          height={30}
                          width={30}
                        />
                      </span>
                    </div>
                    {isMobile ? (
                      <div className="">
                        <a
                          href={`/sehat-scan`}
                          className="scanBtnTop"
                          onClick={mixPanelTracking}
                        >
                          {i18nData?.start_health_scan}

                        </a>
                      </div>
                    ) : (
                      <div onClick={handleRedirectPopUp} className="">
                        <a href={`/sehat-scan`} className="scanBtnTop">
                          {i18nData?.start_health_scan}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                {/* {notificationData?.waiting_time ? (
                  <div className="instant-notification-area">
                    {expandInstantArea ? (
                      <BsChevronUp
                        style={{
                          float: "right",
                          color: "#078A8E",
                          cursor: "pointer",
                        }}
                        onClick={expandInstantNotification}
                      />
                    ) : (
                      <BsChevronDown
                        style={{
                          float: "right",
                          color: "#078A8E",
                          cursor: "pointer",
                        }}
                        onClick={expandInstantNotification}
                      />
                    )}

                    {hasInstantStarted ? (
                      <p> Your video consultation has started </p>
                    ) : (
                      <div className="for_mob_working__">

                        {countDown &&
                          !countDown?.toString()?.includes("NaN") && (
                            <>
                              <p> Your video consultation starts in </p>

                              {!expandInstantArea ? (
                                <>
                                  <p
                                    className="countDown_lobby"
                                    style={{
                                      color: "#EE6285",
                                      fontSize: "26px",
                                    }}
                                  >
                                    {" "}
                                    {countDown}{" "}
                                  </p>
                                </>
                              ) : null}
                            </>
                          )}
                      </div>
                    )}

                    {expandInstantArea && (
                      <>
                        <Divider className="instant-notification-divider" />
                        <div className="expand_area_mob">
                          <p
                            className="countDown_lobby"
                            style={{ color: "#EE6285", fontSize: "26px" }}
                          >
                            {" "}
                            {countDown}{" "}
                          </p>
                          <button
                            onClick={(e) => navigate("/search-for-doctor")}
                          >
                            {" "}
                            Go To Lobby{" "}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : null} */}
              </Container>
            </Navbarr>
            {!router.pathname.includes('/doctor/') && (
              <div style={{ zIndex: '999' }} className={hideBottomBar ? "bottomFixedHide" : "d-lg-none bottomFixedMenu bottoming  newDesignUiMob" + hState}>
                <div className="d-flex align-items-center justify-content-between table-fixed h-100 w-100 ">
                  <Link
                    prefetch={false}
                    href="/"
                    className={`homeIcon cz-handheld-toolbar-item ga-event-navigation-bottom-home ${getActiveClass('/')}`}
                  >
                    {/* <div className="first-annimation-box">
                      <Image
                        src={doctorProfile}
                        height={300}
                        width={300}
                        alt="bottom menu"
                        className="img-fluid img-top-profile slide-first-image"
                      />
                    </div> */}

                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="Frame 295217">
                        <g id="Group 295095">
                          <path id="Vector" d="M17.0288 22.2786H6.96691C4.76857 22.2786 2.98828 20.4544 2.98828 18.2018V10.2034C2.98828 8.96264 3.53606 7.79574 4.48027 7.02027L9.51121 2.89179C10.9672 1.70274 13.0286 1.70274 14.4773 2.89179L19.5082 7.02027C20.4524 7.79574 21.0002 8.96264 21.0002 10.2034V18.2018C21.0002 20.4544 19.2199 22.2786 17.0216 22.2786H17.0288Z" stroke="#8799ac" stroke-width="1.5" stroke-miterlimit="10" />
                          <path id="Vector_2" d="M11.998 14.8926V17.8468" stroke="#8799ac" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                      </g>
                    </svg>

                    <span className="cz-handheld-toolbar-label">Home</span>
                  </Link>

                  <Link
                    prefetch={false}
                    href="/doctor-now"
                    className={`fourI d-flex flex-column align-items-center justify-content-center cz-handheld-toolbar-item ga-event-navigation-bottom-home ${getActiveClass('/doctor-now')}`}
                  >
                    {/* <Image
                      height={300}
                      width={300}
                      src={doctorNew}
                      alt="bottom menu"
                      className="img-fluid w-35-px"
                    /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <g clip-path="url(#clip0_10024_155919)">
                        <path d="M18 1.5V3H19.5V7.5C19.5 8.29565 19.1839 9.05871 18.6213 9.62132C18.0587 10.1839 17.2957 10.5 16.5 10.5C15.7044 10.5 14.9413 10.1839 14.3787 9.62132C13.8161 9.05871 13.5 8.29565 13.5 7.5V3H15V1.5H12V7.5C12.0018 8.56245 12.3792 9.59004 13.0654 10.4012C13.7517 11.2123 14.7025 11.7547 15.75 11.9325V16.5C15.75 17.6935 15.2759 18.8381 14.432 19.682C13.5881 20.5259 12.4435 21 11.25 21C10.0565 21 8.91194 20.5259 8.06803 19.682C7.22411 18.8381 6.75001 17.6935 6.75001 16.5V11.8934C7.457 11.7109 8.07315 11.2768 8.48296 10.6724C8.89277 10.0681 9.0681 9.33504 8.9761 8.61067C8.88409 7.88631 8.53106 7.22038 7.98318 6.73768C7.4353 6.25499 6.73019 5.98869 6.00001 5.98869C5.26983 5.98869 4.56471 6.25499 4.01683 6.73768C3.46895 7.22038 3.11592 7.88631 3.02392 8.61067C2.93191 9.33504 3.10725 10.0681 3.51706 10.6724C3.92687 11.2768 4.54301 11.7109 5.25001 11.8934V16.5C5.25001 18.0913 5.88215 19.6174 7.00737 20.7426C8.13258 21.8679 9.65871 22.5 11.25 22.5C12.8413 22.5 14.3674 21.8679 15.4926 20.7426C16.6179 19.6174 17.25 18.0913 17.25 16.5V11.9325C18.2975 11.7547 19.2483 11.2123 19.9346 10.4012C20.6208 9.59004 20.9982 8.56245 21 7.5V1.5H18ZM4.50001 9C4.50001 8.70333 4.58798 8.41332 4.7528 8.16665C4.91762 7.91997 5.15189 7.72771 5.42598 7.61418C5.70007 7.50065 6.00167 7.47094 6.29264 7.52882C6.58361 7.5867 6.85089 7.72956 7.06067 7.93934C7.27045 8.14912 7.41331 8.41639 7.47119 8.70736C7.52906 8.99834 7.49936 9.29994 7.38583 9.57403C7.27229 9.84811 7.08004 10.0824 6.83336 10.2472C6.58669 10.412 6.29668 10.5 6.00001 10.5C5.60232 10.4995 5.22106 10.3414 4.93985 10.0602C4.65865 9.77895 4.50046 9.39768 4.50001 9Z" fill="#8799AC" />
                      </g>
                      <defs>
                        <clipPath id="clip0_10024_155919">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="cz-handheld-toolbar-label">Video Call</span>
                  </Link>
                  <Link
                    href="/sehat-scan"
                    className={`middleIcon cz-handheld-toolbar-item ga-event-navigation-bottom-home ${getActiveClass('/sehat-scan')}`}
                    prefetch={false}
                  >
                    {/* <Image
                      height={300}
                      width={300}
                      src={sehatScanMenu}
                      alt="bottom menu"
                      className="img-fluid img-top-scan"
                    /> */}

                    <svg width="46" height="46" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="27" cy="27" r="27" fill="#0F345A" />
                      <path d="M12.1331 26.8027C12.0935 26.8026 12.0549 26.7932 12.022 26.7759C11.9892 26.7585 11.9637 26.7339 11.9487 26.7052L10.9967 24.9142H10.1289V24.5995H11.131C11.1705 24.5996 11.2092 24.609 11.242 24.6263C11.2748 24.6437 11.3003 24.6683 11.3154 24.697L12.1331 26.2173L13.7484 22.8132C13.7627 22.7831 13.7885 22.7572 13.8221 22.7389C13.8558 22.7206 13.8958 22.7108 13.9368 22.7109C13.9781 22.7115 14.0182 22.7221 14.0516 22.7413C14.0849 22.7604 14.1099 22.7872 14.1232 22.818L14.8827 24.5995H15.7405V24.9142H14.7384C14.6964 24.9143 14.6554 24.904 14.6213 24.8848C14.5871 24.8656 14.5615 24.8385 14.548 24.8072L13.9368 23.3404L12.3214 26.7004C12.3071 26.7306 12.2814 26.7565 12.2477 26.7748C12.214 26.7931 12.174 26.8028 12.1331 26.8027Z" fill="#ED8873" stroke="#ED8873" stroke-width="0.925731" stroke-linejoin="round" />
                      <path d="M41.8669 26.8027C41.9065 26.8026 41.9451 26.7932 41.978 26.7759C42.0108 26.7585 42.0363 26.7339 42.0513 26.7052L43.0033 24.9142H43.8711V24.5995H42.869C42.8295 24.5996 42.7908 24.609 42.758 24.6263C42.7252 24.6437 42.6997 24.6683 42.6846 24.697L41.8669 26.2173L40.2516 22.8132C40.2373 22.7831 40.2115 22.7572 40.1779 22.7389C40.1442 22.7206 40.1042 22.7108 40.0632 22.7109C40.0219 22.7115 39.9818 22.7221 39.9484 22.7413C39.9151 22.7604 39.8901 22.7872 39.8768 22.818L39.1173 24.5995H38.2595V24.9142H39.2616C39.3036 24.9143 39.3446 24.904 39.3787 24.8848C39.4129 24.8656 39.4385 24.8385 39.452 24.8072L40.0632 23.3404L41.6786 26.7004C41.6929 26.7306 41.7186 26.7565 41.7523 26.7748C41.786 26.7931 41.826 26.8028 41.8669 26.8027Z" fill="#ED8873" stroke="#ED8873" stroke-width="0.925731" stroke-linejoin="round" />
                      <path d="M20.25 10V10C15.6936 10 12 13.6937 12 18.25V18.25M12 31.75V31.75C12 36.3063 15.6936 40 20.25 40V40M33.75 40V40C38.3063 40 42 36.3063 42 31.75V31.75M42 18.25V18.25C42 13.6937 38.3063 10 33.75 10V10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M26.8697 15.9727C22.9522 15.9727 19.7763 19.0626 19.7763 22.8743C19.7763 23.4859 19.8581 24.0789 20.0115 24.6436C19.3174 24.9707 19.0102 26.0327 19.3245 27.1349C19.6071 28.1259 20.3031 28.8372 20.999 28.9214C21.6018 30.9328 23.3589 34.1397 26.9531 35.1589L27.001 35.1723L27.049 35.1589C30.6431 34.1397 32.4003 30.9328 33.003 28.9214C33.699 28.8372 34.395 28.1259 34.6776 27.1349C35.0013 25.9997 34.6657 24.9071 33.9271 24.6162C34.0758 24.0597 34.1549 23.476 34.1549 22.8743C34.1549 19.0626 30.979 15.9727 27.0615 15.9727H26.8697Z" fill="white" fill-opacity="0.3" />
                    </svg>

                    <div><span className="cz-handheld-toolbar-label scanText">Health Scan</span></div>
                  </Link>


                  <Link
                    href="/find-a-doctor"
                    className={`fourI cz-handheld-toolbar-item ga-event-navigation-bottom-home ${getActiveClass('/find-a-doctor')}`}
                    prefetch={false}
                  >
                    {/* <Image
                      height={300}
                      width={300}
                      src={findDoctorMenu}
                      alt="bottom menu"
                      className="img-fluid w-35-px"
                    /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <g clip-path="url(#clip0_10024_155973)">
                        <path d="M15.1348 13.1457C16.9614 12.1387 18.2027 10.1723 18.2027 7.94786C18.1789 4.66977 15.5099 2 12.2318 2C8.95376 2 6.28493 4.66977 6.28493 7.94786C6.28493 10.1723 7.52611 12.1387 9.35275 13.1457C5.09053 14.4098 2 18.3436 2 22.98H3.17075C3.17075 19.1404 5.55883 15.8623 8.93128 14.5267L11.6479 17.2433V22.98H12.8186L12.8177 17.2433L15.5343 14.5267C18.9056 15.8612 21.2948 19.1393 21.2948 22.98H22.4656C22.4647 18.3436 19.3741 14.4097 15.1356 13.1457H15.1348ZM7.45544 7.94786C7.45544 5.30174 9.60943 3.17168 12.2316 3.17168C14.8538 3.17168 17.0078 5.32567 17.0078 7.94786C17.0078 10.5701 14.8776 12.724 12.2316 12.724C9.58566 12.724 7.45544 10.5929 7.45544 7.94786ZM12.2316 16.1897L10.1947 14.129C10.8505 13.9881 11.5292 13.8948 12.2316 13.8948C12.9341 13.8948 13.6127 13.9881 14.2685 14.129L12.2316 16.1897ZM16.5634 18.6482H17.5933V19.819H16.5634V20.8489H15.3926V19.819H14.3627V18.6482H15.3926V17.6184H16.5634V18.6482Z" fill="#8799AC" stroke="#8799AC" stroke-width="0.5" />
                      </g>
                      <defs>
                        <clipPath id="clip0_10024_155973">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="cz-handheld-toolbar-label">
                      Find a Doctor
                    </span>
                  </Link>

                  <Link
                    href="/pricing"
                    prefetch={false}
                    className={`fourI cz-handheld-toolbar-item ga-event-navigation-bottom-home ${getActiveClass('/pricing')}`}
                  >
                    {/* <Image
                      height={300}
                      width={300}
                      src={sehatAZMenu}
                      alt="bottom menu"
                      className="img-fluid w-35-px"
                    /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                      <g clip-path="url(#clip0_10024_155986)">
                        <path d="M18 13.0898L19.434 15.8671L22.5 16.3126L20.25 18.3398L20.8282 21.3398L18 19.6523L15.1718 21.3398L15.75 18.3398L13.5 16.3126L16.65 15.8671L18 13.0898Z" fill="#8799AC" />
                        <path d="M9 12.3398H4.5V13.8398H9V12.3398Z" fill="#8799AC" />
                        <path d="M12 9.33984H4.5V10.8398H12V9.33984Z" fill="#8799AC" />
                        <path d="M12 6.33984H4.5V7.83984H12V6.33984Z" fill="#8799AC" />
                        <path d="M12 19.8398H3V4.83984H21V12.3398H22.5V4.83984C22.5 4.44202 22.342 4.06049 22.0607 3.77918C21.7794 3.49788 21.3978 3.33984 21 3.33984H3C2.60218 3.33984 2.22064 3.49788 1.93934 3.77918C1.65804 4.06049 1.5 4.44202 1.5 4.83984V19.8398C1.5 20.2377 1.65804 20.6192 1.93934 20.9005C2.22064 21.1818 2.60218 21.3398 3 21.3398H12V19.8398Z" fill="#8799AC" />
                      </g>
                      <defs>
                        <clipPath id="clip0_10024_155986">
                          <rect width="24" height="24" fill="white" transform="translate(0 0.339844)" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="cz-handheld-toolbar-label">Subscription</span>
                  </Link>
                </div>
              </div>
            )}

          </>
        )}
      </section>
      {isSearchActive && (
        <ExpandedSearchArea setIsSearchActive={setIsSearchActive} />
      )}

      {/* <Modal
        className="popupNewsletter"
        visible={openPopThanks}
        onOk={hidePopThanks}
        onCancel={hidePopThanks}
      >
        <Row className="align-items-center">
          <Col md={6}>
            <Image
              src={newsletterThanksDeskt}
              alt="newsletter"
              className="img-fluid w-100 topBannerImg d-none d-md-block"
            />
            <Image src={newsletterThanksImg} alt='newsletter' className='img-fluid w-100 topBannerImg d-md-none' />
          </Col>
          <Col md={6} className="text-md-left text-center my-md-5">
            <Image
              src={logo}
              alt="logo"
              className="img-fluid mb-4 d-none"
            />
            <div className="px-3 px-md-0 newsletter-thanks-description mb-5 mt-4">
              <div className="mt-3 mb-4">
                <Image src={tick} />
              </div>

              <h4 className="mt-3 fs-mobile-20 line-height-mobile-24 mb-2 fs-28 line-height-35 fw-600">
                Thank You!
              </h4>
              <p className="fs-18 line-height-24 mb-3 text-center mt-3">
                We shall notify you once our Health Scan Technology is live.
              </p>
              <p className="fs-18 line-height-24 mb-3 text-center">
                For help or queries, call us at <br /> <span style={{ fontWeight: '500', wordSpacing: '-4px' }}> {uanNumber} </span>
              </p>

            </div>
          </Col>
        </Row>
      </Modal> */}

      <Modal
        className="coming_wellness_in_urdu"
        centered
        visible={showToggleModalWellness}
        footer={null}
        closeIcon={
          <Image
            onClick={() => setShowToggleModalWellness(false)}
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
    </>
  );
}

export default Navbar;

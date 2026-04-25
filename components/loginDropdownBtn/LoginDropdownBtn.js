import React, { useState, useEffect } from "react";
import { NavLink } from "react-bootstrap";
import { HeadingDesc } from "../HeadingDesc";
import arrowIcon from "../../public/svg/arrow-down-black.svg";
import { URL } from "../constants";
import { Dropdown, Menu, Space, Button, Modal } from "antd";
import { shortenName } from "@/utils/utilFunctions";
import Image from "next/image";
import { logoutUser } from "../../utils/utilFunctions";
import { useSelector } from "react-redux";
import styles from "./loginDropDown.module.scss";
import deleteUser from "../../public/svg/deleteUser.svg";
import API from '@/utils/httpService';
import { BsX } from "react-icons/bs";
import Loader from '../Loader'
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserLogged from '/public/png/new-images/icon_user.png';
import ArrowDown from '/public/png/new-images/arrowDownNav.png';
import RightArrowImg from '/public/png/new-images/arrow_rightt.png';
import { isMobile } from 'react-device-detect';


function LoginDropdownBtn(props) {
  const { title, userData } = props;
  const [redirect, setRedirect] = useState(false);
  const [i18nData, setI18nData] = useState(null);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [dropOtpModal, setDropOtpModal] = useState(false);
  const [Otp, setOtp] = useState("");
  const [OTPInput, setOTPInput] = useState(null);
  const [ResendOTP, setResendOTP] = useState(null);
  const [errorData, setErrorData] = useState(false);
  const [hideError, setHideError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);


  let i18nDataTwo = useSelector((state) => state.translation.i18n);
  // let OTPInput = null;
  // let ResendOTP = null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("otp-input-react").then((item) => {
        setOTPInput(() => item.default)
        setResendOTP(() => item.ResendOTP);
      })
    }
  }, [])
  const redirectToWallet = () => {
    window.location.href = ('/wallet');
  }
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

  const userFullName = userData?.user?.name;
  const userPhone = userData?.user?.phone
  const walletAmount = userData?.user?.wallet?.wallet;

  function maskPhoneNumber(phoneNumber) {

    const phoneStr = phoneNumber?.toString();

    const maskedNumber = phoneStr?.slice(0, 3) + '******' + phoneStr?.slice(9);

    return maskedNumber;
  }
  const maskedPhoneNumber = maskPhoneNumber(userPhone);


  const generateOtp = async () => {
    try {
      const response = await API.get("/user/delete")
      if (response?.code == 200) {
        setDeleteUserModal(false);
        setDropOtpModal(true)
      }
      else if (response?.code == 400) {
        setDeleteUserModal(false);
        toast.error(`${response?.message}`, {
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
    setOtpError('')
    setOtpError()
    setOtp('')

  };


  const handleOTP = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      phone: userPhone,
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
        const response = await API.post("/verify-otp/delete", data)
        if (response?.code == 400) {
          setErrorData('');
          setLoading(false);
          setOtpError(response?.message)
        }
        else if (response?.code == 200) {
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
      phone: userPhone,
    };
    setLoading(true);

    const result = await API.get('/resend-otp/delete', payload);

    if (result?.code === 200) {
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

  const dropDownTitle = () => (
    <>
      <div className="loginDropdownContainerLogged">
        <div className="loginDropdownContainer">
          {isMobile && <Image src={userData?.user?.image} alt="img_user" width={60} height={60} className={"icon_img_logged"} />}
          {!isMobile && 
            <div className="hk_user_letter m-0 border-0">
            {userFullName && (
              <>
                <h4 className="text-uppercase">{`${userFullName === "undefined"
                  ? ""
                  : userFullName?.charAt(0) || userFullName !== null
                    ? userFullName?.charAt(0)
                    : ""
                  }`}</h4>
              </>
            )}
            {/* <h4 className='text-uppercase'>{currUser?.data?.user?.name === 'undefined' && '' || currUser?.data?.user?.name === null && '' && currUser?.data?.user?.name?.charAt(0)}</h4> */}
          </div>
          }
          <Image src={ArrowDown} alt="img_user" className={"icon_img_logged_arrow"} />
          <div className="wraper_title_userDetails">
            <h3 className="user_title">
              {(userFullName === "undefined" && "") ||
                (userFullName === null && "") ||
                (userFullName && userFullName)}{" "}
            </h3>
            <span> {userData?.user?.phone}</span>
            <span className="pkg_subsss_nav"> {userData?.user?.subscription?.package?.name} {userData?.user?.subscription?.package?.name !== "" ? 'Subscription' : ''}  </span>
            <Image src={RightArrowImg} alt="img_user" className={"img_arrow-nav"} />
          </div>
        </div>
      </div>
    </>
  );

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
          <a style={{ color: 'red', borderBottom: '1.5px solid #E9406A' }} onClick={resendOTPHandler}
          >
            {i18nData?.resent_sms}
          </a>
        ) : (
          i18nData?.resend_sms_in
        )}
      </button>
    );
  };

  const logout = (e) => {
    e.preventDefault();
    logoutUser({
      cb() {
        setRedirect(true);
        // mixpanel.track('User Logout', {
        //     'Name': currUser?.data?.user?.name, 'Email': currUser?.data?.user?.email, 'Number': currUser?.data?.user?.phone, 'City': currUser?.data?.user?.city
        // });
      },
    });
  };

  const openDeleteAccount = (e) => {
    setDeleteUserModal(true);
  };

  if (redirect) {
    if (typeof window !== "undefined") {
      window.location.href = URL.home;
    }
  }




  const menu = (
    <Menu
      style={{ marginTop: "12px" }}
      items={[
        {
          label: (
            <NavLink
              className="dropdown-item p-4"
              style={{ color: "#383838", cursor: "initial" }}
            >
              <div className="d-flex align-items-center">
                <div className="hk_user_letter m-0 border-0">
                  {userFullName && (
                    <>
                      <h4 className="text-uppercase">{`${userFullName === "undefined"
                        ? ""
                        : userFullName?.charAt(0) || userFullName !== null
                          ? userFullName?.charAt(0)
                          : ""
                        }`}</h4>
                    </>
                  )}
                  {/* <h4 className='text-uppercase'>{currUser?.data?.user?.name === 'undefined' && '' || currUser?.data?.user?.name === null && '' && currUser?.data?.user?.name?.charAt(0)}</h4> */}
                </div>
                <p className="ps-3">
                  {userData?.user?.name !== "undefined" &&
                    userData?.user?.name &&
                    shortenName(userData?.user?.name)}
                </p>
              </div>
            </NavLink>
          ),
          key: "9",
        },
        {
          label: (
            <div onClick={redirectToWallet} className={"cardTop_drop"}>
              <div className="left__drop">
                <span className="laptopppp_svg"></span>
                <div className="left_ri">
                  <h3> Wallet </h3>
                  <h2> PKR {walletAmount} </h2>
                </div>
              </div>
              <span className="arrow_right_drop"></span>
            </div>
          ),
          key: "11",
        },
        {
          label: (
            <a
              className="dropdown-item"
              href={
                i18nData?.langDetectForNonServerComponents === "ur"
                  ? "/ur/dashboard"
                  : "/dashboard"
              }
            >
              {i18nData?.dashboard}
              {/* <img src={arrowRightIcon} alt="arrowRightIcon" /> */}
            </a>
          ),
          key: "0",
        },
        {
          label: (
            <a
              className="dropdown-item"
              href={
                i18nData?.langDetectForNonServerComponents === "ur"
                  ? "/ur/update-profile"
                  : "/update-profile"
              }
            >
              {i18nData?.my_profile}
              {/* <img src={arrowRightIcon} alt="arrowRightIcon" /> */}
            </a>
          ),
          key: "1",
        },
        {
          label: (
            <a
              className="dropdown-item"
              href={
                i18nData?.langDetectForNonServerComponents === "ur"
                  ? "/ur/health-check-history"
                  : "/health-check-history"
              }
            >
              {i18nData?.sehat_scan_history}
              {/* <img src={arrowRightIcon} alt="arrowRightIcon" /> */}
            </a>
          ),
          key: "2",
        },
        {
          label: (
            <a
              className="dropdown-item"
              href={
                i18nData?.langDetectForNonServerComponents === "ur"
                  ? "/ur/book-an-appointment"
                  : "/book-an-appointment"
              }
            >
              {/* {i18n.t('doctor_appointment')} */}
              {i18nData?.doctor_appointment}
              {/* <img src={arrowRightIcon} alt="arrowRightIcon" /> */}
            </a>
          ),
          key: "3",
        },
        {
          label: (
            <a
              className="dropdown-item"
              href={
                i18nData?.langDetectForNonServerComponents === "ur"
                  ? "/ur/medical-recordes"
                  : "/medical-recordes"
              }
            >
              {/* {i18n.t('medical_records')} */}
              {i18nData?.medical_records}
              {/* <img src={arrowRightIcon} alt="arrowRightIcon" /> */}
            </a>
          ),
          key: "4",
        },
        {
          label: (
            <a
              className="dropdown-item"
              href={
                i18nData?.langDetectForNonServerComponents === "ur"
                  ? "/ur/medical-history"
                  : "/medical-history"
              }
            >
              {/* {i18n.t('medical_history')} */}
              {i18nData?.medical_history}

              {/* <img src={arrowRightIcon} alt="arrowRightIcon" /> */}
            </a>
          ),
          key: "5",
        },
        {
          label: (
            <a
              className="dropdown-item"
              href={
                i18nData?.langDetectForNonServerComponents === "ur"
                  ? "/ur/subscriptions"
                  : "/subscriptions"
              }
            >
              {/* {i18n.t('subscription')} */}
              {i18nData?.subscription}
              {/* <img src={arrowRightIcon} alt="arrowRightIcon" /> */}
            </a>
          ),
          key: "6",
        },
        {
          label: (
            <a
              className="dropdown-item"
              href={
                i18nData?.langDetectForNonServerComponents === "ur"
                  ? "/ur/wallet"
                  : "/wallet"
              }
            >
              {i18nData?.wallet}
            </a>
          ),
          key: "6",
        },
        {
          label: (
            <button
              type="button"
              className="dropdown-item"
              onClick={(e) => logout(e)}
            >
              {/* {i18n.t('Log Out')} */}
              {i18nData?.logout}
              {/* <img src={arrowRightIcon} alt="arrowRightIcon" /> */}
            </button>
          ),
          key: "8",
        },
        ,
        {
          label: (
            <button
              type="button"
              className="dropdown-item"
              onClick={(e) => openDeleteAccount(e)}
              style={{ color: "#EF6286" }}
            >
              {/* {i18n.t('Log Out')} */}
              {i18nData?.delete_Account}
              {/* Delete Account */}
              {/* <img src={arrowRightIcon} alt="arrowRightIcon" /> */}
            </button>
          ),
          key: "10",
        },
      ]}
    />
  );

  return (
    <>
      <div id="loginDropdown">
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>{dropDownTitle(title)}</Space>
          </a>
        </Dropdown>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Modal
          title=""
          className={`${styles.deleteUserModal} deleteUserModal`}
          centered
          open={deleteUserModal}
          onOk={() => setDeleteUserModal(false)}
          onCancel={() => setDeleteUserModal(false)}
          footer={null}
          maskClosable={false}
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
                  Once your account is deleted, your details will be cleared
                  and you cannot reactivate it or recover any data.
                </p>
              </div>
              <div className={styles.buttontDeleteUser}>
                <button onClick={generateOtp}>Delete Account</button>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          title=""
          className={`${styles.wrape_otp_drop_modal} wrape_otp_drop_modal`}
          centered
          open={dropOtpModal}
          onOk={() => setDropOtpModal(false)}
          onCancel={() => setDropOtpModal(false)}
          footer={null}
          maskClosable={false}
        >
          {loading === true && (
            <>
              <Loader />
            </>
          )}
          <div className="wrape_otp_drop">
            <p>
              {" "}
              An SMS has been sent to the following phone number:{" "}
              <span className="num_sll">{maskedPhoneNumber}</span>
            </p>
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
                        color: "#B11B1B",
                      }}
                    >
                      <p> {otpError} </p>
                      <BsX
                        style={{
                          color: "#B11B1B",
                        }}
                        onClick={hideOtpError}
                        className="bsX"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="my-5 mb-3 confirm-paragraph d-md-none">
                <p className="fs-19 line-height-26 mt-3">
                  {i18nData?.sms_has_been_sent}
                  <b>{/* {modifiedPhone} */}</b>
                </p>
              </div>
              <div className="error-otp-login ">
                {errorData && !hideError && !otpError && (
                  <div
                    className="forUrduReversing"
                    style={{
                      color: "#B11B1B",
                    }}
                  >
                    <p> {errorData} </p>
                    <BsX
                      style={{
                        color: "#B11B1B",
                      }}
                      onClick={hideOtpError}
                      className="bsX"
                    />
                  </div>
                )}
              </div>
              <div className="resend-sms-otp px-4">
                {dropOtpModal && (
                  <ResendOTP
                    maxTime={60}
                    className="OtpCounting"
                    style={{ display: "grid", justifyContent: "center" }}
                    renderButton={renderInstantButton}
                    renderTime={() => renderInstantTime(remainingTime)}

                  />
                )}
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
      </div>
    </>
  );
}

export default LoginDropdownBtn;

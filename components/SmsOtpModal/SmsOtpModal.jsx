import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { APIV3 } from "@/utils/httpService";
import { BsX } from 'react-icons/bs';
import Loader from "../Loader";
import swal from 'sweetalert';
import { useTranslation } from 'react-i18next';
import Cookies from "js-cookie";
import { useRouter } from 'next/router';

let inputStyle = {
  height: '45.123px',
  width: '46.173px',
  borderRadius: '4.267px',
  marginRight: '0px',
  border: '0.256px solid  rgba(173, 189, 206, 0.50)',
  fontFamily: 'Satoshi-Medium',
  color: '#0F345A',
  fontSize: '22px'
};

const SmsOtpModal = ({ handleSmsOtpClose, smsOtp, mobileNumber }) => {
  const [otp, setOtp] = useState('');
  const [errorData, setErrorData] = useState('');
  const [OTPInput, setOTPInput] = useState(null);
  const [ResendOTP, setResendOTP] = useState(null);
  const [otpError, setOtpError] = useState(null);
  const [hideError, setHideError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!smsOtp) {
      setOtp('');
      setErrorData('');
      setOtpError(null);
      setHideError(false);
    }
  }, [smsOtp])


  useEffect(() => {
    if (typeof window !== "undefined") {
      import("otp-input-react").then((item) => {
        setOTPInput(() => item.default)
        setResendOTP(() => item.ResendOTP);
      })
    }
  }, [])

  const hideOtpError = () => {
    setHideError(true);
  };


  const handleContinueOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (otp.length === '' || otp.length < 4) {
      setLoading(false);
      setErrorData(i18n.t('enter_otp'));
    } else if (otp.length === 4) {
      setHideError(false)
      setLoading(false);
      try {
        const payload = {
          otp: otp,
          phone: `0${mobileNumber}`
        }

        const response = await APIV3.post('/verify-otp', payload);
        if (response?.status == 200) {
          setLoading(false);
          Cookies.set('Authorization', response?.data?.data?.access_token, {
            domain: '.merisehat.pk'
          });
          window.location.reload();
        } else {
          setOtpError(response?.message)
        }

      } catch (error) {
        console.log(error)
      }
    }
  };

  async function resendOTPHandler() {
    const data = {
      phone: mobileNumber
    };
    setLoading(true);

    const result = await APIV3.post('/resend-otp', data);

    if (result?.status == 200) {
      setOtp('');
      setLoading(false);
      swal('Success!', result?.data?.message, 'success');
    } else {
      setLoading(false);
      swal('Error!', result?.data?.message, 'error');
    }
  }

  const renderInstantTime = (remainingTime) => {
    return (
      <span>
        {' '}
        {remainingTime === 0
          ? ''
          : ` 00:${remainingTime < 10 ? `0` : ''}${remainingTime} ${i18n.t(
            'seconds'
          )}`}
      </span>
    );
  };

  const renderInstantButton = (buttonProps) => {
    return (
      <button {...buttonProps}>
        {buttonProps.remainingTime === 0 ? (
          <a style={{ color: 'red' }} onClick={resendOTPHandler}>
            Resend OTP
          </a>
        ) : (
          <>
            Resend OTP
          </>
        )}
      </button>
    );
  };

  return (
    <>
      {loading === true && (
        <>
          <Loader />
        </>
      )}
      <Modal show={smsOtp} onHide={handleSmsOtpClose} centered className='sms-otp'>
        <Modal.Body>
          <svg onClick={handleSmsOtpClose} className='cross-btn' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#0F345A" />
          </svg>
          <p>The verification code has been sent to <span>{`0${mobileNumber}`}</span></p>
          <form className="form" autoComplete="off">
            <div className="otp-login-box">
              <OTPInput
                value={otp}
                onChange={setOtp}
                autoFocus
                hasErrored
                OTPLength={4}
                otpType="number"
                disabled={false}
                secure={false}
                className={
                  otpError && !hideError
                    ? 'otpContainer input-otp-error otp-input'
                    : 'otpContainer otp-input otp-input' && errorData && !hideError
                      ? 'otpContainer input-otp-error otp-input'
                      : 'otpContainer otp-input'
                }
                inputStyles={inputStyle}
              />
              {otpError && !hideError && (
                <div className="error-otp-login kh-otpError">
                  <div
                    className='forUrduReversing'
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <p> {otpError} </p>
                    <BsX onClick={hideOtpError} className="bsX" />
                  </div>
                </div>
              )}
              {errorData && !hideError && !otpError && (
                <div className="error-otp-login kh-otpError">
                  <div
                    className='forUrduReversing'
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <p> {errorData} </p>
                    <BsX onClick={hideOtpError} className="bsX" />
                  </div>
                </div>
              )}
            </div>
            <div className="resend-sms-otp px-4 pt-0">
              <ResendOTP
                maxTime={60}
                className="OtpCounting"
                style={{ display: 'grid', justifyContent: 'center' }}
                renderButton={renderInstantButton}
                renderTime={renderInstantTime}
              />
            </div>

            <div className="Otp-continue-btn" onClick={handleContinueOtp}>
              <button className="review-button text-uppercase loginOtp-phone-btn position-relative fw-700 fs-17">
                Continue
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SmsOtpModal
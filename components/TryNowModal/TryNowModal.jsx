import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Select } from "antd";
import Cross from '../../public/svg/cancelbtn.svg';
import BannerModal from '../../public/png/sehatscanlogin.png';
import arrowShape from "../../public/svg/ShapeArrow.svg";
import jazz from "../../public/svg/jazz.svg";
import zong from "../../public/png/zong_logo.png";
import ufone from "../../public/png/ufone-new.png";
import Image from "next/image";
import telenor from "../../public/png/telenor-new.png";
import SmsOtpModal from '../SmsOtpModal/SmsOtpModal';
import  { APIV3 } from "@/utils/httpService";
import { useTranslation } from 'react-i18next';
import Loader from "../Loader";

const TryNowModal = ({ handleTryNowModalClose, tryNow, setTryNow }) => {
    const [smsOtp, setSmsOtp] = useState(false);

    

    const [mobileNumber, setMobileNumber] = useState('')
    const [continueNetwork, setContinueNetwork] = useState('');
    const [continuePhoneError, setContinuePhoneError] = useState('');
    const [loading, setLoading] = useState(false);

    const { t, i18n } = useTranslation();
    const handleSmsOtpClose = () => setSmsOtp(false);

    function ContinuePhoneChange(e) {
        const limit = 10;
        setMobileNumber(e.target.value.slice(0, limit));
        setContinueNetwork('');

        if (e.target.value.startsWith('33') === true) {
            setContinueNetwork('ufone');
        }
        if (e.target.value.startsWith('31') === true) {
            setContinueNetwork('zong');
        }
        if (e.target.value.startsWith('30') === true) {
            setContinueNetwork('jazz');
        }
        if (e.target.value.startsWith('34') === true) {
            setContinueNetwork('telenor');
        }
        if (e.target.value.startsWith('32') === true) {
            setContinueNetwork('jazz');
        }
    }

    const handleSendCode = async () => {
        setLoading(true);
        setContinuePhoneError('');

        if (mobileNumber.trim() === '') {
            setLoading(false);
            setContinuePhoneError('Invalid phone number');
        } else if (continueNetwork === '') {
            setContinuePhoneError(i18n.t('network'));
        }

        if (mobileNumber.trim().startsWith(3) === false) {
            setLoading(false);
            setContinuePhoneError('Invalid phone number');
        } else if (
            mobileNumber.trim().length < 10 ||
            mobileNumber.trim().length > 10
        ) {
            setLoading(false);
            setContinuePhoneError('Invalid phone number');
        } else {
            setLoading(true);
            try {
                const payload = {
                    phone: `0${mobileNumber}`,
                    otp_via: 'sms'
                }
                const response = await APIV3.post('/login', payload);
                if (response?.status == 200) {
                    setLoading(false);
                    setTryNow(false)
                    setSmsOtp(true);
                }
                else {
                    setLoading(false);
                    setTryNow(false)
                }
            } catch (error) {
                setLoading(false);
                console.log(error)
            }
        }
    };

    const { Option } = Select;

    return (
        <>
            {loading === true && (
                <>
                    <Loader />
                </>
            )}
            <Modal show={tryNow} onHide={handleTryNowModalClose} centered backdrop="static" className='mobile_number'>
                <Modal.Body>
                    <Image src={BannerModal} alt="" className='banner-modal' />
                    <svg onClick={handleTryNowModalClose} className='cross-btn' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#0F345A" />
                    </svg>
                    <div className='px-4 pb-4'>
                        <h4>Ready to start?</h4>
                        <p>Please verify your phone number to proceed</p>
                        <Form
                            noValidate
                            className="for-m-r"
                        >
                            <div
                                style={{ display: "flex" }}
                                className="hk_number"
                            >
                                <div className="country_code_hk">
                                    <Select
                                        defaultValue="+92"
                                        className="select-code"
                                        suffixIcon={
                                            <Image
                                                style={{ paddingTop: "4px" }}
                                                src={arrowShape}
                                                alt="Arrow shape"
                                            />
                                        }
                                    >
                                        <Option value="+92">+92</Option>
                                    </Select>
                                </div>

                                <input
                                    className="input-number"
                                    placeholder="Mobile Number*"
                                    type="number"
                                    pattern="[0-9]+"
                                    maxlength="10"
                                    name="number"
                                    style={{ width: "100%" }}
                                    onChange={ContinuePhoneChange}
                                    value={mobileNumber}
                                />
                                <Select
                                    value={continueNetwork}
                                    defaultValue="jazz"
                                    className="select-country hk_network"
                                    suffixIcon={
                                        <Image
                                            style={{ paddingRight: "0.8rem" }}
                                            src={arrowShape}
                                            alt="Arrow shape"
                                        />
                                    }
                                    onChange={(value) => setContinueNetwork(value)}
                                    style={{
                                        width: 120,
                                        border: "none",
                                    }}
                                >
                                    <Option
                                        className="network-height ufone"
                                        value="ufone"
                                    >
                                        {" "}
                                        <Image
                                            src={ufone}
                                            alt="ufone"
                                        />{" "}
                                        <span></span>
                                    </Option>
                                    <Option
                                        className="network-height jazz"
                                        value="jazz"
                                    >
                                        {" "}
                                        <Image src={jazz} alt="jazz" />{" "}
                                        <span></span>
                                    </Option>
                                    <Option
                                        className="network-height telenor"
                                        value="telenor"
                                    >
                                        {" "}
                                        <Image
                                            src={telenor}
                                            alt="telenor"
                                        />{" "}
                                        <span></span>
                                    </Option>
                                    <Option
                                        className="network-height"
                                        value="zong"
                                    >
                                        {" "}
                                        <Image src={zong} alt="zong" />{" "}
                                        <span></span>
                                    </Option>
                                </Select>
                            </div>

                            {continuePhoneError && (
                                <p className="instant-error-msg kh-error">
                                    {' '}
                                    {continuePhoneError}{' '}
                                </p>
                            )}


                            <button
                                type="button" onClick={handleSendCode}
                                className="btn_container fs-16 simple_btn d-flex align-items-center justify-content-center viewDoctorBtn text-uppercase fw-700"
                            >
                                Send Code
                            </button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
            <SmsOtpModal mobileNumber={mobileNumber} handleSmsOtpClose={handleSmsOtpClose} smsOtp={smsOtp} />
        </>
    )
}

export default TryNowModal
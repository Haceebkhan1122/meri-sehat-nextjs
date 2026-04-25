import React, { useMemo, useState } from 'react'
import styles from './bannerMsPro.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import parse from 'react-html-parser';
import { msProRegisterForm, ccmRegisterForm } from '@/utils/endpoints';
import { APIV3 } from "@/utils/httpService";
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../Loader';
import { Select } from "antd";
import arrowShape from "../../../../public/svg/ShapeArrow.svg";
import send from "../../../../public/png/right_send.png";
import useMediaQuery from '@mui/material/useMediaQuery';


const BannerMsPro = (props) => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [errorName, setErrorName] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPhone, setErrorPhone] = useState("")
    const [loader, setLoader] = useState(false)
    const [messageForm, setMessageForm] = useState("")
    const [mobilePhoneError, setMobilePhoneError] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [contactNetwork, setContactNetwork] = useState("");
    const arrayWithoutNumber = useMemo(() => generateArrayWithoutNumber(), []);
    const isMobile = useMediaQuery('(max-width:767px)');


    function generateArrayWithoutNumber() {
        let res = [];

        for (let i = 0; i <= 255; i++) {
            if (i >= 48 && i <= 57) {
            } else {
                res.push(String.fromCharCode(i));
            }
        }

        return res;
    }


    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(email)) {
            return true;
        }
        return false;
    };

    // const checkPhoneNumber = (phoneNumber) => {
    //     if (phoneNumber.startsWith('3')) {
    //         return `0${phoneNumber}`;
    //     } else {
    //         return phoneNumber;
    //     }
    // }

    const handleChange = (e, type) => {
        let value = e.target.value;
        const limit = 10;

        if (type === "name") {
            setFirstName(value.replace(/[0-9]/g, ''));
            setErrorName("");
        }

        if (type === "phone") {
            let val = value;

            val = val.replace(/\D/g, '').slice(0, limit);
            setPhoneNumber(val);

            if (val.length >= 3 && !val.startsWith("3")) {
                setErrorPhone("Phone number must start with 3.");
            }
            else if (val.length === 10) {
                const isSameDigit = val.split('').every(char => char === val[0]);
                if (isSameDigit && val[0] !== "3") {
                    setErrorPhone("Phone number cannot contain all identical digits unless they are 3s.");
                } else {
                    setErrorPhone("");
                }
            } else {
                setErrorPhone("");
            }
        }

        if (type === 'company') {
            setCompanyName(value.replace(/[0-9]/g, ''));
            setErrorCompanyName("");
        }

        if (type === 'email') {
            let val = e.target.value;
            setEmail(val);
            const validEmail = validateEmail(val);
            if (validEmail) {
                setErrorEmail("");
            } else {
                setErrorEmail("* Please enter a valid email address");
            }
        }
    };

    const handleSubmitFormThrive = async (e) => {
        e.preventDefault();

        // Construct phone number with '0' prefix
        let obj = { phone: `0${phoneNumber}` };
        let message = "";
        let validPhone = obj.phone.length === 11 && obj.phone.startsWith("03");

        if (!validPhone) {
            setErrorPhone("* Please enter a valid number (starting with 3)");
        }

        if (validPhone) {
            setLoader(true);
            try {
                const response = await APIV3.post(`${ccmRegisterForm}`, obj);
                setLoader(false);
                setPhoneNumber("");
                setErrorPhone("");

                if (response?.status == 200) {
                    setFormSubmit(true);
                    setLoader(false);
                    message = "Our dedicated Care Team will get in touch with you soon!";
                } else {
                    setFormSubmit(false);
                    setLoader(false);
                    message = response?.error?.message;
                }
            } catch (error) {
                setFormSubmit(false);
                setLoader(false);
                message = error?.message;
            }
        } else {
            setLoader(false);
            message = "Please fill out the required form.";
        }

        // Display message and reset after a short delay
        setMessageForm(message);
        setTimeout(() => {
            setMessageForm("");
        }, 2000);
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        let obj = {};
        obj.name = firstName;
        obj.phone = `0${phoneNumber}`;
        obj.email = email;
        let message = "";

        // Validate email and phone
        let validEmail = validateEmail(obj.email);
        let validPhone = obj.phone.length === 11 && errorPhone === ""; // Ensure phone is valid and no phone error

        // Set error messages if invalid
        if (!firstName) {
            setErrorName("*Please enter a valid name");
        }

        if (!validPhone) {
            setErrorPhone("* Please enter a valid number");
        }

        if (!email) {
            setErrorEmail("* Please enter a valid email address");
        }

        // Proceed if all fields are valid
        if (firstName && validEmail && validPhone) {
            setLoader(true);
            try {
                const response = await APIV3.post(`${msProRegisterForm}`, obj);
                setLoader(false);
                setFirstName("");
                setPhoneNumber("");
                setEmail("");
                setErrorEmail("");
                setErrorPhone("");
                if (response?.status == 200) {
                    setFormSubmit(true);
                    setLoader(false);
                    message = `Success`;
                } else {
                    setFormSubmit(false);
                    setLoader(false);
                    message = response?.error?.message;
                }
            } catch (error) {
                setFormSubmit(false);
                setLoader(false);
                message = error?.message;
            }
        } else {
            // Error message if form is incomplete or invalid
            setLoader(false);
            message = "Please fill the required form.";
        }

        setMessageForm(message);
        setTimeout(() => {
            setMessageForm("");
        }, 2000);
    };

    // const handleKeyDown = (e) => {
    //     const backspace = 8;
    //     const value = e.target.value;
    //     if (e.keyCode === backspace && value === "+92") {
    //         e.preventDefault();
    //     }
    // };

    const handleCellInputs = (e) => {
        const limit = 10;
        setMobileNumber(e.target.value.slice(0, limit));
        setContactNetwork("");
        setMobilePhoneError('')

        if (e.target.value.startsWith("33") === true) {
            setContactNetwork("ufone");
        }
        if (e.target.value.startsWith("31") === true) {
            setContactNetwork("zong");
        }
        if (e.target.value.startsWith("30") === true) {
            setContactNetwork("jazz");
        }
        if (e.target.value.startsWith("34") === true) {
            setContactNetwork("telenor");
        }
        if (e.target.value.startsWith("32") === true) {
            setContactNetwork("jazz");
        }
    };


    const handleGetLink = async (e) => {
        e.preventDefault();
        try {
            const data = {
                number: `0${mobileNumber}`,
                network: contactNetwork,
            };
            if (mobileNumber === "") {
                setMobilePhoneError("Please enter a valid phone number");
            } else if (contactNetwork === "") {
                setMobilePhoneError("Please enter a valid phone number");
            } else if (mobileNumber.length < 10) {
                setMobilePhoneError("Incomplete phone number");
            } else if (mobileNumber.trim().startsWith(3) === false) {
                setMobilePhoneError("Please enter a valid phone number");
            } else if (mobileNumber.length > 10) {
                setMobilePhoneError("Character limit exceeded");
            } else if (mobileNumber) {
                setLoader(true);
                let response = await APIV3.post("/get-a-link", data);
                if (response?.status == 200) {
                    setMobilePhoneError("");
                    setMobileNumber('');
                    setLoader(false);
                    setMessageForm(response?.data?.message)
                    setTimeout(() => {
                        setMessageForm("");
                    }, 2000);
                }
                else {
                    setLoader(false);
                    setMessageForm(response?.data?.message)
                    setTimeout(() => {
                        setMessageForm("");
                    }, 2000);
                }
            }
        } catch (err) {
            setLoader(false);
            // console.log(err);
        }
    };


    return (
        <>
            {loader && <Loader />}
            <section className={`${styles.BannerMsPro} BannerMsPro`} style={{ background: props?.widgetData?.data?.[0]?.card_1_color }}>
                <Container className='h-100'>
                    {messageForm !== "" &&
                        <div className={messageForm !== "" ? `${styles.toastMessage} ${styles.toastClass}` : styles.toastMessage} >
                            {messageForm}
                        </div>
                    }
                    {props?.widgetData?.slug == "thrive" && <h1 className={styles.heading_thriveMobile}> {props?.widgetData?.data?.[0]?.heading && parse(props?.widgetData?.data?.[0]?.heading)} </h1>}
                    <Row className='h-100 justify-content-center'>
                        <Col lg={12} className={styles.col_mob_mspban}>
                            {props.pageName !== "downloads-v3" && (
                                <>
                                    <h1> {props?.widgetData?.heading} </h1>
                                    <p> {props?.widgetData?.data?.[0]?.description} </p>
                                </>
                            )}
                            <Row className='h-100'>
                                <Col lg={6} className={`${props.pageName == "downloads-v3" && isMobile ? 'col-xs-6 download_only' : ''}`}>
                                    <div className={`${styles.info_left} info_left`}>
                                        {props?.widgetData?.data?.[0]?.image !== null && <Image src={props?.widgetData?.data?.[0]?.image || ""} width={760} height={553} alt='image_banner' className={`${styles.img_banner_ms} img-fluid`} />}
                                    </div>
                                </Col>
                                <Col lg={1} className={`${props.pageName == "downloads-v3" && isMobile ? 'd-none' : ''}`}></Col>
                                {props?.widgetData?.slug == "thrive" ?
                                    <Col lg={5} >
                                        <h1 className={styles.heading_thrive}> {props?.widgetData?.data?.[0]?.heading && parse(props?.widgetData?.data?.[0]?.heading)} </h1>
                                        <div className={`${styles.info_right} ${styles.info_rightThrive}`}>
                                            <form className={`${styles.formBanner} formBanner`} onSubmit={handleSubmitFormThrive}>
                                                <div className={styles.wrape_withLabe}>
                                                    <h5 className={styles.mobFormTitle}> Enter your number to learn more </h5>
                                                    <div className={styles.grpForm} controlId="formBasicNum">
                                                        <div className={styles.coutlogo}>
                                                            <div className={styles.logoes_wraper}>
                                                                <span className={styles.logo_country}></span>
                                                                <span className={styles.countryCode}>+92</span>
                                                                <span className={styles.arrowDownw}></span>
                                                            </div>
                                                        </div>
                                                        <input type="text" placeholder="Enter your number" name='phone' className={styles.numInp} onChange={(e) => handleChange(e, "phone")} value={phoneNumber} />
                                                    </div>
                                                    {errorPhone !== "" && <span className={styles.errorState}> {errorPhone} </span>}
                                                </div>
                                                <button className={`${styles.btnSubmit} buttonWithBgColor_hover`} type="submit" disabled={phoneNumber.length !== 10 || errorPhone} style={{ background: props?.widgetData?.data?.[0]?.card_1_inner_color }}>
                                                    {props?.widgetData?.data?.[0]?.button_text}
                                                </button>
                                            </form>
                                        </div>
                                    </Col>
                                    : props.pageName !== "downloads-v3" ? (
                                        <Col lg={5}>
                                            <div className={styles.info_right}>
                                                <form className={`${styles.formBanner} formBanner`} onSubmit={handleSubmitForm}>
                                                    <h1> See it in action </h1>
                                                    <p> Book your demo today  </p>
                                                    <div className={styles.wrape_withLabe}>
                                                        <div className={styles.grpForm} controlId="formBasicNum">
                                                            <div className={styles.coutlogo}>
                                                                <div className={styles.logoes_wraper}>
                                                                    <span className={styles.logo_country}></span>
                                                                    <span className={styles.countryCode}>+92</span>
                                                                    <span className={styles.arrowDownw}></span>
                                                                </div>
                                                            </div>
                                                            <input type="text" placeholder="Enter your number" name='phone' className={styles.numInp} onChange={(e) => handleChange(e, "phone")} value={phoneNumber} />
                                                        </div>
                                                        {errorPhone !== "" && <span className={styles.errorState}> {errorPhone} </span>}
                                                    </div>
                                                    <div className={styles.wrape_withLabe}>
                                                        <div className={styles.grpForm} controlId="formBasicName">
                                                            <input type="text" placeholder="Full Name" name='name' autoComplete={false} value={firstName} onChange={(e) => handleChange(e, "name")} maxLength={30} />
                                                        </div>
                                                        {errorName !== "" && <span className={styles.errorState}> {errorName} </span>}
                                                    </div>
                                                    <div className={styles.wrape_withLabe}>
                                                        <div className={styles.grpForm} controlId="formBasicEmail">
                                                            <input type="email" placeholder="Email Address" name='email' className='form01' value={email} maxLength={30} onChange={(e) => handleChange(e, "email")} />
                                                        </div>
                                                        {errorEmail !== "" && <span className={styles.errorState}> {errorEmail} </span>}
                                                    </div>
                                                    <button className={`${styles.btnSubmit} buttonWithBgColor_hover`} type="submit" disabled={!firstName || !email || phoneNumber.length !== 10} style={{ background: props?.widgetData?.data?.[1]?.card_1_inner_color }}>
                                                        {props?.widgetData?.data?.[0]?.button_text}
                                                    </button>
                                                </form>
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
                                                />
                                            </div>
                                        </Col>
                                    ) : props.pageName == "downloads-v3" && (
                                        <Col lg={5} className={`${props.pageName == "downloads-v3" && isMobile ? 'col-xs-6 download_only' : ''}`}>
                                            <div className={styles.downloadRightWrapper}>
                                                <div className={`${styles.downloadRight} downloadpageform`}>
                                                    <h1>{props?.widgetData?.data?.[0]?.heading}</h1>
                                                    <p>{props?.widgetData?.data?.[0]?.description}</p>
                                                    <div className={styles.wrape_withLabe}>
                                                        <div className={styles.downloadForm} controlId="formBasicNum">
                                                            <Form
                                                                noValidate
                                                                onSubmit={handleGetLink}
                                                                className="d-flex for-m-r justify-content-between"
                                                            >
                                                                <div
                                                                    style={{ display: "flex" }}
                                                                    className={
                                                                        mobilePhoneError
                                                                            ? "hk_number error_number"
                                                                            : "hk_number"
                                                                    }
                                                                >
                                                                    <div className="country_code_hk">
                                                                        <Select
                                                                            defaultValue="+92"
                                                                            className="select-code"
                                                                            suffixIcon={
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                                                    <path d="M11.3287 15.5624L6.70125 10.9347C6.63742 10.8709 6.58955 10.8017 6.55764 10.7273C6.52572 10.6528 6.50977 10.573 6.50977 10.4879C6.50977 10.3177 6.56827 10.1688 6.68529 10.0411C6.8023 9.91344 6.95655 9.84961 7.14803 9.84961H16.8497C17.0412 9.84961 17.1954 9.91344 17.3124 10.0411C17.4295 10.1688 17.488 10.3177 17.488 10.4879C17.488 10.5305 17.4241 10.6794 17.2965 10.9347L12.669 15.5624C12.5627 15.6688 12.4563 15.7432 12.3499 15.7858C12.2435 15.8283 12.1265 15.8496 11.9989 15.8496C11.8712 15.8496 11.7542 15.8283 11.6478 15.7858C11.5414 15.7432 11.4351 15.6688 11.3287 15.5624Z" fill="#0F345A" />
                                                                                </svg>
                                                                            }
                                                                        >
                                                                            <Option value="+92">+92</Option>
                                                                        </Select>
                                                                    </div>

                                                                    <input
                                                                        className="input-number"
                                                                        placeholder={"Enter your mobile number "}
                                                                        type="number"
                                                                        pattern="[0-9]+"
                                                                        maxlength="10"
                                                                        name="number"
                                                                        value={mobileNumber}
                                                                        onChange={handleCellInputs}
                                                                        onKeyDown={(evt) =>
                                                                            arrayWithoutNumber.includes(
                                                                                evt.key
                                                                            ) && evt.preventDefault()
                                                                        }
                                                                        style={{ width: "100%" }}
                                                                    />
                                                                    <Select
                                                                        // value={contactNetwork}
                                                                        // defaultValue="jazz"
                                                                        className="select-country hk_network"
                                                                        suffixIcon={
                                                                            <Image
                                                                                style={{ paddingRight: "0.8rem" }}
                                                                                src={arrowShape}
                                                                                alt="Arrow shape"
                                                                            />
                                                                        }
                                                                        style={{
                                                                            width: 120,
                                                                            border: "none",
                                                                        }}
                                                                        onChange={(value) =>
                                                                            setContactNetwork(value)
                                                                        }
                                                                    >
                                                                    </Select>
                                                                </div>
                                                                <button
                                                                    type="submit"
                                                                    className="btn_container fs-16 simple_btn d-flex align-items-center justify-content-center viewDoctorBtn text-uppercase fw-700"
                                                                >

                                                                    <Image src={send} alt="Send" />
                                                                </button>

                                                            </Form>
                                                        </div>
                                                        {mobilePhoneError !== "" && <span className={styles.errorState}> {mobilePhoneError} </span>}
                                                    </div>
                                                    <button className={styles.btnSubmit} type="submit" disabled={!(firstName && email && phoneNumber)} style={{ background: props?.widgetData?.data?.[1]?.card_1_inner_color }}>
                                                        {props?.widgetData?.data?.[0]?.button_text}
                                                    </button>
                                                </div>
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
                                                />
                                            </div>
                                        </Col>
                                    )}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default BannerMsPro;

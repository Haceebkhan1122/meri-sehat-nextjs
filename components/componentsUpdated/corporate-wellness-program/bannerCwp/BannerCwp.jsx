import React, { useMemo, useState } from 'react'
import styles from './bannerCwp.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import RatingsBar from '../../doctorNow/RatingsBar';
import Form from 'react-bootstrap/Form';
import parse from 'react-html-parser';
import { cwpRegisterForm } from '@/utils/endpoints';
import { APIV3 } from "@/utils/httpService";
import SuccessModal from '../../succsessModal/SuccessModal';

const BannerCwp = (props) => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [errorName, setErrorName] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPhone, setErrorPhone] = useState("")
    const [errorCompanyName, setErrorCompanyName] = useState("")
    const [loader, setLoader] = useState(false)
    const [messageForm, setMessageForm] = useState("")
    const [formsubmitSuccsess, setFormsubmitSuccsess] = useState(false);
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(email)) {
            return true;
        }
        return false;
    };



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
                if (isSameDigit) {
                    setErrorPhone("Phone number cannot contain all identical digits.");
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

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        let obj = {};
        obj.name = firstName;
        obj.phone = `0${phoneNumber}`;
        obj.company_name = companyName;
        obj.company_email = email;
        let message = ""

        let validEmail = validateEmail(obj.company_email);
        let validPhone = obj.phone.length === 11

        if (!validPhone) {
            setErrorPhone("* Please enter a valid number")
        }
        if (!email) {
            setErrorEmail("* Please enter a valid email address")
        }
        if (!firstName) {
            setErrorName("*Please enter a valid name")
        }
        if (!companyName) {
            setErrorCompanyName("*Please enter a valid company name")
        }
        if (!email) {
            setErrorEmail("* Please enter a vaild email address")
        }


        if (firstName && companyName && validEmail && validPhone) {
            try {
                const response = await APIV3.post(`${cwpRegisterForm}`, obj)
                setLoader(true);
                setFirstName("")
                setPhoneNumber("")
                setCompanyName("")
                setEmail("")
                setErrorEmail("")
                setErrorPhone("")
                if (response?.status === 200) {
                    setFormSubmit(true);
                    setLoader(false);
                    setFormsubmitSuccsess(true)
                    // message = "Success";
                    setFirstName("");
                    setPhoneNumber("");
                    setCompanyName("");
                    setEmail("");

                }
                else {
                    setFormSubmit(false);
                    setLoader(false);
                    message = response?.error?.message || "Form submission failed";
                }
            } catch (error) {
                console.log("error in api", error)
                setFormSubmit(false);
                setLoader(false);
                message = error?.message || "An error occurred";

            }
        }
        else {
            console.log("error")
            setLoader(false)
            message = "Please fill the required form";
        }
        setMessageForm(message);
        setTimeout(() => {
            setMessageForm("");
        }, 2000);
    }

    const doneClicked = () => {
        setFormSubmit(false)
    }

    const arrayWithoutNumber = useMemo(() => generateArrayWithoutNumber(), []);

    function generateArrayWithoutNumber() {
        let res = [];

        for (let i = 0; i <= 255; i++) {
            if (!(i >= 48 && i <= 57)) { // Exclude numbers (ASCII 48-57)
                res.push(String.fromCharCode(i));
            }
        }

        return res;
    }


    return (
        <section className={`${styles.bannerCwpSec} bannerCwpSec`} style={{ background: props?.widgetData?.data?.[0]?.card_1_inner_color }}>
            <Container className='h-100'>
                {/* {messageForm && (
                    <div className={`${styles.toastMessage} ${styles.toastClass}`}>
                        {messageForm}
                    </div>
                )} */}
                <Row className='h-100 justify-content-center'>
                    <Col lg={12}>
                        <Row className='h-100'>
                            <Col lg={6} className='my-auto'>
                                <div className={`${styles.info_left} info_left`}>
                                    <h1> {parse(props?.widgetData?.heading)} </h1>
                                    <p> {props?.widgetData?.description && parse(props?.widgetData?.description)} </p>
                                    <RatingsBar widgetData={props?.widgetData} />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className={styles.info_right}>
                                    <form className={`${styles.formBanner} formBanner`} onSubmit={handleSubmitForm}>
                                        <h1> Request a Corporate Demo </h1>
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
                                            {errorPhone !== "" && <p className={styles.errorState}> {errorPhone} </p>}
                                        </div>
                                        <div className={styles.wrape_withLabe}>
                                            <div className={styles.grpForm} controlId="formBasicName">
                                                <input type="text" placeholder="Full Name" name='name' autoComplete={false} value={firstName} onChange={(e) => handleChange(e, "name")} maxLength={30} />
                                            </div>
                                            {errorName !== "" && <p className={styles.errorState}> {errorName} </p>}
                                        </div>
                                        <div className={styles.wrape_withLabe}>
                                            <div className={styles.grpForm} controlId="formBasicCompany">
                                                <input type="text" placeholder="Company Name" name='companyname' value={companyName} className='form01' onChange={(e) => handleChange(e, "company")} maxLength={30} />
                                            </div>
                                            {errorCompanyName !== "" && <p className={styles.errorState}> {errorCompanyName} </p>}
                                        </div>
                                        <div className={styles.wrape_withLabe}>
                                            <div className={styles.grpForm} controlId="formBasicEmail">
                                                <input type="email" placeholder="Company Email" name='email' className='form01' value={email} maxLength={30} onChange={(e) => handleChange(e, "email")} />
                                            </div>
                                            {errorEmail !== "" && <p className={styles.errorState}> {errorEmail} </p>}
                                        </div>
                                        <button className={`${styles.btnSubmit} buttonWithBgColor_hover`} type="submit"
                                            disabled={
                                                !(
                                                    firstName &&
                                                    companyName &&
                                                    email &&
                                                    phoneNumber.length === 10
                                                )
                                            } style={{ background: props?.widgetData?.data?.[0]?.card_1_color }}>
                                            {props?.widgetData?.data?.[0]?.button_text}
                                        </button>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <SuccessModal setFormsubmitSuccsess={setFormsubmitSuccsess} formsubmitSuccsess={formsubmitSuccsess} />


        </section>
    )
}

export default BannerCwp;

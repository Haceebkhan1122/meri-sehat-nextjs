import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import modalimage from "../../../public/svg/modalimage.svg"
import Image from 'next/image';
import API from '@/utils/httpService';
import Loader from '@/components/Loader';
import parse from 'html-react-parser';

function wellnessProgrammBanner({ corporateData }) {

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
  const [widgets, setWidgets] = useState([]) 
  let endpoint = "/corporate-wellness-request"

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const companyDomain = '@gmail.com';
    // const companyDomain1 = '@outlook.com';
    // const companyDomain2 = '@yahoo.com';
    // const companyDomain3 = '@merisehat.com';
    // const companyDomain4 = '@hotmail.com';
    // const companyDomain5 = '@merisehat.pk';

    // if (emailPattern.test(email) && (email.endsWith(companyDomain) || email.endsWith(companyDomain1) || email.endsWith(companyDomain2) || email.endsWith(companyDomain3) || email.endsWith(companyDomain4) || email.endsWith(companyDomain5) )) {
    if (emailPattern.test(email)) {
      return true;
    }
    return false;
  };

  const handleChange = (e, type) => {
    let value = e.target.value;

    // if (type === "name") {
    //   if (!firstName) {
    //     setErrorName("* Please enter a valid name");
    //   }
    //   else {
    //     setFirstName(value)
    //     setErrorName("")
    //   }
    // }

    if (type === "name") {
        // setFirstName(value)
        setFirstName(value.replace(/[0-9]/g, ''));
        setErrorName("")
    }

    if (type === 'phone') {
      let validate = /^\d+$/.test(e.target.value);
      let val = validate ? e.target.value.trim() : "";
      const phoneCheck1 = "03";
      const phoneCheck2 = "923";

      if (!val.startsWith(phoneCheck1) && !val.startsWith(phoneCheck2) && val.length > 11) {
        val = val.slice(0, 11);
      }
      else if (val.startsWith(phoneCheck1) && val.length > 11) {
        val = val.slice(0, 11);
        setErrorPhone("");
      }
      else if (val.startsWith(phoneCheck2) && val.length > 12) {
        val = val.slice(0, 12);
        setErrorPhone("");
      }
      if (val.startsWith(phoneCheck1) || val.startsWith(phoneCheck2)) {
        setErrorPhone("");
      } else {
        setErrorPhone("* Please enter a valid number");
      }
      setPhoneNumber(val);
    }

    // if (type === 'company') {
    //   if (!companyName) {
    //     setErrorCompanyName("* Please enter a valid Company");
    //   }
    //   else {
    //     setCompanyName(value);
    //     setErrorCompanyName("")
    //   }
    // }

    if (type === 'company') {
        setCompanyName(value.replace(/[0-9]/g, ''));
        setErrorCompanyName("")
    }

    if (type === 'email') {
      let val = e.target.value;
      setEmail(val);
      const validEmail = validateEmail(val);
      if (validEmail) {
        setEmail(val)
        setErrorEmail("")
      }
      else {
        setErrorEmail("* Please enter a vaild email address")
      }
    }
  }

  const checkPhoneNumber = (phoneNumber) => {
      if (phoneNumber.startsWith('92')) {
        return '0' + phoneNumber.slice(2);
      } else if (phoneNumber.startsWith('0')) {
        return phoneNumber;
      } else {
        return phoneNumber;
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = {};
    obj.name = firstName;
    obj.phone = checkPhoneNumber(phoneNumber); 
    obj.company_name = companyName;
    obj.company_email = email;

    let validEmail = validateEmail(obj.company_email);
    let validPhone = Object.keys(obj.phone).length === 11
    let validPhone92 = Object.keys(obj.phone).length === 12

    if (!validPhone || validPhone92 ) {
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

    if (firstName && companyName && validEmail && errorPhone == "" && (validPhone || validPhone92)) {
      try {
        const response = await API.post(`${endpoint}`, obj)
        setLoader(true);
        setFirstName("")
        setPhoneNumber("")
        setCompanyName("")
        setEmail("")
        setErrorEmail("")
        setErrorPhone("")
        if (response?.code === 200) {
          setFormSubmit(true);
          setLoader(false);
        }
        else {
          setFormSubmit(false);
          setLoader(false);
        }
      } catch (error) {
        setFormSubmit(false);
        setLoader(false);
      }
    }
    else {
      console.log("error")
      setLoader(false)
    }
  }

  const doneClicked = () => {
    setFormSubmit(false)
  }

  useEffect(() => {
    if (corporateData) {
      let widjets = corporateData.widgets.map((item) => {
        return item;
      })
      setWidgets(widjets)
    }
  }, [])

  return (
    <div className='bannerTopBox'>
      <div className='bannerWPB '>
      {loader && <Loader />}
      <Row className='h-100'>
        <Col lg={6}>
          <h2 className='ml5'> {widgets[0]?.heading} </h2>
          <p> {widgets[0]?.description && parse(widgets[0]?.description)} </p>
        </Col>
        <Col lg={6} className='h-100 d'>

          <Form className='cwpForm'>
            <h3>Register with us</h3>
            <Row>
              <Col lg={6} xs={6} className='collllling'>
                <Form.Group className="mb-3 moving"  >
                  <Form.Control type="text" placeholder="Full Name" name='name' autoComplete={false} value={firstName} className='form01' onChange={(e) => handleChange(e, "name")} maxLength={30} />
                  {errorName !== "" && <p className="errorState"> {errorName} </p>}
                </Form.Group>
              </Col>
              <Col lg={6} xs={6} className='collllling'>
                <Form.Group className={errorPhone ? "errorng mb-3" : "mb-3 moving"}>
                  <Form.Control
                    type="text"
                    value={phoneNumber}
                    placeholder="Mobile Number"
                    name='phone'
                    className='form01'
                    onChange={(e) => handleChange(e, "phone")}
                  />
                  {errorPhone !== "" && <p className="errorState"> {errorPhone} </p>}
                </Form.Group>
              </Col>
              <Col lg={6} xs={6} className='collllling'>
                <Form.Group className="mb-3 moving"  >
                  <Form.Control type="text" placeholder="Company Name" name='companyname' value={companyName} className='form01' onChange={(e) => handleChange(e, "company")} maxLength={30} />
                  {errorCompanyName !== "" && <p className="errorState"> {errorCompanyName} </p>}
                </Form.Group>
              </Col>
              <Col lg={6} xs={6} className='collllling'>
                <Form.Group className={errorEmail ? "errorng mb-3" : "mb-3 moving"}>
                  <Form.Control type="email" placeholder="Company Email" name='email' className='form01' value={email} maxLength={30} onChange={(e) => handleChange(e, "email")} />
                  {errorEmail !== "" && <p className="errorState"> {errorEmail} </p>}
                </Form.Group>
              </Col>
              <Col lg={12} xs={12}>
                <Button variant="primary" className='register' onClick={handleSubmit} style={{ marginTop: '12px' }}>
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Modal
        title=""
        centered
        open={formSubmit}
        onOk={() => setFormSubmit(false)}
        onCancel={() => setFormSubmit(false)}
        className='modalSubmitForm'
      >
        <div className='formArea '>
          <Image src={modalimage} className='img-fluid' />
          <h4>Registration Successful </h4>
          <p>You have successfully registered to our Corporate Wellness Program.</p>
          <h6>For help or queries, call us at <a href="tel:(021)-111-111-111">(021)-111-111-111</a></h6>
          <button className='btn_submit' onClick={doneClicked}>Done</button>
        </div>
      </Modal>
    </div>
    </div>
  )
}

export default wellnessProgrammBanner
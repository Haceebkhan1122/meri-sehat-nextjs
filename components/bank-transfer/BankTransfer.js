import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import { Button, Row, Col, Container } from "react-bootstrap";
import TickPayment from "../../public/png/tick_pay.png";
import styled from "styled-components";
import { FiChevronRight } from "react-icons/fi";
import Arrow from "../../public/svg/RoundArrow.svg";
import downloadIcon from "../../public/svg/download-icon.svg";

import nameIcon from "../../public/svg/name-icon.svg";
import dateIcon from "../../public/svg/date-icon.svg";
import paymentIcon from "../../public/svg/payment-icon.svg";
import timeIcon from "../../public/svg/time-icon.svg";
import totalIcon from "../../public/svg/total-icon.svg";
import Accordion from 'react-bootstrap/Accordion';
import moment from "moment";

function BankTransfer({ labReceiptData, referenceId }) {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        import("react-device-detect").then((item) => {
            setIsMobile(item.isMobile);
        });
    }, []);
    const BackToHome = () => {
        window.location.href = "/";
    };

    const timeTest = labReceiptData?.cart?.cart_detail?.time;
    const parsedTime = moment(timeTest, 'HH:mm').format("h:mm A");

    return (
        <>
            <div className="bg_color_payment_subscription_page py-4 mt-4 bankTransfer paymentConfirmedBox">
                <div className="modal_for_redirecting pay_successfull_subs_modal h-100">
                    <Container className=" h-100">
                        <Row className=" h-100">
                            <Col md={5} lg={5} className="m-auto mt-4">
                                <div className="modal-body">
                                    <div className="loader_spinner mb-3">
                                        <Image src={TickPayment} alt="Ticker" />
                                    </div>
                                    <div className="inner_d for_payment-succesful">
                                        <div className="for_payment_succesful_top">
                                            <h3 className="mb-3">Booking Confirmed</h3>
                                            {/* <p>Thank you for signing up - <Link className='linkHover' style={{ color: '#0645AD', fontWeight: '300' }} to="/pricing">Click here</Link> to learn about all the features and benefits of your package</p> */}
                                            <p className="mb-3 dd">
                                                Dear Customer, your lab tests have been<br></br>
                                                booked successfully.

                                            </p>
                                            <span className="mb-3">
                                                <b>Order ID: </b>
                                                {labReceiptData?.id}
                                            </span>
                                        </div>
                                        <div className="blueTextBox d-lg-block d-none">
                                            {isMobile ? (
                                                <>

                                                </>
                                            ) :
                                                (<> <p>
                                                    You have selected tests that require further instructions, our representative will get in touch and guide you accordingly.
                                                </p></>)
                                            }

                                        </div>
                                        {/* {isMobile ? (
                                            <>
                                                <Accordion defaultActiveKey="0" className="mobile_bankTransfer">

                                                    <Accordion.Item eventKey="1">
                                                        <Accordion.Header>Order Details</Accordion.Header>
                                                        <Accordion.Body>
                                                            <div className="payment_recceipt pt-0 w-100 h-auto">

                                                                <div className="hk_user_letter mob_b_0  ">
                                                                    <div class="d-flex align-items-center justify-content-between mb-3 innerDataPayment pt-2 px-4">
                                                                        <h3 className="d-flex align-items-center">
                                                                            <Image
                                                                                src={nameIcon}
                                                                                alt="Download"
                                                                                className="me-2"
                                                                            />

                                                                            <span>Name</span>
                                                                        </h3>
                                                                        <h5>{labReceiptData?.cart?.cart_detail?.name}</h5>
                                                                    </div>
                                                                    <div class="d-flex align-items-center justify-content-between mb-3 innerDataPayment pt-2 px-4">
                                                                        <h3 className="d-flex align-items-center">
                                                                            <Image
                                                                                src={dateIcon}
                                                                                alt="Download"
                                                                                className="me-2"
                                                                            />

                                                                            <span>Date</span>
                                                                        </h3>
                                                                        <h5>{moment(labReceiptData?.cart?.cart_detail?.date).format('D MMM, YYYY')}</h5>
                                                                    </div>
                                                                    <div class="d-flex align-items-center justify-content-between mb-3 innerDataPayment pt-2 px-4">
                                                                        <h3 className="d-flex align-items-center">
                                                                            <Image
                                                                                src={timeIcon}
                                                                                alt="Download"
                                                                                className="me-2"
                                                                            />

                                                                            <span>Time</span>
                                                                        </h3>
                                                                        <h5>{parsedTime}</h5>
                                                                    </div>
                                                                    <div class="d-flex align-items-center justify-content-between mb-3 innerDataPayment pt-2 px-4">
                                                                        <h3 className="d-flex align-items-center">
                                                                            <Image
                                                                                src={paymentIcon}
                                                                                alt="Download"
                                                                                className="me-2"
                                                                            />
                                                                                <span>Payment Method</span>
                                                                        </h3>
                                                                        <h5>{labReceiptData?.payment_method_value}</h5>
                                                                    </div>
                                                                    <div class="d-flex align-items-center justify-content-between mb-3 innerDataPayment pt-2 px-4">
                                                                        <h3 className="d-flex align-items-center">
                                                                            <Image
                                                                                src={totalIcon}
                                                                                alt="Download"
                                                                                className="me-2"
                                                                            />

                                                                            <span>Total</span>
                                                                        </h3>
                                                                        <h5>PKR  {labReceiptData?.cart?.FinalAmountFormated}</h5>
                                                                    </div>
                                                                </div>


                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </>
                                        ) : ( */}
                                            <>
                                                <div className="payment_recceipt pt-0 w-100 h-auto">
                                                    <div className="hk_user_letter ddd">
                                                        {isMobile ? (
                                                                   <div class="d-flex align-items-center forMobileStylingReceipt justify-content-between for_border_gross py-3 px-4">
                                                                   <h3>Receipt</h3>
                                                               </div>
                                                        ) : (
                                                            <div class="d-flex align-items-center justify-content-between for_border_gross py-3 px-4">
                                                            <h3>Order Details</h3>
                                                        </div>
                                                        )}
                                                 
                                                    </div>
                                                    <div className="hk_user_letter mob_b_0 pt-3">
                                                        <div class="d-flex align-items-center justify-content-between mb-3 innerDataPayment pt-2 px-4">
                                                            <h3 className="d-flex align-items-center">
                                                                <Image
                                                                    src={nameIcon}
                                                                    alt="Download"
                                                                    className="me-2"
                                                                />

                                                                <span>Name</span>
                                                            </h3>
                                                            {labReceiptData?.cart?.cart_detail?.name}
                                                        </div>
                                                        <div class="d-flex align-items-center justify-content-between mb-3 innerDataPayment pt-2 px-4">
                                                            <h3 className="d-flex align-items-center">
                                                                <Image
                                                                    src={dateIcon}
                                                                    alt="Download"
                                                                    className="me-2"
                                                                />

                                                                <span>Date</span>
                                                            </h3>
                                                            <h5>{moment(labReceiptData?.cart?.cart_detail?.date).format('D MMM, YYYY')}</h5>
                                                        </div>
                                                        <div class="d-flex align-items-center justify-content-between mb-3 innerDataPayment pt-2 px-4">
                                                            <h3 className="d-flex align-items-center">
                                                                <Image
                                                                    src={timeIcon}
                                                                    alt="Download"
                                                                    className="me-2"
                                                                />

                                                                <span>Time</span>
                                                            </h3>
                                                            <h5>{parsedTime}</h5>
                                                        </div>
                                                        <div class="d-flex align-items-center justify-content-between mb-3 innerDataPayment pt-2 px-4">
                                                            <h3 className="d-flex align-items-center">
                                                                <Image
                                                                    src={paymentIcon}
                                                                    alt="Download"
                                                                    className="me-2"
                                                                />

                                                                <span>Payment Method</span>
                                                            </h3>
                                                            <h5>{labReceiptData?.payment_method_value}</h5>
                                                        </div>
                                                        <div class="d-flex align-items-center justify-content-between mb-3 innerDataPayment pt-2 px-4">
                                                            <h3 className="d-flex align-items-center">
                                                                <Image
                                                                    src={totalIcon}
                                                                    alt="Download"
                                                                    className="me-2"
                                                                />

                                                                <span>Total</span>
                                                            </h3>
                                                            <h5>PKR  {labReceiptData?.cart?.FinalAmountFormated}</h5>
                                                        </div>
                                                    </div>


                                                </div>
                                            </>
                                        {/* )} */}


                                            {isMobile ? (
                                                <>
                                                </>
                                            ) : (
                                            <div className="instruction text-start">
                                            <h4>Instructions</h4>
                                            <ol className="">
                                                <li>Transfer the amount to the account mentioned below</li>
                                                <li>Take a screenshot of the completed transaction</li>
                                                <li>WhatsApp the screenshot to: <a href="tel:03006528977"> 03006528977</a></li>

                                            </ol>
                                        </div>
                                        )}
                                        {isMobile ? (
                                                <div className="forQueriesBankTransfer mt-4">

                                                 <p className="my-4">
                                                 For help or queries, call us at{" "}
                                                 <a href="tel:021-111-111-111">(021)-111-111-111</a> 
                                             </p>
                                             </div>

                                        ) : <></>}
                                        
                                        {/* {isMobile ? (
                                            <><div className="blueTextBox mob_detail">
                                                <p className="text-start">  Account Number  <br></br><b>10607801038502</b> (Branch code: 1060)</p>
                                                <p className="text-start">  Account Title <br></br><b>Meri Sehat</b>  </p>
                                                <p className="text-start">  Bank  <br></br><b>Habib Bank Ltd </b> (Branch code: 1060)</p>
                                                <p className="text-start"> IBAN <br></br><b>PK68 HABB 0010607901038503</b>  </p>
                                            </div>
                                            </>
                                        ) :
                                            (<>  </>)
                                        }
                                        {isMobile ? (
                                            <>
                                                <div className="forQueries mt-4">
                                                    <div className="button-instant-box col-md-8 m-auto">
                                                        <button className="review-button fw-700 receipt-instant-btn text-uppercase position-relative w-100">
                                                            SEND SCREENSHOT
                                                        </button>
                                                    </div>
                                                    <p className="my-4">
                                                        For help or queries, call us at{" "}
                                                        <a href="tel:021-111-111-111">(021)-111-111-111</a>
                                                    </p>

                                                </div>
                                            </>
                                        ) : (
                                            <>
                                            </>
                                        )} */}

                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default BankTransfer;

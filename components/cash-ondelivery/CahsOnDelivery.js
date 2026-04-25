import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Row, Col, Container } from "react-bootstrap";
import TickPayment from "../../public/png/tick_pay.png";
import downloadIcon from "../../public/svg/download-icon.svg";
import nameIcon from "../../public/svg/name-icon.svg";
import dateIcon from "../../public/svg/date-icon.svg";
import paymentIcon from "../../public/svg/payment-icon.svg";
import timeIcon from "../../public/svg/time-icon.svg";
import totalIcon from "../../public/svg/total-icon.svg";
import moment from "moment";
import Cookies from "js-cookie";

function CashOnDelivery({ bookingDetails, bookingDetailsData, referenceId }) {
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        import("react-device-detect").then((item) => {
            setIsMobile(item.isMobile);
        });
    }, []);
    const backTolandingPage = () => {
        window.location.href = "/lab-test";
        Cookies.remove('cart')
    };

    const parsedDateTime = moment(bookingDetails?.created_at);
    const formattedDateTime = parsedDateTime.format('h:mm A');

    const parsedDateTimeTwo = moment(bookingDetailsData && bookingDetailsData?.created_at);
    const formattedDateTimeTwo = parsedDateTimeTwo.format('hh:mm A');
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


    //  download API //??
    const downloadDoc = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${BASE_URL}/lab-receipt-download?reference_id=${referenceId ? referenceId : bookingDetailsData?.id}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: Cookies.get('Authorization'),
                        'Access-Control-Allow-Origin': '*',
                        platform: 'web',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error(response);
            }

            const blob = await response.blob();
            const filename = `Payment_Receipt`;

            const url = window.URL.createObjectURL(
                new Blob([blob], { type: 'application/pdf' })
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };
    //   download API //??


    return (
        <>
            <div className="bg_color_payment_subscription_page py-4 mt-4 paymentConfirmedBox">
                <div className="modal_for_redirecting pay_successfull_subs_modal h-100">
                    <Container className=" h-100">
                        <Row className=" h-100">
                            <Col md={5} lg={5} className="m-auto mt-4">
                                <div className="modal-body">
                                    <div className="loader_spinner mb-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                            <path d="M44 20C44 31.045 35.045 40 24 40C12.955 40 4 31.045 4 20C4 8.955 12.955 0 24 0C35.045 0 44 8.955 44 20Z" fill="#DDF9D1" />
                                            <path d="M31.8351 13L21.4509 23.5909L17.1641 19.2364L15 21.4409L21.454 28L34 15.2046L31.8351 13Z" fill="#59D129" />
                                        </svg>
                                        <Image src={TickPayment} alt="Ticker" className="d-none" />
                                    </div>
                                    <div className="inner_d for_payment-succesful">
                                        <div className="for_payment_succesful_top">
                                            <h3 className="mb-3 font-18">Booking Confirmed</h3>
                                            {/* <p>Thank you for signing up - <Link className='linkHover' style={{ color: '#0645AD', fontWeight: '300' }} to="/pricing">Click here</Link> to learn about all the features and benefits of your package</p> */}
                                            <p className="mb-3">
                                                <span className="bookedSuccessfully">
                                                    Dear Customer, your lab tests have been
                                                    booked successfully.
                                                </span>
                                                <span className="d-lg-none d-block text-blue">
                                                    Our customer service team will be in touch shortly to assist you by verifying your details.
                                                </span>
                                            </p>
                                            <span className="mb-3">
                                                <b>Order ID: </b>
                                                {bookingDetails?.transaction_details?.id ? bookingDetails?.transaction_details?.id : bookingDetailsData?.transaction_details?.id}
                                            </span>
                                        </div>
                                        <div className="blueTextBox">
                                            {isMobile ? (
                                                <>
                                                    <p className="text-start text11"> <b>Glucose Fasting</b>: For a fasting blood glucose test, you can't eat anything for 8 to 12 hours before the test. You should drink only water.</p>
                                                </>
                                            ) :
                                                (<> <p>
                                                    You have selected tests that require further
                                                    instructions, our representative will get in touch and
                                                    guide you accordingly.
                                                </p></>)
                                            }

                                        </div>
                                        <div className="payment_recceipt pt-0 w-100 h-auto">
                                            <div className="hk_user_letter bb001">
                                                <div class="d-flex align-items-center justify-content-between for_border_gross py-3 px-4">
                                                    <h3 className="labTest">Lab test</h3>
                                                    <h5 onClick={downloadDoc} style={{ cursor: 'pointer' }}>
                                                        <Image src={downloadIcon} alt="Download" />
                                                        <span className="text-uppercase ms-2 color_gry font10 ">
                                                            DOWNLOAD RECIEPT
                                                        </span>
                                                    </h5>

                                                </div>
                                            </div>
                                            <div className="hk_user_letter mob_bb_0 forBorderOnly">
                                                <div class="d-flex align-items-center justify-content-between mb-3 innerDataPayment pt-2 px-4">
                                                    <h3 className="d-flex align-items-center">
                                                        <Image
                                                            src={nameIcon}
                                                            alt="Download"
                                                            className="me-2"
                                                        />

                                                        <span>Name</span>
                                                    </h3>
                                                    <h5>{bookingDetails?.cart_detail?.name ? bookingDetails?.cart_detail?.name : bookingDetailsData?.cart_detail?.name}</h5>
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
                                                    {/*  */}
                                                    <h5>{bookingDetails?.transaction_details?.buy_date && moment(bookingDetails?.transaction_details?.buy_date).format('D MMM, YYYY')}</h5>
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
                                                    <h5>{formattedDateTimeTwo && formattedDateTimeTwo}</h5>
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
                                                    <h5>Cash on delivery</h5>
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
                                                    <h5>PKR {bookingDetails?.FinalAmountFormated ? bookingDetails?.FinalAmountFormated : bookingDetailsData?.FinalAmountFormated}</h5>
                                                </div>
                                            </div>
                                            {isMobile ? (
                                                <></>
                                            ) : (
                                                <>
                                                    <div className="forQueries">
                                                        <p className="my-4">
                                                            For help or queries, call us at{" "}
                                                            <a href="tel:021-111-111-111">(021)-111-111-111</a>
                                                        </p>
                                                        <div className="button-instant-box col-md-8 m-auto">
                                                            <button onClick={backTolandingPage} className="review-button fw-700 receipt-instant-btn text-uppercase position-relative w-100">
                                                                Okay
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                        </div>

                                        {isMobile ? (
                                            <>
                                                <div className="forQueries">
                                                    <p className="my-4">
                                                        For help or queries, call us at{" "}
                                                        <a href="tel:021-111-111-111">(021)-111-111-111</a>
                                                    </p>
                                                    <div className="button-instant-box col-md-8 m-auto">
                                                        <button onClick={backTolandingPage} className="review-button fw-700 receipt-instant-btn text-uppercase position-relative w-100">
                                                            Okay
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>

                                            </>
                                        )}

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

export default CashOnDelivery;

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Row, Col, Container } from "react-bootstrap";
import TickPayment from "../../public/png/tick_pay.png";
import downloadIcon from "../../public/svg/blueDownloadIcon.svg";
import moment from 'moment';
import downloadmob from "../../public/png/downloadmob.png";
import nameIcon from "../../public/svg/name-icon.svg";
import dateIcon from "../../public/svg/date-icon.svg";
import paymentIcon from "../../public/svg/payment-icon.svg";
import timeIcon from "../../public/svg/time-icon.svg";
import totalIcon from "../../public/svg/total-icon.svg";
import Loader from "../../components/customLoader/Loader";
import Cookies from "js-cookie";

function PaymentConfirmed({ labReceiptData, referenceId }) {

  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    import("react-device-detect").then((item) => {
      setIsMobile(item.isMobile);
    });
  }, []);
  const BackToHome = () => {
    window.location.href = "/";
  };

  //  ref id abhi bhi reh gai hAI ""

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


  // download API //??
  const downloadDoc = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/lab-receipt-download?reference_id=${referenceId}`,
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
  // download API //??




  const timeTest = labReceiptData?.cart?.cart_detail?.time;
  const parsedTime = moment(timeTest, 'HH:mm').format("h:mm A");
  // code for converting time 

  return (
    <>
      <div className="bg_color_payment_subscription_page py-4 paymentConfirmedBox">
        {loading && (
          <Loader />
        )}
        <div className="modal_for_redirecting pay_successfull_subs_modal h-100 modal_credit">
          <Container className=" h-100">
            <Row className=" h-100">
              <Col md={5} lg={5} className="m-auto mt-4">
                <div className="modal-body">
                  <div className="loader_spinner mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <path d="M44 20C44 31.045 35.045 40 24 40C12.955 40 4 31.045 4 20C4 8.955 12.955 0 24 0C35.045 0 44 8.955 44 20Z" fill="#DDF9D1" />
                      <path d="M31.8351 13L21.4509 23.5909L17.1641 19.2364L15 21.4409L21.454 28L34 15.2046L31.8351 13Z" fill="#59D129" />
                    </svg>
                  </div>
                  <div className="inner_d seperateSuccesful for_payment-succesful">
                    <div className="for_payment_succesful_top">
                      <h3 className="mb-3">Payment Confirmed</h3>
                      {/* <p>Thank you for signing up - <Link className='linkHover' style={{ color: '#0645AD', fontWeight: '300' }} to="/pricing">Click here</Link> to learn about all the features and benefits of your package</p> */}
                      {isMobile ? (
                        <p className="mb-3 ThankyoupaymentConfirm" >
                          Thank you for your payment. Please find the summary of
                          your order details below.
                        </p>
                      ) : (
                        <p className="mb-3 " >
                          Thank you for your payment. <br /> Please find the summary of
                          your order details below.
                        </p>
                      )}
                      <span className="mb-3">
                        <b>Order ID: </b>
                        {labReceiptData?.id}
                      </span>
                    </div>
                    <div className="blueTextBox">
                      <p >
                        You have selected tests that require further
                        instructions, our representative will get in touch and
                        guide you accordingly.
                      </p>
                    </div>
                    <div className="payment_recceipt pt-0 w-100 h-auto">
                      <div className="hk_user_letter">
                        <div class={`d-flex align-items-center justify-content-between for_border_gross py-3 ${isMobile ? 'px-2' : 'px-4'}`}>
                          <h3>Lab test</h3>
                          {isMobile ?
                            (
                              <>
                                <h5 onClick={downloadDoc} style={{ cursor: 'pointer' }}>
                                  <Image src={downloadmob} alt="Download" />
                                  <span className="text-uppercase ms-2">
                                    Download
                                  </span>
                                </h5>
                              </>
                            ) : (
                              <>
                                <h5 onClick={downloadDoc} style={{ cursor: 'pointer' }} >
                                  <Image src={downloadIcon} alt="Download" />
                                  <span className="text-uppercase ms-2">
                                    Download receipt
                                  </span>
                                </h5>
                              </>
                            )}

                        </div>
                      </div>
                      <div className={`hk_user_letter mob_bb_0 forBorderOnly ${isMobile ? '' : 'pt-3'} `}>
                        <div class={`d-flex align-items-center justify-content-between mb-3 innerDataPayment pt-2 ${isMobile ? 'px-2' : 'px-4'} `}>
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
                        <div class={`d-flex align-items-center justify-content-between mb-3 innerDataPayment pt-2 ${isMobile ? 'px-2' : 'px-4'} `}>
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
                        <div class={`d-flex align-items-center justify-content-between mb-3 innerDataPayment pt-2 ${isMobile ? 'px-2' : 'px-4'} `}>
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
                        <div class={`d-flex align-items-center justify-content-between mb-3 innerDataPayment pt-2 ${isMobile ? 'px-2' : 'px-4'}`}>
                          <h3 className="d-flex align-items-center">
                            <Image
                              src={paymentIcon}
                              alt="Download"
                              className="me-2"
                            />
                            {isMobile ?
                              <span className="text-left" >Payment Method</span> :
                              <span>Payment Method</span>
                            }
                          </h3>
                          <h5 className="paymentMethodM">{labReceiptData?.payment_method_value}</h5>
                        </div>
                        <div class={`d-flex align-items-center justify-content-between mb-3 innerDataPayment pt-2 ${isMobile ? 'px-2' : 'px-4'} `}>
                          <h3 className="d-flex align-items-center">
                            <Image
                              src={totalIcon}
                              alt="Download"
                              className="me-2"
                            />

                            <span>Total</span>
                          </h3>
                          <h5>PKR {labReceiptData?.cart?.FinalAmountFormated}</h5>
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
                              <button onClick={BackToHome} className="review-button fw-700 receipt-instant-btn text-uppercase position-relative w-100">
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
                          <p className="my-4 confirmPaymentss">
                            For help or queries, call us at{" "}
                            <a href="tel:021-111-111-111">(021)-111-111-111</a>
                          </p>
                          <div className="button-instant-box col-md-8 m-auto">
                            <button onClick={BackToHome} className="review-button fw-700 receipt-instant-btn text-uppercase position-relative w-100">
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

export default PaymentConfirmed;

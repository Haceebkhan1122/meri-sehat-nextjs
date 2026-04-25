import React from "react";
import Image from "next/image";
import { Row, Col, Container, Modal } from "react-bootstrap";
import styled from "styled-components";
import paymentFailed from "../../public/png/errorIcon.png";
import paymentIcon from "../../public/svg/payment-icon.svg";
import totalIcon from "../../public/svg/total-icon.svg";
import { isMobile } from "react-device-detect";

function PaymentFailed({ labReceiptData, changePaymentMethod }) {

  const show = true;

  return (
    <>
      {isMobile ?
        <Modal show={show} centered className="payment_failed_modal">
          <Modal.Body>
            {/* <div className="bg_color_payment_subscription_page py-4 mt-4 paymentConfirmedBox"> */}
              {/* ---------------------------failed------------------------ */}
              <div className="modal_for_redirecting pay_successfull_subs_modal pay_failed_subs_modal h-100">
                <Container className=" h-100">
                  <Row className=" h-100">
                    <Col md={5} lg={5} className="m-auto">
                      <div className="modal-body">
                        <div className="loader_spinner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                          <path d="M15 0C6.72 0 0 6.72 0 15C0 23.28 6.72 30 15 30C23.28 30 30 23.28 30 15C30 6.72 23.28 0 15 0ZM16.5 22.5H13.5V19.5H16.5V22.5ZM16.5 16.5H13.5V7.5H16.5V16.5Z" fill="#19B3B5" />
                        </svg>
                        </div>


                        
                        <div className="inner_d forPyamentFailedDesc for_payment-succesful">
                          <h3 className="paymentFailedHead" >Payment Failed</h3>
                          <p className="newFailedClass" >
                            Your transaction could not be completed. Please use another payment method to proceed.
                          </p>

                          <button onClick={changePaymentMethod} className="review-button mt-4 w-100 add-continue-btn  text-uppercase position-relative">
                            CHANGE PAYMENT METHOD
                          </button>

                          <div className="payment_recceipt pt-0 w-100 h-auto">
                            <div className="hk_user_letter">
                              <div class="d-flex align-items-center justify-content-between for_border_gross pt-3 pb-2 px-4">
                                <h3>Lab test</h3>
                              </div>
                            </div>
                            <div class="d-flex align-items-center justify-content-between my-3 innerDataPayment pt-2 px-4">
                              <h3 className="d-flex align-items-center">
                                <Image
                                  src={paymentIcon}
                                  alt="Download"
                                  className="me-2"
                                  width={12}
                                  height={12}
                                />

                                <span>Payment Method</span>
                              </h3>
                              <h5>{labReceiptData?.payment_method_value}</h5>
                            </div>
                            <div class="d-flex align-items-center justify-content-between innerDataPayment pt-2 px-4">
                              <h3 className="d-flex align-items-center">
                                <Image
                                  src={totalIcon}
                                  alt="Download"
                                  className="me-2"
                                  width={12}
                                  height={9}
                                />

                                <span>Total</span>
                              </h3>
                              <h5><span style={{textTransform : "uppercase"}}> PKR </span> {labReceiptData?.cart?.final_amount}</h5>
                            </div>
                          </div>
                          <div className="forQueries">
                            <p className="mt-3 para_payment_failed">
                              For help or queries, call us at{" "}
                              <a className="num_payment_failed" href="tel:021-111-111-111">(021)-111-111-111</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            {/* </div> */}
          </Modal.Body>
        </Modal>
        :
        <div className="bg_color_payment_subscription_page py-4 mt-4 paymentConfirmedBox">
          {/* ---------------------------failed------------------------ */}
          <div className="modal_for_redirecting pay_successfull_subs_modal pay_failed_subs_modal h-100">
            <Container className=" h-100">
              <Row className=" h-100">
                <Col md={5} lg={5} className="m-auto">
                  <div className="modal-body">
                    <div className="loader_spinner d-lg-block d-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 40 40" fill="none">
                        <path d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM22 30H18V26H22V30ZM22 22H18V10H22V22Z" fill="#F06386" />
                      </svg>
                    </div>
 
                        <div className="loader_spinner d-block d-lg-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <path d="M15 0C6.72 0 0 6.72 0 15C0 23.28 6.72 30 15 30C23.28 30 30 23.28 30 15C30 6.72 23.28 0 15 0ZM16.5 22.5H13.5V19.5H16.5V22.5ZM16.5 16.5H13.5V7.5H16.5V16.5Z" fill="#19B3B5"/>
                    </svg>
                        </div>


                    <div className="inner_d for_payment-succesful">
                      <h3>Payment Failed</h3>
                      <p>
                        Your transaction could not be completed. Please use another payment method to proceed.
                      </p>

                      <button onClick={changePaymentMethod} className="review-button mt-4 w-100 add-continue-btn  text-uppercase position-relative">
                        CHANGE PAYMENT METHOD
                      </button>

                      <div className="payment_recceipt pt-0 w-100 h-auto">
                        <div className="hk_user_letter">
                          <div class="d-flex align-items-center justify-content-between for_border_gross py-3 px-4">
                            <h3>Lab test</h3>
                          </div>
                        </div>

                        <div class="d-flex align-items-center justify-content-between my-3 innerDataPayment pt-2 px-4">
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
                        <div class="d-flex align-items-center justify-content-between innerDataPayment pt-2 px-4">
                          <h3 className="d-flex align-items-center">
                            <Image
                              src={totalIcon}
                              alt="Download"
                              className="me-2"
                            />

                            <span>Total</span>
                          </h3>
                          <h5>PKR {labReceiptData?.cart?.final_amount}</h5>
                        </div>
                      </div>
                      <div className="forQueries">
                        <p className="mt-3">
                          For help or queries, call us at{" "}
                          <a href="tel:021-111-111-111">(021)-111-111-111</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      }
    </>
  );
}
export const StyledContinueNumber = styled.section`
  .continue-number-box {
    background-color: #c9e9ea;
    border-radius: 12px;
  }
  .continue-heading {
    padding: 0 40px;
    margin-top: 50px;

    h4 {
      font-family: "Nunito";
      font-style: normal;
      font-weight: 500;
      font-size: 30px;
      line-height: 41px;
      letter-spacing: 0.01em;
      color: #0F345A;
    }

    p {
      font-family: "Circular Std";
      font-style: normal;
      font-weight: 300;
      font-size: 18px;
      line-height: 25px;

      color: #404040;
    }
  }

  .description-circle-group {
    margin-left: 2.3rem;
    margin-top: 25px;
  }

  .line-divider {
    display: flex;
    justify-content: center;
    padding: 15px 4px 0 4px;

    span {
      margin-top: 10px;
      padding: 0 4px;
    }
  }

  .continue-phone-btn {
    border-radius: 12px;
    background-color: #19b3b5;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 53px;
    padding: 0;
    width: 100%;

    .continue-phone-chevron {
      float: right;
      background-color: #078a8e !important;
      font-size: 16px;
      height: 44px;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0px 10px 10px 0px;
      position: absolute;
      right: 0;
      left: auto;
    }
  }

  .boxLineCut {
    border: 0.3px solid #0F345A;
    height: auto;
    width: 100%;
    margin: auto;
    padding: 0px 35px 0px 5px;
    padding-bottom: 1rem;
    margin-top: 100px;

    .btn-apple12 {
      width: 100%;
      cursor: pointer;
    }
  }

  .boxLineCut h1 {
    width: 75%;
    margin-top: -15px;
    margin-left: auto;
    margin-right: auto;
    background: #f3f3f3;
    font-size: 16px;
    line-height: 28px;
    text-align: center;
  }
`;
export default PaymentFailed;

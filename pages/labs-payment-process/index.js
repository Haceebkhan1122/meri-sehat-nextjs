import React, { useState, useEffect} from "react";
import { Col, Container, Row, Modal } from "react-bootstrap";
import { wrapper } from "@/store/store";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDispatch } from "react-redux";
import { addTranslation } from "@/store/translationSlice";
import { useSelector } from "react-redux";
import { Radio, Switch } from "antd";
import Image from "next/image";
import cardImage from "../../public/svg/card-img.svg";
import appPay from "../../public/svg/jzEp.png";
import detailIicon from "../../public/svg/detail-i.svg";
import Arrow from "../../public/svg/RoundArrow.svg";
import Accordion from "react-bootstrap/Accordion";
import { FiChevronRight } from "react-icons/fi";
import PaymentConfirmed from "../../components/payment-confirmed/PaymentConfirmed";
import PaymentFailed from "../../components/payment-failed/PaymentFailed";
import CahsOnDelivery from "../../components/cash-ondelivery/CahsOnDelivery";
import BankTransfer from "../../components/bank-transfer/BankTransfer";
import { fetchCart,fetchLabPayments } from '@/store/myCartSlice';
import API from "../../utils/httpService";
import {payment, labReceipt} from '../../utils/endpoints';
// import RemoveCartItem from "../../components/removeCartItem/RemoveCartItem";
import { useRouter } from "next/router";
import SpecialInstructions from '../../components/specialInstructions/specialInstructions'
import SpecialInstructionsPackages from '../../components/specialInstructionsPackages/specialInstructionsPackages';
import Loader from "@/components/customLoader/Loader";
import Cookies from "js-cookie";
import { isMobile } from "react-device-detect";
import HeaderOnlyLogo from "../../components/headerOnlyLogo/HeaderOnlyLogo";
import moment from "moment";
import Layer1 from "../../public/svg/Layer-1.svg"
import LayerVector from "../../public/svg/LayerVector.svg"
import visaSvg from '../../public/svg/visa_svg.svg'
import AlertSvg from '../../public/svg/AlertSvg.svg'



export default function index(props) {
  const { _nextI18Next,receiptData } = props;
  const dispatch = useDispatch();
  const router = useRouter();

    useEffect(() => {
      dispatch(fetchCart());
  }, []);

  useEffect(() => {
    dispatch(fetchLabPayments());
}, []);


  const initialLocale = _nextI18Next?.initialLocale;
  const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;
  
  const [i18nData, setI18nData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [methodScreen, setMethodScreen] = useState(true);
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [cashPayment, setCashPayment] = useState(false);
  const [bookingDetailCookie, setBookingDetailCookie] = useState({});
  // const [removeModal, setRemoveModal] = useState(false)
  // const [removeModalData, setRemoveModalData] = useState({})
  const [labReceiptData, setLabReceiptData] = useState({})
  const [instructionsModalListnerLabs, setInstructionsModalListnerLabs] = useState(false)
  const [instructionsModalListnerPackage, setInstructionsModalListnerPackage] = useState(false)
  const [modalData, setModalData] = useState({})
  const [bookingDetails, setBookingDetails] = useState({})
  const [errorSelection, setErrorSelection] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [bankTransfer, setBankTransfer] = useState(false)
  const [saved_cards, setSaved_cards] = useState(false)
  const [savedCard, setSavedCard] = useState(false)
  const [selectedDebit, setSelectedDebit] = useState(false)
  const [isMeriSehatPay, setIsMeriSehatPay] = useState(false)
  const [isAlertShow, setIsAlertShow] = useState(false)
  const [selectedPromocode, setSelectedPromocode] = useState([])


  let i18nDataTwo = useSelector((state) => state.translation.i18n);
  let myCart = useSelector((state) => state.cart.myCartData);
  let labPayments = useSelector((state) => state.cart.paymentData);
  let userDetails = useSelector((state) => state.user.userData);

  useEffect(() => {
    const fetchData = () => {
      if (typeof window !== 'undefined') {
        const bookingDetailsCookie = Cookies.get('bookingDetails');

        if (bookingDetailsCookie) {
          const bookingDetailsData = JSON.parse(bookingDetailsCookie);
          setBookingDetailCookie(bookingDetailsData);
          setMethodScreen(false);
          setCashPayment(true);
        }
      }
    };

    fetchData();

    return () => {
      // Uncomment the next line if you want to remove the cookie on component unmount
      // Cookies.remove('bookingDetails');
    };
  }, []); // Empty dependency array

  // getting promocode from cookies and set into state 
  useEffect(() => {
    try {
      if(Cookies.get('selectedPromocode')){
        const getPromocode = JSON.parse(Cookies.get('selectedPromocode'))
        setSelectedPromocode(getPromocode)  
      }
    } catch (error) {
      console.log(error)
    }
  }, [])
  

  useEffect(() => {
    // const langChecker = Cookies.get("lang");
    // const apiLocale = locale === "ur" || langChecker == "2" ? 2 : 1;
    if (labPayments && Object.keys(labPayments).length > 0) {
      if(router.query.success === 'true' || router.query.success === 'false' ) {
        setApiLoading(true);
        API.get(`${labReceipt}?reference_id=${labPayments?.id}`, {
         headers: {
         platform: "web",
         // locale: apiLocale,
           },
         })
         .then((response) => {
           setApiLoading(false);
           if(response?.code === 200) {
             setLabReceiptData(response.data);
             Cookies.remove('cart')
            //  Cookies.remove("guestId");
           }
           
         })
         .catch((err) => {
           console.error(err);
           setApiLoading(false);

         })
     }
    }
    
  }, [JSON.stringify(labPayments)])

  useEffect(() => {
    if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
      dispatch(addTranslation(i18n));
    }
  }, [i18n]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

  const paymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const BackToDetails = () => {
    window.location.href = "/lab-details";
  };
  
  useEffect(() => {
    if(router.query?.success === 'true'){
      if(labReceiptData?.payment_method_value === 'Bank Account'){
        setMethodScreen(false);
        setPaymentFailed(false);
        setPaymentConfirm(false);
        setBankTransfer(true);
      }
      else{
        setMethodScreen(false);
        setPaymentFailed(false);
        setPaymentConfirm(true);
        Cookies.remove('cart')
      }
    }
    else if(router.query?.success === 'false'){
      setMethodScreen(false);
      setPaymentFailed(true);
      setBankTransfer(false);
      setPaymentConfirm(false);
    }
  }, [labReceiptData])

  // const removeToCartFunc = async (id, isPackage = false) => {
  //   try {
  //     const response = await API.delete(`${removeCart}/${id}${isPackage ? `?is_package=${true}` : ''}`);
  //     if (response?.code === 200) {
  //       dispatch(fetchCart());
  //       setRemoveModal(false)
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

//   const handleRemoveItem = (labTests) => {
//     setRemoveModalData(labTests)
//     if (removeModalData) {
//         setRemoveModal(true)
//     }
// };

const handleModal = (labTests, e) => {
  e.preventDefault();
  setModalData(labTests)
  if (labTests?.lab_test) {
      setInstructionsModalListnerLabs(true)
  }
  else {
      setInstructionsModalListnerPackage(true)
  }
}

  const changePaymentMethod = () => {
    setPaymentFailed(false);
    setMethodScreen(true);
    router.push('/labs-payment-process')
  }

  const callApi = async (e) => {
    if (paymentMethod === '' || (paymentMethod !== 'bank account' && paymentMethod !== 'credit/Debit' && paymentMethod !== 'mobile wallet' && paymentMethod !== 'cash')){
      setErrorSelection('Please select a Payment Method')
    }
    else{
      if(paymentMethod === 'cash'){
        const CardId = 786;
            const body = {
              reference_id: myCart?.id,
              reference_type: 'labs',
              payment_method: 'lab_cash_payment',
              amount: '1',
            }
        const res = await API.post(`${payment}?id=${CardId}`, body)
              if(res.code === 200){
                setMethodScreen(false);
                setCashPayment(true);
                setBookingDetails(res.data);
                Cookies.remove('cart')
                Cookies.remove('selectedPromocode')
                Cookies.set("bookingDetails", JSON.stringify(res.data));
              }
              return res;
        }
        if(paymentMethod === 'bank account'){
        const CardId = 452;
        const body = {
          reference_id: myCart?.id,
          reference_type: 'labs',
          payment_method: '1',
          amount: '1',
        }
        const res = await API.post(`${payment}?id=${CardId}`, body)
        if(res?.data?.redirect_url){
          window.location.href = res?.data?.redirect_url;
        }
        return res;
        }

        if(paymentMethod === 'mobile wallet'){
          const CardId = 452;
          const body = {
            reference_id: myCart?.id,
            reference_type: 'labs',
            payment_method: '4',
            amount: '1',
          }
          const res = await API.post(`${payment}?id=${CardId}`, body)
          if(res?.data?.redirect_url){
            window.location.href = res?.data?.redirect_url;
          }
          return res;
          }
   
        if(paymentMethod === 'credit/Debit'){
        const CardId = 61876;
        const payload = {
          reference_id: myCart?.id,
          reference_type: 'labs',
          payment_method: '3',
          amount: '1',
        };
    
        const res = await API.post(`${payment}?id=${CardId}`, payload)
        if(res?.data?.redirect_url){
          window.location.href = res?.data?.redirect_url;
        }
        return res;
        }
    
        else {
        }
    }
  }

  // const onChange = (checked) => {
  //   console.log(`switch to ${checked}`);
  // };

  const meriSehatPayFunc = (checked) => {
    if(userDetails && labPayments){
      if(labPayments?.final_amount > userDetails?.user?.wallet?.wallet){
        setIsAlertShow(!isAlertShow)
      }      
      setIsMeriSehatPay(checked)
    }
  }

  var totalAmountAfterPromocodeApply = myCart?.final_amount - selectedPromocode?.promocode?.max_discount
  var formattedAmountAfterPromocodeApply = totalAmountAfterPromocodeApply.toLocaleString('en-IN');


  return (
    <>
    <HeaderOnlyLogo />
      <section className="lab-payment-process">
        {apiLoading && <Loader />}
        {methodScreen ? (
          <Container>
            <Row>
              <Col md={11} className="m-auto">
                {/* <div
                  style={{
                    cursor: "pointer",
                    marginTop: "0rem",
                    paddingTop: "0rem",
                  }}
                  className="back_button mb-4 d-none d-md-flex"
                >
                  <Image
                    width={35}
                    height={35}
                    onClick={BackToDetails}
                    src={Arrow}
                    alt="arrow"
                  />
                  <h6
                    className="back-to underline_ancer"
                    onClick={BackToDetails}
                    style={{ fontSize: "16px", color: "#313131" }}
                  >
                    BACK
                  </h6>
                </div> */}
                <div className="d-flex justify-content-center row">
                  <Col md={6}>
                    <div
                      className={`card bg-white test-side-area custom-card1  ${
                        isOpen ? "rotate_accordion" : ""
                      }`}
                    >
                      <Accordion
                        onSelect={(selectedKey) => {
                          setIsOpen((prevIsOpen) => !prevIsOpen);
                        }}
                      >
                        <Accordion.Item
                          className={`${isOpen ? "rotate" : ""}`}
                          eventKey="0"
                        >
                          <Accordion.Header>
                            <div className="d-flex align-items-center w-100 justify-content-between rotate-icon ">
                              <div className="d-flex align-items-center">
                                <div className="img_lab">
                                  <Image
                                    src={labPayments?.lab?.image || ""}
                                    alt=""
                                    className="img-fluid cardImgSet img_labs"
                                    width={79}
                                    height={79}
                                  />
                                </div>
                                <div className="ms-3 mms-0">
                                  <h5 className="hospName mb-0 text-capitalize">
                                    {labPayments?.lab?.lab_name}
                                  </h5>
                                  {labPayments?.lab_cart?.length > 0 ? (
                                      <p className="totalSelectedTest">
                                      {labPayments?.lab_cart?.length} {labPayments?.lab_cart?.length > 0 && labPayments?.lab_cart?.length == 1  ? 'Test' : 'Tests'} Selected
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                              <div className="dateTimeHosp text-right me-2 mme-5">
                                <span className="d-block">
                                  {moment(myCart?.cart_detail?.date_formated).format('MMM D')}
                                </span>
                                <span>
                                  {myCart?.cart_detail?.time_formated}
                                </span>
                              </div>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body className="borderAccordian ">
                            {labPayments?.lab_cart?.length > 0
                              ? labPayments?.lab_cart.map((labTests) => (

                                  <div className=" ">
                                    {labTests?.lab_test === null ? (
                                      <>
                                        <div class="d-flex align-items-center justify-content-between for_border_gross">
                                          <div className="d-flex align-items-center">
                                            <h4
                                              className="text-capitalize"
                                              style={{ color: "#313131" }}
                                            >
                                              {labTests?.package?.name}
                                            </h4>
                                            <div className="detailIicon">
                                              {/* <Image
                                              src={detailIicon}
                                              alt=""
                                              className="img-fluid cardImgSet ms-2"
                                            /> */}
                                              {labTests?.lab_test?.note ||
                                              labTests?.package
                                                ?.introduction ? (
                                                <>
                                                  <Image
                                                    style={{
                                                      cursor: "pointer",
                                                      marginLeft: "6px",
                                                      marginTop: "-5px",
                                                    }}
                                                    onClick={(e) =>
                                                      handleModal(labTests, e)
                                                    }
                                                    src={detailIicon}
                                                    className="img-fluid icon_checkbox"
                                                  ></Image>
                                                </>
                                              ) : null}
                                            </div>
                                          </div>
                                          <div className="d-flex align-items-center">
                                            <h5>
                                              <span>Rs.</span>{" "}
                                              <span>
                                                {
                                                  labTests?.package
                                                    ?.formated_amount
                                                }
                                              </span>
                                            </h5>
                                            {/* <div className="detailIicon">
                                            <Image
                                              src={crossIcon}
                                              alt=""
                                              className="img-fluid cardImgSet ms-2"
                                            />
                                            <RemoveCartItem removeModal={removeModal} removeToCartFunc={removeToCartFunc} setRemoveModal={setRemoveModal} removeModalData={removeModalData}/>
                                          </div> */}
                                          </div>
                                          <SpecialInstructions
                                            instructionsModalListnerLabs={
                                              instructionsModalListnerLabs
                                            }
                                            setInstructionsModalListnerLabs={
                                              setInstructionsModalListnerLabs
                                            }
                                            notes={modalData?.lab_test}
                                          />

                                          <SpecialInstructionsPackages
                                            myCart={myCart}
                                            setInstructionsModalListnerPackage={
                                              setInstructionsModalListnerPackage
                                            }
                                            instructionsModalListnerPackage={
                                              instructionsModalListnerPackage
                                            }
                                            notes={modalData}
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div class="d-flex align-items-center justify-content-between for_border_gross b-0">
                                          <div className="d-flex align-items-center">
                                            <h4
                                              className="text-capitalize mb-0"
                                              style={{ color: "#313131" }}
                                            >
                                              {labTests?.lab_test?.lab_test}{" "}
                                            </h4>
                                            <div className="detailIicon wh-16">
                                              {/* <Image
                                              src={detailIicon}
                                              alt=""
                                              className="img-fluid cardImgSet ms-2"
                                            /> */}
                                              {labTests?.lab_test?.note ||
                                              labTests?.package
                                                ?.introduction ? (
                                                <>
                                                  <Image
                                                    style={{
                                                      cursor: "pointer",
                                                      marginLeft: "10px",
                                                      marginTop: "0px",
                                                    }}
                                                    onClick={(e) =>
                                                      handleModal(labTests, e)
                                                    }
                                                    src={detailIicon}
                                                    className="img-fluid icon_checkbox"
                                                  ></Image>
                                                </>
                                              ) : null}
                                            </div>
                                          </div>
                                          <div className="d-flex align-items-center">
                                            <h5>
                                              <span>PKR</span>{" "}
                                              <span>
                                                {
                                                  labTests?.lab_test
                                                    ?.formated_price
                                                 || 0}
                                              </span>
                                            </h5>
                                            {/* <div className="detailIicon">
                                            <Image
                                              src={crossIcon}
                                              alt=""
                                              className="img-fluid cardImgSet ms-2"
                                              onClick={() => handleRemoveItem(labTests)}
                                            />
                                          </div> */}
                                          </div>
                                          <SpecialInstructions
                                            instructionsModalListnerLabs={
                                              instructionsModalListnerLabs
                                            }
                                            setInstructionsModalListnerLabs={
                                              setInstructionsModalListnerLabs
                                            }
                                            notes={modalData?.lab_test}
                                          />

                                          <SpecialInstructionsPackages
                                            myCart={myCart}
                                            setInstructionsModalListnerPackage={
                                              setInstructionsModalListnerPackage
                                            }
                                            instructionsModalListnerPackage={
                                              instructionsModalListnerPackage
                                            }
                                            notes={modalData}
                                          />
                                        </div>
                                      </>
                                    )}
                                  </div>
                                ))
                              : null}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <div className="mt-3 pt-3 bt-11">
                        <h3 class="orderDetailsHead">Order Details </h3>
                        <div class="d-flex align-items-center justify-content-between for_border_gross bb001">
                          <h4>Amount</h4>
                          <h5 className="amount_number">
                            <span>PKR</span>{" "}
                            <span>{myCart?.TotalAmountFormated || 0}</span>
                          </h5>
                        </div>

                        <div class="d-flex align-items-center justify-content-between for_border_gross bb001">
                          <h4>GST/Sales Tax ({myCart?.lab?.gst}%)</h4>
                          <h5 className="amount_number">
                            <span>PKR </span> <span>{myCart?.GstFormated || 0}</span>
                          </h5>
                        </div>
                        <div class="d-flex align-items-center justify-content-between for_border_gross bb001">
                          <h4>Discount</h4>
                          <h5 className="amount_number">
                            <span style={{ color: "#9B9B9B" }}>PKR</span>{" "}
                            <span style={{ color: "#9B9B9B" }}>
                              {myCart?.DiscountFormated || 0}
                            </span>
                          </h5>
                        </div>

                        <div className="promocode-div" onClick={() => router.push('/promocodes')}>
                          <div className="promo-inner-div">
                            <Image
                                src={Layer1}
                                alt=""
                                width={29}
                                height={18}
                                className="LayerImg"
                              />
                              <p className="PromocodeTitle">{selectedPromocode?.promocode?.code || 'Promocode'}</p>

                              <Image
                                src={LayerVector}
                                style={{marginLeft:'15px'}}
                                alt=""
                                width={7.06}
                                height={11.97}
                                className="LayerImg"
                              />
                            </div>
                          <h5 className="amount_number">
                            <span>PKR </span> <span>{selectedPromocode?.promocode?.max_discount ||  0} </span>
                          </h5>
                        </div>
                        
                      </div>
                      <div className="d-flex align-items-center justify-content-between totalAmountBox pb-3 pt-4">
                        <h3 class="totalHeadingAmount">Total </h3>
                        <h5 class="priceInPkr">
                          PKR {(formattedAmountAfterPromocodeApply == 'NaN' ? 0 : formattedAmountAfterPromocodeApply) || myCart?.FinalAmountFormated || 0}
                        </h5>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="p-0">
                    {isAlertShow && <div className="alertSection">
                    <Image
                            src={AlertSvg}
                            width={32}
                            height={33}
                            alt=""
                            style={{marginTop: '-10px'}}
                            className="img-fluid cardImgSet cart_img"
                          />
                    <p>Looks like this order is higher than your Wallet Balance. We'll charge the remaining amount to your selected payment method</p>                       
                    </div>}
                    <div style={{zIndex:'99', marginTop: isAlertShow ? '-18px' : ''}} className="card bg-white p-3 payment-side-area custom_card2 give_pad">
                      <div className="meriSehatDiv" style={{backgroundColor: isMeriSehatPay ? '#DDF4F5' : '#F9FAFB'}}>
                        <p className="meriSehatpayTitle">Wallet</p>
                          <div className="meriSehat-innerDiv">
                            <h3>PKR {userDetails && userDetails?.user?.wallet?.voucher_wallet || 0}</h3>
                            <Switch style={{backgroundColor: isMeriSehatPay ? '#19B3B5' : "#AAAFB9"}} size="small" onChange={meriSehatPayFunc} />
                          </div>
                      </div>
                      <hr style={{width:"100%", margin:"10px 0px"}}  className="hr" />
                    <div className="cardsSectionPayment">
                                {/* {!saved_cards
                                    ?
                                    (<>
                                    <p  className="orderCardsSaved"> Saved </p> */}
                                    {/* <Radio.Group
                                        onChange={paymentChange}
                                        value={paymentMethod}
                                        className="custom_payment"
                                      >
                                      
                                        <Radio className="d-flex" value={"card-value"}>
                                              **** 4545
                                              <span className="editIcon"> </span>
                                          <Image
                                            src={visaSvg}
                                            width={30}
                                            height={17}
                                            alt=""
                                            className="img-fluid visaImgSet cart_img"
                                          />
                                        </Radio>
                                      </Radio.Group> */}
                                    {/* <div className={!savedCard ? `${"inptWrapperChecked"} ${"cardTopUp"} ` : "cardTopUp"}>
                                        <div className="inptWrapperSavedAll">
                                            <input type="radio" name='top-up' className="checkboxTopupSavedInp" />
                                            <label className="checkboxTopupSavedSpa"> **** 4545 </label>
                                            <span className="editIcon"> </span>
                                        </div>
                                        <div className="iconsWrapperTopup">
                                            <Image src={visaSvg} alt='icons' className="masterCardSvg" />
                                        </div>
                                    </div> */}
                                    {/* <hr  className="hr" /> */}
                                    <p className="orderCardsSaved"> Other Payment Method </p>
                                    {/* </>) 
                                    : 
                                    ""
                                } */}
                                </div>




                      {/* <h3>{i18nData?.payment_method}</h3> */}
                      <Radio.Group
                        onChange={paymentChange}
                        value={paymentMethod}
                        className="custom_payment"
                      >
                       
                        <Radio className="d-flex" value={"credit/Debit"}>
                            Debit/Credit Card
                          <Image
                            src={cardImage}
                            style={{marginTop:'8px'}}
                            width={75}
                            height={27}
                            alt=""
                            className="img-fluid cardImgSet cart_img"
                          />
                        </Radio>
                        <Radio className="d-flex" value={"mobile wallet"}>
                          Mobile Wallet
                          <Image
                            src={appPay}
                            style={{marginTop:'5px'}}
                            width={81}
                            height={30}
                            alt=""
                            className="img-fluid cardImgSet cart_img"
                          />
                        </Radio>
                        <Radio className="d-flex" value={"bank account"}>
                          Bank Transfer
                        </Radio>
                        {/* <Radio className="d-flex check_box" value={"cash"}>
                        Cash Payment
                        </Radio> */}
                      </Radio.Group>
                      <div className="py-1">
                        {errorSelection ? (
                          <p
                            style={{
                              position: "absolute",
                              color: "#E92429",
                              bottom: "10px",
                            }}
                          >
                            {errorSelection}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    {!isMobile ? (
                      <button
                        onClick={callApi}
                        className="btn_new mobile_btn_01 review-button add-review-btn text-uppercase max-width-300 fw-700 mt-4 position-relative simple-btn-mobile max-width-auto btn-process"
                      >
                        {i18nData?.pay_now}
                        <span
                          className="Pricing-phone-chevron"
                          style={{ height: "53px" }}
                        >
                          <FiChevronRight />
                        </span>
                      </button>
                    ) : (
                      <div className="btnWrapper_payment">
                        <button
                          onClick={callApi}
                          className="btn_new mobile_btn_01 review-button add-review-btn text-uppercase max-width-300 fw-700 mt-4 position-relative simple-btn-mobile max-width-auto"
                        >
                          {i18nData?.pay_now}
                          <span
                            className="Pricing-phone-chevron"
                            style={{ height: "53px" }}
                          >
                            <FiChevronRight />
                          </span>
                        </button>
                      </div>
                    )}
                  </Col>
                </div>
              </Col>
            </Row>
          </Container>
        ) : null}
        {paymentConfirm && (
          <PaymentConfirmed
            referenceId={labPayments?.id}
            labReceiptData={labReceiptData}
          />
        )}
        {paymentFailed && (
          <PaymentFailed
            labReceiptData={labReceiptData}
            changePaymentMethod={changePaymentMethod}
          />
        )}
        
        {cashPayment && (
          <CahsOnDelivery
            bookingDetailsData={bookingDetailCookie && bookingDetailCookie}
            bookingDetails={bookingDetails}
            referenceId={bookingDetails.id}
          />
        )}
        {bankTransfer && (
          <BankTransfer   
          referenceId={labPayments?.id}
          labReceiptData={labReceiptData}/>
        )}
      </section>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ locale }) => {
      return {
        props: {
          ...(await serverSideTranslations(locale, ["common"])),
        },
      };
    }
);

// export async function getServerSideProps({ locale,query }) {
//   const langChecker = Cookies.get("lang");
//   const apiLocale = locale === "ur" || langChecker == "2" ? 2 : 1;
//   if(query.success === 'true' || query.success === 'false' ) {
//     try {
//       const response = await API.get(`${labReceipt}?reference_id=${myCart?.id}`, {
//         headers: {
//           platform: "web",
//           locale: apiLocale,
//         },
//       });
//       const receiptData = response.data;
//       if (receiptData?.code === 200) {
//         return {
//           props: {
//             receiptData: receiptData,
//             ...(await serverSideTranslations(locale, ["common"])),
//           },
//         };
//       } else {
//         return { props: { receiptData: [] } };
//       }
//     } catch (error) {
//       return { props: { receiptData: [] } };
//     } 
//   }
//   else {
//     return { props: { receiptData: [] } };
//   }
  
// }


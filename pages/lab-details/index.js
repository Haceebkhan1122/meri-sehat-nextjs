import React, { useState, useEffect, useMemo } from 'react'
import { Col, Container, Row, Form, Accordion } from 'react-bootstrap'
import Image from 'next/image'
const DynamicWheelPicker = dynamic(() =>
    import('@/components/wheelPicker/WheelPicker').then((module) => module.WheelPicker),
    { ssr: false }
);
import { Select, Modal } from 'antd';
import arrowShape from '../../public/svg/ShapeArrow.svg';
import { FiChevronRight } from 'react-icons/fi';
import jazz from '../../public/svg/jazz.svg';
import zong from '../../public/png/zong_logo.png';
import ufone from '../../public/png/ufone-new.png';
import telenor from '../../public/png/telenor-new.png';
import clander from '../../public/png/clander.png';
import editicon from '../../public/svg/editiconOtp.svg';
import backBtn from '../../public/svg/back.svg';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { addTranslation } from "@/store/translationSlice";
import Cookies from 'js-cookie'
import API from '@/utils/httpService'
import { cities, removeCart, myCartDetailsCheckout, labVerifyOtp, resendOtpApi, editNumber } from '@/utils/endpoints'
import info from "../../public/svg/info.svg"
import close from "../../public/png/closeicon.png"
import { DatePicker } from 'react-responsive-datepicker-zain'
import 'react-responsive-datepicker/dist/index.css'
let OTPInput = null;
let ResendOTP = null;
import { fetchCart } from '@/store/myCartSlice';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import SpecialInstructions from '../../components/specialInstructions/specialInstructions'
import SpecialInstructionsPackages from '../../components/specialInstructionsPackages/specialInstructionsPackages'
import RemoveCartItem from "../../components/removeCartItem/RemoveCartItem";
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import moment from 'moment';
import Link from 'next/link';
import Loader from "../../components/customLoader/Loader";


const { Option } = Select;

const hourItems = Array.from({ length: 12 }, (_, index) => ({
    value: index < 9 ? `0${index + 1}` : `${index + 1}`,
    label: index < 9 ? `0${index + 1}` : `${index + 1}`
}));

const interval = 1;

const minuteItems = Array.from({ length: 60 / interval }, (_, index) => {
    const value = (index * interval).toString().padStart(2, "0");
    const label = value;
    return { value, label };
});

const ampmItems = [
    { value: "AM", label: "AM" },
    { value: "PM", label: "PM" }
];

const currentDaysInMonth = dayjs().daysInMonth();
const dateItems = Array.from({ length: currentDaysInMonth * 2 }, (_, i) => {
    const date = dayjs().add(-currentDaysInMonth, "days").add(i, "days");
    return {
        value: date.startOf("day").format("YYYY-MM-DD"),
        label: currentDaysInMonth === i ? "Today" : date.format("ddd DD MMM")
    };
});

const LabDetails = (props) => {
    const auth = Cookies.get('Authorization');
    const guestID = Cookies.get('guestId');
    const router = useRouter();
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [hour, setHour] = useState(dayjs().format('h'));
    const [minute, setMinute] = useState(dayjs().format('mm'));
    const [ampm, setAmpm] = useState(dayjs().format('A'));
    Cookies.remove('addMore')

    const selectedViewTest = [
        {
            id: 1,
            name: 'Complete Blood Count (CBC)',
            price: 400
        },
        {
            id: 2,
            name: 'Vitamin D',
            price: 600
        },
        {
            id: 3,
            name: 'Glucose Fasting',
            price: 800
        }
    ]

    const [otpModal, setOtpModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { _nextI18Next } = props;
    const dispatch = useDispatch();
    const [viewSelectItems, setViewSelectItems] = useState(selectedViewTest);
    const [viewSelectItemsCost, setViewSelectItemsCost] = useState(0);
    const [instantPhoneError, setInstantPhoneError] = useState('');
    const [instantNetwork, setInstantNetwork] = useState('');
    const [incompleteState, setIncompleteState] = useState('');
    const [networkError, setnetworkError] = useState();
    const [changed, setChanged] = useState(false);
    const [OTP, setOTP] = useState("");
    const [removeModal, setRemoveModal] = useState(false)
    const [removeModalData, setRemoveModalData] = useState({})
    const [labsResponseDetails, setLabsResponseDetails] = useState({})


    // Form Fields States
    const [time, setTime] = useState(null);
    const [fullName, setFullName] = useState('');
    const [instantPhoneNumber, setInstantPhoneNumber] = useState('');
    const [notes, setNotes] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const initialLocale = _nextI18Next?.initialLocale;
    const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;
    let myCart = useSelector((state) => state.cart.myCartData);
    const [instructionsModal, setInstructionsModal] = useState(false)
    const [modalData, setModalData] = useState({})
    const [instructionsModalListnerLabs, setInstructionsModalListnerLabs] = useState(false)
    const [instructionsModalListnerPackage, setInstructionsModalListnerPackage] = useState(false)
    const [myCartData, setMyCartData] = useState(null);
    const [editNumberFromApi, seteEditNumberFromApi] = useState(null);


    // error state for fields
    const [dateError, setDateError] = useState('');
    const [timeError, setTimeError] = useState('');
    const [nameError, setNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [otpError, setOtpError] = useState('');
    const [removeLoader, setRemoveLoader] = useState(false);
    const [remainingTime, setRemainingTime] = useState(60);
    const cartSlice = useSelector((state) => state.cart);

    useEffect(() => {
        if (myCart?.lab_cart?.length > 0) {
            setMyCartData(myCart?.lab_cart)
        }
        if (myCartData !== null && myCart?.lab_cart?.length === 0) {
            Cookies.remove("locationLabs");
            window.location.href = '/lab-test';
        }
    }, [myCart, myCartData])


    const removeToCartFunc = async (id, isPackage = false) => {
        try {

            let endpoint;
            if (guestID && !auth) {
                endpoint = `${removeCart}/${id}?guest_id=${guestID}${isPackage ? `&is_package=${true}` : ''}`;
            }

            else {
                endpoint = `${removeCart}/${id}${isPackage ? `?is_package=${true}` : ''}`;
            }

            const response = await API.delete(endpoint);
            if (response?.code === 200) {
                dispatch(fetchCart());
                setRemoveModal(false)
            }
        } catch (e) {
            console.log(e);
        }

        finally {
            setRemoveLoader(false);
        }
    }

    const maskPhone = (phone) => {
        let num = phone?.toString();

        let first3 = num?.substring(0, 4);
        let last2 = num?.substring(num?.length - 2);

        let mask = phone?.substring(4, phone?.length - 2)?.replace(/\d/g, '*');
        mask = `${first3}${mask}${last2}`;

        return mask;
    };

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    useEffect(() => {
        import("react-device-detect").then((item) => {
            setIsMobile(item.isMobile);
        });
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            import("otp-input-react").then((item) => {
                ResendOTP = item.ResendOTP;
                OTPInput = item.default;
            })
        }
    }, [])

    useEffect(() => {
        if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
            dispatch(addTranslation(i18n));
        }
    }, [i18n])

    function generateArrayWithoutNumber() {
        let res = [];

        for (let i = 0; i <= 255; i++) {
            if ((i >= 48 && i <= 57) || i === 46 || i === 45) {
            } else {
                res.push(String.fromCharCode(i));
            }
        }

        return res;
    }

    const arrayWithoutNumber = useMemo(() => generateArrayWithoutNumber(), []);

    const handleNameChange = (e) => {
        setFullName(e.target.value);
        setChanged(true);
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
        setChanged(true);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
        setChanged(true);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        setChanged(true);
    };

    const instantPhoneChange = (e) => {
        const limit = 10;
        setChanged(true);
        // console.log(e.target.value?.length, "e.target.value?.length")
        setInstantPhoneNumber(e.target.value.slice(0, limit));
        if (e.target.value?.length < 10 && e.target.value?.length > 2) {
            setInstantPhoneError("Incomplete mobile number");
        } else if (e.target.value?.length < 2) {
            setIncompleteState("");
            setInstantPhoneError("");
        }

        if (networkError === false) {
            setIncompleteState("");
        }

        if (e.target.value?.length < 2) {
            setnetworkError(false);
        }
        if (e.target.value?.length === 10) {
            setIncompleteState("");
            setInstantPhoneError("");
        }
        if (e.target.value.includes(".")) {
            setInstantPhoneError(
                "Please enter a valid phone number without decimal points."
            );
        }

        setInstantNetwork("");

        if (e.target.value.startsWith("33") === true) {
            setInstantNetwork("ufone");
            setnetworkError(true);
        }
        if (e.target.value.startsWith("31") === true) {
            setInstantNetwork("zong");
            setnetworkError(true);
        }
        if (e.target.value.startsWith("30") === true) {
            setInstantNetwork("jazz");
            setnetworkError(true);
        }
        if (e.target.value.startsWith("34") === true) {
            setInstantNetwork("telenor");
            setnetworkError(true);
        }
        if (e.target.value.startsWith("32") === true) {
            setInstantNetwork("jazz");
            setnetworkError(true);
        }
        if (e.target.value?.length == 0) {
            setnetworkError(true);
        }
    };

    useEffect(() => {
        if (viewSelectItems?.length > 0) {
            const total = viewSelectItems.reduce((sum, item) => sum + (item?.price || 0), 0);
            setViewSelectItemsCost(total);
        }
    }, [viewSelectItems]);

    const renderOTPTime = () => {
        return (
            <span>
                {" "}
                {remainingTime === 0 ? "" : ` 00:${remainingTime < 10 ? `0` : ""}${remainingTime} seconds`}
            </span>
        );
    };

    const renderOTPButton = (buttonProps) => {
        return (
            <button {...buttonProps} onClick={resetTimer}>
                {remainingTime === 0 ? (
                    <>
                        {" "}
                        <a
                            className="_underline_ancer1"
                            style={{ color: "#E9406A", textDecoration: "underline" }}
                        // onClick={resendOtpHandler}
                        >
                            Resend SMS
                        </a>
                        <br /> <p className="mt-1 fw-bold"> Code Expired - Click Resend</p>{" "}
                    </>
                ) : (
                    "Resend SMS"
                )}
            </button>
        );
    };

    const handleModal = (item, e) => {
        e.preventDefault();
        setModalData(item)
        if (item?.lab_test) {
            setInstructionsModalListnerLabs(true)
        }
        else {
            setInstructionsModalListnerPackage(true)
        }
    }

    const handleRemoveItem = (item) => {
        setRemoveModalData(item)
        if (removeModalData) {
            setRemoveModal(true)
        }
    };

    const handleRedirect = () => {
        Cookies.set('addMore', 'addmore')
        router.push('/lab-test')
    }

    const resetTimer = () => {
        setRemainingTime(60); // Reset the timer to its initial value (adjust as needed)
    };

    const handleEditMobileNumberCase = () => {
        setOtpModal(false);
        Cookies.set("editMode", 1);
        resetTimer(); // Reset the timer when Edit button is clicked
    };

    useEffect(() => {
        let formattedHour = parseInt(hour, 10);
        if (ampm === 'PM' && formattedHour !== 12) {
            formattedHour += 12;
        } else if (ampm === 'AM' && formattedHour === 12) {
            formattedHour = 0;
        }
        const formattedTime = `${formattedHour.toString().padStart(2, '0')}:${minute}:00`;
        setTime(formattedTime);
    }, [hour, minute, ampm]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setDateError('');
        setTimeError('')
        setNameError('')
        setAddressError('');

        const triggeringElement = e.submitter || document.activeElement
        if (triggeringElement?.parentElement?.className?.startsWith("_")) {
            return;
        }
        let times = myCart?.lab?.lab_timing;
        // let formattedTimes = times.map((time) => moment(time), "HH:mm");
        let formattedTimes = [];
        if (times) {
            times?.forEach((item) => {
                formattedTimes.push({
                    start_time: moment(item?.start_time, "HH:mm"),
                    end_time: moment(item?.end_time, "HH:mm")
                })
            })
            const formattedUserTime = moment(time, "HH:mm");
            let t1 = moment("14:01:00", "HH:mm");
            let t2 = moment(formattedTimes[0]?.start_time, "HH:mm");
            let t3 = moment(formattedTimes[0]?.end_time, "HH:mm");

            if (formattedTimes) {
                formattedTimes?.forEach((item, index) => {

                    if (index === 0) {
                        if (formattedUserTime.isBetween(item?.start_time, item?.end_time, null, '[]')) {
                            if (!date) {
                                setDateError('Date Field is Required!')
                            }
                            if (!time) {
                                setTimeError('Time Field is Required!')
                            }
                            if (!fullName) {
                                setNameError('Name Field is Required!')
                            }
                            if (!instantPhoneNumber) {
                                setInstantPhoneError('Number Field is Required!')
                            }
                            if (!address) {
                                setAddressError('Address Field is Required!')
                            }

                            if (!hour || hour === 'Select Time' || !minute || !ampm) {
                                setTimeError('Time is invalid');
                            }
                            if (date && time && fullName && address && instantPhoneError === '' && !instantPhoneNumber?.length == 0) {
                                (async () => {
                                    try {
                                        const data = {
                                            date: date,
                                            time: time,
                                            name: fullName,
                                            phone: `0${instantPhoneNumber}`,
                                            address: address,
                                            note: notes
                                        };
                                        if (!auth) {
                                            data.guest_id = guestID;
                                        }
                                        const response = await API.post(`${myCartDetailsCheckout}`, data);
                                        if (response?.code === 200) {
                                            if (!Cookies.get("editMode")) {
                                                setChanged(false)
                                                setOtpModal(true)
                                                setLabsResponseDetails(response?.data)
                                            } else if (Cookies.get("editMode")) {
                                                handleEditNumberSubmit()
                                            }
                                        } else {
                                            swal("", `${response?.message}`, "error");
                                        }
                                    } catch (e) {
                                    }
                                })()

                            }
                        }

                        else {
                            setTimeError("Time must be in between lab timings");
                            return;
                        }
                    }

                })
            } else {
                console.error("formattedTimes is undefined or null");
            }
            if (!date) {
                setDateError('Date Field is Required!')
            }
            if (!time) {
                setTimeError('Time Field is Required!')
            }
            if (!fullName) {
                setNameError('Name Field is Required!')
            }
            if (!instantPhoneNumber) {
                setInstantPhoneError('Number Field is Required!')
            }
            if (!address) {
                setAddressError('Address Field is Required!')
            }

            if (!hour || hour === 'Select Time' || !minute || !ampm) {
                setTimeError('Time is invalid');
            }

            if (date && time && fullName && address && instantPhoneError === '' && !instantPhoneNumber?.length == 0) {
                (async () => {
                    try {
                        const data = {
                            date: date,
                            time: time,
                            name: fullName,
                            phone: `0${instantPhoneNumber}`,
                            address: address,
                            note: notes
                        };
                        if (!auth) {
                            data.guest_id = guestID;
                        }
                        const response = await API.post(`${myCartDetailsCheckout}`, data);
                        if (response?.code === 200) {
                            if (!Cookies.get("editMode")) {
                                setChanged(false)
                                setOtpModal(true)
                                setLabsResponseDetails(response?.data)
                            } else if (Cookies.get("editMode")) {
                                handleEditNumberSubmit()
                            }
                        } else {
                            swal("", `${response?.message}`, "error");
                        }
                    } catch (e) {
                    }
                })()

            }
        }

        else {
            // if (date && time && fullName && address && instantPhoneNumber !== '') {
            //     (async () => {
            //         try {
            //             const data = {
            //                 date: date,
            //                 time: time,
            //                 name: fullName,
            //                 phone: `0${instantPhoneNumber}`,
            //                 address: address,
            //                 note: notes
            //             };
            //             if (!auth) {
            //                 data.guest_id = guestID;
            //             }
            //             const response = await API.post(`${myCartDetailsCheckout}`, data);
            //             if (response?.code === 200) {
            //                 if (!Cookies.get("editMode")) {
            //                     setChanged(false)
            //                     setOtpModal(true)
            //                     setLabsResponseDetails(response?.data)
            //                 } else if (Cookies.get("editMode")) {
            //                     handleEditNumberSubmit()
            //                 }
            //             } else {
            //                 swal("", `${response?.message}`, "error");
            //             }
            //         } catch (e) {
            //             console.log(e);
            //         }
            //     })()

            // }
        }

    }


    const handleEditNumberSubmit = async () => {
        if (!instantPhoneNumber || instantPhoneNumber?.length !== 10) {
            setInstantPhoneError('Number Field is Required!')
        }
        else {
            try {
                let data;
                data = {
                    phone: `0${instantPhoneNumber}`,
                };
                if (!auth) {
                    data.guest_id = guestID;
                }
                const response = await API.patch(`${editNumber}`, data);
                if (response?.code === 200) {
                    seteEditNumberFromApi(response?.data)
                    setChanged(false)
                    setOtpModal(true)
                    Cookies.remove("editMode")
                } else {
                    swal("", `${response?.message}`, "error");
                }
            } catch (e) {
                console.log(e);
            }
        }
    }


    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (!OTP || OTP?.length !== 4) {
            setOtpError('OTP is Required!')
        }
        else {
            try {
                let data;
                data = {
                    otp: OTP,
                };
                if (!auth) {
                    data.guest_id = guestID;
                }
                const response = await API.post(`${labVerifyOtp}`, data);
                if (response?.code === 200) {
                    setOtpModal(false)
                    router.push('/labs-payment-process')
                } else {
                    setOtpError(response?.message);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    const resendOtp = async (e) => {
        try {
            const response = await API.get(`${resendOtpApi}`);
            if (response?.code === 200) {
            } else {
            }
        } catch (e) {
            console.log(e);
        }
    }

    const minDate = () => { //essentially today's date
        let today = new Date();
        let date = today.getDate();
        let month = today.getMonth();
        let currYear = today.getFullYear();

        return new Date(currYear, month, date); // you can actually just do `new Date()` directly in the `minDate` prop instead
    };

    useEffect(() => {
        if (otpModal) {
            const intervalId = setInterval(() => {
                setRemainingTime(prevTime => Math.max(0, prevTime - 1));
            }, 1000);

            // Cleanup the interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [otpModal]);


    return (
        <section className="lab_details_wrapper bg_grey_theme mt-0">
            {(removeLoader || cartSlice?.loading) && (
                <Loader />
            )}
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="d-flex align-items-center justify-content-start backBtnLab mb-5">
                            <Link href="/lab-test">
                                <span><Image src={backBtn} alt='Back' /> BACK</span>
                            </Link>
                        </div>
                    </Col>
                    <Col md={4} className=" ">
                        <div className='box_labs h-100'>
                            <Row className='px-4'>
                                {isMobile ? (
                                    <>
                                        <Col className='accordian_checkout' md={12}>
                                            <Accordion>

                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header className="">
                                                        <div className='test_lab_selected_box d-flex justify-content-between'>
                                                            <div className='d-flex align-items-center'>
                                                                <div className='img_lab'><Image src={myCart?.lab?.image} className='img-fluid' width={40} height={40} ></Image></div>
                                                                <div><p style={{ textTransform: 'capitalize' }}>{myCart?.lab?.lab_name} <span>{myCart?.lab_cart?.length} {myCart?.lab_cart?.length > 0 && myCart?.lab_cart?.length == 1 ? 'Test' : 'Tests'} Selected </span></p></div>
                                                            </div>
                                                            <div className='price_test'>PKR {myCart?.FinalAmountFormated}</div>
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body className="borderAccordian">
                                                        {myCart?.lab_cart?.length > 0 && myCart?.lab_cart?.map((item) => {
                                                            return (
                                                                <>

                                                                    {/* <hr className='hr1 mb-0'></hr> */}
                                                                    <div className={`form_labs2   ${myCartData?.length >= 4 ? 'scrollBar' : ''}`}>
                                                                        <div className="selected_test_items_wrapper">
                                                                            <div className='d-flex cart_box mb-2'>
                                                                                <div className='d-flex  align-items-center direction_labs'>
                                                                                    {item?.lab_test?.note || item?.package?.introduction ? (
                                                                                        <Image style={{ cursor: 'pointer' }} onClick={(e) => handleModal(item, e)} src={info} width={16} height={16} className='img-fluid icon_checkbox'></Image>
                                                                                    ) : null}

                                                                                    <p>{item?.package?.name || item?.lab_test?.lab_test}</p></div>
                                                                                <div className='d-flex  align-items-center'><h6>  PKR {item?.package !== null ? item?.package?.formated_amount : item?.lab_test?.formated_price}</h6> <Image src={close} style={{ cursor: 'pointer' }} className='img-fluid ' onClick={() => handleRemoveItem(item)}></Image></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <SpecialInstructions
                                                                        instructionsModalListnerLabs={instructionsModalListnerLabs}
                                                                        setInstructionsModalListnerLabs={setInstructionsModalListnerLabs}
                                                                        instructionsModal={instructionsModal}
                                                                        setInstructionsModal={setInstructionsModal}
                                                                        notes={modalData?.lab_test} />

                                                                    <SpecialInstructionsPackages
                                                                        myCart={myCart}
                                                                        setInstructionsModalListnerPackage={setInstructionsModalListnerPackage}
                                                                        instructionsModalListnerPackage={instructionsModalListnerPackage}
                                                                        instructionsModal={instructionsModal}
                                                                        setInstructionsModal={setInstructionsModal}
                                                                        notes={modalData} />
                                                                    <RemoveCartItem removeToCartFunc={removeToCartFunc} removeModal={removeModal} setRemoveModal={setRemoveModal} removeModalData={removeModalData} />
                                                                </>
                                                            )
                                                        })}

                                                        <div className="btn_add_more_wrapper text-center my-2">
                                                            <button className="btn btn-primary addMoreBtn" onClick={handleRedirect}>
                                                                Add More
                                                            </button>
                                                        </div>
                                                    </Accordion.Body>

                                                </Accordion.Item>
                                            </Accordion>
                                            <form style={{ boxShadow: 'none', borderTop: '1px solid #F0F0F0', borderRadius: '0' }} className="form_self udpate_profile_db_hk mob_checkout_form forMobileDate" onSubmit={handleSubmit}>
                                                <Row>
                                                    <Col md={6} xs={6} className="mb-4 form_item date_arrow">
                                                        <Form.Group controlId="dob">
                                                            <Form.Label>Date*</Form.Label>
                                                            <div className="date-picker-custom">
                                                                <DatePicker
                                                                    colorScheme="#19B3B5"
                                                                    isOpen={isOpen}
                                                                    onClose={() => setIsOpen(false)}
                                                                    clickOutsideToClose={() => setIsOpen(false)}
                                                                    selected={moment(date).format('YYYY-MM-DD')} // Set the selected prop to control the date
                                                                    onChange={(newDate) => {
                                                                        setDate(moment(newDate).isValid() ? moment(newDate).format('YYYY-MM-DD') : '');
                                                                    }}
                                                                    closeText='OK'
                                                                    clearText='CANCEL'
                                                                    placeholder="Select Date"
                                                                    minDate={new Date(moment().startOf('day'))}
                                                                />
                                                            </div>

                                                            <Form.Control
                                                                type="text"
                                                                name="dob"
                                                                value={date}
                                                                style={{ color: isMobile ? '#000000' : '' }}
                                                                autocomplete="off"
                                                                placeholder="Select Date"
                                                                onFocus={() => {
                                                                    setIsOpen(true);
                                                                }}
                                                            />
                                                        </Form.Group>
                                                        <div className='error_container'><span className='errorstate_labs_form'>{dateError ? dateError : null}</span></div>
                                                    </Col>
                                                    <Col md={6} xs={6} className='form_item date_arrow '>
                                                        <Form.Group controlId="timepicker">
                                                            <Form.Label>Time*</Form.Label>
                                                            <div className='input_like' onClick={() => setShowTimePicker(true)}>
                                                                <span className={`${hour === 'Select Time' ? 'defaultTime' : ''}`} style={{ textAlign: "left", width: "100%", paddingTop: '10px', display: 'block', color: isMobile ? '#000000' : '' }}>
                                                                    {hour} {hour === 'Select Time' ? '' : ':'} {minute} {ampm}
                                                                </span>
                                                            </div>
                                                        </Form.Group>
                                                        <div className='error_container'><span className='errorstate_labs_form'>{timeError ? timeError : null}</span></div>
                                                    </Col>
                                                </Row>
                                            </form>
                                        </Col>
                                    </>
                                ) : (
                                    <>
                                        <Col className='' md={6} >
                                            <h4 className='myCartHead'>
                                                My Cart
                                            </h4>
                                        </Col>
                                        <Col className='text-end' md={6}>
                                            <div className='d-flex align-items-center  clanderTest'>
                                                <Image src={clander} className='img-fluid'></Image>
                                                <p>{myCart?.lab_cart?.length} Items</p>
                                            </div>
                                        </Col>
                                        <Col className='' md={12}>
                                            <hr className='hr1 mb-0'></hr>
                                        </Col>
                                    </>
                                )}
                                {isMobile ? (<></>) : (
                                    <>
                                        <Col className='' md={12}>
                                            <div className={`form_labs2 pt-3 ${myCartData?.length >= 4 ? 'scrollBar' : ''}`}>
                                                <div className="selected_test_items_wrapper">
                                                    {myCart?.lab_cart?.length > 0 && myCart?.lab_cart?.map((item) => {


                                                        return (
                                                            <>

                                                                <div className='d-flex cart_box mb-2'>
                                                                    <div className='d-flex  align-items-center'>
                                                                        {item?.lab_test?.note || item?.package?.introduction ? (
                                                                            <>
                                                                                <Image style={{ cursor: 'pointer' }} onClick={(e) => handleModal(item, e)} src={info} width={16} height={16} className='img-fluid icon_checkbox'></Image>
                                                                            </>
                                                                        ) : null}
                                                                        <p>{item?.package?.name || item?.lab_test?.lab_test}</p></div>
                                                                    <div className='d-flex  align-items-center'><h6>PKR {item?.package !== null ? item?.package?.formated_amount : item?.lab_test?.formated_price}</h6> <Image src={close} style={{ cursor: 'pointer' }} className='img-fluid ' onClick={() => handleRemoveItem(item)}></Image></div>
                                                                </div>
                                                                <SpecialInstructions
                                                                    instructionsModalListnerLabs={instructionsModalListnerLabs}
                                                                    setInstructionsModalListnerLabs={setInstructionsModalListnerLabs}
                                                                    instructionsModal={instructionsModal}
                                                                    setInstructionsModal={setInstructionsModal}
                                                                    notes={modalData?.lab_test} />

                                                                <SpecialInstructionsPackages
                                                                    myCart={myCart}
                                                                    setInstructionsModalListnerPackage={setInstructionsModalListnerPackage}
                                                                    instructionsModalListnerPackage={instructionsModalListnerPackage}
                                                                    instructionsModal={instructionsModal}
                                                                    setInstructionsModal={setInstructionsModal}
                                                                    notes={modalData} />
                                                                <RemoveCartItem removeToCartFunc={removeToCartFunc} removeModal={removeModal} setRemoveModal={setRemoveModal} removeModalData={removeModalData} />
                                                            </>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="btn_add_more_wrapper text-center my-5">
                                                <button onClick={handleRedirect} className="btn btn-primary addMoreBtn">
                                                    + Add More
                                                </button>
                                            </div>
                                            <div className="footer_checkout px-4">
                                                <hr className='hr1 mt-0'></hr>
                                                <div className="amount_bottom_bar d-flex align-items-center justify-content-between">

                                                    <div className="amount_element left__ d-flex align-items-center">
                                                        {/* <Image src={Money} alt="money" className="me-3" /> */}
                                                        <h3 className="ff-circular">Amount</h3>
                                                    </div>
                                                    <div className="amount_element left__">
                                                        <h3 className="ff-circular" style={{ color: "#19B3B5" }}>
                                                            Rs. {myCart?.TotalAmountFormated}
                                                        </h3>
                                                    </div>
                                                </div></div>
                                        </Col>
                                    </>
                                )}
                            </Row>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="form_area_customer">
                            {isMobile ? (
                                <>
                                    <h4 className='my-4 '>
                                        Contact Details
                                    </h4></>
                            ) : (
                                <></>
                            )}
                            <form className="form_self udpate_profile_db_hk mob_checkout_form" onSubmit={handleSubmit}>
                                <Row>
                                    {!isMobile ? (
                                        <>
                                            <Col md={6} xs={6} className="mb-4 form_item date_arrow">
                                                <Form.Group controlId="dob">
                                                    <Form.Label>Date*</Form.Label>
                                                    <div className="date-picker-custom">
                                                        <DatePicker
                                                            colorScheme="#19B3B5"
                                                            isOpen={isOpen}
                                                            onClose={() => setIsOpen(false)}
                                                            clickOutsideToClose={() => setIsOpen(false)}
                                                            selected={moment(date).format('YYYY-MM-DD')} // Set the selected prop to control the date
                                                            onChange={(newDate) => {
                                                                setDate(moment(newDate).isValid() ? moment(newDate).format('YYYY-MM-DD') : '');
                                                            }}
                                                            closeText='OK'
                                                            clearText='CANCEL'
                                                            placeholder="Select Date"
                                                            minDate={new Date(moment().startOf('day'))}
                                                        // minDate={new Date(moment())}
                                                        />
                                                    </div>

                                                    <Form.Control
                                                        type="text"
                                                        name="dob"
                                                        value={date}
                                                        style={{ color: isMobile ? '#000000' : '' }}
                                                        autocomplete="off"
                                                        placeholder="Select Date"
                                                        onFocus={() => {
                                                            setIsOpen(true);
                                                        }}
                                                    />
                                                </Form.Group>
                                                <div className='error_container'><span className='errorstate_labs_form'>{dateError ? dateError : null}</span></div>
                                            </Col>
                                            <Col md={6} xs={6} className='form_item date_arrow '>
                                                <Form.Group controlId="timepicker">
                                                    <Form.Label>Time*</Form.Label>
                                                    <div className='input_like' onClick={() => setShowTimePicker(true)}>
                                                        <span style={{ textAlign: "left", width: "100%", paddingTop: '10px', display: 'block', color: isMobile ? '#000000' : '' }}>
                                                            {hour} {hour === 'Select Time' ? '' : ':'} {minute} {ampm}
                                                        </span>
                                                    </div>
                                                </Form.Group>
                                                <div className='error_container'><span className='errorstate_labs_form'>{timeError ? timeError : null}</span></div>
                                            </Col>
                                        </>
                                    ) : null}
                                    {isMobile ? (
                                        <></>
                                    ) : (
                                        <> <Col md={12}> <h4>
                                            Contact Details
                                        </h4>
                                            <hr className='hr1  '></hr> </Col></>
                                    )}

                                    <Col md={6} className="mb-4 or1 form_item">
                                        <Form.Group controlId="fname">
                                            <Form.Label>Full Name*</Form.Label>

                                            {isMobile ? (
                                                <>
                                                    <Form.Control
                                                        type="text"
                                                        name='name'
                                                        autocomplete="off"
                                                        onChange={(e) => handleNameChange(e)}
                                                        value={fullName}
                                                        maxLength="50"
                                                        placeholder="Full name"
                                                        style={{ color: '#000000', fontWeight: '300' }}


                                                    />
                                                </>
                                            ) : (<>
                                                <Form.Control
                                                    type="text"
                                                    name='name'
                                                    autocomplete="off"
                                                    onChange={(e) => handleNameChange(e)}
                                                    value={fullName}
                                                    maxLength="50"
                                                    placeholder="Enter your full name"

                                                />
                                            </>)}

                                        </Form.Group>
                                        <div className='error_container'><span className='errorstate_labs_form'> {nameError ? nameError : null}</span></div>
                                    </Col>

                                    <Col md={6} className='mb-4 or1 form_item'>
                                        <Form.Group controlId="number">
                                            <Form.Label>Phone Number*</Form.Label>
                                            <div className="d-flex position-relative">
                                                <div className="country_code_hk country_code_ek select_phone">
                                                    <Select
                                                        defaultValue="+92"
                                                        className="select-code select-code-ek"
                                                        suffixIcon={
                                                            <Image
                                                                width={10}
                                                                height={10}
                                                                src={arrowShape}
                                                                alt="arrow down"
                                                            />
                                                        }
                                                    >
                                                        <Option value="+92">+92</Option>
                                                    </Select>
                                                </div>

                                                <input
                                                    className="input-number input-number-ek"
                                                    placeholder='Enter your number'
                                                    type="number"
                                                    pattern="[0-9]+"
                                                    maxlength="10"
                                                    value={instantPhoneNumber}
                                                    onChange={instantPhoneChange}
                                                    name="number"
                                                    onKeyDown={(evt) =>
                                                        (arrayWithoutNumber.includes(evt.key) ||
                                                            evt.key === '.' ||
                                                            evt.key === '-') &&
                                                        evt.preventDefault()
                                                    }
                                                    style={{ width: '100%', marginLeft: '5px', color: isMobile ? '#000000' : '', fontWeight: isMobile ? '450' : '' }}
                                                />
                                                {instantNetwork ? (
                                                    <>
                                                        <Select
                                                            value={instantNetwork}
                                                            className="select-country hk_network ek_network"
                                                            suffixIcon={
                                                                <Image
                                                                    style={{ paddingLeft: '8px' }}
                                                                    src={arrowShape}
                                                                    alt="arrow down"
                                                                    width={23}
                                                                    height={8}
                                                                />
                                                            }
                                                            onChange={(value) => setInstantNetwork(value)}
                                                            style={{
                                                                width: 120,
                                                                border: 'none'
                                                            }}
                                                        >
                                                            <Option
                                                                className="network-height ufone"
                                                                value="ufone"
                                                            >
                                                                {' '}
                                                                <Image src={ufone} alt="ufone" /> <span></span>
                                                            </Option>
                                                            <Option
                                                                className="network-height jazz"
                                                                value="jazz"
                                                            >
                                                                {' '}
                                                                <Image src={jazz} alt="jazz" /> <span></span>
                                                            </Option>
                                                            <Option
                                                                className="network-height telenor"
                                                                value="telenor"
                                                            >
                                                                {' '}
                                                                <Image src={telenor} alt="telenor" /> <span></span>
                                                            </Option>
                                                            <Option
                                                                className="network-height zong"
                                                                value="zong"
                                                            >
                                                                {' '}
                                                                <Image src={zong} alt="zong" /> <span></span>
                                                            </Option>
                                                        </Select>
                                                    </>
                                                ) : null}
                                            </div>
                                            {instantPhoneError ? (
                                                <p className="instant-error-msg ">{instantPhoneError}</p>
                                            ) : networkError === false ? (
                                                <p className="instant-error-msg word-spacing-inverse">
                                                    Invalid Network
                                                </p>
                                            ) : null}
                                            {/* {networkError === false ? (
                                                <>
                                                    <p className="instant-error-msg word-spacing-inverse">
                                                        Invalid Network
                                                    </p>
                                                </>
                                            ) : null} */}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className='d-none form_item'>
                                        <Form.Group controlId="city">
                                            <Form.Label>City*</Form.Label>
                                            <Form.Select value={city} onChange={(e) => handleCityChange(e)}>
                                                <option key='blankChoice' hidden value>Select your city</option>
                                                <option value="karachi">Karachi</option>
                                                <option value="lahore">Lahore</option>
                                                <option value="islamabad">Islamabad</option>

                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className='mb-4 or3 form_item'>
                                        <Form.Group controlId="address">
                                            <Form.Label>Address*</Form.Label>
                                            <Form.Control onChange={(e) => handleAddressChange(e)}
                                                value={address}
                                                type="text"
                                                name="address"
                                                placeholder="Enter your address"
                                                style={{ color: isMobile ? '#000000' : '', fontWeight: isMobile ? '300' : '' }} />
                                        </Form.Group>
                                        <div className='error_container'> <span className='errorstate_labs_form'>{addressError ? addressError : null}</span></div>
                                    </Col>
                                    <Col md={6} className='mb-4 or4 form_item'>
                                        <Form.Group controlId="email">
                                            <Form.Label>  Notes (Optional)</Form.Label>
                                            {isMobile ? (
                                                <>
                                                    <Form.Control style={{ color: '#000000', fontWeight: '300' }} type="text" value={notes} name="address" onChange={(e) => handleNotesChange(e)} placeholder="Enter special instructions" />
                                                </>
                                            ) : (<>
                                                <Form.Control type="text" value={notes} name="address" onChange={(e) => handleNotesChange(e)} placeholder="Enter Instructions" />
                                            </>)}


                                        </Form.Group>
                                    </Col>
                                    <Col md={12} className='mt-4 text-right mob_btn or5'>
                                        <button type='submit' className={`instant-btn position-relative ${!changed ? 'statenotchanged' : 'stateChanged'} new_bg_color schedule-appointment`} disabled={!changed}>
                                            <span className="left-inverse-text text-uppercase" >Proceed</span>
                                        </button>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal
                className="otpModal"
                footer={null}
                // title="Location"
                centered
                open={otpModal}
                onCancel={() => setOtpModal(false)}
            >
                {OTPInput && ResendOTP && (
                    <div className="specialInstructionsPop NewSpecialInstructionsPop">
                        <h5 className="otpheading" > {isMobile ? (<>Please verify your number to continue</>) : (<> An SMS has been sent to</>)}   <br></br>
                            <span> {maskPhone(editNumberFromApi?.phone ? editNumberFromApi?.phone : labsResponseDetails?.phone)}</span> <button onClick={handleEditMobileNumberCase} className='edit-otp'> {isMobile ? (<> <Image src={editicon}></Image></>) : (<>(edit) </>)} </button></h5>
                        <div className="testInfo1 otp" >
                            <div className="otpBox">
                                {OTPInput && (
                                    <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} className={otpError ? "invalidOtpBorder" : 'validotp'} />
                                )}
                                {ResendOTP && (
                                    <div >
                                        <ResendOTP maxTime={60} renderTime={renderOTPTime} renderButton={renderOTPButton} onResendClick={() => resendOtp()} className='otp_resent' />
                                    </div>
                                )}
                            </div>
                            <div className='error_container'><span className='errorstate_labs_form'> {otpError ? <span> * {otpError} </span> : null}</span></div>
                            <button
                                onClick={handleOtpSubmit}
                                className={`mobile_btn_01 review-button add-review-btn text-uppercase max-width-300 fw-700  position-relative simple-btn-mobile instantBannerNewBtn btn-modal`}
                            >
                                <span className="cons_now">CONTINUE</span>
                                <span
                                    className={`add-review-chevron position-absolute mob_hide`}
                                    style={{
                                        height: "53px",
                                        left: "auto",
                                        right: "0",
                                        width: "50px",
                                    }}
                                >
                                    <FiChevronRight />
                                </span>
                            </button>



                        </div>

                    </div>
                )}

            </Modal>

            <Modal
                className="timePickerModal"
                footer={null}
                centered
                open={showTimePicker}
                onCancel={() => setShowTimePicker(false)}
                closable={false}
                maskClosable={false}
            >
                <div className='modal_timePicker'>
                    <h5>Set time</h5>
                    <div className='item_sl timepicker'>
                        {typeof window !== 'undefined' ?
                            <DynamicWheelPicker
                                dateItems={dateItems}
                                dateValue={date}
                                onDateChange={setDate}
                                hourItems={hourItems}
                                hourValue={hour}
                                onHourChange={setHour}
                                minuteItems={minuteItems}
                                minuteValue={minute}
                                onMinuteChange={setMinute}
                                ampmItems={ampmItems}
                                ampmValue={ampm}
                                onAmpmChange={setAmpm} /> : null}
                    </div>
                    <button className='timePickerSave' onClick={() => setShowTimePicker(false)}>Save</button>
                </div>
            </Modal>
        </section >

    )
}


export async function getServerSideProps({ locale }) {
    const langChecker = Cookies.get("lang");
    const apiLocale = locale === "ur" || langChecker == "2" ? 2 : 1;

    try {
        const response = await API.get(cities, {
            headers: {
                platform: "web",
                locale: apiLocale
            }
        });

        let citiesData = response?.data;

        if (response?.code === 200) {
            return {
                props: {
                    citiesApiData: citiesData,
                    ...(await serverSideTranslations(locale, ['common'])),
                },
            };
        } else {
            return { props: { citiesData: [] } };
        }
    } catch (error) {
        return { props: { citiesData: [] } };
    }
}


export default LabDetails;
import React, { useEffect, useState } from 'react'
import ContainerWrapperFindDoc from '../container-wrapper-find-doc/container-wrapper-find-doc';
import styles from './doctor-profile.module.scss';
import { Element, Link } from 'react-scroll'
import MyLink from 'next/link';
import BottomDoctorPamfh from '../bottom-doctor-pamfh/bottom-doctor-pamfh';
import { Tab, Tabs } from 'react-bootstrap';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from "next/router";
import { Col, Row } from 'react-bootstrap';
import imgArrow from "../../public/svg/right-arrow-border.svg";
import star1 from "../../public/svg/newPages/star1.svg";
import Image from 'next/image';
import { Select, Modal } from "antd";
import RequestSubmittedModal from '../requestSubmitted/requestSubmittedModal';
import { addMeAsNewMember, getMrNumbers, scheduleAppointmentFad } from '../../utils/endpoints';
import { APIV3, GREENCLINICAPI } from '@/utils/httpService';
import { fetchCities } from '../../store/citySpecialityDiseaseDoctorLayout';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import RequestModalConsult from '../requestModalConsult/requestModalConsult';
import Cookies from 'js-cookie';
import Star from 'public/svg/star_reviews_profile.svg';
import EmptyStar from 'public/svg/empty_star.svg';
import parse from 'html-react-parser';
import mixpanel from 'mixpanel-browser';
import DaysFad from '../componentsUpdated/daysFad/DaysFad';
import TimeFad from '../componentsUpdated/timeFad/TimeFad';
import AppointmentMrNumber from '../componentsUpdated/bookAnAppointment/appointmentMrNumber/AppointmentMrNumber';
import Slider from 'react-slick';
import {
    EmailShareButton,
    FacebookShareButton,
    WhatsappShareButton,
    FacebookIcon,
    WhatsappIcon,
    EmailIcon,
} from "react-share";
import Swal from 'sweetalert2'
import { FaClipboard } from 'react-icons/fa';
import RescheduleAppointment from '../componentsUpdated/bookAnAppointment/rescheduleAppointment/RescheduleAppointment';

const generateStarIcons = (rating) => {
    const filledStars = Math.round(rating); // Round to the nearest whole number
    const emptyStars = 5 - filledStars;

    const filledStarIcons = Array.from({ length: filledStars }, (_, index) => (
        <Image key={index} width={24} height={23} src={Star} alt='' />
    ));

    const emptyStarIcons = Array.from({ length: emptyStars }, (_, index) => (
        <Image key={index + filledStars} width={24} height={23} src={EmptyStar} alt='' />
    ));

    return [...filledStarIcons, ...emptyStarIcons];
};

const DoctorProfile = (props) => {
    const { doctorProfile } = props
    const [requestShow, setRequestShow] = useState(false);
    const handleCloseRequestModal = () => setRequestShow(false);
    const isMobile = useMediaQuery('(max-width:768px)');
    const [scroll, setScroll] = useState(false);
    const router = useRouter();
    const [selectedDay, setSelectedDay] = useState("")
    const [activeLink, setActiveLink] = useState("about_tab");
    const [nameValue, setNameValue] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [loader, setLoader] = useState(false)
    const [clinicDays, setClinicDays] = useState({})
    const [nameError, setNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [selectedDayError, setSelectedDayError] = useState(false);
    const [requestData, setRequestData] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedDoctorID, setSelectedDoctorID] = useState(null);
    const [firstActiveItem, setFirstActiveItem] = useState(true);
    const [doctorProfileId, setDoctorProfileId] = useState(false);
    const [selectedCity, setSelectedCity] = useState([]);
    const { Option } = Select;
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [reviewToDisplay, setReviewToDisplay] = useState();
    const [preferredDays, setPreferredDays] = useState(null);
    const [preferredConsultation, setPreferredConsultation] = useState([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedTimeId, setSelectedTimeId] = useState(null);
    const [clinicTimings, setClinicTimings] = useState({});
    const [filteredId, setFilteredId] = useState(null);
    const [mrNumbersListing, setMrNumbersListing] = useState({});
    const [selectedMrNumberId, setSelectedMrNumberId] = useState("");
    const [mrNumberModal, setMrNumberModal] = useState(false);
    const [checkedItem, setCheckedItem] = useState(false);
    const handleCloseMrNumber = () => setMrNumberModal(false);
    const handleShowMrNumber = () => setMrNumberModal(true)
    const [shareIcons, setShareIcons] = useState(false);
    const [triggerState, setTriggerState] = useState(false);
    const [clinicInfo, setClinicInfo] = useState(null);
    const [doctorId, setDoctorId] = useState(null);
    const [dashboardKey, setDashboardKey] = useState(null);
    const [checkEmptyStatus, setCheckEmptyStatus] = useState(null);
    const [toShowDay, setToShowDay] = useState('');
    const [newMemberModal, setNewMemberModal] = useState(false);
    const [patientName, setPatientName] = useState('');
    const [gcDoctorClinicId, setGcDoctorClinicId] = useState(null);
    const [activeTimeTab, setActiveTimeTab] = useState("morning");
    const paymentChecker = Cookies.get('makePyament');
    let paymentParseCookie = paymentChecker && (paymentChecker !== "undefined" && paymentChecker !== undefined) && JSON.parse(paymentChecker);

    const { id } = router.query
    let myCities = useSelector((state) => state.cities.cities);
    let userDetails = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();
    const handleClose = () => setShow(false);
    let siteUrl = process.env.NEXT_PUBLIC_PATIENT_URL;
    const checkAuth = Cookies.get('Authorization');

    const handleCloseNewPatient = () => {
        setPatientName('')
        setNewMemberModal(false);
    }
    useEffect(() => {
        const handleScrollZero = () => {
            if (window.scrollY < 20) {
                setFirstActiveItem(true)
            }
        }
        window.addEventListener('scroll', handleScrollZero);

    }, [firstActiveItem])

    useEffect(() => {
        // Store the timer reference
        const timer = setTimeout(() => {
            mixpanel.track(`Dr. ${doctorProfile?.user?.name} profile`);
        }, 5000);

        // Cleanup the timeout if the component unmounts
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [firstActiveItem]);

    const handleSetActive = (to) => {
        setActiveLink(to);
        setFirstActiveItem(false)
    }


    useEffect(() => {
        dispatch(fetchCities())
    }, []);

    useEffect(() => {
        if (id) {
            const lastElement = id[id.length - 1];
            setDoctorProfileId(lastElement);
        }
    }, [id]);

    const scheduleAppointment = async () => {
        if (checkAuth !== undefined && checkAuth !== "undefined") {
            if (checkEmptyStatus && !paymentParseCookie) {
                setNewMemberModal(true)
                return;
            }
            else if (mrNumbersListing?.modal_show == true && selectedMrNumberId == "" && !paymentParseCookie) {
                setMrNumberModal(true)
            }
            else {
                const payload = {
                    type: preferredConsultation[0]?.is_physical == true ? 'in-person' : 'schedule',
                    appointment_date: selectedDay,
                    appointment_time: selectedTime,
                    doctor_id: doctorProfile?.user?.id,
                    doctor_clinic_id: preferredConsultation[0]?.doctor_clinic_id,
                    clinic_id: preferredConsultation[0]?.clinic_id,
                    patient_id: selectedMrNumberId ? selectedMrNumberId : mrNumbersListing?.list?.[0]?.id,
                    doctor_slot: selectedTimeId
                }
                setLoader(true);
                try {
                    const response = await APIV3.post(`${scheduleAppointmentFad}`, payload);
                    if (response.status == 200) {
                        Cookies.remove('makePyament');
                        Cookies.set('docProfileApp', response.data.data.appointment)
                        window.location.href = `/order/${response.data.data.appointment}`
                        setLoader(false);
                    }
                    else {
                        setLoader(false);
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            Cookies.set("redirectionUrl", router.asPath);
            window.location.href = "/phone-number"
        }
    }

    const handleShow = (doctorId) => {
        setShow(true);
        setSelectedDoctorID(doctorId)
    };

    const preferedDaydoctor = async () => {
        try {
            const response = await APIV3.get(`/find-doctor-preferred-day?doctorId=${doctorProfile.user.id}`);
            if (response.status == 200) {
                setPreferredDays(response.data.data);
            }
        } catch (error) {
            // console.log({ error });
        }
    };

    useEffect(() => {
        preferedDaydoctor();
    }, []);


    const getMrNumberList = async () => {
        try {
            const response = await GREENCLINICAPI.get(`${getMrNumbers}?phone=${userDetails?.user?.phone}&clinic_id=${gcDoctorClinicId}`);
            if (response?.status == 200) {
                setMrNumbersListing(response?.data?.data);
            }
            else if (response?.status == 404) {
                setCheckEmptyStatus(true)

            }
        } catch (error) {
            console.log(error, "error");
        }
    };


    useEffect(() => {
        if (userDetails !== null && checkAuth !== undefined && gcDoctorClinicId) {
            getMrNumberList();
        }
    }, [userDetails !== null, gcDoctorClinicId]);

    // posting the data for preferred Data//
    const handleNameChange = (e) => {
        setNameError('');
        const inputValue = e.target.value;
        setNameValue(inputValue);
        if (!inputValue.trim()) {
            setNameValue('');
            setNameError('');
        }

        if (!/^[A-Za-z ]+$/.test(inputValue)) {
            setNameError('* Name cannot contain numbers or special characters');
        } else {
            setNameError('');
        }
    };

    const handlePhoneChange = (e) => {
        setPhoneError('');
        const limit = 10;
        setPhone(e.target.value.slice(0, limit));
    };

    const handleCityChange = (e) => {
        setCityError('');
        setCity(e.target.value);
    };

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 100);
        });
    }, []);

    useEffect(() => {
        const savedLocation = Cookies.get('selectedCity');
        if (savedLocation) {
            const parsedData = JSON.parse(savedLocation);
            setSelectedCity(parsedData);
            var location = parsedData.name;
        }
    }, []);

    useEffect(() => {
        if (doctorProfile?.user) {
            const reviewsToDisplay = showAllReviews ? doctorProfile?.user?.reviews : doctorProfile?.user?.reviews?.slice(0, 1);
            setReviewToDisplay(reviewsToDisplay)
        }

    }, [doctorProfile, showAllReviews])

    const toggleShowAllReviews = () => {
        setShowAllReviews(!showAllReviews);
    };

    const handleCheckTime = (item, type) => {
        setSelectedTime(item.start_time);
        setSelectedTimeId(item?.id);
    };
    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "12px",
    };


    useEffect(() => {
        const clinicData = Cookies.get('clinic_info');
        if (clinicData) {
            setClinicInfo(JSON.parse(clinicData));
        }
    }, []);

    useEffect(() => {
        let getDocId = Cookies.get('clinic_info') !== undefined && JSON.parse(Cookies.get('clinic_info'));
        setDoctorId(getDocId?.doctorId);
        // setDashboardKey(getDocId?.fromDashboard);
        if (clinicInfo) {
            Cookies.set('clinic_info', JSON.stringify({
                clinicsInfoId: clinicInfo?.doctor_clinic_id || clinicInfo?.clinicsInfoId,
                doctorId: doctorId,
                // fromDashboard: getDocId?.fromDashboard
            }));
        }
    }, [clinicInfo, triggerState]);

    useEffect(() => {
        const physicalClinics = doctorProfile?.user?.doctor_clinics?.filter(item => item.is_physical === true);

        if (physicalClinics?.length) {
            // Automatically select the first clinic's day and time.
            handleRelativeDays(physicalClinics[0]);

            // You can trigger the check for the first available day based on clinic timings.
            if (preferredDays && physicalClinics[0].is_physical === true) {
                const firstDay = preferredDays.clinic_timings['in-person']?.[0];
                if (firstDay) {
                    setSelectedDay(firstDay.date);
                    setClinicTimings(firstDay.timings);
                    setSelectedTime(""); // or set a default time if needed
                }
            }
        }
    }, [doctorProfile, preferredDays]);

    const handleRelativeDays = (item) => {
        Cookies.set('clinic_info', JSON.stringify({
            clinicsInfoId: item?.id,
            doctorId: doctorProfile.user.id
        }));
        setTriggerState(true);
        setFilteredId(item)
        setCheckedItem(item?.id)

        if (preferredDays && item.is_physical == false) {
            const filterDays = preferredDays.clinic_timings['in-video']?.filter((clinic) => clinic.doctor_clinic_id == item.id)
            setPreferredConsultation(filterDays);

            // You can also set default selected day here, if required
            if (filterDays?.length) {
                setSelectedDay(filterDays[0].date);
                setClinicTimings(filterDays[0].timings);
            }
        } else if (preferredDays && item.is_physical == true) {
            const filterDays = preferredDays.clinic_timings['in-person']?.filter((clinic) => clinic.doctor_clinic_id == item.id);
            setPreferredConsultation(filterDays);

            // Set selected day and time for in-person clinics
            if (filterDays?.length) {
                setSelectedDay(filterDays[0].date);
                setClinicTimings(filterDays[0].timings);
            }
        }
    };

    const handleCheck = (day, type) => {
        setSelectedDay(day?.date)
        setClinicTimings(day?.timings)
        setSelectedTime("")
    };

    useEffect(() => {
        const clinicIds = preferredDays?.clinic_timings['in-video']?.find((clinic) => clinic.gc_doctor_clinic_id);
        setGcDoctorClinicId(clinicIds?.gc_doctor_clinic_id)
    }, [preferredDays])

    const addMeAsANewMember = async () => {
        const payload = {
            gc_doctor_id: doctorProfile?.user?.gc_doctor_id,
            gc_doctor_clinic_id: gcDoctorClinicId,
            name: patientName,
            phone: userDetails?.user?.phone,
        }
        setLoader(true);
        try {
            const response = await GREENCLINICAPI.post(`${addMeAsNewMember}`, payload);
            if (response.status == 200) {
                setSelectedMrNumberId(response?.data?.data?.data);
                setLoader(false);
                setMrNumberModal(false)
                setCheckEmptyStatus(false)
                handleCloseNewPatient();
            }
            else {
                setLoader(false)
            }
        } catch (error) {
            setLoader(false);
            console.log(error)
        }
    }


    const handleCopy = () => {
        const url = `${siteUrl}${router.asPath}`;
        const title = `Check out ${doctorProfile.user.prefix}. ${doctorProfile.user.name}, ${doctorProfile?.user?.doctor_specialities?.map(
            (item, index) =>
                index === doctorProfile?.user?.doctor_specialities?.length - 1
                    ? `${item} `
                    : `${item}, `
        )} on Meri Sehat.`;
        const textToCopy = `${url}\n ${title}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            Swal.fire({
                // title: "Good job!",
                text: "Text copied to clipboard!",
                icon: "success"
            });
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    };


    const handleAppointmentClick = (type) => {
        if (checkAuth !== undefined && checkAuth !== "undefined") {
            const selectedClinic = doctorProfile?.user?.doctor_clinics?.find((clinic) => {
                if (type == 'inPerson') {
                    return clinic?.is_physical;
                } else if (type == 'videoCall') {
                    return !clinic?.is_physical;
                }
                return false;
            });
            if (selectedClinic) {
                Cookies.set('clinic_info', JSON.stringify({
                    clinicsInfoId: selectedClinic?.id,
                    doctorId: doctorProfile?.user?.id
                }));
                router.push('/book-appointment');
                Cookies.set("redirectionUrl", router.asPath);
            }
        } else {
            Cookies.set("redirectionUrl", router.asPath);
            window.location.href = "/phone-number";
        }
    };

    useEffect(() => {
        Cookies.remove("redirectionUrl");
    }, [])


    const r = useRouter();
    let doctorName = r?.asPath?.split("/")[4];
    useEffect(() => {
        const physicalClinics = doctorProfile?.user?.doctor_clinics?.filter(item => item.is_physical === true);
        if (physicalClinics?.length) {
            handleRelativeDays(physicalClinics[0]);
        }
    }, [doctorProfile]);


    useEffect(() => {
        if (checkEmptyStatus == false) {
            setTimeout(() => {
                scheduleAppointment();
            }, 1000);
        }
    }, [checkEmptyStatus]);




    useEffect(() => {
        if (clinicTimings) {
            const findFirstAvailableTime = () => {
                if (clinicTimings.Morning?.length > 0) {
                    return { timeSlot: clinicTimings.Morning[0], period: "morning" };
                } else if (clinicTimings.Afternoon?.length > 0) {
                    return { timeSlot: clinicTimings.Afternoon[0], period: "afternoon" };
                } else if (clinicTimings.Evening?.length > 0) {
                    return { timeSlot: clinicTimings.Evening[0], period: "evening" };
                }
                return null;
            };

            const firstAvailable = findFirstAvailableTime();
            if (firstAvailable && !selectedTime) {
                handleCheckTime(firstAvailable.timeSlot, "time");
                setActiveTimeTab(firstAvailable.period);
            }
        }
    }, [clinicTimings]);


    const hasVideoCall = doctorProfile.user.doctor_clinics?.some(item => item.is_physical === false);
    const hasInPerson = doctorProfile.user.doctor_clinics?.some(item => item.is_physical === true);

    let defaultTab = 'inPerson';
    if (!hasInPerson && hasVideoCall) {
        defaultTab = 'videoCall';
    }


    return (
        <>
            {loader && (
                <Loader />
            )}
            <div className={styles.wrapper}>
                <ContainerWrapperFindDoc>
                    <ul className={styles.breadcrumb_wrapper}>
                        <span href="/"><li> Home <span className={styles.svgArrow}></span> </li></span>
                        {selectedCity && selectedCity?.name ? (
                            <>
                                <MyLink href={`/doctors/${selectedCity?.name}?page=1`}><li> {selectedCity && selectedCity?.name} <span className={styles.svgArrow}></span> </li></MyLink>
                            </>
                        ) : ''}
                        <MyLink href={`/doctors/${selectedCity?.name}?page=1`}><li>Doctors  <span className={styles.svgArrow}></span></li></MyLink>
                        <span className='breadcrumb-text' href="/"><li> {id?.[1] && id[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} <span className={styles.svgArrow}></span> </li> </span>

                        {(doctorName !== "" || doctorName !== null || doctorName !== undefined) ? (
                            <>
                                <MyLink href={`/doctors/${selectedCity?.name}?page=1`}><li className={styles.activeBread}> {doctorName && doctorName?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} </li></MyLink>
                            </>
                        ) : ''}
                    </ul>
                    <div className={styles.wrapperAllDetails}>
                        <div className={styles.wrapperLeftDetails}>
                            {!isMobile
                                ?
                                (<>
                                    <div className={styles.card_single_doctor}>
                                        <span onClick={() => setShareIcons(true)} className={styles.shareIcon}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <g clip-path="url(#clip0_6932_153332)">
                                                    <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="#222222" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_6932_153332">
                                                        <rect width="24" height="24" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </span>
                                        <Image src={doctorProfile?.user?.image || ''} alt="docImg" width={180} height={180} className={styles.doct_img} />
                                        <div className={styles.info_doctor_wrapper_container}>
                                            <div className={styles.info_doctor}>
                                                <div className={styles.name_doct}>
                                                    <span className={styles.title__doctor_name}> {`${doctorProfile?.user?.prefix ? `${doctorProfile?.user?.prefix}.` : ''} ${doctorProfile?.user?.name}`} </span>
                                                    {doctorProfile?.user?.is_verified && (
                                                        <>
                                                            <span className={styles.verifiedIconName}> </span>
                                                        </>
                                                    )}
                                                </div>
                                                <span className={styles.title__doctor_type}>
                                                    {doctorProfile?.user?.doctor_specialities?.map((item, index) => index == doctorProfile?.user?.doctor_specialities?.length -
                                                        1
                                                        ? `${item} `
                                                        : `${item}, `
                                                    )}
                                                </span>
                                                <span className={styles.title__doctor_type}>
                                                    {doctorProfile?.user?.doctor_educations?.map(
                                                        (item, index) =>
                                                            index ==
                                                                doctorProfile?.user?.doctor_educations
                                                                    ?.length -
                                                                1
                                                                ? `${item} `
                                                                : `${item}, `
                                                    )}
                                                </span>
                                            </div>
                                            <div className={styles.recommendations_doctor}>
                                                {doctorProfile?.user?.badge_tag?.badge && <div className={styles.recomm_tag} style={{ backgroundColor: doctorProfile?.user?.badge_tag?.background_color_with_hash }}>
                                                    <span className={styles.thumbs_up} style={{ color: doctorProfile?.user?.badge_tag?.font_color_with_hash }}> </span>
                                                    <span className={styles.thumbs_up_text} style={{ color: doctorProfile?.user?.badge_tag?.font_color_with_hash }}> {doctorProfile?.user?.badge_tag?.badge} </span>
                                                </div>}

                                                <div className={styles.single__recome}>
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <g clip-path="url(#clip0_1_64020)">
                                                                <path d="M12.4172 18.0745L16.9843 20.8368C17.8207 21.343 18.8442 20.5947 18.6241 19.6482L17.4135 14.4537L21.4525 10.9541C22.1898 10.3157 21.7936 9.10517 20.8252 9.02813L15.5096 8.57692L13.4296 3.66857C13.0555 2.77714 11.7788 2.77714 11.4047 3.66857L9.32467 8.56591L4.00914 9.01713C3.04067 9.09416 2.64448 10.3047 3.38184 10.943L7.42077 14.4427L6.21019 19.6372C5.99008 20.5837 7.01357 21.332 7.84997 20.8258L12.4172 18.0745Z" fill="#FFC07E" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_1_64020">
                                                                    <rect width="24" height="24" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </span>
                                                    <span className={styles.single__otg_text}> {doctorProfile?.user?.average_rating} ({doctorProfile?.user?.review_count} Reviews)  </span>
                                                </div>
                                                <div className={`${styles.single__recome}`}>
                                                    <span className={styles.single__bag_svg}>  </span>
                                                    <span className={styles.single__otg_text}> {doctorProfile?.user?.experience_year} Yrs Experience  </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>)
                                :
                                (<>
                                    <div className={styles.mobile_single_card}>
                                        <span className={`${styles.iconshare1} d-none`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <g clip-path="url(#clip0_6961_132562)">
                                                    <path d="M13.5 12.06C12.93 12.06 12.42 12.285 12.03 12.6375L6.6825 9.525C6.72 9.3525 6.75 9.18 6.75 9C6.75 8.82 6.72 8.6475 6.6825 8.475L11.97 5.3925C12.375 5.7675 12.9075 6 13.5 6C14.745 6 15.75 4.995 15.75 3.75C15.75 2.505 14.745 1.5 13.5 1.5C12.255 1.5 11.25 2.505 11.25 3.75C11.25 3.93 11.28 4.1025 11.3175 4.275L6.03 7.3575C5.625 6.9825 5.0925 6.75 4.5 6.75C3.255 6.75 2.25 7.755 2.25 9C2.25 10.245 3.255 11.25 4.5 11.25C5.0925 11.25 5.625 11.0175 6.03 10.6425L11.37 13.7625C11.3325 13.92 11.31 14.085 11.31 14.25C11.31 15.4575 12.2925 16.44 13.5 16.44C14.7075 16.44 15.69 15.4575 15.69 14.25C15.69 13.0425 14.7075 12.06 13.5 12.06Z" fill="#222222" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_6961_132562">
                                                        <rect width="18" height="18" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </span>
                                        <div className={styles.topping_wrape}>
                                            <Image src={doctorProfile?.user?.image || ''} alt="docImg" width={82} height={82} />
                                            <div className={styles.info_mobile_details}>
                                                {doctorProfile?.user?.badge_tag?.badge && <div className={styles.recomm_tag}>
                                                    <span className={styles.thumbs_up}> </span>
                                                    <span className={styles.thumbs_up_text}> {doctorProfile?.user?.badge_tag?.badge} </span>
                                                </div>}
                                                <div className={styles.name_doct}>
                                                    <span className={styles.title__doctor_name}>{`${doctorProfile?.user?.prefix ? `${doctorProfile?.user?.prefix}.` : ''} ${doctorProfile?.user?.name}`} </span>
                                                    {doctorProfile?.user?.is_verified && (
                                                        <>
                                                            <span className={styles.verifiedIconName}> </span>
                                                        </>
                                                    )}
                                                </div>
                                                <span className={styles.title__doctor_type}>  {doctorProfile?.user?.doctor_specialities?.map((item, index) => index == doctorProfile?.user?.doctor_specialities?.length -
                                                    1
                                                    ? `${item} `
                                                    : `${item}, `
                                                )} </span>
                                                <span className={styles.title__doctor_type}>  {doctorProfile?.user?.doctor_educations?.map(
                                                    (item, index) =>
                                                        index ==
                                                            doctorProfile?.user?.doctor_educations
                                                                ?.length -
                                                            1
                                                            ? `${item} `
                                                            : `${item}, `
                                                )} </span>
                                                <div className={`${styles.single__recome} d-none`}>

                                                    <span className={`${styles.single__bag_svg} hk_bag`}>  </span>
                                                    <span className={styles.single__otg_text}> {doctorProfile?.user.experience_year} Yrs Experience  </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.drCardExp}>
                                            <ul className={styles.listRev}>
                                                <li>
                                                    <Image src={star1} alt="star Image" className={styles.star_img} />
                                                    <p>{doctorProfile?.user?.average_rating} ({doctorProfile?.user?.review_count} Reviews)</p>
                                                </li>
                                                <li>
                                                    <span className={`${styles.hk_bag} hk_bag`}></span>
                                                    <p>{doctorProfile?.user.experience_year} Yrs Experience</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </>)
                            }

                            <ul className={`${styles.tabs_profile} tabs_profile ${scroll ? `${styles.stickyTabs}` : ''}`}>
                                <div className={`${styles.stickyTabsBox}`}>
                                    <Link
                                        activeClass={styles.tabs_active}
                                        className={`${firstActiveItem ? styles.tabs_active : 'nav'}`}
                                        to="about_tab"
                                        spy={true}
                                        // smooth={true}
                                        // duration={500}
                                        offset={isMobile ? -200 : -250}
                                        onSetActive={handleSetActive}
                                        initial={true}
                                    >
                                        About
                                    </Link>
                                    <Link
                                        activeClass={styles.tabs_active}
                                        className="nav"
                                        to="education_tab"
                                        spy={true}
                                        // smooth={true}
                                        // duration={500}
                                        offset={isMobile ? -140 : -220}
                                        onSetActive={handleSetActive}
                                    >
                                        Education & Experience
                                    </Link>
                                    <Link
                                        activeClass={styles.tabs_active}
                                        className="nav"
                                        to="review_tab"
                                        spy={true}
                                        // smooth={true}
                                        // duration={500}
                                        offset={isMobile ? -200 : -250}
                                        onSetActive={handleSetActive}
                                        initial={true}
                                    >
                                        Reviews
                                    </Link>
                                    <Link
                                        activeClass={styles.tabs_active}
                                        className="nav"
                                        to="services_tab"
                                        spy={true}
                                        // smooth={true}
                                        // duration={500}
                                        offset={isMobile ? -140 : -220}
                                        onSetActive={handleSetActive}
                                    >
                                        Services
                                    </Link>
                                    <Link
                                        activeClass={styles.tabs_active}
                                        className="nav"
                                        to="conditions_tab"
                                        spy={true}
                                        // smooth={true}
                                        // duration={500}
                                        offset={isMobile ? -140 : -220}
                                        onSetActive={handleSetActive}
                                    >
                                        Condition
                                    </Link>
                                    <Link
                                        activeClass={styles.tabs_active}
                                        className="nav"
                                        to="articles"
                                        spy={true}
                                        // smooth={true}
                                        // duration={500}
                                        offset={isMobile ? -140 : -220}
                                        onSetActive={handleSetActive}
                                    >
                                        Articles
                                    </Link>
                                </div>
                            </ul>
                            {/* ----------------------------------------- Tabs ------------------------------------- */}
                            <div className={styles.contentDetailsProfile} >
                                {/* ---- About Card --- > */}
                                <Element id="about_tab" className="element" >
                                    <div className={styles.about_card_profile}>
                                        <h3 className={styles.titleProfileCard}> About </h3>
                                        <p> {doctorProfile?.user?.about && parse(doctorProfile?.user?.about)}</p>
                                        {/* <ul>
                                        <li>MBBS from Rawalpindi Medical College, Pakistan </li>
                                        <li>FCPS (Dermatology) from College of Physicians & Surgeons Pakistan</li>
                                        <li>CAAAM from American Academy of Aesthetic Medicine</li>
                                    </ul> */}
                                    </div>
                                </Element>
                                {/* ---- About Card --- > */}
                                <div name='education_tab' id="education_tab" className={styles.wrapperEduca}>
                                    <Element className="element" >
                                        {/* ---- Educations Card --- > */}
                                        <div className={`${styles.education_card_profile} `} >
                                            <h3 className={styles.titleProfileCard}> Education </h3>
                                            <ul>
                                                {doctorProfile?.user?.doctor_educations &&
                                                    doctorProfile?.user?.doctor_educations.map(
                                                        (education) => {
                                                            return (
                                                                <>
                                                                    <li key={education}> {education} </li>
                                                                </>
                                                            );
                                                        }
                                                    )}
                                            </ul>
                                            {isMobile &&
                                                (<>
                                                    {doctorProfile?.user?.doctor_experince && doctorProfile?.user?.doctor_experince.some(exp => exp?.institute) ? (
                                                        <>
                                                            <h3 className={styles.titleProfileCard}> Experience </h3>
                                                            <ul>
                                                                {doctorProfile?.user?.doctor_experince.map((exp) => (
                                                                    exp?.institute && (
                                                                        <li className="btn-pills" key={exp?.id}>
                                                                            {exp?.institute}
                                                                        </li>
                                                                    )
                                                                ))}
                                                            </ul>
                                                        </>
                                                    ) : null}
                                                </>)}
                                        </div>
                                        {/* ---- Educations Card --- > */}
                                    </Element>

                                    {!isMobile && <Element id="experience_tab" className="element">
                                        {doctorProfile?.user?.doctor_experince && doctorProfile?.user?.doctor_experince.some(exp => exp?.institute) ? (
                                            <div className={styles.experience_card_profile}>
                                                <h3 className={styles.titleProfileCard}> Experience </h3>
                                                <ul>
                                                    {doctorProfile?.user?.doctor_experince.map((exp) => (
                                                        exp?.institute && (
                                                            <li className="btn-pills" key={exp?.id}>
                                                                {exp?.institute}
                                                            </li>
                                                        )
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : null}
                                    </Element>}
                                </div>
                                {/* ----------------- reviews card ---------------- */}
                                <Element id="review_tab" className="element">
                                    <div className={`${showAllReviews ? `${styles.showAllCurrently}` : ''} ${styles.reviews_card_profile}`}>
                                        <div className={styles.top_wraper_reviews}>
                                            <h4> Reviews </h4>
                                            <div className={styles.rightReviewsStars}>
                                                <span className={styles.iconStar}>
                                                    {generateStarIcons(doctorProfile?.user?.average_rating)}
                                                </span>
                                                <span className={styles.reviewsRate}>{`${doctorProfile?.user?.average_rating}/5`}</span>
                                                <span className={styles.reviewsCount}>({doctorProfile?.user?.reviews?.length} reviews)</span>
                                            </div>
                                        </div>
                                        <div className={styles.single_card_review_container}>
                                            {reviewToDisplay?.length > 0 &&
                                                reviewToDisplay?.map((review, index) => (
                                                    <>
                                                        <div className={styles.single_card_review}>
                                                            <div className={styles.head}>
                                                                <div className={styles.first_col}>
                                                                    <Image src={review?.image ? review?.image : ''} width={32} height={32} alt='Image' />
                                                                    <h4>
                                                                        {review?.review_by_user}<span className={styles.date_card}> {review?.created_at}  </span></h4>
                                                                </div>

                                                            </div>
                                                            <div className={`${styles.starRatingBox} d-block d-lg-none`}>
                                                                <div className={styles.right_head}>
                                                                    <ul>
                                                                        <li>{review?.rating == 0 ? (
                                                                            <>
                                                                                <Image width={18} height={18} src={EmptyStar} alt='' className={` me-3`} />
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Image width={18} height={18} src={star1} alt='' className={` me-3`} />
                                                                            </>
                                                                        )}
                                                                            <span className={`${styles.ratingP} pe-3`}>{review?.rating}/5</span>

                                                                        </li>
                                                                        <li>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                                                                <path d="M2.66683 13.8334C2.30016 13.8334 1.98627 13.7029 1.72516 13.4417C1.46405 13.1806 1.3335 12.8667 1.3335 12.5001V4.50008C1.3335 4.13341 1.46405 3.81953 1.72516 3.55841C1.98627 3.2973 2.30016 3.16675 2.66683 3.16675H10.6668C11.0335 3.16675 11.3474 3.2973 11.6085 3.55841C11.8696 3.81953 12.0002 4.13341 12.0002 4.50008V7.50008L14.6668 4.83341V12.1667L12.0002 9.50008V12.5001C12.0002 12.8667 11.8696 13.1806 11.6085 13.4417C11.3474 13.7029 11.0335 13.8334 10.6668 13.8334H2.66683ZM2.66683 12.5001H10.6668V4.50008H2.66683V12.5001Z" fill="#19B3B5" stroke="#19B3B5" stroke-width="0.177778" />
                                                                            </svg>
                                                                            <span className={`${styles.ratingP} ps-3`}>
                                                                                {review?.appointment_type} </span>
                                                                        </li>
                                                                    </ul>
                                                                    {/* <span className={styles.in_pers_svg} /> */}
                                                                </div>
                                                            </div>
                                                            <p>
                                                                {review?.description}
                                                            </p>

                                                        </div>
                                                        <button className={styles.allReview}>View All Reviews</button>
                                                    </>
                                                ))}
                                            {/* {doctorProfile?.user?.reviews?.length > 1 && (
                                                <p className={styles.viewAllReviews} onClick={toggleShowAllReviews}>
                                                    {showAllReviews ? 'Show Less Reviews' : 'View All Reviews'}
                                                </p>
                                            )} */}
                                        </div>
                                    </div>
                                </Element>
                                {/* ----------------- reviews card ---------------- */}
                                <Element id="services_tab" className="element">
                                    {/* ---- Service Card --- > */}
                                    <div name='services_tab' className={styles.services_card_profile}>
                                        <h3 className={styles.titleProfileCard}> Services </h3>
                                        <ul>
                                            {doctorProfile?.user?.doctor_services_full &&
                                                doctorProfile?.user?.doctor_services_full.map(
                                                    (service) => (
                                                        <li
                                                            className="btn-pills"
                                                            key={service}
                                                            title={service?.name}
                                                        >
                                                            <span>
                                                                {service?.name}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                        </ul>
                                    </div>
                                    {/* ---- Service Card --- > */}
                                </Element>
                                <Element id="conditions_tab" className="element condition_hk">
                                    {/* ---- conditions Card --- > */}
                                    <div className={styles.conditions_card_profile}>
                                        <h3 className={styles.titleProfileCard}> Conditions Treated </h3>
                                        <ul>
                                            {doctorProfile?.user?.doctor_condition &&
                                                doctorProfile?.user?.doctor_condition?.map(
                                                    (condition) => {
                                                        return (
                                                            <>
                                                                <li key={condition?.id} title={condition?.name}>
                                                                    <span>  {condition?.name} </span>
                                                                </li>
                                                            </>
                                                        );
                                                    }
                                                )}
                                        </ul>
                                    </div>
                                </Element>
                                <Element id="articles" className="element">
                                    {/* ---- articles Card --- > */}
                                    <div className={styles.articles_card_profile} name="articles" id="articles">
                                        {doctorProfile?.user?.articles_by_specialities?.length > 0 ? (
                                            <>
                                                <Row className={`another-section mt-0 ${styles.anotherSection}`}>
                                                    <h3 className={`${styles.titleProfileCard} ${styles.titleProfileCardArticles}`} style={{ paddingLeft: "32px", paddingBottom: "20px", paddingTop: "12px" }}>Articles</h3>
                                                    {doctorProfile?.user?.articles_by_specialities &&
                                                        doctorProfile?.user?.articles_by_specialities?.length > 0
                                                        ? doctorProfile?.user?.articles_by_specialities
                                                            ?.slice(0, 4)
                                                            ?.map((article) => (
                                                                <Col md={6} className={`mb-3  ${styles.img__zoom} `}>
                                                                    <div className={`d-flex article-listing-box img-hover-zoom-out ${styles.zooming} `}>
                                                                        <Col
                                                                            md={4}
                                                                            className={`p-0 box-radius-overflow-hidden col-4 ${styles.first_img_column}`}
                                                                        >
                                                                            {article?.redirect_url && (
                                                                                <MyLink href={article?.redirect_url}>

                                                                                    <Image
                                                                                        width={220}
                                                                                        height={194}
                                                                                        src={article?.image || ''}
                                                                                        style={{
                                                                                            height: '100%',
                                                                                            objectFit: 'cover',
                                                                                            transition:
                                                                                                'all 0.3s ease-in-out'
                                                                                        }}
                                                                                        className="img-fluid image-radius"
                                                                                    />

                                                                                </MyLink>
                                                                            )}
                                                                        </Col>
                                                                        <Col className={`${styles.secondTabRight}`}>
                                                                            <div className="second-box 1">
                                                                                {article?.redirect_url && (
                                                                                    <MyLink
                                                                                        href={article?.redirect_url}
                                                                                    >
                                                                                        <div className={`${styles.wraperHeadingsRight} mt-3`}>
                                                                                            <button>
                                                                                                <Image width={7.167} height={5.392} src={"public/svg/tick_svg_img.svg"} alt='img' className={styles.tick_button_svg} />
                                                                                                Evidence Based
                                                                                            </button>
                                                                                            <h5>{article?.name}</h5>
                                                                                        </div>
                                                                                        {/* <div className="mt-3">
                                                                                        <p>{article?.descripton}</p>
                                                                                    </div> */}
                                                                                    </MyLink>
                                                                                )}
                                                                                {article?.redirect_url && (

                                                                                    <MyLink
                                                                                        href={article?.redirect_url}
                                                                                    >
                                                                                        <div className={`mt-3 ${styles.read_more_btn_fad}`}>
                                                                                            <Image
                                                                                                width={25}
                                                                                                height={25}
                                                                                                className="img-fluid"
                                                                                                src={imgArrow}
                                                                                                alt="arrow"
                                                                                            />
                                                                                            <button className={`ms-3 underline_ancer ${styles.underline_reading}`}>
                                                                                                Read More
                                                                                            </button>
                                                                                        </div>
                                                                                    </MyLink>
                                                                                )}
                                                                            </div>
                                                                        </Col>
                                                                    </div>
                                                                </Col>
                                                            ))
                                                        : doctorProfile?.user?.articles_by_specialities_latest?.map(
                                                            (item) => (
                                                                <Col md={6} className="mt-5">
                                                                    <div className="d-flex article-listing-box img-hover-zoom-out">
                                                                        <Col
                                                                            md={4}
                                                                            className="p-0 box-radius-overflow-hidden col-4"
                                                                        >
                                                                            {item?.redirect_url && (
                                                                                <Link to={item?.redirect_url}>
                                                                                    <Image
                                                                                        width={220}
                                                                                        height={194}
                                                                                        // crossorigin="anonymous"
                                                                                        src={item?.image || ''}
                                                                                        style={{
                                                                                            height: '100%',
                                                                                            objectFit: 'cover',
                                                                                            transition:
                                                                                                'all 0.3s ease-in-out'
                                                                                        }}
                                                                                        className="img-fluid image-radius"
                                                                                    />
                                                                                </Link>
                                                                            )}
                                                                        </Col>
                                                                        <Col md={8} className="col-8">
                                                                            <div className="second-box">
                                                                                {item?.redirect_url && (
                                                                                    <Link to={item?.redirect_url}>
                                                                                        <div className="mt-3">
                                                                                            <h5>{item?.name}</h5>
                                                                                        </div>
                                                                                        <div className="mt-3">
                                                                                            <p>{item?.descripton}</p>
                                                                                        </div>
                                                                                    </Link>
                                                                                )}
                                                                                {item?.redirect_url && (
                                                                                    <Link to={item?.redirect_url}>
                                                                                        <div className="mt-3">
                                                                                            <Image
                                                                                                width={25}
                                                                                                height={25}
                                                                                                className="img-fluid"
                                                                                                src={imgArrow}
                                                                                                alt="arrow"
                                                                                            />
                                                                                            <button className="ms-3 underline_ancer">
                                                                                                Read More
                                                                                            </button>
                                                                                        </div>
                                                                                    </Link>
                                                                                )}
                                                                            </div>
                                                                        </Col>
                                                                    </div>
                                                                </Col>
                                                            )
                                                        )}
                                                </Row>
                                            </>
                                        ) : null}
                                    </div>
                                    {/* ---- articles Card --- > */}
                                </Element>
                            </div>
                        </div>
                        {/* ------------------------- right details --------------------- */}

                        {!isMobile && (
                            <>
                                {doctorProfile?.user?.is_fad === true ? (
                                    
                                    <>
                                        <div className={`${styles.wrapperRightDetails} wrapperRightDetails newTab`}>
                                            <div className={`${styles.consult_req_form} consult_req_form`}>
                                                <div className={styles.consult_req_form_inner_wraper}>
                                                    <h3 className={styles.consultText}> Book a Consult </h3>
                                                    
                                                    <Tabs
                                                        defaultActiveKey={defaultTab}
                                                        id="uncontrolled-tab-example"
                                                        className="mb-3 videoCallTab"
                                                    >
                                                        {doctorProfile.user.doctor_clinics?.some((item) => item.is_physical == false) && (
                                                            <Tab eventKey="videoCall" title="Video Call">
                                                                <h4> Location </h4>
                                                                <div className={`${styles.wraperHospitalCard} wraperHospitalCard`}></div>
                                                                <div className={`${styles.sliderWraperHospital} sliderWraperHospital`}>
                                                                    <Slider {...settings}>
                                                                        {doctorProfile.user.doctor_clinics
                                                                            ?.filter((item) => item.is_physical == false)
                                                                            .map((item) => (
                                                                                <div
                                                                                    className={styles.hospital_card}
                                                                                    key={item.id}
                                                                                    onClick={() => handleRelativeDays(item)}
                                                                                >
                                                                                    <div className={styles.wraper_infoo}>
                                                                                        <Image width={40} height={40} src={item.icon || ''} alt="" />
                                                                                        <div className={styles.info_ri_hos}>
                                                                                            <h3>{item?.name}</h3>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.right_end}>
                                                                                        <h3>Rs.{item?.consultation_fee}</h3>
                                                                                        {checkedItem == item.id && (
                                                                                            <span className={styles.arrow_right_hos}></span>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                    </Slider>
                                                                </div>
                                                            </Tab>
                                                        )}

                                                        {doctorProfile.user.doctor_clinics?.some((item) => item.is_physical == true) && (
                                                            <Tab eventKey="inPerson" title="In-person">
                                                                <h4> Location </h4>
                                                                <div className={`${styles.wraperHospitalCard} wraperHospitalCard`}></div>
                                                                <div className={`${styles.sliderWraperHospital} sliderWraperHospital`}>
                                                                    <Slider {...settings}>
                                                                        {doctorProfile.user.doctor_clinics?.filter((item) => item.is_physical == true)
                                                                            .map((item) => (
                                                                                <div className={styles.hospital_card} key={item.id} onClick={() => handleRelativeDays(item)}>
                                                                                    <div className={styles.wraper_infoo}>
                                                                                        <Image width={40} height={40} src={item.icon || ''} alt="" />
                                                                                        <div className={styles.info_ri_hos}>
                                                                                            <h3>{item?.name}</h3>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.right_end}>
                                                                                        <h3>Rs.{item?.consultation_fee}</h3>
                                                                                        {checkedItem == item.id && (
                                                                                            <span className={styles.arrow_right_hos}></span>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                    </Slider>
                                                                </div>
                                                            </Tab>
                                                        )}

                                                    </Tabs>
                                                    <DaysFad clinicDays={clinicDays} setSelectedDay={setSelectedDay} setSelectedTime={setSelectedTime} selectedDay={selectedDay} preferredConsultation={preferredConsultation} handleCheck={handleCheck} />
                                                    {selectedDayError && (
                                                        <span className={styles.errorState}>{selectedDayError}</span>
                                                    )}
                                                    <div className="timeWraper">
                                                        <TimeFad
                                                            activeTab={activeTimeTab}
                                                            setActiveTab={setActiveTimeTab}
                                                            clinicTimings={clinicTimings}
                                                            selectedTime={selectedTime}
                                                            clinicDays={clinicDays}
                                                            selectedDay={selectedDay}
                                                            handleCheckTime={handleCheckTime} />
                                                    </div>
                                                </div>
                                                <div className={styles.wrape_btn}>
                                                    <button onClick={() => scheduleAppointment()} disabled={selectedDay == "" || selectedTime == ""} className={`${styles.bookAnAppointmentBtn} ${selectedDay == "" || selectedTime == "" ? 'disabled' : ''}`}> Book CONSULT </button>
                                                </div>
                                            </div>

                                            {!isMobile && <div className={styles.whyUs_form}>
                                                <h3> Why us?  </h3>
                                                <div className={styles.wrapperWhyConnects}>
                                                    <div className={styles.singlingConnect}>
                                                        <span className={styles.connectivitySvg} ></span>
                                                        <h4> HIPPA Compliant </h4>
                                                    </div>
                                                    <div className={styles.singlingConnect}>
                                                        <span className={styles.guardSvg} ></span>
                                                        <h4> 100% Private & Secure  </h4>
                                                    </div>
                                                    <div className={styles.singlingConnect}>
                                                        <span className={styles.keySvg} ></span>
                                                        <h4> End-to-end Encryption </h4>
                                                    </div>
                                                    <div className={styles.singlingConnect}>
                                                        <span className={styles.earphonesSvg} ></span>
                                                        <h4> Priority Customer Support </h4>
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>
                                    </>
                                ) : (doctorProfile?.user?.is_fad == false && (
                                    <>
                                        <div className={`${styles.wrapperRightDetails} wrapperRightDetails1`}>
                                            <div className={styles.consultImmedBox}>
                                                <h3 className={styles.consultImmedText}> Consult Immediately </h3>
                                                <p> Speak to our PMDC certified doctors right now with no hassle. </p>
                                                <button className={styles.consultImmedbtnRequest} onClick={() => router.push('/doctor-now')}> Doctor Now </button>
                                            </div>

                                            {!isMobile &&
                                                <div className={styles.whyUs_form}>
                                                    <h3> Why us?  </h3>
                                                    <div className={styles.wrapperWhyConnects}>
                                                        <div className={styles.singlingConnect}>
                                                            <span className={styles.connectivitySvg} ></span>
                                                            <h4> HIPPA Compliant </h4>
                                                        </div>
                                                        <div className={styles.singlingConnect}>
                                                            <span className={styles.guardSvg} ></span>
                                                            <h4> 100% Private & Secure </h4>
                                                        </div>
                                                        <div className={styles.singlingConnect}>
                                                            <span className={styles.keySvg} ></span>
                                                            <h4> End-to-end Encryption </h4>
                                                        </div>
                                                        <div className={styles.singlingConnect}>
                                                            <span className={styles.earphonesSvg} ></span>
                                                            <h4> Priority Customer Support </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </>
                                ))
                                }
                            </>
                        )}









                    </div>
                </ContainerWrapperFindDoc>
                {isMobile && (
                    <>
                        {doctorProfile?.user?.is_fad === true ? (
                            <>
                                <div className={styles.bottomBar}>
                                    <div className={styles.btnWrapping}>
                                        <button onClick={() => handleAppointmentClick('inPerson')} className={styles.btnNew1}>IN-PERSON</button>
                                        <button onClick={() => handleAppointmentClick('videoCall')} className={styles.btnNew2}>VIDEO CALL</button>

                                        {/* <button className={styles.reqBtn} onClick={() => handleShow(doctorProfile?.user?.id)}> Request Consult </button> */}
                                    </div>
                                </div>
                            </>
                        ) : (
                            doctorProfile?.user?.is_fad === false && (
                                <>
                                    <div className={styles.bottomBar}>
                                        <div className={styles.btnWrapping}>
                                            <button className={styles.doctorNowBtn} onClick={() => router.push('/doctor-now')}> Doctor Now </button>
                                        </div>
                                    </div>
                                </>
                            )
                        )}
                    </>
                )
                }
            </div>
            <div className={styles.pamphProf}>
                <BottomDoctorPamfh />
            </div>
            <AppointmentMrNumber handleCloseNewPatient={handleCloseNewPatient} patientName={patientName} setShow={setMrNumberModal} setPatientName={setPatientName} newMemberModal={newMemberModal} setNewMemberModal={setNewMemberModal} addMeAsANewMember={addMeAsANewMember} selectedMrNumberId={selectedMrNumberId} setSelectedMrNumberId={setSelectedMrNumberId} mrNumbersListing={mrNumbersListing} handleClose={handleCloseMrNumber} show={mrNumberModal} filteredId={filteredId} />
            <RequestSubmittedModal requestData={requestData} handleClose={handleCloseRequestModal} requestShow={requestShow} setRequestShow={setRequestShow} />
            <RequestModalConsult selectedDoctorID={selectedDoctorID} show={show} setShow={setShow} handleClose={handleClose} myCities={myCities} />
            <div className='sharedModalSection'>
                <Modal
                    centered
                    open={shareIcons}
                    onOk={() => setShareIcons(false)}
                    onCancel={() => setShareIcons(false)}
                    className='sharedModalSection'
                    footer={null}
                >
                    <EmailShareButton url={`${siteUrl}${router.asPath}`} title="Check out this article! Check out this article!">
                        <EmailIcon size={32} round />
                    </EmailShareButton>

                    <FacebookShareButton url={`${siteUrl}${router.asPath}`} title="Check out this article!">
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>

                    <WhatsappShareButton url={`${siteUrl}${router.asPath}`} title={`Check out ${doctorProfile.user.prefix}. ${doctorProfile.user.name}, ${doctorProfile?.user?.doctor_specialities?.map((item, index) => index == doctorProfile?.user?.doctor_specialities?.length -
                        1
                        ? `${item} `
                        : `${item}, `
                    )}on Meri Sehat.`}>
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <FaClipboard onClick={handleCopy} size={32} />
                </Modal>
            </div>
        </>
    )
}


export default DoctorProfile;

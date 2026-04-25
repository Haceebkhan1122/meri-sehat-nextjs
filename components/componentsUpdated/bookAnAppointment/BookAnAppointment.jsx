import React, { useEffect, useState, useRef } from 'react'
import styles from './bookAnAppointment.module.scss';
import { Col, Container, Row, Toast } from 'react-bootstrap';
import Image from 'next/image';
import AppointmentModal from './appointmentModal/AppointmentModal';
import { APIV3, GREENCLINICAPI } from "@/utils/httpService";
import { useRouter } from 'next/router';
import DaysFad from '../daysFad/DaysFad';
import TimeFad from '../timeFad/TimeFad';
import Loader from '@/components/Loader';
import AppointmentMrNumber from './appointmentMrNumber/AppointmentMrNumber';
import { getMrNumbers, scheduleAppointmentFad, rescheduleAppointmentEndpoint, addMeAsNewMember } from "@/utils/endpoints";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';
import useMediaQuery from '@mui/material/useMediaQuery';
import ResheduleAppointment from './rescheduleAppointment/RescheduleAppointment';
import RescheduleAppointment from './rescheduleAppointment/RescheduleAppointment';
import moment from 'moment';


const BookAnAppointment = ({ clinicInfo, setClinicInfo, doctorId, dashboardKey, setDashboardKey }) => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const token = Cookies.get('Authorization');
    const paymentChecker = Cookies.get('makePyament');
    const router = useRouter()
    const [show, setShow] = useState(false);
    const [rescheduleAppointment, setRescheduleAppointment] = useState(false);
    const [mrNumberModal, setMrNumberModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedTimeId, setSelectedTimeId] = useState(null);
    const [selectedMrNumberId, setSelectedMrNumberId] = useState("");
    const [filteredId, setFilteredId] = useState(null);
    const [preferredDays, setPreferredDays] = useState(null);
    const [preferredConsultation, setPreferredConsultation] = useState([]);
    const [clinicTimings, setClinicTimings] = useState({});
    const [mrNumbersListing, setMrNumbersListing] = useState({});
    const [doctorData, setDoctorData] = useState({});
    const [listenerForChangeClinic, setListenerForChangeClinic] = useState(false);
    const [toShowDay, setToShowDay] = useState('');
    const [newMemberModal, setNewMemberModal] = useState(false);
    const [checkEmptyStatus, setCheckEmptyStatus] = useState(null);
    const [patientName, setPatientName] = useState('');
    const [gcDoctorClinicId, setGcDoctorClinicId] = useState(null);
    const [activeTimeTab, setActiveTimeTab] = useState("morning");

    const filteredDataRef = useRef({ preferredConsultation: null, clinicTimings: null, filteredId: null });
    const handleClose = () => setShow(false);

     let pathh = router.asPath?.split("=");
    let redirectionLink = pathh[1];

    const handleCloseNewPatient = () => {
        setPatientName('')
        setNewMemberModal(false);
    }

    const handleRescheduleClose = () => setRescheduleAppointment(false);
    const handleShow = () => setShow(true);
    const handleCloseMrNumber = () => setMrNumberModal(false);
    const handleShowMrNumber = () => setMrNumberModal(true);
    let userDetails = useSelector((state) => state.user.userData);
    let paymentParseCookie = paymentChecker && (paymentChecker !== "undefined" && paymentChecker !== undefined) && JSON.parse(paymentChecker);

    useEffect(() => {
        const fetchDoctorData = async () => {
            setLoading(true);
            try {
                const response = await APIV3(`/doctor-profile?user=${clinicInfo?.doctorId}`)
                if (response.status == 200) {
                    setDoctorData(response.data.data)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        if (clinicInfo?.doctorId) {
            fetchDoctorData()
        }
    }, [doctorId])

    useEffect(() => {
        if (doctorData || clinicInfo) {
            const clinicIdToFilter = clinicInfo?.clinicsInfoId;
            const filtered = doctorData.doctor_clinics?.find((item) => item.id === clinicIdToFilter);
            setFilteredId(filtered);

        }
    }, [clinicInfo, doctorData]);

    useEffect(() => {
        if (filteredId?.id) {
            preferedDaydoctor();
        }
    }, [filteredId]);


    useEffect(() => {
        if (preferredDays && filteredId) {
            const consultationType = filteredId.is_physical ? preferredDays?.clinic_timings?.['in-person'] : preferredDays?.clinic_timings?.['in-video'];
            const selectedDaysTimes = consultationType && consultationType?.filter((item) => item?.doctor_clinic_id == filteredId?.id);
            setPreferredConsultation(selectedDaysTimes);
        }
    }, [preferredDays]);


    useEffect(() => {
        const clinicIds = preferredDays?.clinic_timings['in-video']?.find((clinic) => clinic.gc_doctor_clinic_id);
        setGcDoctorClinicId(clinicIds?.gc_doctor_clinic_id)
    }, [preferredDays])

    const handleBoxSelect = (option, id) => {
        const filteredOptions = option == 'video'
            ? preferredDays?.clinic_timings?.['in-video']
            : preferredDays?.clinic_timings?.['in-person'];
        const filteredSpecific = filteredOptions?.filter((item) => item.doctor_clinic_id == id);

        // Store filtered data in the ref until listenerForChangeClinic is true
        filteredDataRef.current = {
            preferredConsultation: filteredSpecific,
            clinicTimings: filteredSpecific[0]?.days,
            filteredId: filteredSpecific?.[0] || null,
        };
    };

    useEffect(() => {
        if (listenerForChangeClinic) {
            setPreferredConsultation(filteredDataRef.current.preferredConsultation);
            setClinicTimings(filteredDataRef.current.clinicTimings);
            setFilteredId(filteredDataRef.current.filteredId);
            setClinicInfo({ clinicsInfoId: filteredDataRef.current.preferredConsultation[0]?.doctor_clinic_id })
            setShow(false)
            setSelectedDay(null)
            setListenerForChangeClinic(false)
        }
    }, [listenerForChangeClinic]);


    const preferedDaydoctor = async () => {
        try {
            const response = await APIV3.get(`/find-doctor-preferred-day?doctorId=${doctorData.id}`);
            if (response.status == 200) {
                setPreferredDays(response.data.data);
            }
        } catch (error) {
            // console.log({ error });
        }
    };

    const handleCheck = (day, type) => {
        setSelectedDay(day?.date)
        setClinicTimings(day?.timings)
        setSelectedTime("")
    };

    const handleCheckTime = (item, type) => {
        setSelectedTime(item?.start_time);
        setSelectedTimeId(item?.id);
    };

    const rescheduleAppointmentHandler = async () => {
        if (checkEmptyStatus && !paymentParseCookie) {
            setNewMemberModal(true)
            return;
        }
        else if (mrNumbersListing?.modal_show == true && selectedMrNumberId == "" && !paymentParseCookie) {
            setMrNumberModal(true)
        }
        else {
            const payload = {
                appointment_date: selectedDay,
                appointment_time: selectedTime,
                appointment_id: dashboardKey,
                doctor_slot: selectedTimeId
            }
            setLoading(true);
            try {
                const response = await APIV3.post(`${rescheduleAppointmentEndpoint}`, payload);
                if (response.status == 200 || response.status == 201) {
                    if (paymentParseCookie && paymentParseCookie?.makePayment == true) {
                        Cookies.remove('makePyament');
                        window.location.href = `/book-an-appointment`
                    } else {
                        Cookies.remove('makePyament');
                        window.location.href = `/order/${response.data.data.appointment}`
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const scheduleAppointment = async () => {
        if (dashboardKey) {
            const dateString = selectedDay;
            setToShowDay(moment(dateString).format('dddd'));
            setRescheduleAppointment(true);
            return;
        }
        else if (checkEmptyStatus && !paymentParseCookie) {
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
                doctor_id: doctorData?.id,
                doctor_clinic_id: preferredConsultation[0]?.doctor_clinic_id,
                clinic_id: preferredConsultation[0]?.clinic_id,
                patient_id: selectedMrNumberId ? selectedMrNumberId : mrNumbersListing?.list?.[0]?.id,
                doctor_slot: selectedTimeId
            }
            setLoading(true);
            try {
                const response = await APIV3.post(`${scheduleAppointmentFad}`, payload);
                if (response.status == 200) {
                    if (paymentParseCookie && paymentParseCookie?.makePayment == true) {
                        Cookies.remove('makePyament');
                        window.location.href = `/book-an-appointment`
                    } else {
                        Cookies.remove('makePyament');
                        Cookies.set("redirectionUrl", redirectionLink);
                        window.location.href = `/order/${response.data.data.appointment}`
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

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
        if (gcDoctorClinicId && userDetails?.user?.phone && token) {
            getMrNumberList();
        }
    }, [userDetails?.user, token, gcDoctorClinicId]);

    const addMeAsANewMember = async () => {
        const payload = {
            gc_doctor_id: doctorData?.gc_doctor_id,
            gc_doctor_clinic_id: gcDoctorClinicId,
            name: patientName,
            phone: userDetails?.user?.phone,
        }
        setLoading(true);
        try {
            const response = await GREENCLINICAPI.post(`${addMeAsNewMember}`, payload);
            if (response.status == 200) {
                setSelectedMrNumberId(response?.data?.data?.data);
                setCheckEmptyStatus(false)
                setLoading(false);
                setMrNumberModal(false)
                handleCloseNewPatient();
            }
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

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

    const routeBackToPrevPage = () => {
        router.back();
        window.scroll(0, 0);
    }


    return (
        <section className={`${styles.bookAnAppointment} bookAnAppointment`}>
            {loading && <Loader />}
            {isMobile
                &&
                <>
                    <div className={styles.backMobile} onClick={routeBackToPrevPage}  > <h1> <span className={styles.backArrow}></span>  Book Appointment </h1></div>
                </>
            }
            <Container>
                <Row>
                    {!isMobile
                        &&
                        <>
                            <div > <h1> <span className={styles.backArrow} onClick={routeBackToPrevPage} ></span>  Book Appointment </h1></div>
                        </>
                    }
                    <Col lg={12}>
                        <Row>
                            <Col lg={4}>
                                <div className={styles.left}>
                                    <div className={styles.wrape_top_info}>
                                        <Image width={150} height={150} src={doctorData?.image ? doctorData?.image : ''} alt="" className={styles.doct_img} />
                                        <div className={styles.top_info}>
                                            <div className={styles.name_doct} >
                                                <span className={styles.title__doctor_name}>{doctorData?.prefix} {doctorData?.name}  </span>
                                            </div>
                                            <div className='flex-wrap' style={{ display: 'flex' }}>
                                                <span className={styles.title__doctor_type}>
                                                    {doctorData?.specialities?.join(', ')}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex' }} >
                                                {!isMobile ?
                                                    <span className={styles.title__doctor_type}>
                                                        {doctorData?.educations?.join(', ')}
                                                    </span>
                                                    :
                                                    doctorData?.educations?.map((item) => {
                                                        return (<>
                                                            <span className={styles.title__doctor_type}>
                                                                {item}
                                                            </span>
                                                        </>)
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='d-none d-lg-block' />
                                    <div className={styles.recommendations_doctor}>
                                        <div className={styles.single__recome}>
                                            <span className={styles.single_star}>  </span>
                                            <span className={styles.single__otg_text}> {doctorData?.average_rating} ({doctorData?.total_reviews} Reviews)  </span>
                                        </div>
                                        <div className={styles.single__recome}>
                                            <span className={styles.single__bag_svg}>  </span>
                                            <span className={styles.single__otg_text}> {doctorData?.experience_year} Yrs Experience  </span>
                                        </div>
                                    </div>
                                    <div className={styles.hospital_card} onClick={handleShow}>
                                        <Image width={40} height={40} src={filteredId?.icon ? filteredId?.icon : ''} alt="" />
                                        <div className={styles.info_ri_hos}>
                                            {isMobile ? (
                                                <>
                                                    <h3> {filteredId?.is_physical == true ? 'In-person' : 'Online'} </h3>
                                                    <span> {filteredId?.clinic_name ? filteredId?.clinic_name : filteredId?.name} </span>
                                                </>
                                            ) : (
                                                <>
                                                    <h3> {filteredId?.clinic_name ? filteredId?.clinic_name : filteredId?.name} </h3>
                                                    <span> {filteredId?.is_physical == true ? 'In-person' : 'Online'} </span>
                                                </>
                                            )}
                                        </div>
                                        <div className={styles.right_end}>
                                            <h3> Rs.{filteredId?.consultation_fee} </h3>
                                            <span className={styles.arrow_right_hos}>  </span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={8} className='test'>
                                <div className={styles.right}>
                                    <DaysFad preferredConsultation={preferredConsultation} setSelectedDay={setSelectedDay} handleCheck={handleCheck} selectedDay={selectedDay} />
                                    <div className={`${styles.timesWraper} timesWraper`}>
                                        <TimeFad
                                            activeTab={activeTimeTab}
                                            setActiveTab={setActiveTimeTab}
                                            clinicTimings={clinicTimings}
                                            selectedTime={selectedTime}
                                            handleCheckTime={handleCheckTime} />
                                    </div>
                                </div>
                            </Col>
                            <div className={styles.wrape_btn}>
                                <button onClick={scheduleAppointment} disabled={selectedDay == "" || selectedTime == ""} className={`${styles.bookAnAppointmentBtn} ${selectedDay == "" || selectedTime == "" ? 'disabled' : ''}`}> Proceed </button>
                            </div>
                            <AppointmentModal setListenerForChangeClinic={setListenerForChangeClinic} handleBoxSelect={handleBoxSelect} preferredConsultation={preferredConsultation} preferredDays={preferredDays} setPreferredConsultation={setPreferredConsultation} doctorData={doctorData} filteredId={filteredId} setFilteredId={setFilteredId} handleClose={handleClose} handleShow={handleShow} show={show} />
                            <AppointmentMrNumber handleCloseNewPatient={handleCloseNewPatient} setShow={setMrNumberModal} patientName={patientName} setPatientName={setPatientName} newMemberModal={newMemberModal} setNewMemberModal={setNewMemberModal} addMeAsANewMember={addMeAsANewMember} selectedMrNumberId={selectedMrNumberId} setSelectedMrNumberId={setSelectedMrNumberId} mrNumbersListing={mrNumbersListing} handleClose={handleCloseMrNumber} show={mrNumberModal} filteredId={filteredId} />
                            <RescheduleAppointment rescheduleAppointmentHandler={rescheduleAppointmentHandler} setDashboardKey={setDashboardKey} scheduleAppointment={scheduleAppointment} dashboardKey={dashboardKey} selectedDay={selectedDay} selectedTime={selectedTime} toShowDay={toShowDay} handleRescheduleClose={handleRescheduleClose} setRescheduleAppointment={setRescheduleAppointment} rescheduleAppointment={rescheduleAppointment} />
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default BookAnAppointment;

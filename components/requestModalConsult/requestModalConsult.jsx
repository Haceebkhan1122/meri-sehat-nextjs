import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import styles from './requestModalConsult.module.scss';
import { preferredDoctor, requestConsult } from "../../utils/endpoints";
import API from '@/utils/httpService';
import Loader from '../Loader';
import RequestSubmittedModal from '../requestSubmitted/requestSubmittedModal';
import useMediaQuery from '@mui/material/useMediaQuery';

const RequestModalConsult = ({ show, selectedDoctorID, myCities, setShow }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [clinicDays, setClinicDays] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [requestData, setRequestData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [selectedDayError, setSelectedDayError] = useState(false);
    const [requestShow, setRequestShow] = useState(false);
    const handleCloseRequestModal = () => setRequestShow(false);
    const isMobile = useMediaQuery('(max-width:768px)');

    
    const handleClose = () => {
        setShow(false);
        setPhone('');
        setSelectedDay('');
        setCity('');
        setName('')
    } 
    
    // getting the data for preferred Data//

    const fetchPreferredData = async () => {
        try {
            const response = await API.get(`${preferredDoctor}?doctorId=${selectedDoctorID}`)
            setClinicDays(response?.data?.clinic_timings)
        } catch (error) {
            console.log('error')
        }
    }
    // posting the data for preferred Data//

    // posting the data for preferred Data//

    const PostPreferredData = async () => {
        try {
            const payload = {
                name: name,
                city_id: city,
                preferred_day: selectedDay,
                doctor_id: selectedDoctorID,
                phone: `0${phone}`,
            };
            setLoader(true)
            const response = await API.post(requestConsult, payload);
            if (response.code === 200) {
                setLoader(false)
                setShow(false);
                setRequestShow(true)
                setRequestData(response?.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // posting the data for preferred Data//


    const handleNameChange = (e) => {
        setNameError('');
        const inputValue = e.target.value;
        setName(inputValue);

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

    const handleDayChange = (e, item) => {
        setSelectedDayError('');
        setSelectedDay(e.target.value);
    };



    const handleSubmit = async () => {
        try {
            setNameError('');
            setPhoneError('');
            setCityError('');
            setSelectedDayError('');

            const errors = [];

            if (!name) {
                errors.push('* Please enter your full name');
                setNameError('* Please enter your full name');
            }

            if (!phone) {
                errors.push('* Please enter a valid number');
                setPhoneError('* Please enter a valid number');
            } else {
                if (phone.length < 10) {
                    errors.push('* Please enter a valid number (at least 10 digits)');
                    setPhoneError('* Please enter a valid number (at least 10 digits)');
                }
                if (!phone.trim().startsWith('3')) {
                    errors.push('* Please enter a valid number starting with 3');
                    setPhoneError('* Please enter a valid number starting with 3');
                }
            }
            if (!city) {
                errors.push('* Please select your city');
                setCityError('* Please select your city');
            }

            if (!selectedDay) {
                errors.push('* Please select your preferred day');
                setSelectedDayError('* Please select your preferred day');
            }
            if (errors.length > 0) {
                // Handle or display the errors as needed
                console.log(errors);
                return
                
            }
             else {
                // Call the API to post the request preferred day
                await PostPreferredData();
                setName('');
                setPhone('');
                setCity('');
                setSelectedDay(null);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };



    useEffect(() => {
        if (show) {
            fetchPreferredData()
        }
    }, [selectedDoctorID]);


    // const handleDayChange = (e, index) => {
    //     const checked = e.target.checked;
    //     const value = e.target.value;
    //     setSelectedIndex(index)

    //     let query = "";

    //     if (checked) {
    //         query = value;
    //         setSelectedDay(query)
    //     }
    // }

    return (
        <>
            {loader && (
                <Loader />)}
            <Modal centered show={show} onHide={handleClose} className={`${styles.modalRequestConsult} modalRequestConsult`}>
                <Modal.Body>
                    <div className={styles.cross_icon_wrapper}>
                        <span className={styles.cross_icon} onClick={handleClose}> </span>
                    </div>
                    <div className={styles.wrapperRightDetails}>
                        <div className={styles.consult_req_form}>
                            <h3  className={styles.consultText}> Request a consult </h3>
                            <p> Send a request and our customer support will book {!isMobile && <br /> } an appointment for you </p>
                            
                            <span className={styles.dayBotder}> Select your preferred day  </span>
                            <div className={styles.dayBoxesWrapper}>
                                {clinicDays?.map((item, i) => (
                                    <div
                                        className={`${styles.singleDay} ${selectedDay === item?.day ? styles.singleDaySelected : ''}`}
                                        key={i}
                                    >
                                        <input
                                            type="radio"
                                            id={`select_day_${i}`}
                                            name='select__day'
                                            checked={selectedDay === item?.day}
                                            className={styles.inpRadio}
                                            value={item?.day}
                                            onChange={(e) => {
                                                if (item?.status) {
                                                    handleDayChange(e, item);
                                                }
                                            }}
                                        />
                                        <label
                                            className={`text-capitalize ${selectedDay === item?.day ? styles.selectedLabel : ''} ${selectedDay === item?.day ? 'additionalClass' : ''}`}
                                            htmlFor={`select_day_${i}`}
                                        >
                                            {item?.day}
                                        </label>
                                        {item?.status === false ? (
                                            <span className={styles.unavail}>Unavailable</span>
                                        ) : (
                                            <span className={styles.avail}>Available</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {selectedDayError && (
                                <span className={styles.errorState}>{selectedDayError}</span>
                            )}
                            <div className={styles.formDoctFill}>
                                <h3 style={{padding:0, wordSpacing:'0px'}}> Request Form </h3>
                                <div className='mt-3'>
                                    <div className={styles.singleWrapperInputs}>
                                        <label htmlFor=""> Full Name* </label>
                                        <input value={name}
                                            onChange={handleNameChange}
                                            className={nameError ? styles.inputRequestError : styles.inputRequest}
                                            type="text"
                                            maxLength="50"
                                            pattern="[A-Za-z]+"
                                            placeholder='Enter your full name' />
                                        {nameError && (
                                            <span>{nameError}</span>
                                        )}
                                    </div>

                                    <div className={styles.singleWrapperInputs}>
                                        <label htmlFor=""> Phone Number* </label>
                                        <div className={styles.wrapperphoneInputs}>
                                            <input type="text" placeholder='+92' disabled className={phoneError ? styles.codeInptsError : styles.codeInpts  } />
                                            <input value={phone}
                                                onChange={handlePhoneChange}
                                                placeholder='Enter your number'
                                                className={phoneError ? styles.numberInputsphoneError : styles.numberInputsphone}
                                                type="number"
                                                pattern="[0-9]+"
                                                maxlength="10"
                                                onKeyDown={(evt) =>
                                                    ['e', 'E', '+', '-', '.'].includes(evt.key) &&
                                                    evt.preventDefault()} />
                                        </div>
                                        {phoneError &&
                                            (
                                                <span>{phoneError}</span>
                                            )}
                                    </div>
                                    <div className={styles.singleWrapperInputs}>
                                        <label htmlFor=""> City*  </label>
                                        {/* <input value={city} onChange={handleCityChange} className={styles.inputRequest} type="text" placeholder='Enter your full city' /> */}
                                        <select
                                            placeholder='Enter your full city'
                                            value={city}
                                            onChange={handleCityChange}
                                            className={`${cityError ? styles.inputRequestError : styles.inputRequest} ${styles.inputRequestSelect}`}
                                            aria-label="Default select example"
                                        >
                                            <option value="" disabled>Select your city</option>
                                            {myCities?.map((cities, index) => (
                                                <option key={cities.id} value={cities.id}>
                                                    {cities?.name} {/* Replace 'name' with the actual property that represents the city name */}
                                                </option>
                                            ))}
                                        </select>
                                        {cityError && (
                                            <span> {cityError}</span>
                                        )}
                                    </div>
                                    <button onClick={handleSubmit} className={`${styles.btnRequest} hovering_green_btn_MA`}> Proceed </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <RequestSubmittedModal requestData={requestData} handleClose={handleCloseRequestModal} requestShow={requestShow} setRequestShow={setRequestShow} />
        </>
    )
}

export default RequestModalConsult

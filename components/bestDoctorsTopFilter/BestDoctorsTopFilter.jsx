import React, { useEffect, useRef, useState } from 'react'
import styles from './bestDoctorsTopFilter.module.scss';
import useMediaQuery from '@mui/material/useMediaQuery';
import GenderMobileModal from '../genderMobileModal/genderMobileModal';
import CompleteSearchFiltersModal from '../completeSearchFiltersModal/completeSearchFiltersModal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Col, Container, Row } from 'react-bootstrap';
import SearchV2Fad from '../componentsUpdated/find-a-doctor/searchV2Fad/SearchV2Fad';
import CitiesModalFAD from "@/components/modalCitiesFAD/ModalCities";


const BestDoctorsTopFilter = ({ defaultMinValue, setSelectedCityCookie, defaultMaxValue, setMaxFee, maxFee, setMinFee, minFee, quickFilters, setClinicValue, clinicValue, SpecialitiesNameAll, diseasesNameAll, selectedCityCookie, setSelectedDiseaseValue, selectedDiseaseValue, setListenerFilterApply, showMobile, setShowMobile, sortGenderValue, setSortGenderValue, handleChecksMulti, fetchDoctorByFilter, applyFilter, sortDiseaseValue, setSortDiseaseValue, sortSpecialityValue, setSortSpecialityValue, setApplyFilter, setSpecModal, specModal, diseasessModal, setDiseasessModal, gender, setGender, setAppointmentType, appointmentType, completeSearchModal, setCompleteSearchModal, doctorValue, setDoctorValue, setDiseaseValue, diseaseValue, specialityValue, setSpecialityValue, specialityDiseaseDoctorGlobal, myCities, selectedCity, setSelectedCity }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const isMobile = useMediaQuery('(max-width:768px)')
    const [specialityTag, setSpecialityTag] = useState([])
    const [citiesModal, setCitiesModal] = useState(false)
    const dropdownRef = useRef(null);
    const router = useRouter();
    const selectedLocation = Cookies.get('selectedCity')
    const queryValue = router.query
    const handleClose = () => setShowMobile(false);
    const handleShow = () => setShowMobile(true);
    const [hospitalValue, setHospitalValue] = useState('')


    useEffect(() => {
        // Convert router.query object to an array of key-value pairs
        const queryArray = Object.entries(router.query);
        // Create an empty array to store the key-value pairs
        const newArray = [];

        // Iterate over the key-value pairs and push them into the newArray
        queryArray.forEach(([key, value]) => {
            newArray.push({ key, value });
        });
        // Now, newArray contains the key-value pairs from router.query
        setSpecialityTag(newArray)

        // You can use newArray as needed in your application.
    }, [router.query]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleGenderChange = (event) => {
        setGender(event.target.value)
    };

    const handleAppointmentTypeChange = (event) => {
        setAppointmentType(event.target.value)
    };

    const handleQuickTagsChange = (event, item) => {
        if (item?.tag == "Speciality") {
            setSortSpecialityValue(event.target.value)
        } else {
            setSortDiseaseValue(event.target.value)
        }
    };


    const handleSpecialityChange = () => {
        if (specialityValue) {
            setSortSpecialityValue('');
            setSpecModal(true)
            setShowMobile(false);
        } else {
            setSpecModal(true);
            setShowMobile(false);
        }
    };

    useEffect(() => {
        if (sortSpecialityValue) {
            setShowMobile(true)
            setSpecModal(false)
        }
    }, [sortSpecialityValue])

    useEffect(() => {
        if (sortDiseaseValue) {
            setShowMobile(true)
            setDiseasessModal(false)
        }
    }, [sortDiseaseValue])

    const handleDiseaseChange = () => {
        if (diseaseValue) {
            setShowMobile(false);
            setSortDiseaseValue('');
            setDiseasessModal(true);

        } else {
            setShowMobile(false);
            setDiseasessModal(true);
        }
    };

    const handleApplyTags = () => {
        setListenerFilterApply(false)
        fetchDoctorByFilter();
        setShowDropdown(false);
    };

    if (selectedLocation) {
        const parsedData = JSON.parse(selectedLocation)
        setSelectedCity(parsedData?.id)
        var location = parsedData.name;

    }

    const handleBreadCrumb = () => {
        setSpecialityValue('')
        setDiseaseValue('')
        setGender('')
        setDoctorValue('')
    }

    useEffect(() => {
        const storedCity = Cookies.get('selectedCity');
        try {
            if (storedCity) {
                const selectedCityCookie = JSON.parse(storedCity);
                setSelectedCityCookie(selectedCityCookie)
            } else {
            }
        } catch (error) {
            console.error('Error parsing JSON from the cookie:', error);
        }
    }, [selectedCity])

    return (
        <>
            <section className={`${styles.topFilterBestDoctors} topFilterBestDoctors`}>
                <Container>
                    <Row>
                        <Col lg={12} className='mx-auto'>
                            <div className={styles.wrapperBread} id='wrapper'>
                                <ul className={styles.breadcrumb_wrapper}>
                                    <Link href='/'><li> Home <span className={styles.svgArrow}></span> </li></Link>
                                    <span className='breadcrumb-text' onClick={handleBreadCrumb} style={{ cursor: 'pointer' }}><li> {location && location} {specialityValue || diseaseValue || gender || doctorValue || clinicValue || appointmentType ? <span className={styles.svgArrow}></span> : ''} </li></span>
                                    {/* <span className='breadcrumb-text'><li className={styles.activeBread}> {specialityValue?.split("-").join(" ")  || sortSpecialityValue?.split("-").join(" ") ? (queryValue[3]?.[1]?.split("-").join(" ") || queryValue[2]?.[1]?.split("-").join(" ") || queryValue[1]?.[1]?.split("-").join(" ") || specialityValue?.split("-").join(" ")) : diseaseValue?.split("-").join(" ") || sortDiseaseValue?.split("-").join(" ") || clinicValue?.name}</li></span> */}
                                    <span className='breadcrumb-text'><li className={styles.activeBread}>Doctors</li></span>
                                </ul>
                                <h3 className={styles.findBestDocHeading}> Find the best doctors  </h3>
                                {!isMobile
                                    ?
                                    <SearchV2Fad setCompleteSearchModal={setCompleteSearchModal} setCitiesModal={setCitiesModal} selectedCityCookie={selectedCityCookie} selectedCity={selectedCity} citiesModal={citiesModal} />
                                    :
                                    <div className={styles.mobileSearchBar}  >
                                        <div className={styles.leftSearc} onClick={() => setCitiesModal(true)}>
                                            <span className={styles.locationPin} ></span>
                                            <span className={styles.dropIcon} ></span>
                                        </div>
                                        <div className={styles.rig} onClick={() => setCompleteSearchModal(true)}  >
                                            <span className={styles.searchIconMobile}></span>
                                            <input type='text' placeholder="Search for doctors, diseases, specialities..." className={styles.inputMobileSearch} />
                                        </div>
                                    </div>
                                }
                                <div className={styles.sort__bar_doc}>
                                    {isMobile ?
                                        (<>
                                            <span className={styles.tunedSvg} onClick={handleShow}>  </span>
                                            <hr />
                                        </>)
                                        :
                                        (<>
                                            <span className={styles.tunedSvg} onClick={handleShow} >  </span>
                                            <hr className={styles.tunedSvgHr} />
                                        </>)
                                    }
                                    {specialityTag?.length > 0 ? specialityTag?.filter((item) =>
                                        item.key !== "city_id" &&
                                        item.key !== "page" &&
                                        item.key !== "name" &&
                                        item.value && item.value[1] // Check if value exists and has at least two elements
                                    )
                                        .map((item, i) => {
                                            return (
                                                <>
                                                    {item?.key == 'filter' && item?.value[1] ? (
                                                        <>
                                                            <div onClick={() => handleChecksMulti(item)} key={item?.value[1]} className={`${styles.wrappertop__filters_checks} ${styles.checked_tags}`} >
                                                                <label htmlFor={`${item?.value[1]}`}> {item?.value[1]?.split("-").join(" ")} </label>
                                                                <input id={`${item?.value[1]}`} type="checkbox" value={item?.value[1]} />
                                                                <span className={styles.croos_icon_checked}>  </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div onClick={() => handleChecksMulti(item?.key == "clinic_id" ? clinicValue : item)} key={item?.value} className={`${styles.wrappertop__filters_checks} ${styles.checked_tags}`} >
                                                                <label htmlFor={item?.key === "clinic_id" ? clinicValue?.name : `${item?.value}`}>
                                                                    {item?.key === "clinic_id"
                                                                        ? clinicValue?.name || ""
                                                                        : (isNaN(item?.value)
                                                                            ? item?.value?.split("-").join(" ")
                                                                            : new Intl.NumberFormat().format(item?.value))}
                                                                </label>
                                                                {item?.key == "clinic_id" ? (
                                                                    <>
                                                                        <input id={`${clinicValue?.id}`} type="checkbox" value={clinicValue?.id} />
                                                                    </>
                                                                ) : (
                                                                    <input id={`${item?.value}`} type="checkbox" value={item?.value} />

                                                                )}
                                                                <span className={styles.croos_icon_checked}>  </span>
                                                            </div>
                                                        </>
                                                    )}
                                                </>
                                            )
                                        }) : null}
                                    {!diseaseValue &&
                                        !specialityValue &&
                                        !gender &&
                                        !appointmentType &&
                                        !minFee &&
                                        !maxFee &&
                                        specialityTag?.some((x) => x.key !== "clinic_id") ? (
                                        <p className={styles.mobile_filter_tuned_side}>
                                            Select any filter to get curated results
                                        </p>
                                    ) : null}

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <CitiesModalFAD myCities={myCities} setSelectedCity={setSelectedCity} selectedCity={selectedCity} citiesModal={citiesModal} setCitiesModal={setCitiesModal} />
            <GenderMobileModal handleQuickTagsChange={handleQuickTagsChange} defaultMinValue={defaultMinValue} defaultMaxValue={defaultMaxValue} setMaxFee={setMaxFee} maxFee={maxFee} setMinFee={setMinFee} minFee={minFee} quickFilters={quickFilters} handleApplyTags={handleApplyTags} handleDiseaseChange={handleDiseaseChange} handleSpecialityChange={handleSpecialityChange} handleGenderChange={handleGenderChange} handleAppointmentTypeChange={handleAppointmentTypeChange} sortGenderValue={sortGenderValue} setSortGenderValue={setSortGenderValue} handleChecksMulti={handleChecksMulti} fetchDoctorByFilter={fetchDoctorByFilter} applyFilter={applyFilter} sortSpecialityValue={sortSpecialityValue} sortDiseaseValue={sortDiseaseValue} setSortDiseaseValue={setSortDiseaseValue} setSortSpecialityValue={setSortSpecialityValue} setApplyFilter={setApplyFilter} setSpecModal={setSpecModal} specModal={specModal} diseasessModal={diseasessModal} setDiseasessModal={setDiseasessModal} setGender={setGender} gender={gender} setAppointmentType={setAppointmentType} appointmentType={appointmentType} completeSearchModal={completeSearchModal} setCompleteSearchModal={setCompleteSearchModal} setDoctorValue={setDoctorValue} doctorValue={doctorValue} setDiseaseValue={setDiseaseValue} diseaseValue={diseaseValue} specialityValue={specialityValue} setSpecialityValue={setSpecialityValue} specialityDiseaseDoctorGlobal={specialityDiseaseDoctorGlobal} myCities={myCities} setSelectedCity={setSelectedCity} selectedCity={selectedCity} showMobile={showMobile} handleClose={handleClose} />
            <CompleteSearchFiltersModal hospitalValue={hospitalValue} setHospitalValue={setHospitalValue} clinicValue={clinicValue} setClinicValue={setClinicValue} SpecialitiesNameAll={SpecialitiesNameAll} diseasesNameAll={diseasesNameAll} selectedCityCookie={selectedCityCookie} setSelectedDiseaseValue={setSelectedDiseaseValue} selectedDiseaseValue={selectedDiseaseValue} sortSpecialityValue={sortSpecialityValue} setSortDiseaseValue={setSortDiseaseValue} setSortSpecialityValue={setSortSpecialityValue} setSpecModal={setSpecModal} specModal={specModal} diseasessModal={diseasessModal} setDiseasessModal={setDiseasessModal} setDoctorValue={setDoctorValue} doctorValue={doctorValue} setDiseaseValue={setDiseaseValue} diseaseValue={diseaseValue} specialityValue={specialityValue} setSpecialityValue={setSpecialityValue} specialityDiseaseDoctorGlobal={specialityDiseaseDoctorGlobal} completeSearchModal={completeSearchModal} setCompleteSearchModal={setCompleteSearchModal} />
        </>
    )
}

export default BestDoctorsTopFilter;

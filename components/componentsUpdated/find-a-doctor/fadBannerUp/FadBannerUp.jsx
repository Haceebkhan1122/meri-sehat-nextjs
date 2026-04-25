import React, { useEffect, useState } from "react";
import styles from './fadBannerUp.module.scss';
import { Col, Row, Container } from 'react-bootstrap';
import SearchV2Fad from '../searchV2Fad/SearchV2Fad';
import RatingsBar from '../../doctorNow/RatingsBar';
import parse from 'react-html-parser';
import Cookies from 'js-cookie';
import { filterFindDocApi } from "@/utils/endpoints";
import { fetchCities, fetchSpecialitiesDiseaseDoctor, fetchDiseaseNames, fetchSpecialityNames, hospitalNames } from "../../../../store/citySpecialityDiseaseDoctorLayout";
import CitiesModalFAD from "@/components/modalCitiesFAD/ModalCities";
import CompleteSearchFiltersModal from '../../../completeSearchFiltersModal/completeSearchFiltersModal';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { APIV3 } from "@/utils/httpService";
const FadTwoBanner = (props) => {
    const dispatch = useDispatch();
    const [citiesModal, setCitiesModal] = useState(false)
    const router = useRouter();
    const [completeSearchModal, setCompleteSearchModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDisease, setSelectedDisease] = useState('');
    const [selectedSpecialities, setSelectedSpecialities] = useState('');
    const [specialityValue, setSpecialityValue] = useState('')
    const [diseaseValue, setDiseaseValue] = useState('')
    const [hospitalValue, setHospitalValue] = useState('')
    const [doctorValue, setDoctorValue] = useState('')
    const [clinicValue, setClinicValue] = useState({})
    const [doctorListing, setDoctorListing] = useState([])
    const [selectedCity, setSelectedCity] = useState();
    const [diseasesModal, setDiseasesModal] = useState(false);
    const [specialtiesModal, setSpecialtiesModal] = useState(false)
    const [loading, setLoading] = useState(true);
    const [specModal, setSpecModal] = useState(false)
    const [diseasessModal, setDiseasessModal] = useState(false)
    const [sortDiseaseValue, setSortDiseaseValue] = useState('');
    const [sortHospitalValue, setSortHospitalValue] = useState('');
    const [specDisModal, setSpecDisModal] = useState(null);
    let specialityDiseaseDoctorGlobal = useSelector((state) => state.specialityDiseaseDoctor.specialityDiseaseDoctor);
    let specialityDiseaseDoctor = useSelector((state) => state.specialityDiseaseDoctor.specialityDiseaseDoctor);
    let diseasesNameAll = useSelector((state) => state.diseaseNames.diseaseNames);
    let SpecialitiesNameAll = useSelector((state) => state.specialityName.SpecialityNames);
    let hospitalsNameAll = useSelector((state) => state.hospitalsList.hospitalList);
    let myCities = useSelector((state) => state.cities.cities);
    const [selectedCityCookie, setSelectedCityCookie] = useState()
    const karachiCity = myCities?.find(city => city.name == 'Karachi');
    var storedCity = Cookies.get('selectedCity');
    useEffect(() => {
        // Function to check and update the cookie value
        const checkCookieValue = () => {
            const specDiseaseModalChecker = Cookies.get('specDiseaseModal');
            // Update state if the cookie value has changed
            setSpecDisModal(specDiseaseModalChecker || '');
        };
        // Initial call to set the state
        checkCookieValue();
        // Set an interval to check the cookie value every second
        const intervalId = setInterval(checkCookieValue, 1000); // Check every second
        // Cleanup function to clear the interval and remove the cookie on unmount
        return () => {
            clearInterval(intervalId);
            Cookies.remove('specDiseaseModal');
            setSpecDisModal(null)
        };
    }, []); // Empty dependency array to run this effect only once
    useEffect(() => {
        const checkCookie = setInterval(() => {
            // Check if the cookie is set
            if (Cookies.get('specDiseaseModal')) {
                setCompleteSearchModal(true); // Set state to true if cookie is found
                clearInterval(checkCookie); // Stop checking once the cookie is found
            }
        }, 500); // Check every 10 seconds
        // Cleanup the interval on component unmount
        return () => clearInterval(checkCookie);
    }, [specDisModal]); // Run once on mount
    useEffect(() => {
        const storedCity = Cookies.get('selectedCity');
        try {
            if (storedCity) {
                const selectedCityCookie = JSON.parse(storedCity);
                setSelectedCityCookie(selectedCityCookie)
            } else {
                console.log('Cookie not found');
            }
        } catch (error) {
            console.error('Error parsing JSON from the cookie:', error);
        }
    }, [selectedCity])
    // remove cookie find a specialist logic
    useEffect(() => {
        Cookies.remove('findASpecialist')
        Cookies.remove('OtherCities')
        Cookies.remove('speciality')
    }, [])
    // redirect to home Urdu when hit /ur/find-a-doctor
    useEffect(() => {
        if (router?.locale === 'ur') {
            router.push('/ur')
        }
    }, [])
    // redirect to home Urdu when hit /ur/find-a-doctor
    // get cookie of city id and set in state by default karachi
    useEffect(() => {
        try {
            if (loading) {
                if (karachiCity) {
                    Cookies.set('selectedCity', JSON.stringify(karachiCity));
                    setSelectedCity(karachiCity);
                    setLoading(false);
                }
            } else if (storedCity) {
                const parsedData = JSON.parse(storedCity);
                setSelectedCity(parsedData);
            } else {
                console.log('Cookie not found');
            }
        } catch (error) {
            console.error('Error parsing JSON from the cookie:', error);
        }
    }, [loading, storedCity, karachiCity])
    // calling cities and specialities, disease, doctor function from reducer redux
    useEffect(() => {
        dispatch(fetchCities())
        dispatch(fetchSpecialitiesDiseaseDoctor())
        dispatch(fetchDiseaseNames())
        dispatch(fetchSpecialityNames())
    }, []);
    useEffect(() => {
        if (selectedCityCookie){
            dispatch(hospitalNames(selectedCityCookie?.id))
        }
    }, [selectedCityCookie?.id]);
    // search api function from all options modal
    const fetchDoctorByAllFilter = async () => {
        try {
            let apiUrl = `${filterFindDocApi}?page=${`1`}`;
            const query = {};
            if (specialityValue !== "") {
                apiUrl += `&speciality=${specialityValue?.replace(/-/g, ' ')}`;
            } else if (diseaseValue !== "") {
                apiUrl += `&disease=${diseaseValue?.replace(/-/g, ' ')}`;
                query.disease = diseaseValue.toLowerCase()?.replace(/ /g, '-');
            }
            else if (clinicValue !== "") {
                apiUrl += `&clinic_id=${clinicValue?.id}`;
                query.clinic_id = clinicValue?.id;
            }
            else if (doctorValue !== "") {
                apiUrl += `&name=${doctorValue}`;
            }
            query.page = "1"
            const response = await APIV3.get(apiUrl);
            if (response?.status == 200) {
                setDoctorListing(response?.data?.data);
                setCompleteSearchModal(false)
                setDiseasesModal(false)
                setSpecialtiesModal(false)
                router.push({
                    pathname: `/doctors/${selectedCity?.name ? `${selectedCity?.name.toLowerCase()}` : ''}${specialityValue ? `/${specialityValue.toLowerCase()?.replace(/ /g, '-')}` : ''}`,
                    query: query,
                });
            }
        } catch (e) {
            console.error(e);
        }
    };
    // calling filter api by updating states
    useEffect(() => {
        if ((specialityValue !== "" || diseaseValue !== "" || doctorValue !== "" || clinicValue?.id) && selectedCity) {
            fetchDoctorByAllFilter();
        }
    }, [specialityValue, diseaseValue, doctorValue, selectedCity, clinicValue?.id]);
    // get cookie city id and set in state locally
    useEffect(() => {
        const storedCity = Cookies.get('selectedCity');
        try {
            if (storedCity) {
                const selectedCityCookie = JSON.parse(storedCity);
                setSelectedCityCookie(selectedCityCookie)
            } else {
                console.log('Cookie not found');
            }
        } catch (error) {
            console.error('Error parsing JSON from the cookie:', error);
        }
    }, [selectedCity])
    return (
        <section className={`${styles.fadTwoBanner} fadTwoBanner`}>
            <Container className='h-100'>
                <Row className='h-100 align-items-center'>
                    <Col lg={12} >
                        <div className={`${styles.wrape_banner_fad} wrape_banner_fad`}>
                            <h1> {props?.widgetData?.heading && parse(props?.widgetData?.heading)}  </h1>
                            <RatingsBar widgetData={props?.widgetData} />
                            <SearchV2Fad setCompleteSearchModal={setCompleteSearchModal} setCitiesModal={setCitiesModal} selectedCityCookie={selectedCityCookie} selectedCity={selectedCity} citiesModal={citiesModal} />
                        </div>
                    </Col>
                </Row>
            </Container>
            <CompleteSearchFiltersModal setSortHospitalValue={setSortHospitalValue} sortHospitalValue={sortHospitalValue} setHospitalValue={setHospitalValue} hospitalValue={hospitalValue} hospitalsNameAll={hospitalsNameAll} SpecialitiesNameAll={SpecialitiesNameAll} diseasesNameAll={diseasesNameAll} setDiseasessModal={setDiseasessModal} setSpecModal={setSpecModal} selectedCityCookie={selectedCityCookie} sortDiseaseValue={sortDiseaseValue} setLoading={setLoading} loading={loading} diseasesModal={diseasesModal} setDiseasesModal={setDiseasesModal} setSpecialtiesModal={setSpecialtiesModal} specialtiesModal={specialtiesModal} specialityDiseaseDoctorGlobal={specialityDiseaseDoctorGlobal} setDoctorValue={setDoctorValue} doctorValue={doctorValue} setDiseaseValue={setDiseaseValue} diseaseValue={diseaseValue} specialityValue={specialityValue} setSpecialityValue={setSpecialityValue} clinicValue={clinicValue} setClinicValue={setClinicValue} setSelectedSpecialities={setSelectedSpecialities} selectedSpecialities={selectedSpecialities} setSelectedDisease={setSelectedDisease} selectedDisease={selectedDisease} isLoading={isLoading} specialityDiseaseDoctor={specialityDiseaseDoctor} completeSearchModal={completeSearchModal} setCompleteSearchModal={setCompleteSearchModal} />
            <CitiesModalFAD myCities={myCities} setSelectedCity={setSelectedCity} selectedCity={selectedCity} citiesModal={citiesModal} setCitiesModal={setCitiesModal} />
        </section>
    )
}
export default FadTwoBanner;
import React, { useEffect, useState } from 'react'
import ContainerWrapperFindDoc from '../container-wrapper-find-doc/container-wrapper-find-doc';
import BottomDoctorPamfh from '../bottom-doctor-pamfh/bottom-doctor-pamfh';
import BestDoctorsTopFilter from '../bestDoctorsTopFilter/BestDoctorsTopFilter';
import useMediaQuery from '@mui/material/useMediaQuery';
import RequestModalConsult from '../requestModalConsult/requestModalConsult';
import BookAppointDoctorFind from '../bookAppointDoctorFind/bookAppointDoctorFind';
import { useRouter } from 'next/router';
import Loader from '../Loader';
import Cookies from 'js-cookie';
import ReactPaginate from 'react-paginate';
import { faChevronRight } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoaderAssets from "../../public/gif/asset_loader.gif";
import Image from 'next/image';
import styles from './findBestDoctors.module.scss';
import DoctorProfileCard from '../componentsUpdated/doctorProfileCard/DoctorProfileCard';
import DoctorsRecommendCards from './doctorsRecommendCards/DoctorsRecommendCards';
import { Col, Container, Row } from 'react-bootstrap';


const FindBestDoctors = ({ isQuerySpecialityListShowing, defaultMinValue, setSelectedCityCookie, defaultMaxValue, setMaxFee, maxFee, setMinFee, minFee, quickFilters, clinicValue, setClinicValue, recommendedDoctors, SpecialitiesNameAll, diseasesNameAll, setSelectedDiseaseValue, selectedDiseaseValue, isQueryEmptyTwo, setListenerFilterApply, currentPage, handlePageClick, totalPages, selectedCityCookie, selectedOtherCityData, loadingLast, faqData, doctorsListingData, showMobile, setShowMobile, sortGenderValue, setSortGenderValue, handleChecksMulti, fetchDoctorByFilter, applyFilter, sortDiseaseValue, sortSpecialityValue, setSortDiseaseValue, setSortSpecialityValue, theBestGeneralFold, doctorListing, setApplyFilter, setSpecModal, specModal, diseasessModal, setDiseasessModal, gender, setGender, setAppointmentType, appointmentType, completeSearchModal, setCompleteSearchModal, doctorValue, setDoctorValue, setDiseaseValue, diseaseValue, specialityValue, setSpecialityValue, specialityDiseaseDoctorGlobal, selectedCity, setSelectedCity, myCities, setSpecialtiesModal, specialtiesModal }) => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [selectedDoctorID, setSelectedDoctorID] = useState(null);
    const [selectedCityByParam, setSelectedCityByParam] = useState(null);
    const [isDataFetched, setIsDataFetched] = useState(false);
    var findaspecialist = Cookies.get('findASpecialist');
    var OtherCitiesSelected = Cookies.get('OtherCities');
    const cityNameInParam = router.query.filter[0]
    const Speciality = router.query.filter[1]
    const disease = router?.query?.disease;
    const selectedLocation = Cookies.get('selectedCity')

    if (selectedLocation) {
        const parsedData = JSON?.parse(selectedLocation)
        var location = parsedData.name;
    }

    useEffect(() => {
        if (cityNameInParam) {
            const cityObject = myCities?.find(item => item?.name?.toLowerCase() === cityNameInParam);
            if (cityObject) {
                setSelectedCityByParam(cityObject);
                setIsDataFetched(true);
            }
        }
    }, [cityNameInParam, myCities, router]);

    useEffect(() => {
        if (isDataFetched && selectedCityByParam) {
            Cookies.set('selectedCity', JSON.stringify(selectedCityByParam));
        }
    }, [selectedCityByParam, isDataFetched]);

    const handlePushOnProfile = (item) => {
        const redirectUrl = item?.redirect_url;
        const lastIndex = redirectUrl?.lastIndexOf('/');
        const newRedirectUrl = redirectUrl?.substring(0, lastIndex);
        const redirectDocProfile = `${newRedirectUrl}/`
        router.push(`${redirectDocProfile}${item?.id}`)
    }

    return (
        <>
            <BestDoctorsTopFilter setSelectedCityCookie={setSelectedCityCookie} defaultMinValue={defaultMinValue} defaultMaxValue={defaultMaxValue} setMaxFee={setMaxFee} maxFee={maxFee} setMinFee={setMinFee} minFee={minFee} quickFilters={quickFilters} clinicValue={clinicValue} setClinicValue={setClinicValue} SpecialitiesNameAll={SpecialitiesNameAll} diseasesNameAll={diseasesNameAll} selectedCityCookie={selectedCityCookie} setSelectedDiseaseValue={setSelectedDiseaseValue} selectedDiseaseValue={selectedDiseaseValue} setListenerFilterApply={setListenerFilterApply} selectedOtherCityData={selectedOtherCityData} showMobile={showMobile} setShowMobile={setShowMobile} sortGenderValue={sortGenderValue} setSortGenderValue={setSortGenderValue} handleChecksMulti={handleChecksMulti} fetchDoctorByFilter={fetchDoctorByFilter} applyFilter={applyFilter} sortSpecialityValue={sortSpecialityValue} sortDiseaseValue={sortDiseaseValue} setSortDiseaseValue={setSortDiseaseValue} setSortSpecialityValue={setSortSpecialityValue} setApplyFilter={setApplyFilter} setSpecModal={setSpecModal} specModal={specModal} diseasessModal={diseasessModal} setDiseasessModal={setDiseasessModal} setGender={setGender} gender={gender} setAppointmentType={setAppointmentType} appointmentType={appointmentType} completeSearchModal={completeSearchModal} setCompleteSearchModal={setCompleteSearchModal} setDoctorValue={setDoctorValue} doctorValue={doctorValue} setDiseaseValue={setDiseaseValue} diseaseValue={diseaseValue} specialityValue={specialityValue} setSpecialityValue={setSpecialityValue} specialityDiseaseDoctorGlobal={specialityDiseaseDoctorGlobal} myCities={myCities} setSelectedCity={setSelectedCity} selectedCity={selectedCity} specialtiesModal={specialtiesModal} setSpecialtiesModal={setSpecialtiesModal} />
            {loadingLast && OtherCitiesSelected == undefined && findaspecialist == undefined ? (
                <>
                    <div className="flex_center _hk_fad__">
                        <Image
                            className="loading_gif m-auto"
                            src={LoaderAssets}
                            alt="loader"
                            width={90}
                            height={90}
                        />
                    </div>
                </>
            ) : (
                <>
                    {Object.keys(isQuerySpecialityListShowing).length > 1 && OtherCitiesSelected == undefined && findaspecialist == undefined && (
                        <>
                            <div>
                                <div className={styles.wrapper_all_doctors}>
                                    <section className={`${styles.findBestDoctors} findBestDoctors`}>
                                        <Container>
                                            <Row>
                                                <Col lg={12} className='mx-auto'>
                                                    {doctorListing?.doctor_data?.length <= 0 ?
                                                        <div className={styles.no_results_wrapper}>
                                                            <div className={styles.headerWraperr}>
                                                                <h3 className={styles.doctors_listed} > <span className={styles.results_searched}> 0 </span> Doctors listed in {(!Speciality && !disease ? location : '')}  {Speciality ? <span className={styles.results_searched}> | Best {Speciality?.replace(/\-/g, ' ')}  </span> : '' || disease ? <span className={styles.results_searched}> | {disease?.replace(/\-/g, ' ')} Disease </span> : ''} </h3>
                                                                <div className={styles.icon_wrape}>
                                                                    <span className={styles.verifiedIcon}>  </span>
                                                                    <span className={styles.verifiedIconverify}> Verified by Meri Sehat </span>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className={styles.no_doc_wrape}>
                                                                <span className={styles.icon_ot}>  </span>
                                                                <span className={styles.icon_ot_text}> No doctor found  </span>
                                                            </div>
                                                        </div>
                                                        :
                                                        (<>
                                                            <div className={styles.top__wrape}>
                                                                <div className={styles.headerWraperr}>
                                                                    {!isMobile
                                                                        ?
                                                                        <h3 className={styles.doctors_listed} > <span className={styles.results_searched}> {doctorListing?.total} </span> Doctors listed in {(!Speciality && !disease ? location : '')} {Speciality ? <span className={styles.results_searched}> | {Speciality?.replace(/\-/g, ' ')}   </span> : '' || disease ? <span className={styles.results_searched}> | {disease?.replace(/\-/g, ' ')} Disease </span> : ''} </h3>
                                                                        :
                                                                        <h3 > <span className={styles.results_searched}>  {doctorListing?.total} </span> Doctors listed in <span className={styles.results_searched}> {(!Speciality && !disease ? location : '')} {Speciality ? <span className={styles.results_searched}> | {Speciality?.replace(/\-/g, ' ')}   </span> : '' || disease ? <span className={styles.results_searched}> | {disease?.replace(/\-/g, ' ')} Disease </span> : ''} </span>  </h3>
                                                                    }
                                                                    <div className={styles.icon_wrape}>
                                                                        <span className={styles.verifiedIcon}>  </span>
                                                                        <span className={styles.verifiedIconverify}> Verified by Meri Sehat </span>
                                                                    </div>
                                                                </div>
                                                                <hr className={`${styles.wrape_hr} hrNew`} />
                                                                {recommendedDoctors?.length > 0 && (
                                                                    <>
                                                                        <DoctorsRecommendCards recommendedDoctors={recommendedDoctors} />
                                                                    </>
                                                                )}
                                                                {doctorListing?.doctor_data?.map((item) =>
                                                                (<>
                                                                    <DoctorProfileCard item={item} handlePushOnProfile={handlePushOnProfile} />
                                                                </>))}

                                                                {totalPages > 1 ? (
                                                                    <>
                                                                        <ReactPaginate
                                                                            previousLabel={''}
                                                                            nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                                                                            breakLabel={''}
                                                                            pageCount={totalPages}  // Set pageCount to total pages
                                                                            pageRangeDisplayed={6}   // Show only 6 page initially
                                                                            marginPagesDisplayed={0}  // Show 0 page before and after the current page
                                                                            onPageChange={handlePageClick}
                                                                            activeClassName={styles.activatedClass}
                                                                            containerClassName={styles.doctorListingsPagination}
                                                                            pageClassName={styles.activatedLi}
                                                                            previousClassName={styles.previousClassName}
                                                                            nextClassName={styles.nextClassName}
                                                                            pageLinkClassName={styles.pageNumber}
                                                                            previousLinkClassName={`${styles.doctorPrevLink} previousLink`}
                                                                            nextLinkClassName={styles.doctorNextLink}
                                                                            forcePage={currentPage - 1}
                                                                        />
                                                                    </>
                                                                ) : null}
                                                            </div>
                                                        </>)}
                                                </Col>
                                            </Row>
                                        </Container>
                                    </section>
                                </div>
                                <BottomDoctorPamfh />
                                {theBestGeneralFold ? (
                                    <>
                                        <BookAppointDoctorFind doctorListing={doctorListing} doctorsListingData={doctorsListingData} faqData={faqData} theBestGeneralFold={theBestGeneralFold} />
                                    </>
                                ) : null}
                                <RequestModalConsult show={show} setShow={setShow} myCities={myCities} selectedDoctorID={selectedDoctorID} />
                            </div>
                        </>
                    )}
                </>
            )
            }
        </>
    )
}
export default FindBestDoctors;

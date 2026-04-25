import React, { useEffect, useState } from 'react'
import styles from './best-doctors-breadcrumb.module.css';
import ContainerWrapperFindDoc from '../container-wrapper-find-doc/container-wrapper-find-doc';
import BottomDoctorPamfh from '../bottom-doctor-pamfh/bottom-doctor-pamfh';
import BestDoctorsTopFilter from '../bestDoctorsTopFilter/bestDoctorsTopFilter';
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
import mixpanel from 'mixpanel-browser';



const BestDoctorsBreadcrumb = ({ setSelectedDiseaseValue, selectedDiseaseValue, isQueryEmptyTwo, setListenerFilterApply, currentPage, handlePageClick, totalPages, selectedCityCookie, selectedOtherCityData, loadingLast, faqData, doctorsListingData, showMobile, setShowMobile, sortGenderValue, setSortGenderValue, handleChecksMulti, fetchDoctorByFilter, applyFilter, isQueryEmpty, sortDiseaseValue, sortSpecialityValue, setSortDiseaseValue, setSortSpecialityValue, theBestGeneralFold, doctorListing, setApplyFilter, setSpecModal, specModal, diseasessModal, setDiseasessModal, gender, setGender, completeSearchModal, setCompleteSearchModal, doctorValue, setDoctorValue, setDiseaseValue, diseaseValue, specialityValue, setSpecialityValue, specialityDiseaseDoctorGlobal, selectedCity, setSelectedCity, myCities, setSpecialtiesModal, specialtiesModal }) => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [show, setShow] = useState(false);
    const [selectedDoctorID, setSelectedDoctorID] = useState(null);
    const [selectedCityByParam, setSelectedCityByParam] = useState(null);
    const [isDataFetched, setIsDataFetched] = useState(false);

    var findaspecialist = Cookies.get('findASpecialist');
    var OtherCitiesSelected = Cookies.get('OtherCities');

    const handleShow = (item, doctorId) => {
        setShow(true);
        setSelectedDoctorID(doctorId)
    };


    const router = useRouter();
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

    useEffect(() => {
        if (Speciality) {
            setTimeout(() => {
                mixpanel.track(`${Speciality} page FAD`);
            }, 5000);
        }
    }, [])

    return (
        <>
            <BestDoctorsTopFilter selectedCityCookie={selectedCityCookie} setSelectedDiseaseValue={setSelectedDiseaseValue} selectedDiseaseValue={selectedDiseaseValue} setListenerFilterApply={setListenerFilterApply} selectedOtherCityData={selectedOtherCityData} showMobile={showMobile} setShowMobile={setShowMobile} sortGenderValue={sortGenderValue} setSortGenderValue={setSortGenderValue} handleChecksMulti={handleChecksMulti} fetchDoctorByFilter={fetchDoctorByFilter} applyFilter={applyFilter} sortSpecialityValue={sortSpecialityValue} sortDiseaseValue={sortDiseaseValue} setSortDiseaseValue={setSortDiseaseValue} setSortSpecialityValue={setSortSpecialityValue} setApplyFilter={setApplyFilter} setSpecModal={setSpecModal} specModal={specModal} diseasessModal={diseasessModal} setDiseasessModal={setDiseasessModal} setGender={setGender} gender={gender} completeSearchModal={completeSearchModal} setCompleteSearchModal={setCompleteSearchModal} setDoctorValue={setDoctorValue} doctorValue={doctorValue} setDiseaseValue={setDiseaseValue} diseaseValue={diseaseValue} specialityValue={specialityValue} setSpecialityValue={setSpecialityValue} specialityDiseaseDoctorGlobal={specialityDiseaseDoctorGlobal} myCities={myCities} setSelectedCity={setSelectedCity} selectedCity={selectedCity} specialtiesModal={specialtiesModal} setSpecialtiesModal={setSpecialtiesModal} />
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
                    {(isQueryEmptyTwo == 1 && diseaseValue || isQueryEmptyTwo == 2 || specialityValue || gender) && OtherCitiesSelected == undefined && findaspecialist == undefined && (
                        <>
                            <div>
                                <div className={styles.wrapper_all_doctors}>
                                    <ContainerWrapperFindDoc>
                                        {doctorListing?.data?.length <= 0 ?
                                            <div className={styles.no_results_wrapper}>
                                                <div className={styles.headerWraperr}>
                                                    <h3 className={styles.doctors_listed} > <span className={styles.results_searched}> 0 </span> Doctors listed in {(!Speciality && !disease ? location : '')}  {Speciality ? <span className={styles.results_searched}> | Best {Speciality?.replace(/\-/g, ' ')} Specialists </span> : '' || disease ? <span className={styles.results_searched}> | {disease?.replace(/\-/g, ' ')} Disease </span> : ''} </h3>
                                                    <div className={styles.icon_wrape}>
                                                        <span className={styles.verifiedIcon}>  </span>
                                                        <span className={styles.verifiedIconverify}> Verified by Meri Sehat </span>
                                                    </div>
                                                </div>
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
                                                            // <h3> <span className={styles.results_searched}> {doctorListing?.data?.length} </span> Doctors listed in <span className={styles.results_searched}> | Best Skin Specialists </span>  </h3>
                                                            <h3 className={styles.doctors_listed} > <span className={styles.results_searched}> {doctorListing?.total} </span> Doctors listed in {(!Speciality && !disease ? location : '')} {Speciality ? <span className={styles.results_searched}> | {Speciality?.replace(/\-/g, ' ')} Specialists </span> : '' || disease ? <span className={styles.results_searched}> | {disease?.replace(/\-/g, ' ')} Disease </span> : ''} </h3>

                                                            :
                                                            <h3 > <span className={styles.results_searched}>  {doctorListing?.total} </span> Doctors listed in <span className={styles.results_searched}> {location} </span>  </h3>
                                                        }
                                                        <div className={styles.icon_wrape}>
                                                            <span className={styles.verifiedIcon}>  </span>
                                                            <span className={styles.verifiedIconverify}> Verified by Meri Sehat </span>
                                                        </div>
                                                    </div>
                                                    {!isMobile
                                                        ?
                                                        doctorListing?.data?.map((item) =>
                                                        (
                                                            <>
                                                                <div className={styles.card_single_doctor}>
                                                                    <img src={item?.image_url} alt="" className={styles.doct_img} />
                                                                    <div className={styles.info_doctor_wrapper_container}>
                                                                        <div className={styles.info_doctor}>
                                                                            <div className={styles.name_doct} onClick={() => handlePushOnProfile(item)}>

                                                                                <span className={styles.title__doctor_name}> {item?.doctor_detail?.prefix} {item?.name} </span>
                                                                                {item?.doctor_detail?.is_verified === 1 &&
                                                                                    <span className={styles.verifiedIconName}> </span>
                                                                                }
                                                                            </div>
                                                                            <div className='flex-wrap' style={{ display: 'flex' }}>
                                                                                {item?.doctor_specialities.slice(0, 2).map((specialities, index) => (
                                                                                    <span key={index} className={styles.title__doctor_type}>
                                                                                        {(index ? ', ' : '') + specialities?.name}

                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                            <div style={{ display: 'flex' }} >
                                                                                {item?.doctor_education.slice(0, 3).map((education, index) => (
                                                                                    <span className={styles.title__doctor_type}> {
                                                                                        (index ? ', ' : '') + education?.doctor_degree?.name}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                        <div className={styles.recommendations_doctor}>
                                                                            {item?.doctor_detail?.badge_tag?.badge && <div className={styles.recomm_tag}>
                                                                                <span className={styles.thumbs_up}> </span>
                                                                                <span className={styles.thumbs_up_text}> {item?.doctor_detail?.badge_tag?.badge} </span>
                                                                            </div>}
                                                                            <div className={styles.single__recome}>
                                                                                <span className={styles.single__bag_svg}>  </span>
                                                                                <span className={styles.single__otg_text}> {item?.doctor_detail?.experience_year} Yrs Experience  </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className={styles.btn_group_doct_wrapper}>
                                                                        <div className={styles.btn_group_doct}>
                                                                            <button className={styles.btn_group_doct_view_btn} onClick={() => handlePushOnProfile(item)}> VIEW PROFILE </button>
                                                                            {item?.doctor_detail?.is_fad == true ? (
                                                                                <>
                                                                                    <button className={styles.btn_group_doct_requ_btn} onClick={() => handleShow(item, item?.id)}>Request Consult</button>

                                                                                </>
                                                                            ) : (item?.doctor_detail?.is_fad == false ? (
                                                                                <>
                                                                                    <button className={styles.btn_group_doct_requ_btn} onClick={() => router.push('/doctor-now')}>Doctor Now</button>
                                                                                </>
                                                                            ) : '')
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>))

                                                        :
                                                        doctorListing?.data?.map((item) =>
                                                        (
                                                            <>

                                                                <div className={styles.mobile_single_card}>
                                                                    <div className={styles.topping_wrape}>
                                                                        <img src={item?.image_url} alt="" />
                                                                        <div className={styles.info_mobile_details}>
                                                                            {item?.doctor_detail?.badge_tag?.badge && <div className={styles.recomm_tag}>
                                                                                <span className={styles.thumbs_up}> </span>
                                                                                <span className={styles.thumbs_up_text}> {item?.doctor_detail?.badge_tag?.badge}  </span>
                                                                            </div>}
                                                                            <div className={styles.name_doct} onClick={() => handlePushOnProfile(item)}>
                                                                                <span className={styles.title__doctor_name}> {item?.doctor_detail?.prefix}  {item?.name} </span>
                                                                                {item?.doctor_detail?.is_verified === 1 &&
                                                                                    <span className={styles.verifiedIconName}> </span>
                                                                                }
                                                                            </div>
                                                                            <div>
                                                                                {item?.doctor_specialities.slice(0, 2).map((specialities, index) => (
                                                                                    <span key={index} className={styles.title__doctor_type}>
                                                                                        {(index ? ', ' : '') + specialities?.name}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                            <div style={{ display: 'flex' }} >
                                                                                {item?.doctor_education.slice(0, 3).map((education, index) => (
                                                                                    <span className={styles.title__doctor_type}> {
                                                                                        (index ? ', ' : '') + education?.doctor_degree?.name}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                            <div className={styles.single__recome}>
                                                                                <span className={styles.single__bag_svg}>  </span>
                                                                                <span className={styles.single__otg_text}> {item?.doctor_detail?.experience_year} Yrs Experience  </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className={styles.exprTab}>
                                                                        <hr />
                                                                    </div>
                                                                    <div className={styles.btn_group_doct}>
                                                                        <button className={styles.btn_group_doct_view_btn} onClick={() => handlePushOnProfile(item)}> VIEW PROFILE </button>
                                                                        {item?.doctor_detail?.is_fad == true ? (
                                                                            <>
                                                                                <button className={styles.btn_group_doct_requ_btn} onClick={() => handleShow(item, item?.id)}>Request Consult</button>

                                                                            </>
                                                                        ) : (item?.doctor_detail?.is_fad == false && (
                                                                            <>
                                                                                <button className={styles.btn_group_doct_requ_btn} onClick={() => router.push('/doctor-now')}>Doctor Now</button>
                                                                            </>
                                                                        ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ))
                                                    }
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
                                    </ContainerWrapperFindDoc>
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
            )}

        </>
    )
}
export default BestDoctorsBreadcrumb;

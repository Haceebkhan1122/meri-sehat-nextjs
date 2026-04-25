import React, { useEffect, useState } from "react";
import Image from "next/image";
import checkmark from "../../public/svg/checkmark.svg";
import { Modal } from "antd";
import styles from './completeSearchFiltersModal.module.scss';
import ModalForFaDSpecialties from '../modalForFaD/ModalForFaDSpecialties';
import DiseasesModalFAD from '../diseasesModalFAD/diseasesModalFAD';
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { useRouter } from 'next/router';
import LoaderAssets from "../../public/gif/asset_loader.gif";
import Cookies from "js-cookie";
import HospitalsModalFAD from '../componentsUpdated/hospitalsModalFAD/HospitalsModalFAD';
import { hospitalNames } from "@/store/citySpecialityDiseaseDoctorLayout";
import { APIV3 } from "@/utils/httpService";

const CompleteSearchFiltersModal = ({ sortHospitalValue, setSortHospitalValue, hospitalValue, setHospitalValue, setClinicValue, SpecialitiesNameAll, diseasesNameAll, selectedCityCookie, setSelectedDiseaseValue, selectedDiseaseValue, sortDiseaseValue, sortSpecialityValue, setSortDiseaseValue, setSortSpecialityValue, setSpecModal, specModal, setDiseasessModal, diseasessModal, specialityDiseaseDoctorGlobal, doctorValue, setDoctorValue, setDiseaseValue, diseaseValue, specialityValue, setSpecialityValue, completeSearchModal, setCompleteSearchModal, specialityDiseaseDoctor, isLoading, setSelectedSpecialities, selectedSpecialities, setSelectedDisease, selectedDisease }) => {
    const dispatch = useDispatch();
    const [specialtiesModal, setSpecialtiesModal] = useState(false)
    const [diseasesModal, setDiseasesModal] = useState(false)
    const [hospitalsModal, setHospitalsModal] = useState(false)
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const queryValue = Object.values(router.query);
    console.log("queryValue", queryValue);
    let hospitalsNameAll = useSelector((state) => state.hospitalsList.hospitalList);


    useEffect(() => {
        if (!SpecialitiesNameAll && !diseasesNameAll && !hospitalsNameAll) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [SpecialitiesNameAll, diseasesNameAll, hospitalsNameAll])

    useEffect(() => {
        dispatch(hospitalNames(selectedCityCookie?.id))
    }, []);

    useEffect(() => {
        if (results) {
            const doctorsByCityId = results
                .filter((filItem) => filItem?.tag === "doctor" && filItem?.city?.toLowerCase() === selectedCityCookie?.name?.toLowerCase());

            const nonDoctors = results.filter((filItem) => filItem?.tag !== "doctor");

            setResults([...doctorsByCityId, ...nonDoctors]);
        }
    }, [JSON.stringify(results), selectedCityCookie]);

    const handleSpeciality = () => {
        setCompleteSearchModal(false)
        setSpecialtiesModal(true)
    }

    const handleHospitals = () => {
        setCompleteSearchModal(false)
        setHospitalsModal(true)
    }

    const handleDiseases = () => {
        setCompleteSearchModal(false)
        setDiseasesModal(true)
    }

    const handleInputChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        if (newQuery.trim() === '') {
            setResults([]);
            return;
        }
    };

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length >= 3) {
                setLoading(true);

                try {
                    const response = await APIV3.get(`/search-text?text=${query}&city_id=${selectedCityCookie?.id}`);
                    setResults(response.data?.data);
                    // console.log({response})
                } catch (error) {
                    console.error("Error fetching search results:", error);
                    setResults([]);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchResults();

    }, [query]);

    const handleSpecialityChange = (item, type) => {
        setSelectedItems(item)
        if (type == "speciality") {
            if (router.pathname == '/doctors/[...filter]') {
                setSortSpecialityValue('')
            }
            Cookies.remove('speciality')
            Cookies.remove('findASpecialist')
            if (!specialityDiseaseDoctorGlobal?.length > 0) {
                setDiseaseValue("")
            }
            if (specModal && specialityDiseaseDoctorGlobal?.length > 0) {
                setSortSpecialityValue(item?.name)
            } else {
                setSpecialityValue(item?.name)
            }
            setSpecialtiesModal(false)

            if (router.pathname == '/doctors') {
                setTimeout(() => {
                    setSpecModal(false)
                }, 500);
            }
        } else if (type == "disease") {
            Cookies.remove('speciality')
            Cookies.remove('findASpecialist')
            if (!specialityDiseaseDoctorGlobal?.length > 0) {
                setSpecialityValue("")
            }
            if (diseasessModal && specialityDiseaseDoctorGlobal?.length > 0) {
                setSortDiseaseValue(item?.name)
            } else {
                setDiseaseValue(item?.name)
            }
            setDiseasesModal(false)
            if (router.pathname == '/doctors') {
                setTimeout(() => {
                    setDiseasessModal(false)
                }, 500);
            }
        }
        else if (type == "hospital") {

            Cookies.remove('speciality')
            Cookies.remove('findASpecialist')
            setHospitalsModal(false)
            if (!specialityDiseaseDoctorGlobal?.length > 0) {
                setSpecialityValue("")
                setDiseaseValue("")
            }
            if (diseasessModal && specModal && specialityDiseaseDoctorGlobal?.length > 0) {
                setClinicValue(item)
            } else {
                setClinicValue(item)
            }
            setDiseasesModal(false)
            if (router.pathname == '/doctors') {
                setTimeout(() => {
                    setSpecModal(false)
                    setDiseasessModal(false)
                }, 500);
            }
        }
    }

    useEffect(() => {
        handleSpecialityChange()
    }, [specialityValue, diseaseValue])

    const handleItemClick = (item) => {
        if (item?.tag == "Speciality") {
            if (!specialityDiseaseDoctorGlobal?.length > 0) {
                setDiseaseValue("");
                setDoctorValue("");
            }
            setSpecialityValue(item?.name);
        } else if (item?.tag == "Disease") {
            if (!specialityDiseaseDoctorGlobal?.length > 0) {
                setSpecialityValue("");
                setDoctorValue("");
            }
            setDiseaseValue(() => item?.name); // Use functional form to get the latest state
        }

        else if (item?.tag == "Doctor") {
            const redirectUrl = item?.redirect_url;
            const lastIndex = redirectUrl?.lastIndexOf('/');
            const newRedirectUrl = redirectUrl?.substring(0, lastIndex);
            const redirectDocProfile = `${newRedirectUrl}/`
            router.push(`${redirectDocProfile}${item?.id}`)
        }

        else if (item?.tag == "Hospital") {
            const redirectUrl = item?.redirect_url;
            const lastIndex = redirectUrl?.lastIndexOf('/');
            const newRedirectUrl = redirectUrl?.substring(0, lastIndex);
            const redirectDocProfile = `${newRedirectUrl}/`
            router.push(`${redirectDocProfile}${item?.id}`)
        }
    };

    const highlightMatch = (text, query) => {
        const lowerCaseText = text.toLowerCase();
        const lowerCaseQuery = query.toLowerCase();

        if (lowerCaseText.includes(lowerCaseQuery)) {
            const index = lowerCaseText.indexOf(lowerCaseQuery);
            const prefix = text.substring(0, index);
            const match = text.substring(index, index + query.length);
            const suffix = text.substring(index + query.length);

            return (
                <>
                    {prefix}
                    <span style={{ fontWeight: 'bold' }}>{match}</span>
                    {suffix}
                </>
            );
        }

        return text;
    };


    const removeCookie = () => {
        setCompleteSearchModal(false);
        let cokk = Cookies.get('specDiseaseModal');
        if (cokk) {
            return Cookies.remove('specDiseaseModal');
        }
    }

    useEffect(() => {
        if (!completeSearchModal) {
            setQuery('');
            setResults([])
            setSelectedValue("")
            setSelectedValue2("")
        }
    }, [completeSearchModal, query])

    const handleFuncOnlyThisComponent = (item) => {
        setSelectedValue(item?.name)
    }

    const handleFuncOnlyThisComponentTwo = (item) => {
        setSelectedValue2(item?.name)
    }

    return (
        <>
            {isLoading && <Loader />}
            <Modal
                title=""
                centered
                visible={completeSearchModal}
                onOk={() => { setCompleteSearchModal(false); Cookies.remove('specDiseaseModal'); }}
                onCancel={() => { setCompleteSearchModal(false); Cookies.remove('specDiseaseModal'); }}
                footer={null}
                className={`${styles.modalSpecilitiesCompleteModal}  modalSpecilitiesCompleteModal dd`}
            >
                <div className={`${styles.modalCityandspecilitiesBox} `}>
                    <div className={styles.wrapingContainer}>
                        {isMobile
                            ?
                            (<>
                                <div className={styles.header__search_mob}>
                                    <span className={styles.back__icon} onClick={removeCookie} />
                                    <span className={styles.txtSearch}> Search </span>
                                </div>
                                <div className={styles.wraperSearchBarMobileBox}>
                                    <div className={styles.mobileSearchBar}>
                                        <span className={styles.searchIconMobile}></span>
                                        <input type='text' placeholder="Search for doctors, diseases, specialities & Hospitals" value={query} className={styles.inputMobileSearch} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </>)
                            :
                            <div className={styles.mobileSearchBar}>
                                <span className={styles.searchIconMobile}></span>
                                <input type='text' placeholder="Search for doctors, diseases and specialities" value={query} className={styles.inputMobileSearch} onChange={handleInputChange} />
                            </div>}
                        {(results?.length > 0)
                            &&
                            <div className={styles.results_wrapper}>
                                {(() => {
                                    const filteredResults = results?.filter((item) => item?.tag !== "Hospital");

                                    if (!filteredResults || filteredResults.length === 0) {
                                        return <div className={styles.no_result}>No result found</div>;
                                    }

                                    return filteredResults.map((item) => (
                                        <div key={item?.id} className={styles.single_result} onClick={() => handleItemClick(item)}>
                                            <div className={styles.firstWrap}>
                                                <Image src={item?.image_url ? item?.image_url : ''} alt="otg" width={24} height={24} />
                                                <span>{item?.tag === "Doctor" ? 'Dr.' : ''} {highlightMatch(item?.name, query)}</span>
                                            </div>
                                            <span className="text-capitalize">{item?.tag}</span>
                                        </div>
                                    ));
                                })()}

                            </div>
                        }
                        {(results?.length === 0 && query.trim() !== '') && (<>
                            <div className={styles.no_results_wrapper}>
                                <span className={styles.headNo}> No results found </span>
                                <span> You may want to try different keywords <br></br>or check for typos. </span>
                            </div></>)}
                        <div className={styles.emptyStateWithData}>
                            {loading ? (
                                <div className="modalLoader flex_center  d-none" style={{ height: '100% !important' }}>
                                    <Image
                                        className="loading_gif m-auto"
                                        src={LoaderAssets}
                                        alt="loader"
                                        width={90}
                                        height={90}
                                    />
                                </div>
                            ) : (
                                (!results?.length && query.trim() === "") &&
                                <div className={`${styles.wrapping__all} wrapAll`}>

                                    <div className={styles.wrape_top_list}>
                                        <h4> Diseases  </h4>
                                        <button onClick={handleDiseases}> View All </button>
                                    </div>
                                    <div className={styles.singleWrappingItem}>
                                        <ul className={`${styles.list_01} ${styles.list_01Custom}  hh`}>
                                            {(diseasesNameAll && diseasesNameAll?.length > 0) && diseasesNameAll
                                                ?.filter((filterItem) => filterItem.is_popular === true).slice(0, 3)?.map((item) => (
                                                    <li className={`${selectedValue2 && selectedValue2 === item?.name?.toLowerCase().replace(/ /g, '-') ? 'activeee' : !selectedValue2 && queryValue.some((selectedItem) => selectedItem === item?.name?.toLowerCase().replace(/ /g, '-')) ? 'activeee' : ''}`} key={item?.id}>
                                                        <input
                                                            type="radio"
                                                            id={item?.name}
                                                            name="selectionRadioGroup1"
                                                            checked={selectedValue2 ? selectedValue2 === item?.name?.toLowerCase().replace(/ /g, '-') : !selectedValue2 && queryValue.some((selectedItem) => selectedItem === item?.name?.toLowerCase().replace(/ /g, '-'))}
                                                            onChange={() => {
                                                                handleSpecialityChange(item, 'disease');
                                                                handleFuncOnlyThisComponentTwo(item);
                                                            }}
                                                        />
                                                        <label for={item?.name}>
                                                            <span>
                                                                <Image src={checkmark} className={`${styles.checkImage} checkmarked`}></Image>
                                                                <Image width={40} height={40} className={styles.activeItemImage} src={item?.image ? item?.image : ''} />
                                                            </span>
                                                            {item?.name}
                                                        </label>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                    <div className={styles.wrape_top_list}>
                                        <h4> Specialities  </h4>
                                        <button onClick={handleSpeciality}> View All </button>
                                    </div>
                                    <div className={styles.singleWrappingItem}>
                                        <ul className={`${styles.list_01} ${styles.list_01Custom} ss`}>
                                            {(SpecialitiesNameAll && SpecialitiesNameAll?.length) > 0 &&
                                                SpecialitiesNameAll?.filter((filterItem) => filterItem.is_popular === true).slice(0, 3)?.map((item) => (
                                                    <li className={`${queryValue && queryValue[1]?.[1]?.replace(/-/g, ' ') == item?.name.toLowerCase() ? 'activeee ' : !selectedValue && queryValue[1]?.[1]?.replace(/-/g, ' ') == item?.name ? 'activeee ' : ''}`} key={item?.id}>
                                                        <input
                                                            type="radio"
                                                            id={item?.name}
                                                            name="selectionRadioGroup"
                                                            checked={selectedValue ? selectedValue?.replace(/-/g, ' ') == item?.name : !selectedValue && queryValue[0]?.[1]?.replace(/-/g, ' ') == item?.name?.toLowerCase() || queryValue[1]?.[1]?.replace(/-/g, ' ') == item?.name?.toLowerCase() || queryValue[2]?.[1]?.replace(/-/g, ' ') == item?.name?.toLowerCase() || queryValue[3]?.[1]?.replace(/-/g, ' ') == item?.name?.toLowerCase()}
                                                            onChange={() => {
                                                                handleSpecialityChange(item, 'speciality');
                                                                handleFuncOnlyThisComponent(item);
                                                            }}

                                                        />
                                                        <label for={item?.name}>
                                                            <span>
                                                                <Image src={checkmark} className={`${styles.checkImage}`}></Image>
                                                                <Image width={40} className={styles.activeItemImage} height={40} src={item?.image ? item?.image : ''} />
                                                            </span>
                                                            {item?.name}
                                                        </label>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                    {hospitalsNameAll?.length > 0 && (
                                        <>

                                            <div className={styles.wrape_top_list}>
                                                <h4> Hospitals  </h4>
                                                <button onClick={handleHospitals}> View All </button>
                                            </div>
                                            <div className={styles.radioHospital}>
                                                <input
                                                    type="radio"
                                                    className="radio_hospital"
                                                    id={hospitalsNameAll?.[0]?.name}
                                                    name="selectionRadioGroup1"
                                                    checked={selectedValue2
                                                        ? selectedValue2 === hospitalsNameAll?.[0]?.name?.toLowerCase().replace(/ /g, '-')
                                                        : !selectedValue2 && queryValue.some(
                                                            (selectedItem) => selectedItem === hospitalsNameAll?.[0]?.name?.toLowerCase().replace(/ /g, '-')
                                                        )
                                                    }
                                                    onChange={() => {
                                                        handleSpecialityChange(hospitalsNameAll?.[0], 'hospital');
                                                        handleFuncOnlyThisComponentTwo(hospitalsNameAll?.[0]);
                                                    }}
                                                />
                                                <label htmlFor={hospitalsNameAll?.[0]?.name} className={styles.hospital_card}>
                                                    <span>
                                                        {/* <Image
                                                        src={hospitalsNameAll?.[0]?.icon ? hospitalsNameAll?.[0]?.icon : ''}
                                                        alt=""
                                                        width={40}
                                                        height={40}
                                                        className={styles.activeItemImage}
                                                    /> */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                                                            <path d="M28.5068 45.3205H36.4995V38.6599H43.16V30.6673H36.4995V24.0068H28.5068V30.6673H21.8463V38.6599H28.5068V45.3205ZM11.1895 55.9773V24.0068L32.5032 8.02148L53.8169 24.0068V55.9773H11.1895ZM16.5179 50.6489H48.4884V26.671L32.5032 14.682L16.5179 26.671V50.6489Z" fill="#19B3B5" />
                                                        </svg>
                                                    </span>
                                                    <div className={styles.info_ri_hos}>
                                                        <h3>{hospitalsNameAll?.[0]?.name}</h3>
                                                        <span>{hospitalsNameAll?.[0]?.address}</span>
                                                    </div>
                                                    <span className={styles.arrow_right_hos}></span>
                                                </label>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
            <ModalForFaDSpecialties SpecialitiesNameAll={SpecialitiesNameAll} setSortSpecialityValue={setSortSpecialityValue} sortSpecialityValue={sortSpecialityValue} diseaseValue={diseaseValue} selectedItems={selectedItems} setSpecialityValue={setSpecialityValue} setSpecModal={setSpecModal} specModal={specModal} specialityValue={specialityValue} handleSpecialityChange={handleSpecialityChange} specialityDiseaseDoctorGlobal={specialityDiseaseDoctorGlobal} specialityDiseaseDoctor={specialityDiseaseDoctor} setSelectedSpecialities={setSelectedSpecialities} selectedSpecialities={selectedSpecialities} specialtiesModal={specialtiesModal} setSpecialtiesModal={setSpecialtiesModal} setCompleteSearchModal={setCompleteSearchModal} />
            <DiseasesModalFAD diseasesNameAll={diseasesNameAll} setSelectedDiseaseValue={setSelectedDiseaseValue} selectedDiseaseValue={selectedDiseaseValue} sortDiseaseValue={sortDiseaseValue} specialityValue={specialityValue} selectedItems={selectedItems} setSortDiseaseValue={setSortDiseaseValue} setDiseaseValue={setDiseaseValue} diseasessModal={diseasessModal} setDiseasessModal={setDiseasessModal} diseaseValue={diseaseValue} handleSpecialityChange={handleSpecialityChange} specialityDiseaseDoctorGlobal={specialityDiseaseDoctorGlobal} specialityDiseaseDoctor={specialityDiseaseDoctor} setSelectedDisease={setSelectedDisease} selectedDisease={selectedDisease} diseasesModal={diseasesModal} setDiseasesModal={setDiseasesModal} setCompleteSearchModal={setCompleteSearchModal} />
            <HospitalsModalFAD setClinicValue={setClinicValue} sortHospitalValue={sortHospitalValue} setSortHospitalValue={setSortHospitalValue} setHospitalValue={setHospitalValue} hospitalValue={hospitalValue} hospitalsNameAll={hospitalsNameAll} setSelectedDiseaseValue={setSelectedDiseaseValue} setHospitalsModal={setHospitalsModal} hospitalsModal={hospitalsModal} selectedDiseaseValue={selectedDiseaseValue} sortDiseaseValue={sortDiseaseValue} specialityValue={specialityValue} selectedItems={selectedItems} setSortDiseaseValue={setSortDiseaseValue} setDiseaseValue={setDiseaseValue} diseasessModal={diseasessModal} setDiseasessModal={setDiseasessModal} diseaseValue={diseaseValue} handleSpecialityChange={handleSpecialityChange} specialityDiseaseDoctorGlobal={specialityDiseaseDoctorGlobal} specialityDiseaseDoctor={specialityDiseaseDoctor} setSelectedDisease={setSelectedDisease} selectedDisease={selectedDisease} diseasesModal={diseasesModal} setDiseasesModal={setDiseasesModal} setCompleteSearchModal={setCompleteSearchModal} />
        </>
    );
}

export default CompleteSearchFiltersModal;

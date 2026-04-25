import React, { useEffect, useState } from "react";
import Image from "next/image";
import checkmark from "/public/svg/checkmark.svg";
import { Modal } from "antd";
import styles from './hospitalsModalFAD.module.scss';
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import backBtn1 from '/public/svg/newPages/back__btn1.svg'
import diseaseIco from "/public/png/disease_ico.png";
import useMediaQuery from '@mui/material/useMediaQuery';

const HospitalsModalFAD = ({ setClinicValue, sortHospitalValue, setSortHospitalValue, setHospitalValue, hospitalValue, setHospitalsModal, hospitalsModal, hospitalsNameAll, setSortDiseaseValue, setCompleteSearchModal, setDiseaseValue, diseasessModal, handleSpecialityChange, specialityDiseaseDoctor, specialityDiseaseDoctorGlobal, diseasesModal, setDiseasesModal, setDiseasessModal }) => {
    const isMobile = useMediaQuery('(max-width:767px)');

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedItemss, setSelectedItemss] = useState('');
    const router = useRouter();
    // const debouncedQuery = useDebounce(query, 300);
    const queryValue = Object.values(router.query)

    if (diseasesModal == false) {
        Cookies.remove('diseaseModal');
    }


    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (newQuery.trim() === '') {
            setResults([]);
            return;
        }

        if (hospitalsNameAll?.length > 0) {
            const filteredResults = hospitalsNameAll.filter((item) =>
                item?.name?.trim().toLowerCase().includes(newQuery.trim().toLowerCase())
            );
            setResults(filteredResults);
        }

    };

    const handleBackClickedModal = () => {
        setHospitalsModal(false)
        setCompleteSearchModal(true)
    }

    const handleItemClick = (item, type) => {
        setHospitalValue(item?.name);
        setClinicValue(item);
        setHospitalsModal(false)
        // if (type == "hospital") {
        //     if (!hospitalsNameAll?.length > 0) {
        //         setHospitalValue(() => item?.name);
        //         setHospitalsModal(false)
        //     } else if (hospitalsModal && hospitalsNameAll?.length > 0) {
        //         setSortHospitalValue(item?.name)
        //         setHospitalsModal(false);
        //     } else {
        //         setHospitalValue(() => item?.name);
        //         setSelectedItemss(() => item?.name)
        //         setHospitalsModal(false);
        //     }
        // };
    }

    useEffect(() => {
        if (!hospitalsModal) {
            setQuery('');
            setResults([])
        }
    }, [hospitalsModal, query])

    useEffect(() => {
        const handleCookieChange = () => {
            const specModalCookieValue = Cookies.get('diseaseModal');
            if (specModalCookieValue == 1) {
                setDiseasesModal(true);
            }
        };

        // Initial check on mount
        handleCookieChange();

        // Listen for changes in the cookie
        window.addEventListener('specModalCookieChange', handleCookieChange);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('specModalCookieChange', handleCookieChange);
        };
    }, []);

    return (
        <>
            <Modal
                title=""
                centered
                open={hospitalsModal || hospitalsModal}
                onCancel={() => {
                    setHospitalsModal(false);
                    setHospitalsModal(false);
                }}
                footer={null}
                className={`${styles.hospitalsModalFAD} hospitalsModalFAD`}
            >
                <div className={`${styles.modalCityandspecilitiesBox} `}>
                    {(!results?.length && query.trim() === "") && (<>
                        <h3 className={`viewed_pop3`}> <Image src={backBtn1} onClick={handleBackClickedModal} alt="backbtn" width={24} height={24} style={{ cursor: "pointer" }} className={styles.icontop} /> All Hospitals </h3>
                        <hr />
                    </>)}
                    <div className={styles.wrapingContainer}>
                        <div className={styles.mobileSearchBar}>
                            <span className={styles.searchIconMobile}></span>
                            <input type='text' value={query} placeholder={isMobile ? "Search Hospitals" : "Search"} className={styles.inputMobileSearch} onChange={handleInputChange} />
                        </div>
                        {/* ---------------------------------- Results Searches  --------------------------------------- */}
                        {(results?.length > 0)
                            &&
                            <div className={styles.results_wrapper}>
                                {results.map((item) => {
                                    return (<>
                                        <div className={styles.single_result} onClick={(e) => handleItemClick(item, 'hospitals')}>
                                            <div className={styles.firstWrap}>
                                                <Image src={item?.image ? item?.image : ''} alt="otg" width={24} height={24} />
                                                <span  > {item?.name} </span>
                                            </div>
                                            <span className="text-capitalize"> {item?.tag} </span>
                                        </div>
                                    </>)
                                }
                                )}
                            </div>
                        }
                        {/* ---------------------------------- Results Searches  --------------------------------------- */}

                        {/* ---------------------------------- NO   results --------------------------------------- */}
                        {(results?.length === 0 && query.trim() !== '') && (<>
                            <div className={styles.no_results_wrapper}>
                                <span className={styles.headNo} > No results found </span>
                                <span> You may want to try different keywords<br></br> or check for typos. </span>
                            </div></>)}
                        {/* ---------------------------------- NO   results --------------------------------------- */}
                        {(hospitalsNameAll?.length > 0 && query.trim() === "") && (
                            <div className={styles.modal_citiesScroll}>
                                {hospitalsNameAll.map((item) => (
                                    <div className={styles.hospital_card}>
                                        <input
                                            type="radio"
                                            id={item?.name}
                                            name="hospitalSelectionGroup"
                                            // checked={}
                                            onChange={() => {
                                                handleSpecialityChange(item, 'hospital');
                                            }}
                                        />
                                        <label htmlFor={item.name} className={styles.labelHospital}>
                                            <span>
                                                {item?.image && <Image
                                                    src={item?.image || ""}
                                                    alt=""
                                                    width={40}
                                                    height={40}
                                                    className={styles.activeItemImage}
                                                />}
                                            </span>
                                            <div className={`${styles.wrape_whole} whomenew`}>

                                                <div className={styles.info_ri_hos}>
                                                    <h3 className="test">{item.name}</h3>
                                                    <span>{item.address}</span>
                                                </div>
                                                <span className={styles.arrow_right_hos}></span>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default HospitalsModalFAD;

import React, { useEffect, useState } from "react";
import Image from "next/image";
import checkmark from "../../public/svg/checkmark.svg";
import { Modal } from "antd";
import styles from './diseasesModalFAD.module.scss';
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import backBtn1 from '/public/svg/newPages/back__btn1.svg'
import diseaseIco from "../../public/png/disease_ico.png";
import useMediaQuery from '@mui/material/useMediaQuery';

const DiseasesModalFAD = ({ diseasesNameAll, setSelectedDiseaseValue, selectedDiseaseValue, setSortDiseaseValue, setCompleteSearchModal, setDiseaseValue, diseasessModal, handleSpecialityChange, specialityDiseaseDoctor, specialityDiseaseDoctorGlobal, diseasesModal, setDiseasesModal, setSelectedDisease, setDiseasessModal }) => {
    const isMobile = useMediaQuery('(max-width:767px)');

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedItemss, setSelectedItemss] = useState('');
    const router = useRouter();
    const queryValue = Object.values(router.query)

    if (diseasesModal == false) {
        Cookies.remove('diseaseModal');
    }

    // const handleInputChange = (event) => {
    //     const newQuery = event.target.value;
    //     setQuery(newQuery);

    //     if (newQuery.trim() === '') {
    //         setResults([]);
    //         return;
    //     }

    //     if (specialityDiseaseDoctorGlobal?.length > 0) {
    //         const filteredResults = specialityDiseaseDoctorGlobal.filter((item) => item?.tag === "disease" &&
    //             item?.name?.trim().toLowerCase().includes(newQuery.trim().toLowerCase())
    //         );
    //         setResults(filteredResults);
    //     }
    //     else {
    //         const filteredResults = specialityDiseaseDoctor.filter((item) => item?.tag === "disease" &&
    //             item?.name?.trim().toLowerCase().includes(newQuery.trim().toLowerCase())
    //         );
    //         setResults(filteredResults);
    //     }
    // };


    const handleInputSearch = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);

        if (newQuery.trim() === '') {
            setResults([]);
            return;
        }

        if (diseasesNameAll?.length > 0) {
            const filteredResults = diseasesNameAll.filter((item) =>
                item?.name?.trim().toLowerCase().includes(newQuery.trim().toLowerCase())
            );
            setResults(filteredResults);
        }
        // else {
        //     const filteredResults = specialityDiseaseDoctor.filter((item) => item?.tag === "disease" &&
        //         item?.name?.trim().toLowerCase().includes(newQuery.trim().toLowerCase())
        //     );
        //     setResults(filteredResults);
        // }
    };

    const handleBackClickedModal = () => {
        setDiseasessModal(false);
        setDiseasesModal(false);
        setCompleteSearchModal(false)
    }


    const handleItemClick = (item, type) => {
        if (type == "disease") {
            if (!diseasesNameAll?.length > 0) {
                // setSpecialityValue("");
                // setDoctorValue("");
                setDiseaseValue(() => item?.name);
            } else if (diseasessModal && diseasesNameAll?.length > 0) {
                setSortDiseaseValue(item?.name)
                setDiseasessModal(false);
            } else {
                setDiseaseValue(() => item?.name);
                setSelectedItemss(() => item?.name)
                setDiseasesModal(false);
            }

        };
    }

    useEffect(() => {
        if (!diseasesModal && !diseasessModal) {
            setQuery('');
            setResults([])
        }
    }, [diseasesModal, query, diseasessModal])

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

    const handleFuncOnlyThisComponent = (item) => {
        setSelectedDiseaseValue(item?.name)
    }

    return (
        <>
            <Modal
                title=""
                centered
                open={diseasesModal || diseasessModal}
                // onCancel={() => setDiseasesModal(false)}
                onCancel={() => {
                    setDiseasessModal(false);
                    setDiseasesModal(false);
                }}
                footer={null}
                className={`${styles.modalCityandspecilities} modalCityandspecilities`}
            >
                <div className={`${styles.modalCityandspecilitiesBox} `}>
                    {(!results?.length && query.trim() === "") && (<>
                        <h3 className={`viewed_pop3`}> <Image src={backBtn1} onClick={handleBackClickedModal} alt="backbtn" width={24} height={24} style={{ cursor: "pointer" }} className={styles.icontop} /> All Diseases </h3>
                        <hr />
                    </>)}
                    <div className={styles.wrapingContainer}>
                        <div className={styles.mobileSearchBar}>
                            <span className={styles.searchIconMobile}></span>
                            <input type='text' value={query} placeholder={isMobile ? "Search Diseases" : "Search"} className={styles.inputMobileSearch} onChange={handleInputSearch} />
                        </div>
                        {/* ---------------------------------- Results Searches  --------------------------------------- */}
                        {(results?.length > 0)
                            &&
                            <div className={styles.results_wrapper}>
                                {results.map((item) => {
                                    return (<>
                                        <div className={styles.single_result} onClick={(e) => handleItemClick(item, 'disease')}>
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
                            <div className={styles.no_results_wrapper} >
                                <span className={styles.headNo} > No results found </span>
                                <span> You may want to try different keywords<br></br> or check for typos. </span>
                            </div></>)}
                        {/* ---------------------------------- NO   results --------------------------------------- */}

                        {(!results?.length && query.trim() === "") &&
                            (<div className={styles.modal_citiesScroll}>
                                <h4 className={"viewed_pop1"}> Most Viewed </h4>
                                <ul className={`${styles.list_01} `}>
                                    {(diseasesNameAll && diseasesNameAll?.length > 0) && diseasesNameAll
                                        ?.filter((filterItem) => filterItem?.is_popular === true).map((item) => (

                                            <li className={`${(selectedDiseaseValue && selectedDiseaseValue?.replace(/-/g, ' ') === item?.name) || (!selectedDiseaseValue && queryValue && queryValue.some((selectedItem) => selectedItem === item?.name?.toLowerCase().replace(/ /g, '-'))) ? 'activeee' : ''}`} key={item?.id}>
                                                <input
                                                    type="radio"
                                                    id={item?.name}
                                                    name="cardiologist22"
                                                    checked={selectedDiseaseValue ? selectedDiseaseValue?.replace(/-/g, ' ') == item?.name : !selectedDiseaseValue && queryValue[1]?.[1]?.replace(/-/g, ' ') == item?.name?.toLowerCase() || queryValue[2]?.[1]?.replace(/-/g, ' ') == item?.name?.toLowerCase()}
                                                    onChange={() => {
                                                        handleSpecialityChange(item, 'disease');
                                                        handleFuncOnlyThisComponent(item);
                                                    }}
                                                />
                                                <label for={item?.name}>
                                                    <span>
                                                        <Image src={checkmark} className={`${styles.checkImage} checkmarked`}></Image>
                                                        <Image width={40} height={40} className="activeItemImage" src={item?.image || ''} />
                                                    </span>
                                                    {item?.name}
                                                </label>
                                            </li>
                                        ))}
                                </ul>
                                <h4 className={`viewed_pop1`} >All Diseases</h4>
                                <ul className={`${styles.list_02} `}>
                                    {(diseasesNameAll && diseasesNameAll?.length > 0) && diseasesNameAll
                                        ?.filter((filterItem) => filterItem.is_popular === false).sort().map((item) => (
                                            <li key={item?.id}>
                                                <input
                                                    type="radio"
                                                    id={item?.name}
                                                    name="cardiologist22"
                                                    checked={selectedDiseaseValue ? selectedDiseaseValue?.replace(/-/g, ' ') == item?.name : !selectedDiseaseValue && queryValue[1]?.[1]?.replace(/-/g, ' ') == item?.name?.toLowerCase() || (!selectedDiseaseValue && queryValue && queryValue.some((selectedItem) => selectedItem === item?.name?.toLowerCase().replace(/ /g, '-'))) || queryValue[2]?.[1] == item?.name?.toLowerCase() || queryValue[0] == item?.name?.toLowerCase()}
                                                    onChange={() => {
                                                        handleSpecialityChange(item, 'disease');
                                                        handleFuncOnlyThisComponent(item);
                                                    }}
                                                />
                                                <label for={item?.name}>
                                                    <span>
                                                        <Image src={checkmark} className={`${styles.checkImage}`}></Image>

                                                    </span>
                                                    {item?.name}
                                                </label>
                                            </li>
                                        ))}

                                </ul>
                            </div>)}
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default DiseasesModalFAD;

import React, { useEffect, useState } from "react";
import Image from "next/image";
import checkmark from "../../public/svg/checkmark.svg";
import backbtn from "../../public/svg/backbtn.svg";
import style from '../../components/findADoctor/style.module.scss'
import { Modal } from "antd";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import specialityIco from "../../public/png/speciality_ico.png";
import useMediaQuery from '@mui/material/useMediaQuery';


const ModalForFaDSpecialties = ({ setSortSpecialityValue, SpecialitiesNameAll, setCompleteSearchModal, setSpecialityValue, setSpecModal, specModal, handleSpecialityChange, specialityDiseaseDoctor, specialityDiseaseDoctorGlobal, specialtiesModal, setSpecialtiesModal }) => {
    const isMobile = useMediaQuery('(max-width:767px)');

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedItemss, setSelectedItemss] = useState();
    const [selectedValue, setSelectedValue] = useState('');
    const router = useRouter()
    const queryValue = Object.values(router.query)

    if (specialtiesModal == false) {
        Cookies.remove('specModal');
    }

    const handleBackClickedModal = () => {
        setSpecialtiesModal(false)
        setCompleteSearchModal(false)
        setSpecModal(false);
    }

    // const handleInputChange = (event) => {
    //     const newQuery = event.target.value;
    //     setQuery(newQuery);

    //     if (newQuery.trim() === '') {
    //         setResults([]);
    //         return;
    //     }

    //     if (specialityDiseaseDoctorGlobal?.length > 0) {
    //         const filteredResults = specialityDiseaseDoctorGlobal.filter((item) => item?.tag === "speciality" &&
    //             item?.name?.trim().toLowerCase().includes(newQuery.trim().toLowerCase())
    //         );
    //         setResults(filteredResults);
    //     } else {
    //         const filteredResults = specialityDiseaseDoctor.filter((item) => item?.tag === "speciality" &&
    //             item?.name?.trim().toLowerCase().includes(newQuery.trim().toLowerCase())
    //         );
    //         setResults(filteredResults);

    //     }

    // };

    const handleInputChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);

        if (newQuery.trim() === '') {
            setResults([]);
            return;
        }

        if (SpecialitiesNameAll?.length > 0) {
            const filteredResults = SpecialitiesNameAll.filter((item) =>
                item?.name?.trim().toLowerCase().includes(newQuery.trim().toLowerCase())
            );
            setResults(filteredResults);
        }
        // else {
        //     const filteredResults = specialityDiseaseDoctor.filter((item) => item?.tag === "speciality" &&
        //         item?.name?.trim().toLowerCase().includes(newQuery.trim().toLowerCase())
        //     );
        //     setResults(filteredResults);

        // }

    };


    const handleItemClick = (item, type) => {
        setSelectedItemss(item)
        if (type == "speciality") {
            if (!SpecialitiesNameAll?.length > 0) {
                // setDiseaseValue("");
                // setDoctorValue("");
                setSpecialityValue(item?.name);
            }
            else if (specModal && SpecialitiesNameAll?.length > 0) {
                setSortSpecialityValue(item?.name)
                setSpecModal(false);
            } else {
                setSpecialityValue(item?.name);
                setSpecialtiesModal(false)
            }
        }
    }

    useEffect(() => {
        if (!specialtiesModal && !specModal) {
            setQuery('');
            setResults([])
            setSelectedValue('')
        }
    }, [specialtiesModal, specModal])


    useEffect(() => {
        const handleCookieChange = () => {
            const specModalCookieValue = Cookies.get('specModal');
            if (specModalCookieValue == 1) {
                setSpecialtiesModal(true);
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
        setSelectedValue(item?.name)
    }

    return (
        <>
            <Modal
                title=""
                centered
                open={specialtiesModal || specModal}
                onOk={() => setSpecialtiesModal(false)}
                onCancel={() => {
                    setSpecModal(false);
                    setSpecialtiesModal(false);
                }}
                footer={null}
                className={`${style.modalCityandspecilities} ${style.specilitiesBox}   modalCityandspecilities  `}
            >

                <div className={`${style.modalCityandspecilitiesBox}`}>
                    {(!results.length && query.trim() === "") && (<>
                        <h3 className={`text-start`}><Image src={backbtn} onClick={handleBackClickedModal} alt="backbtn" width={24} height={24} style={{ cursor: "pointer" }} className={style.icontop} /> All Specialities</h3>
                        <hr className={`${style.h101}`}></hr>
                    </>)}
                    <div className={""}>
                        <div className={style.mobileSearchBar}>
                            <span className={style.searchIconMobile}></span>
                            <input type='text' value={query} placeholder={isMobile ? "Search Specialities" : "Search"} className={style.inputMobileSearch} onChange={handleInputChange} />
                        </div>

                        {/* ---------------------------------- Results Searches  --------------------------------------- */}
                        {(results?.length > 0)
                            &&
                            <div className={style.results_wrapper}>
                                {results?.map((item) => {
                                    return (<>
                                        <div className={style.single_result} onClick={(e) => handleItemClick(item, 'speciality')}>
                                            <div className={style.firstWrap}>
                                                <Image src={item?.image ? item?.image : ''} alt="otg" width={24} height={24} />
                                                <span> {item?.name} </span>
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
                        {(results.length === 0 && query.trim() !== '') && (<>
                            <div className={`${style.no_results_wrapper} sd`}>
                                <span className={style.headNo}> No results found </span>
                                <span> You may want to try different keywords<br></br> or check for typos. </span>
                            </div></>)}
                        {/* ---------------------------------- NO   results --------------------------------------- */}
                        {(!results.length && query.trim() === "") &&
                            (<div className={`${style.modal_citiesScroll} `}>
                                <h5 className={`viewed_pop1`} >Most Viewed</h5>
                                <ul className={`${style.list_01} `}>
                                    {(SpecialitiesNameAll && SpecialitiesNameAll?.length > 0) && SpecialitiesNameAll
                                        ?.filter((filterItem) => filterItem?.is_popular === true).map((item) => (
                                            <li className={`${(selectedValue && selectedValue?.replace(/-/g, ' ') === item?.name) || (!selectedValue && queryValue && queryValue[1]?.[1]?.replace(/-/g, ' ') === item?.name.toLowerCase()) ? 'activeee' : ''}`} key={item?.id}>
                                                <input
                                                    type="radio"
                                                    id={item?.name}
                                                    name="cardiologist"
                                                    checked={selectedValue ? selectedValue?.replace(/-/g, ' ') == item?.name : !selectedValue && queryValue[1]?.[1]?.replace(/-/g, ' ') == item?.name?.toLowerCase() || queryValue[2]?.[1]?.replace(/-/g, ' ') == item?.name?.toLowerCase() || queryValue[0]?.[1]?.replace(/-/g, ' ') == item?.name?.toLowerCase() || queryValue[3]?.[1]?.replace(/-/g, ' ') == item?.name?.toLowerCase()}
                                                    onChange={() => {
                                                        handleSpecialityChange(item, 'speciality');
                                                        handleFuncOnlyThisComponent(item);
                                                    }}
                                                />
                                                <label htmlFor={item?.name}>
                                                    <span>
                                                        <Image src={checkmark} className={`${style.checkImage} checkmarked`}></Image>
                                                        <Image width={40} className="activeItemImage" height={40} src={item?.image || ''} />
                                                    </span>
                                                    {item?.name}
                                                </label>
                                            </li>
                                        ))}
                                </ul>
                                <h4 className={`viewed_pop2`} >All Specialities</h4>
                                <ul className={`${style.list_02} ${style.list_new}`}>
                                    {(SpecialitiesNameAll && SpecialitiesNameAll?.length > 0) && SpecialitiesNameAll
                                        ?.filter((filterItem) => filterItem.is_popular === false)
                                        .map((item) => (
                                            <li key={item?.id}>
                                                <input
                                                    type="radio"
                                                    id={item?.name}
                                                    name="cardiologist"
                                                    checked={selectedValue ? selectedValue?.replace(/-/g, ' ') == item?.name : !selectedValue && queryValue[1]?.[1]?.replace(/-/g, ' ') == item?.name?.toLowerCase() || queryValue[2]?.[1]?.replace(/-/g, ' ') == item?.name?.toLowerCase() || queryValue[0]?.[1]?.replace(/-/g, ' ') == item?.name?.toLowerCase() || queryValue[3]?.[1]?.replace(/-/g, ' ') == item?.name?.toLowerCase()}
                                                    // checked={selectedValue ? selectedValue == item?.name : !selectedValue && queryValue[1]?.[1] == item?.name?.toLowerCase() || queryValue[2]?.[1] == item?.name?.toLowerCase() }
                                                    onChange={() => {
                                                        handleSpecialityChange(item, 'speciality');
                                                        handleFuncOnlyThisComponent(item);
                                                    }}
                                                />

                                                <label htmlFor={item?.name}>
                                                    <span>
                                                        <Image src={checkmark} className={`${style.checkImage}`}></Image>
                                                    </span>
                                                    {item?.name}
                                                </label>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            )}
                    </div>
                </div>
            </Modal>
            {/* <CompleteSearchFiltersModal setFilterFromDoctorListing={setFilterFromDoctorListing} filterFromDoctorListing={filterFromDoctorListing} diseasesModal={diseasesModal} setDiseasesModal={setDiseasesModal} setSpecialtiesModal={setSpecialtiesModal} specialtiesModal={specialtiesModal} specialityDiseaseDoctorGlobal={specialityDiseaseDoctorGlobal} setDoctorValue={setDoctorValue} doctorValue={doctorValue} setDiseaseValue={setDiseaseValue} diseaseValue={diseaseValue} specialityValue={specialityValue} setSpecialityValue={setSpecialityValue} setSelectedSpecialities={setSelectedSpecialities} selectedSpecialities={selectedSpecialities} setSelectedDisease={setSelectedDisease} selectedDisease={selectedDisease} isLoading={isLoading} specialityDiseaseDoctor={specialityDiseaseDoctor} completeSearchModal={completeSearchModal} setCompleteSearchModal={setCompleteSearchModal} /> */}
        </>
    );
}

export default ModalForFaDSpecialties;

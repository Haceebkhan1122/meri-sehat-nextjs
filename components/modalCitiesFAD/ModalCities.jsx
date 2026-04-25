import React, { useEffect, useState } from "react";
import Image from "next/image";
import checkmark from "../../public/svg/checkmark.svg";
import { Modal } from "antd";
import styles from './modalCitiesFAD.module.scss';
import Loader from "../Loader";
import Cookies from "js-cookie";
import Router, { useRouter } from 'next/router';


const CitiesModalFAD = ({ myCities, selectedCity, setSelectedCity, citiesModal, setCitiesModal, isLoading }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedCityCookie, setSelectedCityCookie] = useState([]);
    const router = useRouter()

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


    // handling city change and getting city data
    const handleCityChange = (cityData) => {
        Cookies.remove('OtherCities')
        Cookies.set('findASpecialist', 1)
        // Cookies.remove('selectedCity')
        Cookies.set('selectedCity', (JSON.stringify(cityData)));
        setSelectedCity(cityData)
        if(router.pathname == '/doctors/[...filter]'){
            router.push({
                pathname: `/doctors/${cityData?.name?.toLowerCase()}`,
              });
        }
        setCitiesModal(false)
        setTimeout(() => {
            setQuery('')
            setResults([])
        }, 500);
    }

    const handleInputChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);

        if (newQuery.trim() === '') {
            setResults([]);
            return;
        }

        const filteredResults = myCities?.filter((item) =>
            item?.name.trim().toLowerCase().includes(newQuery.trim().toLowerCase())
        );

        setResults(filteredResults);
    };

    useEffect(() => {
        if (!citiesModal) {
            setQuery('');
            setResults([])
        }
    }, [citiesModal])

    return (
        <>
            {isLoading && <Loader />}
            <Modal
                title=""
                centered
                visible={citiesModal}
                //commenting out this code because of /MSPK-14873
                // onOk={selectedCity ? () => setCitiesModal(false) : undefined} // Only close if selectedCity is defined
                // onCancel={selectedCity ? () => setCitiesModal(false) : undefined} // Only close if selectedCity is defined
                onOk={() => setCitiesModal(false)}
                onCancel={() => setCitiesModal(false)}
                footer={null}
                className={`${styles.modalCityandspecilities} modalCityandspecilities`}
            >
                <div className={`${styles.modalCityandspecilitiesBox} `}>
                    {(!results.length && query.trim() === "") && (<>
                        <h3 className={styles.cityTitle}> Cities </h3>
                        <hr />
                    </>)}
                    <div className={styles.wrapingContainer}>
                        <h4 className={styles.viewed_pop}> Popular Cities </h4>
                        <div className={styles.mobileSearchBar}>
                            <span className={styles.searchIconMobile}></span>
                            <input type='text' placeholder="Enter your city " value={query} className={styles.inputMobileSearch} onChange={handleInputChange} />
                        </div>
                        {/* ---------------------------------- Results Searches  --------------------------------------- */}
                        {(results.length > 0)
                            &&
                            <div className={styles.results_wrapper}>
                                {results.map((item) => {
                                    return (<>
                                        <div className={styles.single_result} onClick={() => handleCityChange(item)}>
                                            <div className={styles.firstWrap}>
                                                {/* <Image src={item.image || ""} alt="otg" width={24} height={24} /> */}
                                                <span   > {item.name} </span>
                                            </div>
                                            <span className="text-capitalize"> {item.type} </span>
                                        </div>
                                    </>)
                                }
                                )}
                            </div>
                        }
                        {/* ---------------------------------- Results Searches  --------------------------------------- */}

                        {/* ---------------------------------- NO   results --------------------------------------- */}
                        {(results.length === 0 && query.trim() !== '') && (<>
                            <div className={styles.no_results_wrapper}>
                                <span className={styles.headNo}> No results found </span>
                                <span> You may want to try different keywords <br></br>or check for typos. </span>
                            </div></>)}
                        {/* ---------------------------------- NO   results --------------------------------------- */}

                        {(!results.length && query.trim() === "") &&
                            (<div className={styles.modal_citiesScroll} >
                                <ul className={`${styles.list_01} ${styles.citylist} `}>
                                    {myCities?.filter((filterItem) => filterItem?.is_popular === true).map((item) => (
                                        <li>
                                            <input type="radio" id={item?.name} name="cardiologist"
                                                checked={item?.name == selectedCityCookie?.name } onChange={() => handleCityChange(item)} />
                                            <label for={item?.name}>
                                                <span>
                                                    <Image src={checkmark} className={`${styles.checkImage}`}></Image>
                                                    <Image width={40} height={40} className="activeItemImage" src={item?.image || ''} />
                                                </span>
                                                {item?.name}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                                <h4 className={styles.viewed_pop} >Locations</h4>
                                <ul className={`${styles.list_02} `}>
                                    {myCities?.filter((filterItem) => filterItem?.is_popular === false).map((item) => (
                                        <>
                                            <li>
                                                <input type="radio" id={item?.name} name="cardiologist"
                                                    checked={item?.name == selectedCityCookie?.name } onChange={() => handleCityChange(item)} />
                                                <label for={item?.name}>
                                                    <span>
                                                        <Image src={checkmark} className={`${styles.checkImage}`}></Image>
                                                    </span>
                                                    {item?.name}
                                                </label>
                                            </li>
                                        </>
                                    ))}
                                </ul>
                            </div>)}
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default CitiesModalFAD;

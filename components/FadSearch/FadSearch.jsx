// components/SearchBar.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Image from "next/image";
import styles from './style.module.css'
import searchfad from "../../public/svg/searchfad.svg";
import location011 from "../../public/svg/location011.svg";
import location012 from "../../public/svg/searchIcon01.svg";
import dropdown011 from "../../public/svg/dropdown011.svg";
import CompleteSearchFiltersModal from '../completeSearchFiltersModal/completeSearchFiltersModal';
import CitiesModalFAD from '../modalCitiesFAD/ModalCities';
import Cookies from "js-cookie";
import { isMobile } from 'react-device-detect';

const FadSearch = ({ sortDiseaseValue, setLoading, loading, selectedOtherCityData, setFilterFromDoctorListing, filterFromDoctorListing, setDiseasesModal, diseasesModal, setSpecialtiesModal, specialtiesModal, specialityDiseaseDoctorGlobal, myCities, selectedCity, setSelectedCity, doctorValue, setDoctorValue, setDiseaseValue, diseaseValue, specialityValue, setSpecialityValue, completeSearchModal, setCompleteSearchModal, isLoading, specialityDiseaseDoctor, setSelectedSpecialities, selectedSpecialities, setSelectedDisease, selectedDisease }) => {

  const [selectedCityCookie, setSelectedCityCookie] = useState()
  const [isDoctorsListingPage, setIsDoctorsListingPage] = useState(false);
  const [isDirectUrlHit, setisDirectUrlHit] = useState(false)

  // useRouter hook to get the current route
  const router = useRouter();
  // Effect to check the page location when the component mounts
  useEffect(() => {
    // Replace the following logic with the actual check for doctors-listing page
    setIsDoctorsListingPage(router.pathname === '/doctors');
  }, [router.pathname]);

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


  useEffect(() => {
    if (selectedOtherCityData?.city) {
      setSelectedCityCookie(selectedOtherCityData?.city)
    }
  }, [selectedOtherCityData])


  const [citiesModal, setCitiesModal] = useState(false)

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    // Check if the search query is empty
    if (newQuery.trim() === '') {
      setResults([]);
      return;
    }

    // Filter data based on the search query
    if (specialityDiseaseDoctorGlobal?.length > 0) {
      const filteredResults = specialityDiseaseDoctorGlobal.filter((item) =>
        item?.name?.toLowerCase()?.includes(newQuery?.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      const filteredResults = specialityDiseaseDoctor.filter((item) =>
        item?.name?.toLowerCase()?.includes(newQuery?.toLowerCase())
      );
      setResults(filteredResults);
    }

  };




  return (
    <>
      {!isMobile ?
        (<>
          <div className={`${styles.mainBoxSearch} ${styles.search__bar_doc} test d-flex align-items-center`}>
            <div className={`${styles.boxWidth01} ${styles.gap5} d-flex align-items-center justify-content-between`} onClick={() => setCitiesModal(true)} style={{ cursor: "pointer" }} >
              <div className={`${styles.gap5} d-flex align-items-center  `}>
                {isDoctorsListingPage ? (
                  <Image src={location012} width="12" height="16" alt="location"></Image>
                ) : (
                  <Image src={location011} width="12" height="16" alt="location"></Image>
                )}
                <p className={isDoctorsListingPage ? styles.locationCity : `${styles.locationCity} ${styles.locationCityFAD}`}   > {selectedCity?.name || selectedCityCookie?.name} </p>
              </div>
              <Image src={dropdown011} width="10" height="6" alt="arrow " className={styles.drop_icon_img}></Image>
            </div>
            <div className={`${styles.boxWidth02} ${styles.box_two}`}>
              <div className={`d-flex align-items-start ${styles.custom__class}`} onClick={() => setCompleteSearchModal(true)}>
                <input
                  type="search"
                  placeholder={router.pathname === "/find-a-doctor" ? "Search for doctors, diseases, specialities... " : "Search doctors, specialities or diseases"}
                  value={query}
                  onChange={handleInputChange}
                  className={`${styles.inputSearch} form-control`}
                  readOnly
                />
                <button >
                  <Image src={searchfad} height="53" alt="search"></Image>
                </button>
              </div>
              {results.length === 0 && query.trim() !== '' && (
                <div className={`${styles.searchResultsBox} `}>
                  <p>No results found for "{query}"</p>
                </div>
              )}
              {results.length > 0 && (
                <div className={`${styles.searchResultsBox} `}>
                  <ul className='p-0'>
                    {results.map((result) => (
                      <li className={`${styles.searchResults} d-flex justify-content-between`} key={result.id}>
                        <p className={`${styles.textName} me-0`}  ><img
                          src={result.image}
                          alt={`Image for ${result.name}`}
                          width="20" height="20"
                        />
                          <span>{result.name}</span></p>
                        <p className={`${styles.textName1} me-0`}>{result.type}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </>)
        :
        (<>
          <div className={styles.wraper_find_a_doctor_inp}>
            <div className={`${styles.boxWidth01} ${styles.gap5} d-flex align-items-center justify-content-between ${styles.box__location_mobile}`} onClick={() => setCitiesModal(true)} style={{ cursor: "pointer" }} >
              <div className={`${styles.gap5} d-flex align-items-center  `}>
                <Image src={location011} width="12" height="16" alt="location"></Image>
                <p className={`${styles.locationCity}`}> {selectedCity?.name || selectedCityCookie?.name} </p>
              </div>
              <Image src={dropdown011} width="10" height="6" alt="arrow " className={styles.drop_icon_img}></Image>
            </div>
            <div className={styles.mobileSearchBar} onClick={() => setCompleteSearchModal(true)}>
              <span className={styles.searchIconMobile}></span>
              <input type='text' placeholder="Search for doctors, diseases, specialities..." className={styles.inputMobileSearch} readOnly />
            </div>
          </div>
        </>)
      }
      <CompleteSearchFiltersModal selectedCityCookie={selectedCityCookie} sortDiseaseValue={sortDiseaseValue} setLoading={setLoading} loading={loading} setFilterFromDoctorListing={setFilterFromDoctorListing} filterFromDoctorListing={filterFromDoctorListing} diseasesModal={diseasesModal} setDiseasesModal={setDiseasesModal} setSpecialtiesModal={setSpecialtiesModal} specialtiesModal={specialtiesModal} specialityDiseaseDoctorGlobal={specialityDiseaseDoctorGlobal} setDoctorValue={setDoctorValue} doctorValue={doctorValue} setDiseaseValue={setDiseaseValue} diseaseValue={diseaseValue} specialityValue={specialityValue} setSpecialityValue={setSpecialityValue} setSelectedSpecialities={setSelectedSpecialities} selectedSpecialities={selectedSpecialities} setSelectedDisease={setSelectedDisease} selectedDisease={selectedDisease} isLoading={isLoading} specialityDiseaseDoctor={specialityDiseaseDoctor} completeSearchModal={completeSearchModal} setCompleteSearchModal={setCompleteSearchModal} />
      <CitiesModalFAD setisDirectUrlHit={setisDirectUrlHit} myCities={myCities} setSelectedCity={setSelectedCity} selectedCity={selectedCity} isLoading={isLoading} citiesModal={citiesModal} setCitiesModal={setCitiesModal} />
    </>
  );
};

export default FadSearch;

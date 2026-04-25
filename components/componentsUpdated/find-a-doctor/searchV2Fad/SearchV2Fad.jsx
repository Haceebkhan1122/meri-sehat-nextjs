import React from 'react'
import styles from './searchV2Fad.module.scss';
import useMediaQuery from '@mui/material/useMediaQuery';

const SearchV2Fad = ({ setCompleteSearchModal, selectedCity, selectedCityCookie, setCitiesModal, citiesModal }) => {
    const isMobile = useMediaQuery('(max-width:767px)');

    return (
        <div className={`${styles.searchFad} searchFad`}>
            <div className={styles.location} onClick={() => setCitiesModal(true)}>
                <div className={styles.lef} onClick={() => setCitiesModal(true)} >
                    <span className={`${styles.locationPin} locationPin`}> </span>
                    <h4 style={{ wordSpacing: '-7px' }}>
                        <span className='locationArea'></span>
                        {selectedCity?.name || selectedCityCookie?.name || "Enter City"}
                    </h4>
                </div>
                <span className={styles.dropdownSvg}></span>
            </div>
            <div className={styles.wrape__search} onClick={() => setCompleteSearchModal(true)}>

                <input maxLength={50} type="text" placeholder={isMobile ? "Search for doctors, diseases, specialities..." : "Search for doctors, diseases, specialities..."} readOnly />
                <div className={`${styles.search_icon} search_icon`}>
                    <span className={`${styles.search_ico_svgg} search_ico_svgg`}> </span>
                </div>
            </div>
        </div>
    )
}

export default SearchV2Fad;

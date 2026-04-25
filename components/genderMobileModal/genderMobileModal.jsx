import React, { useEffect, useState } from 'react'
import styles from './genderMobileModal.module.scss';
import { Modal } from 'react-bootstrap';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import Slider from '@mui/material/Slider';
import RangeSlider from 'react-range-slider-input';
import DiseasesModalFAD from '../diseasesModalFAD/diseasesModalFAD'
const GenderMobileModal = ({ handleQuickTagsChange, handleDiseaseChange, specialityValue, diseaseValue, handleSpecialityChange, defaultMinValue, defaultMaxValue, maxFee, setMaxFee, setMinFee, minFee, quickFilters, appointmentType, gender, handleApplyTags, handleGenderChange, handleAppointmentTypeChange, sortDiseaseValue, sortSpecialityValue, showMobile, handleClose }) => {
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width:768px)');
    const [value, setValue] = useState([
        minFee !== undefined ? minFee : defaultMinValue,
        maxFee !== undefined ? maxFee : defaultMaxValue
    ]);

    useEffect(() => {
        // Update slider values when minFee or maxFee change (e.g., from an API call)
        setValue([
            minFee !== undefined ? minFee : defaultMinValue,
            maxFee !== undefined ? maxFee : defaultMaxValue
        ]);
    }, [minFee, maxFee, defaultMinValue, defaultMaxValue]);

    const handleChange = (newValue) => {
        // Update the value of the slider
        setValue(newValue);

        // Update minFee and maxFee with the new slider values
        setMinFee(newValue[0]);
        setMaxFee(newValue[1]);
    };

    function valuetext(value) {
        return `Rs.${value}`;
    }

    function formatText(text) {
        return text
            .split('-')                       // Split by dashes
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' ');                       // Join with spaces
    }

    return (
        <Modal centered show={showMobile} onHide={handleClose} className={`${styles.modalMobileFilter} modalMobileFilter`}>
            <Modal.Body>
                <span className={styles.close_icon} onClick={handleClose}>  </span>
                {isMobile &&
                    <div className={styles.header_top_mobile}>
                        <span className={styles.back__icon} onClick={handleClose}></span>
                        <div className={styles.heading_mobileNav}>
                            <span> Filter </span>
                        </div>
                    </div>
                }
                <div className={styles.wrapper}>
                    <h2> Filter </h2>
                    <div className={`${styles.wrapperScroll} wrapperScroll`}>
                        {/* ------------------------ quick tags --------------------- */}
                        <h3 className={styles.genderSpan}> Quick tags  </h3>
                        <div className={styles.genderWrapes}>
                            {quickFilters?.quick_tags?.length > 0 && quickFilters?.quick_tags?.map((item) => {
                                // Helper function to format router query values by replacing hyphens with spaces and capitalizing words
                                const formatQueryValue = (value) => {
                                    return value
                                        ?.split('-')
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(' ');
                                };

                                // Determine if the item should be active based on its tag and value
                                const isActive = item?.tag === "Speciality"
                                    ? (sortSpecialityValue !== ""
                                        ? sortSpecialityValue === item?.name
                                        : formatQueryValue(router?.query?.filter?.[1]) === item?.name)
                                    : (sortDiseaseValue !== ""
                                        ? sortDiseaseValue === item?.name
                                        : formatQueryValue(router?.query?.disease) === item?.name);

                                return (
                                    <div key={item?.name} className={`${styles.genderSingle} ${isActive ? styles.activeGender : ''}`}>
                                        <input
                                            id={item?.name}
                                            type="radio"
                                            name="gender-select"
                                            value={item?.name}
                                            checked={isActive}
                                            onChange={(event) => handleQuickTagsChange(event, item)}
                                        />
                                        <label htmlFor={item?.name}>{item?.name}</label>
                                    </div>
                                );
                            })}

                        </div>
                        <hr />

                        {/* ----------------------- Appointment type ----------------- */}
                        <h3 className={styles.genderSpan}> Appointment Type  </h3>
                        <div className={styles.genderWrapes}>
                            <div className={`${styles.genderSingle} ${appointmentType === 'in-person' ? styles.activeGender : styles.genderSingle}`}>
                                <input
                                    id="in-person"
                                    type="radio"
                                    name="gender-select"
                                    value="in-person"
                                    checked={appointmentType === 'in-person'}
                                    onChange={(event) => handleAppointmentTypeChange(event)}
                                />
                                <label htmlFor="in-person">In-person</label>
                            </div>
                            <div className={`${styles.genderSingle} ${appointmentType === 'schedule' ? styles.activeGender : styles.genderSingle}`}>
                                <input
                                    id="schedule"
                                    type="radio"
                                    name="gender-select"
                                    value="schedule"
                                    checked={appointmentType === 'schedule'}
                                    onChange={(event) => handleAppointmentTypeChange(event)}
                                />
                                <label htmlFor="schedule">Video call</label>
                            </div>
                        </div>
                        <hr />

                        {/* ------------------------- gender -------------------- */}

                        <h3 className={styles.genderSpan}> Gender  </h3>
                        <div className={styles.genderWrapes}>
                            <div className={`${styles.genderSingle} ${gender === 'male' ? styles.activeGender : styles.genderSingle}`}>
                                <input
                                    id="male"
                                    type="radio"
                                    name="gender-select"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={(event) => handleGenderChange(event)}
                                />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div className={`${styles.genderSingle} ${gender === 'female' ? styles.activeGender : styles.genderSingle}`}>
                                <input
                                    id="female"
                                    type="radio"
                                    name="gender-select"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={(event) => handleGenderChange(event)}
                                />
                                <label htmlFor="female">Female</label>
                            </div>

                            <div className={`${styles.genderSingle} ${gender === 'other' ? styles.activeGender : styles.genderSingle}`}>
                                <input
                                    id="other"
                                    type="radio"
                                    name="gender-select"
                                    value="other"
                                    checked={gender === 'other'}
                                    onChange={(event) => handleGenderChange(event)}
                                />
                                <label htmlFor="other">Any</label>
                            </div>
                        </div>
                        <hr />


                        {/* ---------------- price range -------------- */}
                        <div className={styles.wrapePriceTop}>
                            <h3 className={styles.genderSpan}>  Price Range  </h3>
                            <div className={styles.box_slider_price}>
                                <span>{`Rs.${Number(value[0]).toLocaleString()} - Rs.${Number(value[1]).toLocaleString()}`}</span>
                            </div>
                        </div>
                        <RangeSlider
                            min={defaultMinValue}
                            max={defaultMaxValue}
                            defaultValue={[minFee || defaultMinValue, maxFee || defaultMaxValue]}
                            value={value}
                            onInput={handleChange}
                            step={1}
                            ariaLabel="Price range"
                        />
                        <hr className={styles.hr_modal} />
                        <div className={styles.wrapeAllVals}>
                            <h3>  Filter by </h3>
                            <div className={styles.wrapeVal}>
                                <div className={styles.one}>
                                    <input
                                        type="checkbox"
                                        id='speciality'
                                        value="speciality"
                                        name='speciality'
                                        checked={(specialityValue ? specialityValue : sortSpecialityValue)}
                                        onChange={() => handleSpecialityChange()}
                                    />
                                    <label htmlFor="speciality">Speciality</label>
                                </div>
                                <div className={styles.two} >
                                    <span className={styles.textGreen}>
                                        {sortSpecialityValue && sortSpecialityValue !== "undefined"
                                            ? formatText(sortSpecialityValue)
                                            : router.query.filter[1]
                                                ? formatText(router.query.filter[1])
                                                : 'Any'}
                                    </span>
                                    <span className={styles.arrow}></span>
                                </div>
                            </div>
                            <div className={styles.wrapeVal}>
                                <div className={styles.one}>
                                    <input
                                        type="checkbox"
                                        id="disease"
                                        value="disease"
                                        name="disease"
                                        checked={(diseaseValue ? diseaseValue : sortDiseaseValue)}
                                        onChange={() => handleDiseaseChange()}
                                    />
                                    <label htmlFor="disease">Disease</label>
                                </div>
                                <div className={styles.two}>
                                    <span className={styles.textGreen}>
                                        {sortDiseaseValue && sortDiseaseValue !== "undefined"
                                            ? formatText(sortDiseaseValue)
                                            : router.query.disease
                                                ? formatText(router.query.disease)
                                                : 'Any'}
                                    </span>
                                    <span className={styles.arrow}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.wrape_btn}>
                    <button onClick={handleApplyTags}> Apply </button>
                </div>
                <div>
                    <DiseasesModalFAD />
                </div>
            </Modal.Body>
        </Modal >
    )
}

export default GenderMobileModal;

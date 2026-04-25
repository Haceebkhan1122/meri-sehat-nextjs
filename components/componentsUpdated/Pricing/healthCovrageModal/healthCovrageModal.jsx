import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import styles from './healthCovrageModal.module.scss'
import { isMobile } from 'react-device-detect';
import parse from 'html-react-parser';

function HealthCovrageModal({ showhealthCovrageModal, handleCloseHealth, healthInsuranceInformation }) {

    return (
        <>
            <Modal centered show={showhealthCovrageModal} onHide={handleCloseHealth} className={`${styles.showHealthModal} showHealthPkgModalNew  `} >
            {isMobile && <div className={styles.wraperBlurEffect} onClick={handleCloseHealth}></div>}
                <Modal.Body>
                    <span className='close__svg' onClick={handleCloseHealth}></span>
                    <div className="wraper">
                        <div className={styles.boxTop}>
                            <h4 >{healthInsuranceInformation?.title}  </h4>
                            <iframe src={healthInsuranceInformation?.video} title="Sehat Show | Seenay Ki Jalan, Instantly Ho Khatam | Episode# 02" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" data-gtm-yt-inspected-97936982_33="true" id="444427348" data-gtm-yt-inspected-7="true" data-gtm-yt-inspected-12="true" data-gtm-yt-inspected-17="true" class="frameBox"></iframe>
                        </div>
                        <div className={`${styles.desc}  `}>
                            {healthInsuranceInformation?.description && parse(healthInsuranceInformation?.description)}
                        </div>
                    </div>
                    <div className={`${styles.mobileWraperBottomBtn} mobileWraperBottomBtn`}>
                        <button onClick={handleCloseHealth}> DONE </button>
                    </div>
                </Modal.Body>
            </Modal >
        </>
    )
}

export default HealthCovrageModal;

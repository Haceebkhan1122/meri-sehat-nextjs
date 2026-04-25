import React from 'react'
import { Modal } from 'react-bootstrap';
import styles from './vitalScan.module.scss'
import { isMobile } from 'react-device-detect';
import close from '../../../../public/svg/newPages/close.svg'
import Image from 'next/image';
import parse from 'html-react-parser';

function VitalScanModal({ showVitalScan, handleCloseVital, vitalInformation }) {

    return (
        <>
            <Modal centered show={showVitalScan} onHide={handleCloseVital} className={`${styles.showVitalModal} showVitalPkgModalNew `} >
                {isMobile && <div className={styles.wraperBlurEffect} onClick={handleCloseVital}></div>}
                <Modal.Header>
                    <div className='closeItem'>
                        <Image src={close} width={25} onClick={handleCloseVital} height={25} />
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className={`${styles.wholeContainerVitals}`}>
                        <div className='headingVitalScan'>
                            <h4>{vitalInformation?.title}</h4>
                        </div>
                        <div className={`${styles.paragraphVitalScan}`} >
                            {vitalInformation?.description && parse(vitalInformation?.description)}
                            <div className={`${styles.btnVitalScan}  `} >
                                <button onClick={handleCloseVital} className=''>DONE</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal >
        </>
    )
}

export default VitalScanModal;

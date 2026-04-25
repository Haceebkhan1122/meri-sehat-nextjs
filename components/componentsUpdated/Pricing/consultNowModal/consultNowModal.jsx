import React from 'react'
import { Modal } from 'react-bootstrap';
import styles from './consultNow.module.scss'
import { isMobile } from 'react-device-detect';
import close from '../../../../public/svg/newPages/close.svg'
import Image from 'next/image';
import parse from 'html-react-parser';

function ConsultNowModal({ consultNowModal, handleCloseConsultNow, consultNowInformation }) {

    return (
        <>
            <Modal centered show={consultNowModal} onHide={handleCloseConsultNow} className={`${styles.showVitalModal} showVitalPkgModalNew `} >
                {isMobile && <div className={styles.wraperBlurEffect} onClick={handleCloseConsultNow}></div>}
                <Modal.Header>
                    <div className='closeItem'>
                        <Image src={close} width={25} onClick={handleCloseConsultNow} height={25} />
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className={`${styles.wholeContainerVitals}`}>
                        <div className='headingVitalScan'>
                            <h4>{consultNowInformation?.title}</h4>
                        </div>
                        <div className={`${styles.paragraphVitalScan}`} >
                            {consultNowInformation?.description && parse(consultNowInformation?.description)}
                            <div className={`${styles.btnVitalScan}  `} >
                                <button onClick={handleCloseConsultNow} className=''>DONE</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal >
        </>
    )
}

export default ConsultNowModal;

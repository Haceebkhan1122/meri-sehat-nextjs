import React from 'react'
import styles from './QRModal.module.css';
import visaSvg from '../../../public/png/qr_code.png'
import AambulatoryQrcode from '../../../public/png/qr_code_ambulatory.png'
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';

const QRModal = ({ qRModalIsShow, setQRModalIsShow, pageName }) => {

    const handleCardClose = () => {
        setQRModalIsShow(false)
    };

    return (
        <>
            <Modal centered show={qRModalIsShow} onHide={handleCardClose} className='qrCodeModal'>
                <Modal.Body>
                    <div className={styles.closeBtn} onClick={handleCardClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M8 0.805714L7.19429 0L4 3.19429L0.805714 0L0 0.805714L3.19429 4L0 7.19429L0.805714 8L4 4.80571L7.19429 8L8 7.19429L4.80571 4L8 0.805714Z" fill="#313131" />
                        </svg>
                    </div>
                    {pageName == "ambulatory" ? (
                        <>
                            <h3 className={styles.cardModalTitle}>24/7 Ambulatory Services </h3>
                            <p className={styles.cardModalDesc}>Download our application to access our customer support.</p>
                            <div className={styles.imageParent}>
                                <Image className={styles.qrImage} src={AambulatoryQrcode} alt="QR Code" />
                            </div>
                        </>
                    ) : pageName == "at-home" ? (
                        <>
                            <h3 className={styles.cardModalTitle}>Caring & competent nurses at your home 24/7</h3>
                            <p className={styles.cardModalDesc}>Download our application to access our customer support.</p>
                            <div className={styles.imageParent}>
                                <Image className={styles.qrImage} src={AambulatoryQrcode} alt="QR Code" />
                            </div>
                        </>
                    ) : (
                        <>
                            <h3 className={styles.cardModalTitle}>Vital Scan</h3>
                            <p className={styles.cardModalDesc}>Our vital scan technology is only available on mobile devices. Scan the QR code with your phone to begin.</p>
                            <div className={styles.imageParent}>
                                <Image className={styles.qrImage} src={visaSvg} alt="QR Code" />
                            </div>
                        </>
                    )}

                    <button className={styles.roundedBlueBtn} onClick={handleCardClose}>OKAY</button>
                </Modal.Body>

            </Modal>

        </>
    )
}

export default QRModal
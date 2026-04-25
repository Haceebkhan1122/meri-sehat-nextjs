import React from 'react'
import Cross from '../../public/svg/cancelbtn.svg';
import VitalScan from '../../public/svg/vitalSehatScan.svg';
import Image from "next/image";
import Modal from 'react-bootstrap/Modal';

const VitalScanModal = ({ handleVitalScanClose, vitalScan }) => {
    return (
        <Modal show={vitalScan} onHide={handleVitalScanClose} centered backdrop="static" className="vital-scan-modal">
            <Modal.Body>
                <h4>Vital Scan</h4>
                <Image src={Cross} alt="" onClick={handleVitalScanClose} className='cross-btn' />
                <p>Our vital scan technology is only available on mobile devices. Scan the QR code with your phone to begin.</p>
                <Image src={VitalScan} alt="" className='vital-scan' />
                <button type="button" className="btn_container fs-16 viewDoctorBtn text-uppercase fw-700">
                    okay
                </button>
            </Modal.Body>
        </Modal>
    )
}

export default VitalScanModal
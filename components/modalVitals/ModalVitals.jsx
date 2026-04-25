import React from 'react'
import { Modal } from 'react-bootstrap'
import styles from './modalVitals.module.scss';

const ModalVitals = ({ showVitals, handleClose }) => {
    return (
        <Modal centered show={showVitals} onHide={handleClose} className={`${styles.vitalsModal} vitalsModal`}>
            <span className={styles.cross_icon_vitals} onClick={handleClose}> </span>
            <Modal.Body>
                <div className={styles.wraping}>
                <h3> Vital Scan </h3>
                <p>  Users are limited to a maximum of 10 scans <br />per day. </p>
                <p>This stands regardless of any package that has been bought by the (‘User”).</p>

                <p>Each use is defined as a completed “Vital <br /> Scan” that gives you visible results. Users <br /> exceeding the Usage Limit may experience <br /> restrictions or limitations on their access to <br /> the App. </p>   
                    
                <p>Read more about our <span onClick={() => window.location.href = '/fair-use-policy'}  style={{color:'#19B3B5', fontWeight:"500", borderBottom:"1px solid #19B3B5", cursor:"pointer"}}   className={`${styles.cursorPointer}`}> Fair use policy </span> </p>
                    
                <button className={styles.DoneBtn} onClick={handleClose}>Done</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalVitals;

import React, { useState } from 'react'
import styles from './appointmentModal.module.scss';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';

const AppointmentModal = ({ setListenerForChangeClinic, handleBoxSelect, show, handleClose, doctorData, filteredId }) => {

    return (
        <Modal centered show={show} onHide={handleClose} className={`${styles.appointModal} appointModal`}>
            <span className={styles.cross_icon} onClick={handleClose}> </span>
            <Modal.Body>
                <div className={styles.wraper_appoint}>
                    <h1>Appointment Type</h1>
                    {doctorData?.doctor_clinics?.filter((i) => i?.is_physical == false)?.map((item) => {
                        return (
                            <>
                                <div
                                    className={`${styles.hospital_card} ${filteredId?.id == item?.id ? styles.selected : ''}  `}
                                    onClick={() => handleBoxSelect('video', item?.id)}
                                >
                                    <Image width={40} height={40} src={item?.icon || ''} alt="" />
                                    <div className={styles.info_ri_hos}>
                                        <h3>{item?.name}</h3>
                                        <span>{item?.is_physical ? 'Physical' : 'Online'}</span>
                                    </div>
                                    <div className={styles.right_end}>
                                        <h3>Rs.{item?.consultation_fee}</h3>
                                        <span className={styles.arrow_right_hos}></span>
                                    </div>
                                </div>
                            </>
                        )
                    })}

                    <hr />

                    <h3>In-person</h3>

                    {/* In-person Boxes */}
                    <div className={`${styles.scroller_for_height} scroller_for_height`}>
                        {doctorData?.doctor_clinics?.filter((i) => i?.is_physical == true)?.map((clinics, index) => (
                            <div
                                key={index}
                                className={`${styles.hospital_card} ${filteredId?.id == clinics?.id ? styles.selected : ' '}`}
                                onClick={() => handleBoxSelect('in_person', clinics.id)}
                            >
                                <Image width={40} height={40} src={clinics?.icon || ''} alt="" />
                                <div className={styles.info_ri_hos}>
                                    <h3>{clinics.name}</h3>
                                    <span>{clinics?.clinic_address}</span> 

                                </div>
                                <div className={styles.right_end}>
                                    <h3>Rs.{clinics?.consultation_fee}</h3>
                                    <span className={styles.arrow_right_hos}></span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.bottomBarBtn}>
                        <button onClick={() => setListenerForChangeClinic(true)}>DONE</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AppointmentModal
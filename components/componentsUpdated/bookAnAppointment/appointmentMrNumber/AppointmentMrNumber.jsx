import React, { useEffect, useState } from 'react'
import styles from './appointmentMrNumber.module.scss';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';
import NewPatientModal from '../newPatientModal/newPatientModal';

const AppointmentMrNumber = ({ addMeAsANewMember,
    selectedMrNumberId,
    setSelectedMrNumberId,
    mrNumbersListing,
    filteredId,
    handleClose,
    show,
    newMemberModal,
    setNewMemberModal,
    patientName,
    setPatientName,
    setShow,
    handleCloseNewPatient}) => {

    const handleNameModal = () => {
        handleClose()
        setNewMemberModal(true)
    }

    return (
        <>
        <Modal centered show={show} onHide={handleClose} className={`${styles.appointModal} appointModal`}>
            <span className={styles.cross_icon} onClick={()=> setShow(false)}> </span>
            <Modal.Body>

                <div className={styles.wraper_appoint}>
                    <div className={styles.infoIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                            <path d="M20.0086 13.5847L16.9899 13.5847L16.9899 10.5659L20.0086 10.5659L20.0086 13.5847ZM20.0086 25.6597L16.9899 25.6597L16.9899 16.6034L20.0086 16.6034L20.0086 25.6597ZM18.5144 33.2065C26.8461 33.2065 33.593 26.4445 33.593 18.1128C33.593 9.78104 26.8461 3.01904 18.5144 3.01904C10.1675 3.01904 3.40552 9.78104 3.40552 18.1128C3.40552 26.4445 10.1675 33.2065 18.5144 33.2065ZM18.4993 6.03779C25.1707 6.03779 30.5743 11.4414 30.5743 18.1128C30.5743 24.7842 25.1707 30.1878 18.4993 30.1878C11.8278 30.1878 6.42427 24.7842 6.42427 18.1128C6.42427 11.4414 11.8278 6.03779 18.4993 6.03779Z" fill="#FE8D74" />
                        </svg>
                        <p>We found the following MR numbers linked to this clinic and associated with your contact number. Please confirm for whom you would like to book an appointment.</p>
                    </div>
                    <div className={`${styles.hospital_card}`} >
                        <Image width={40} height={40} src={filteredId?.icon || ''} alt="" />
                        <div className={styles.info_ri_hos}>
                            <h3>{filteredId?.name}</h3>
                            <span>{filteredId?.is_physical ? 'Physical' : 'Online'}</span>
                        </div>
                        <div className={styles.right_end}>
                            <h3>Rs.{filteredId?.consultation_fee}</h3>
                            <span className={styles.arrow_right_hos}></span>
                        </div>
                    </div>
                    <hr />
                    <h3>MR Numbers</h3>
                    {/* In-person Boxes */}
                    <div className={styles.radioWrapper}>
                        {mrNumbersListing?.list?.map((item) => {
                            return (
                                <div key={item?.id} className={selectedMrNumberId === item?.id ? `${styles.radioMrNumber} ${styles.chkedWrape}` : styles.radioMrNumber }>
                                    <label htmlFor={`${item?.id}`}>MR {item?.mr_no} | {item?.name}</label>
                                    <input
                                        type="radio"
                                        id={`${item?.id}`}
                                        name="date"
                                        value={`${item?.id}`}
                                        // checked={selectedMrNumberId === item?.id}
                                        onChange={() => setSelectedMrNumberId(item?.id)}
                                        />
                                    <span></span>
                                </div>
                            )
                        })}
                        <div className={`${styles.radioMrNumber}`}>
                            <label htmlFor={'newmember'}>Add me as a new member</label>
                            <input
                                type="radio"
                                id={'newmember'}
                                name="date"
                                value={`newmember`}
                                onChange={() => setSelectedMrNumberId("newmember")}
                            />
                            <span></span>
                        </div>
                    </div>
                    <div className={styles.bottomBarBtn}>
                        <button onClick={() => selectedMrNumberId == "newmember" ? handleNameModal() : setShow(false)}>DONE</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        <NewPatientModal handleCloseNewPatient={handleCloseNewPatient} addMeAsANewMember={addMeAsANewMember} patientName={patientName} setPatientName={setPatientName} setNewMemberModal={setNewMemberModal} newMemberModal={newMemberModal} />
        </>
  

    )
}

export default AppointmentMrNumber


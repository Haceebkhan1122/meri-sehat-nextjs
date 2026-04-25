import React from 'react'
import { Modal } from 'react-bootstrap';
import Image from 'next/image';
import styles from './newPatientModal.module.scss';
import circle from '../../../../public/svg/newPages/accountcircle.svg'

const NewPatientModal = ({
  newMemberModal,
  patientName,
  setPatientName,
  addMeAsANewMember,
  handleCloseNewPatient  }) => {

  const handleName = (e) => {
    const value = e.target.value;
    setPatientName(value)
  }

  return (
    <Modal centered show={newMemberModal} onHide={handleCloseNewPatient} className={`${styles.NewMrModal} NewMrModal`}>
      <span className={styles.cross_icon} onClick={handleCloseNewPatient}> </span>
      <Modal.Body>
        <div className={`${styles.mainBody}`}>
          <div className={`${styles.Member}`}>
            <h4>New Member</h4>
          </div>
          <div className={`${styles.patientHeading}`}>
            <p>Patient Name</p>
          </div>
          <div className={`${styles.inputContainer}`}>
            <Image height={35} width={35} src={circle} alt="circle" className="mr-3 input-icon" />
            <input
              type="text"
              onChange={(e) => handleName(e)}
              value={patientName}
              className={`${styles.inputField}`}
              placeholder="Enter Name"
              maxLength={50}
            />
          </div>
          <div onClick={addMeAsANewMember} className={`${styles.doneButton}`}>
            OKAY
          </div>
        </div>

      </Modal.Body>
    </Modal>
  )
}

export default NewPatientModal
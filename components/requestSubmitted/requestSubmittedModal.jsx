import React from 'react'
import { Modal } from 'react-bootstrap';
import styles from './requestSubmittedModal.module.scss';

const RequestSubmittedModal = ({setRequestShow,requestShow,handleClose,requestData}) => {
    return (
        <div>
             <Modal centered show={requestShow} onHide={handleClose} className={`${styles.modalSubmittedReq} modalSubmittedReq`}>
                <div className={styles.wrappingReqSubmit}>
                    <span className={styles.tickSvggg}>  </span>
                    <h3> Request Submitted </h3>
                    <p>Thank you for your request. Our team is now working to
                        schedule your appointment with the doctor.  </p>
                    <p className={styles.greenOverlay}>
                        We will contact you shortly to confirm the date and time. </p>
                    <h4> Request ID: <span className={styles.numReq}>{requestData?.id} </span>  </h4>
                    <button onClick={handleClose} > OKAY  </button>
                    <p className={styles.queryyText}> For help or queries, call us at <span className={styles.bluequeryyText}><a href="tel:021-111-111-111">(021)-111-111-111</a> </span> </p>
                </div>
            </Modal>
        </div>
    )
}

export default RequestSubmittedModal;
import styles from './modalSubscription.module.css';
import { Modal } from 'react-bootstrap';
import Cross from '../../../public/svg/cross_icon_modal.svg';
import Image from 'next/image';
import { useState } from 'react';
import { APIV3 } from '@/utils/httpService';
import Loader from '../../customLoader/Loader'

const SubscriptionModal = ({ show, setShow, handleClose, cancelReasonHandle }) => {
  const [cancelReasonError, setCancelReasonError] = useState(false);
  const [cancelReasonLoading, setCancelReasonLoading] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  async function cancelReasonHandler(e) {
    e.preventDefault();
    setCancelReasonError('');
    let payload = {};
    if (cancelReason) {
      payload.reason = cancelReason;
    }
    try {
      setIsLoading(true);
      setCancelReasonLoading(true);
      const response = await APIV3.post('/cancel-subscription', payload);
      if (response?.status == 200) {
        setCancelReasonLoading(false);
        setShow(false);
        setIsLoading(false);
        window.location.reload();
      } else {
        setCancelReasonError(response?.data?.message);
        setIsLoading(false);
      }
    } catch (error) {
      setCancelReasonError(error?.response?.data?.data?.message || error?.data?.message);
      setIsLoading(false);
    } finally {
      setCancelReasonLoading(false);
      setIsLoading(false);
    }
  }
 
  return (
    <>
      
      {cancelReasonLoading && <Loader />}
      <Modal centered={true} show={show} onHide={handleClose} className={`${styles.modalContentttt} modal-contentttt`}   >
      {isLoading && <Loader />}
        <Modal.Body className={styles.modalSubs}>
          <div className={styles.crossWrapper}>
            <Image src={Cross} alt='cross-icon' className={styles.crossIconModal} onClick={handleClose} />
          </div>
          <div className={styles.wrapeHeading}>
            <h3 className={styles.titlModal}> Are you sure you want to cancel <br /> this subscription? </h3>
            <p className={styles.descModal}> Let us know how we can improve our service to better cater to your needs. </p>
          </div>
          <div className={styles.modalTextareaCenter}>
            <textarea onChange={(e) => setCancelReason(e.target.value)} draggable="false" resize="none" cols="30" rows="10" maxLength={50} className={styles.textAreaModal} placeholder='Details' />
            {cancelReasonError && (
              <p className="text-danger errorSubscCancel"> {cancelReasonError}  </p>
            )}</div>
          <div className={styles.btnsWrapperSubs}>
            <button onClick={cancelReasonHandler} className={styles.noSubs}> Yes </button>
            <button onClick={handleClose} className={styles.yesSubs}> No </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SubscriptionModal;

import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import Image from 'next/image';
import calender from '../../public/svg/calender_moal.svg'
import time from '../../public/svg/time_modal.svg'
import wallet from '../../public/svg/wallet_modal.svg'
import cash from '../../public/svg/wallet_walt_modal.svg'
import styles from './topupBalanceLimitModal.module.css';

const TopupBalanceLimitModal = ({show, handleClose }) => {
    return (
        <Modal centered show={show} onHide={handleClose} className={`${styles.topUpModal} topUpBalanceModal`}>
        <Modal.Body>
            <div className={styles.cross}>
                <span className={styles.crossSvg} onClick={handleClose}> </span>
            </div>
            <div className={styles.wrapperLimit}>
                <h3> MeriSehat balance Limit  </h3>
                <p> Your MeriSehat balance is limited to PKR 20,000 only and cannot exceed at any given point in time.  </p>
                <button onClick={handleClose}> Okay </button>
            </div>
        </Modal.Body>
      </Modal>
    )
}

export default TopupBalanceLimitModal;

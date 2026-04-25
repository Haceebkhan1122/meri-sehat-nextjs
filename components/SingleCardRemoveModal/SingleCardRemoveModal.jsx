import React from 'react'
import styles from './SingleCardRemoveModal.module.css';
import closeBtn from '../../public/svg/closeBtn.svg'
import visaSvg from '../../public/svg/visa_svg.svg'
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';

const SingleCardRemoveModal = ({ singleSavedCardShow, handleSingleCardClose, singleCardDetail, handleRemoveCard }) => {

    return (
        <>
            <Modal centered show={singleSavedCardShow} onHide={handleSingleCardClose} className='singleCardRemoveModal'>

                <Modal.Body>
                    <div className={styles.closeBtn} onClick={handleSingleCardClose}>
                        <Image src={closeBtn} alt="labImage" width={16} height={16} />
                    </div>
                    <div className={styles.singleCardParent}>
                        <p className={styles.singleCardModalText}>Are you sure you want to remove this card?</p>
                        <div className={styles.SinglecardTopUp}>
                            <div className={styles.inptWrapperSingle}>
                                <input
                                    type="radio"
                                    name='top-up'
                                    className={styles.checkboxTopup}

                                />
                                <label className={styles.checkboxTopupSavedSpa}>
                                    {singleCardDetail.card_number}
                                </label>
                            </div>
                            <div className={styles.iconsWrapperTopup}>
                                <Image src={visaSvg} alt='icons' className={styles.masterCardSvg} />
                            </div>
                        </div>
                        <button style={{ border: '1px solid #EB0015 !important' }} className={styles.removeSingleCard} onClick={() => handleRemoveCard(singleCardDetail?.id)}>Remove Card</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SingleCardRemoveModal
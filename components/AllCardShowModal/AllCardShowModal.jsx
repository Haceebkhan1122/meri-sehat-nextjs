import React, { useState } from 'react'
import styles from './AllCardShowModal.module.css';
import closeBtn from '../../public/svg/closeBtn.svg'
import visaSvg from '../../public/svg/visa_svg.svg'
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';
import SingleCardRemoveModal from '../SingleCardRemoveModal/SingleCardRemoveModal';

const AllCardShowModal = ({ handleRemoveCard, handleCardClose, allSavedCardShow, getListSavedCards, selectedVal }) => {
    const [singleSavedCardShow, setSingleSavedCardShow] = useState(false);
    const [singleCardDetail, setSingleCardDetail] = useState([])

    const handleSingleCardClose = () => setSingleSavedCardShow(false);

    const handleSingleCardShow = (details) => {
        setSingleSavedCardShow(true)
        setSingleCardDetail(details)
        handleCardClose()
    };

    return (
        <>
            <Modal centered show={allSavedCardShow} onHide={handleCardClose} className='allCardShowModal'>

                <Modal.Body>
                    <div className={styles.closeBtn} onClick={handleCardClose}>
                        <Image src={closeBtn} alt="labImage" width={16} height={16} />
                    </div>

                    <h3 className={styles.cardModalTitle}>All Cards</h3>
                    <div className={styles.cardSaveStateModal}>
                        {getListSavedCards?.length > 0 && getListSavedCards?.map((item) => (
                            <>
                                <div className={selectedVal == item?.id ? `${styles.activeChecked} ${styles.inptWrapperChecked} ${styles.allCardShowModal}` : styles.allCardShowModal}>
                                    <div className={styles.inptWrapper}>
                                        <input
                                            id={item?.id}
                                            type="radio"
                                            name='top-up'
                                            className={styles.checkboxTopup}
                                            value={item?.id}
                                            onChange={() => handleSelected(item)}
                                            defaultChecked={selectedVal === item?.id}
                                        />
                                        <label htmlFor={item?.id} className={styles.checkboxTopupSavedSpa}>
                                            {item?.card_number}
                                        </label>
                                        <span className={styles.editIcon} onClick={() => handleSingleCardShow(item)}></span>
                                    </div>
                                    <div className={styles.iconsWrapperTopup}>
                                        <Image src={visaSvg} alt='icons' width={41} height={23} />
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </Modal.Body>

            </Modal>

            <SingleCardRemoveModal handleRemoveCard={handleRemoveCard} singleSavedCardShow={singleSavedCardShow} handleSingleCardClose={handleSingleCardClose} singleCardDetail={singleCardDetail} handleCardClose={handleCardClose} />
        </>
    )
}

export default AllCardShowModal
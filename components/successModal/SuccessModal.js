/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
// import i18n from '../../../i18n';
import { SectionHeadingMed } from '../SectionHeadingMed';
// import './successModal.css';
import Image from 'next/image';

function SuccessModal(props) {
    const { show, close } = props;

    return (
        <Modal
            show={show}
            className="modalLayout successModal"
            onHide={close}
            centered
            aria-labelledby="containoded-mal-title-vcenter"
        >
            <Modal.Body>
                <div className="content2">
                    <div>
                        <Image
                            src='/svg/green_tick.svg'
                            alt="green check"
                        />
                    </div>

                    <SectionHeadingMed
                        text={i18n.t('newsletter_thanks')}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default SuccessModal;

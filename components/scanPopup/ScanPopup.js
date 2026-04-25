/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Modal } from 'react-bootstrap';
import SectionHeadingMed from '../SectionHeadingMed/SectionHeadingMed';
import closeIcon from '../../public/svg/modal-close.svg'
// import QRCode from '../../public/png/app_QR_code.png'
// import AppStore from '../../public/png/AppStore.png'
// import PlayStore from '../../public/png/PlayStore.png'
import Image from 'next/image';


function ScanPopup(props) {
  const { show, close } = props;

  function closeModal() {
    close(false);
  }

  return (
    <Modal
      show={show}
      className="modalLayout scanPopup"
      onHide={close}
      centered
      aria-labelledby="containoded-mal-title-vcenter"
    >
      <Modal.Body>
        <div className="content">
          <button type="button" className="modalCloseBtn" onClick={closeModal}>
            <Image src={closeIcon} alt="closeIcon" />
          </button>
          <div className="btnsContainer">
            <SectionHeadingMed
              // text={i18n.t('scan_qr')}
              text="Scan QR Code"
            />
            <div>
              <Image
                src='../../public/png/app_QR_code.png'
                alt="QR code"
              />
            </div>
          </div>
          <h3
            className="grey_text"
          >
            {/* {i18n.t('or')} */}
            Or
          </h3>
          <div className="btnsContainer">
            <h3
              className="pink_text"
            >
              {/* {i18n.t('download_mob_app')} */}
              Download Mobile App
            </h3>
            <div className="btnsContainer third">
              <Image
                src='../../public/png/AppStore.png'
                alt="App Store"
              />

              <Image
                src='../../public/png/PlayStore.png'
                alt="Play Store"
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ScanPopup;

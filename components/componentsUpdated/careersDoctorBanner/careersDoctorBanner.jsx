import React from 'react'
import { Col, Row } from 'react-bootstrap'
import styles from './careersDoctorBanner.module.scss';
import careerBanner from '../../../public/png/new-images/careerBanner.png'
import Image from 'next/image';
import greenIcon from "../../../public/svg/newPages/greenIcon.svg";
import redVector from "../../../public/svg/newPages/redVector.svg";

const careersDoctorBanner = () => {
  return (
     <section className={styles.banner}>
      <div className={styles.yellowStrip}></div>

      <div className={styles.content}>
        <h2>Are you a doctor?</h2>
        <p>
          Register on Meri Sehat today and reach patients all across Pakistan.
        </p>
      </div>
      
      <div className={styles.imageBox}>
        <div className={styles.greenIcon}>
          <Image src={greenIcon} alt="Green Shape" fill priority />
        </div>
        <div className={styles.redIcon}>
          <Image src={redVector} alt="Red Shape" fill priority />
        </div>
        <div className={styles.careerBanner}>
          <Image src={careerBanner} alt="Doctors" fill priority />
        </div>
      </div>
    </section>
  )
}

export default careersDoctorBanner
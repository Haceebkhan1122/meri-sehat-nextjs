import React from 'react'
import styles from './bottom-doctor-pamfh.module.css';
import ContainerWrapperFindDoc from '../container-wrapper-find-doc/container-wrapper-find-doc';
import pamph from "../../public/svg/bottom-pamph-img.svg";
import Image from 'next/image';

const BottomDoctorPamfh = () => {
    return (
        <ContainerWrapperFindDoc>
            <div className={styles.wraperAll}>
                <div className={styles.wraper}>
                    <div className={styles.leftPamph}>
                        <div className={styles.imgWrapper}>
                            <Image width={20} height={20} src={pamph} alt="" className={styles.leftPamphImg} />
                        </div>
                    </div>
                    <div className={styles.middlePamph}>
                        <span className={styles.areDoc}> Are you a doctor? </span>
                        <span className={styles.joinDoc}> Join our platform today </span>
                    </div>
                    <div className={styles.rightPamph}>
                        <a href='https://dr.merisehat.pk/login' target='blank' className={styles.registerBtnRight}> Register </a>
                    </div>
                </div>
            </div>
        </ContainerWrapperFindDoc>
    )
}

export default BottomDoctorPamfh;

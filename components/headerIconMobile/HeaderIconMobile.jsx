import React from 'react'
import styles from './headerIcon.module.css';
import { useRouter } from 'next/router';

const HeaderIconMobile = ({title}) => {
    const router = useRouter()

  return (
    <div className={styles.wrapperHeaderIcon}>
        <span className={styles.arrowBackIconHeader}  onClick={() => router.back()}>  </span>
        <div className={styles.wrapetext}><h3 className={styles.titling}> {title} </h3></div>
    </div>
  )
}

export default HeaderIconMobile;

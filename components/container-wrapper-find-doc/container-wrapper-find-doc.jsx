import React from 'react'
import styles from './container-wrapper-find-doc.module.css';


const ContainerWrapperFindDoc = ({ children }) => {
    return (
        <div className={styles.contain}>
            <div className={styles.containInner}>
                {children}
            </div>
        </div>
    )
}

export default ContainerWrapperFindDoc;

import React from 'react'
import styles from './wrapperAllContainerWallet.module.css';

const WrapperContainerWallet = ({ children }) => {
    return (
        <div className={styles.wrapperAllAligned}>
            {children}
        </div>
    )
}

export default WrapperContainerWallet;

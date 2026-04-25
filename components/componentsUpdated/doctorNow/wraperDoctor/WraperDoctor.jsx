import React from 'react';
import styles from './wraper.module.scss';

const WraperDoctor = ({children}) => {
    return (
        <div className={styles.wraper__main}>
            {children}
        </div>
    )
}

export default WraperDoctor;

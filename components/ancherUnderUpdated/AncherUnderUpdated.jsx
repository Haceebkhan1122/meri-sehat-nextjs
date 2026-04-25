import React from 'react'
import styles from './ancherUpdated.module.scss';

const AncherUnderUpdated = ({ text, href }) => {
    return (
        <a href={href} className={`${styles.readmoreUnder} readmoreUnder`}>
            <span className={`${styles.arrow_ancher} arrow_ancher`}> </span>
            {text}
        </a>
    )
}

export default AncherUnderUpdated;

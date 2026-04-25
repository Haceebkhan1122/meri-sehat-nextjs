import React from 'react'
import styles from "./leftBox.module.scss"
import HeadVideo from '../../../../components/componentsUpdated/corporate-wellness-workshop-detail/leftBox/headVideo/HeadVideo';
import Highlight from '../../../../components/componentsUpdated/corporate-wellness-workshop-detail/leftBox/highlits/Highlits';
import Endorsed from '../../../componentsUpdated/homePage/endorsed/Endorsed'
export default function LeftBox({ workshop }) {
    return (
        <>
            <div className={`${styles.bgBox}`}>
                <HeadVideo workshop={workshop} />
                <Endorsed workshop={workshop} />
                <Highlight workshop={workshop} />
            </div></>
    )
}

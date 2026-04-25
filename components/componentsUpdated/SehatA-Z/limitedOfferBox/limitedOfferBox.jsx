import React from 'react'
import styles from './limitedOfferBox.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';


function limitedOfferBox({ widgetData }) {
    return (
        <>
            <Link href={widgetData?.redirect_url || "/"}>
                <div className={`${styles.slide_limited_offer} limitedOfferwidthBox`} style={{ backgroundColor: widgetData?.card_1_color }}>
                    <div className={styles.left__info}>
                        <div className={styles.chip} style={{ backgroundColor: widgetData?.card_1_inner_color }}>
                            {widgetData?.button_text}
                        </div>
                        <h2> {widgetData?.heading} </h2>
                        <p>{widgetData?.description}</p>

                    </div>
                    <div className={styles.right__info}>
                        <Image width={158} height={155} src={widgetData?.image} alt='' className={`${styles.img_right} img-fluid`} />
                    </div>
                </div>
            </Link>
        </>
    )
}

export default limitedOfferBox
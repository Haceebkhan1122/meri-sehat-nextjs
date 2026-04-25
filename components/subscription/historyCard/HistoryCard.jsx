import React, { useState } from 'react'
import styles from './historyCard.module.css';
import { Card } from 'react-bootstrap';

const HistoryCard = ({userDetails}) => {

    return (
        <div className={` ${styles.historyWRapperSubscription} d-block historyWRapperSubscription `}>
            {userDetails?.user?.subscription_history.map((items) => (
                <Card className={styles.cardSlidesPackages}>
                <div className={styles.padClass}>
                    <Card.Header className={styles.cardHeaderHistory}>
                    <div className={styles.historyWraper}>
                        <h3 className={styles.wrapeHeadHistory}> {items?.package?.name}</h3>
                        <span className={styles.smallParaHistory}> {items?.is_yearly === 1 ? 'Yearly' : 'Monthly'} Plan </span>
                    </div>
                    <h3 className={styles.priceHistory}>PKR {items?.is_yearly === 1 ? items?.package?.price_yearly?.toLocaleString('en-IN') : items?.package?.price?.toLocaleString('en-IN')}</h3>
                    </Card.Header>
                </div>
                <Card.Body className={styles.cardBodyPackage}>
                    <div className={styles.historyWraperPara}>
                        <p className={styles.firstHistory}> Start Date </p>
                        <p className={styles.secondHistory}> {items?.formated_start_date} </p>
                    </div>
                    <div className={styles.historyWraperPara}>
                        <p className={styles.firstHistory}> Expiry Date </p>
                        <p className={styles.secondHistory}> {items?.formated_end_date}</p>
                    </div>
                </Card.Body>
            </Card>
            ))}
        </div>
    )
}

export default HistoryCard;

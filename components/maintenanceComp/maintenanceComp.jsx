import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './maintenanceComp.module.scss';

const MaintenanceComp = ({ maintenanceData }) => {
    const [timeData, setTimeData] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        let intervalId;

        // Function to calculate time left
        const calculateTimeLeft = (time) => {
            const days = Math.floor(time / (1000 * 60 * 60 * 24));
            const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((time % (1000 * 60)) / 1000);

            return { days, hours, minutes, seconds };
        };

        if (maintenanceData?.maintenance_time > 0) {
            let timeLeft = maintenanceData?.maintenance_time;

            // Set initial time data
            setTimeData(calculateTimeLeft(timeLeft));

            // Create interval to update every second
            intervalId = setInterval(() => {
                timeLeft -= 1000; // Decrease time by 1 second (1000 ms)
                if (timeLeft <= 0) {
                    clearInterval(intervalId); // Stop the countdown at 0
                    setTimeData({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                } else {
                    setTimeData(calculateTimeLeft(timeLeft));
                }
            }, 1000);
        }

        // Cleanup interval when component unmounts
        return () => clearInterval(intervalId);
    }, [maintenanceData]);

    return (
        <section className={styles.maintenanceWraper}>
            <Container className='h-100'>
                <Row className='h-100'>
                    <Col lg={6} xs={12} className={`${styles.coling_lfff} my-auto`}>
                        <Image src={maintenanceData?.image} width={636} height={581} alt='' className={`${styles.imgMaintenance} img-fluid`} />
                    </Col>
                    <Col lg={6} xs={12} className={`${styles.coling_rf} my-auto`}>
                        <div className={styles.wraper_right_info}>
                            <h1> {maintenanceData?.title} </h1>
                            <span> {maintenanceData?.description} </span>
                            <div className={styles.timeWraper}>
                                <div className={styles.singleRoww}>
                                    <div className={styles.single}>
                                        <div className={styles.boxTime}>
                                            <span>{String(timeData.days).padStart(2, '0')}</span>
                                        </div>
                                        <span className={styles.timeHeadSpan}>Days</span>
                                    </div>
                                    <span className={styles.dotSvg}></span>
                                </div>
                                <div className={styles.singleRoww}>
                                    <div className={styles.single}>
                                        <div className={styles.boxTime}>
                                            <span>{String(timeData.hours).padStart(2, '0')}</span>
                                        </div>
                                        <span className={styles.timeHeadSpan}>Hours</span>
                                    </div>
                                    <span className={styles.dotSvg}></span>
                                </div>
                                <div className={styles.singleRoww}>
                                    <div className={styles.single}>
                                        <div className={styles.boxTime}>
                                            <span>{String(timeData.minutes).padStart(2, '0')}</span>
                                        </div>
                                        <span className={styles.timeHeadSpan}>Mins</span>
                                    </div>
                                    <span className={styles.dotSvg}></span>
                                </div>
                                <div className={styles.singleRoww}>
                                    <div className={styles.single}>
                                        <div className={styles.boxTime}>
                                            <span>{String(timeData.seconds).padStart(2, '0')}</span>
                                        </div>
                                        <span className={styles.timeHeadSpan}>Secs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default MaintenanceComp;

import React from 'react'
import styles from './trustedByHealthcare.module.scss';
import StoriesLove from '../../doctorNow/storiesLove/StoriesLove';
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";

const TrustedByHealthcare = () => {
    return (
        <section className={`${styles.trustedByHealthcare}  trustedByHealthcare`}>
            <StoriesLove page="cwp" />
        </section>
    )
}

export default TrustedByHealthcare;

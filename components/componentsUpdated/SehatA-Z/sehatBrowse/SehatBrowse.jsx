import React, { useEffect, useState } from 'react'
import styles from './sehatBrowse.module.scss';
import { Container, Row, Col } from "react-bootstrap"
import { getDiseases } from "@/pages/api/topicAPI";
import Link from 'next/link';
import Gif from '../../../../public/gif/asset_loader.gif';
import Image from 'next/image';


const SehatBrowse = (props) => {
    const [diseasesListing, setDiseasesListing] = useState();
    const [loading, setLoading] = useState(true);
    const [activeLetter, setActiveLetter] = useState('A');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchDiseases = async (qs = "") => {
        try {
            setLoading(true);
            const res = await getDiseases(qs);
            if (res.status == 200) {
                setDiseasesListing(res.data?.data?.disease);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching diseases:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDiseases();
    }, []);

    const allDiseases = Object.keys(diseasesListing || {}).reduce((acc, letter) => {
        return [
            ...acc,
            ...diseasesListing[letter].map(disease => ({ ...disease, letter })),
        ];
    }, []);



    const filteredDiseases = allDiseases.filter(disease =>
        disease?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );


    useEffect(() => {
        if (searchQuery && filteredDiseases.length > 0) {
            setActiveLetter(filteredDiseases[0].letter);
        }
    }, [searchQuery, filteredDiseases]);

    const diseases = searchQuery ? filteredDiseases : diseasesListing?.[activeLetter] || [];


    return (
        <section className={`${styles.sehatBrowse} sehatBrowse`}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center'>
                    <Col lg={12}>
                        <div className={styles.wraper_browse}>
                            <div className={`${styles.top_1} row`}>
                                <Col lg={6}>
                                    <h1> Browse by A-Z </h1>
                                </Col>
                                <Col lg={4} className='ms-auto'>
                                    <div className={styles.inputWrape}>
                                        <span className={styles.searchicon}></span>
                                        <input type="text" placeholder='Search health conditions' value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)} />
                                    </div>
                                </Col>
                            </div>
                            <div className={styles.alphabets}>
                                <ul>
                                    {diseasesListing?.headings.map(letter => (
                                        <li
                                            className={`${styles.wrape_single} ${activeLetter === letter ? styles.activeBrowse : ''}`}
                                            key={letter}
                                            onClick={() => {
                                                setActiveLetter(letter);
                                                setSearchQuery('');
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="alphaCheck"
                                                id={`alphaCheck_${letter}`}
                                                checked={activeLetter === letter}
                                                readOnly
                                            />
                                            <label htmlFor={`alphaCheck_${letter}`}>
                                                <span>{letter}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* <Row className={styles.details}>
                                <div className='col-lg-3'>
                                    <div className={`${styles.singleDetail} `}>
                                        <h4> Aarskog Syndrome </h4>
                                        <span className={styles.arrow_right}> </span>
                                    </div>
                                </div>
                            </Row> */}
                            <Row className={styles.details}>
                                {diseases.length > 0 ? (
                                    diseases.map((disease, index) => (
                                        <div className='col-lg-3' key={index}>
                                            <Link href={disease?.redirect_url || ''}>
                                                <div className={`${styles.singleDetail}`}>
                                                    <h4>{disease.name}</h4>
                                                    <span className={styles.arrow_right}></span>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <div className='col-lg-12'>
                                        <div className="text-center">
                                        <p>No Data Found</p>
                                                {/* <Image
                                                    width={110}
                                                    height={100}
                                                    src={Gif}
                                                    class="gif"
                                                    alt="loader" /> */}
                                        </div>
                                    </div>
                                )}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default SehatBrowse;

import React from 'react'
import styles from "./bannerCwpListingDetail.module.scss"
import Image from 'next/image';
import Link from 'next/link';
import searchListing from "../../../../public/svg/newPages/searchListing.svg";
import { Container, Row, Col } from "react-bootstrap";

export default function BannerCwpListingDetail({ search, handleSearch }) {
    return (
        <section className={`${styles.bannerCWPListingDetail} bannerCWPListingDetail01`}>
            <Container>
                <Row>
                    <Col lg={12}>
                        <ul className={styles.breadcrumb_wrapper}>
                            <Link className='breadcrumb-text' href="/"> <span ><li> Home <span className={styles.svgArrow}></span> </li></span></Link>
                            <span className='breadcrumb-text' ><li className={styles.activeBread}>  Workshops </li></span>
                        </ul>
                        <h1>Find workshops</h1>
                        <div className={` ${styles.searchBox}`} >
                            <input
                                onChange={(e) => handleSearch(e)}
                                type="search"
                                placeholder="Search for workshops..."
                                maxLength={30}
                                value={search}
                                className={`${styles.inputSearch} form-control`}
                            />
                            <button>
                                <Image src={searchListing} height="80" alt="search"></Image>
                            </button>
                        </div>

                    </Col>
                </Row>
            </Container>
        </section>
    )
}
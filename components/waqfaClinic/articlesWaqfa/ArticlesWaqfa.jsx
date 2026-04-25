import React, { useState } from 'react'
import styles from './articlesWaqfa.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import AncherUnderUpdated from '@/components/ancherUnderUpdated/AncherUnderUpdated';
import TrendingTickBtn from '@/components/trendingTickBtn/TrendingTickBtn';
import CardArticle from '@/components/card_article/Card_article';

const ArticlesWaqfa = () => {

    return (
        <section className={`${styles.articles_waqfaWraper} articles_waqfaWraper`}>
            <Container>
                <Row className='justify-content-center'>
                    <div className={styles.top_head}>
                        <h2> Articles </h2>
                        <AncherUnderUpdated href={""} text={"VIEW ALL"} />
                    </div>
                    <Col lg={12}>
                        <Row className='h-100 justify-content-center'>
                            <Col lg={9}>
                                <Row className={styles.wrape_video_Rea}>
                                    <Col lg={4}>
                                        asdsa
                                        <Image src={""} alt='' />
                                    </Col>
                                    <Col lg={5}>
                                        <div className={styles.right_card_article}>
                                            <TrendingTickBtn text={"Trending Now"} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3}>
                                        <CardArticle text={"Long-Acting Contraception Devices"} />
                                    </Col>
                                    <Col lg={3}>
                                        <CardArticle text={"Long-Acting Contraception Devices"} />
                                    </Col>
                                    <Col lg={3}>
                                        <CardArticle text={"Long-Acting Contraception Devices"} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={3}>
                                <div className={styles.right_banner}>
                                    <div className={styles.img_Wraper}>
                                        <Image src={""} alt='banner' className='img-fluid' />
                                    </div>
                                    <div className={styles.info_details}>
                                        <div className="color_btn_trend">
                                            <span className='tick_svggg'>  </span>
                                            Trending Now
                                        </div>
                                        <h5> What is PPIUCD? </h5>
                                        <p> PPIUCD is a convenient, long-acting, and highly effective contraceptive option for women immediately after childbirth </p>
                                        <AncherUnderUpdated href={""} text={"READ MORE"} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ArticlesWaqfa;

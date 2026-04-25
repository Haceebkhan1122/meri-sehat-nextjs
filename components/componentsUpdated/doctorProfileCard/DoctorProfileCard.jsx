import React from 'react'
import styles from './doctorProfileCard.module.scss';
import CardInfoProfile from './cardInfoProfile/CardInfoProfile';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';

const DoctorProfileCard = ({ item, handlePushOnProfile }) => {
    const isMobile = useMediaQuery('(max-width:768px)');

    return (
        <div className={item?.doctor_clinics?.length > 0 ? `${styles.mainWraperProfileCard} testCard bg_11` : `${styles.mainWraperProfileCard} testCard`}>
            <div className={`${styles.top_card}  ${styles.desktopTopCArd} `}>
                {isMobile ?
                    <div className='wrape_tickc'>
                        <img src={item?.image} alt="Doc Image" height={150} width={150} className={styles.doct_img} />
                        <span className='tickcckkImg'></span>
                    </div>
                    :
                    <img src={item?.image} alt="Doc Image" height={150} width={150} className={styles.doct_img} />
                }
                <div className={styles.info_doctor_wrapper_container}>
                    <div className={`${styles.info_doctor} testCard1`}>
                        {isMobile
                            && (
                                <>
                                    {item?.badge?.badge !== null && <div className={`${styles.recomm_tag} ${styles.mobileTag}`} style={{ backgroundColor: item?.badge?.badge_bg_color }}>
                                        <Image src={item?.badge?.badge_icon ? item?.badge?.badge_icon : ""} width={14} height={13} alt="Icon" />
                                        <span className={styles.thumbs_up_text} style={{ color: item?.badge?.badge_txt_color }}> {item?.badge?.badge}</span>
                                    </div>}

                                </>
                            )
                        }
                        <div className={styles.name_doct} onClick={() => handlePushOnProfile(item)}>
                            <span className={styles.title__doctor_name}> {item?.prefix}  {item?.name} </span>
                            {item?.is_featured &&
                                <span className={styles.verifiedIconName}> </span>
                            }
                        </div>
                        <div className='flex-wrap' style={{ display: 'flex' }}>
                            {item?.specialities?.slice(0, 2).map((speciality, index, array) => (
                                <span key={index} className={styles.title__doctor_type}>
                                    {speciality}{index < array.length - 1 ? ', ' : ' '}
                                </span>
                            ))}

                        </div>
                        <div style={{ display: 'flex' }} >
                            {item?.education?.slice(0, 3)?.map((education, index) => (
                                <span className={styles.title__doctor_type}>
                                    {education}
                                </span>
                            ))}
                        </div>
                    </div>
                    {!isMobile
                        ?
                        <>
                            <div className={styles.recommendations_doctor}>
                                <div className={styles.single__recome}>
                                    <span className={`${styles.single__star_svg}`}>  </span>
                                    <span className={styles.single__otg_text}> {item?.review_avg} ({item?.review_count} Reviews)  </span>
                                </div>

                                <div className={styles.single__recome}>
                                    <span className={styles.single__bag_svg}>  </span>
                                    <span className={styles.single__otg_text}> {item?.experience} Yrs Experience  </span>
                                </div>
                            </div>
                        </>
                        :
                        <></>
                    }


                </div>
                <div className={styles.btn_group_doct_wrapper}>
                    <div className={styles.btn_group_doct}>
                        <button className={styles.btn_group_doct_view_btn} onClick={() => handlePushOnProfile(item)}> VIEW PROFILE </button>
                    </div>
                </div>

                {!isMobile
                    && (
                        <>
                            {item?.badge?.badge !== null && <div className={styles.recomm_tag} style={{ backgroundColor: item?.badge?.badge_bg_color }}>
                                <Image src={item?.badge?.badge_icon ? item?.badge?.badge_icon : ""} width={14} height={13} alt="Icon" />
                                <span className={styles.thumbs_up_text} style={{ color: item?.badge?.badge_txt_color }}> {item?.badge?.badge}</span>
                            </div>}
                        </>
                    )
                }


            </div>
            {isMobile
                ?
                <>
                    <div className={`${styles.top_card} ${styles.moboileTopCArd}`}>
                        
                        <div className={`${styles.info_doctor_wrapper_container} `}>
                            <div className={styles.recommendations_doctor}>
                                <div className={styles.single__recome}>
                                    <span className={`${styles.single__bag_svg} ${styles.single__star_svg}`}>  </span>
                                    <span className={styles.single__otg_text}> {item?.review_avg} ({item?.review_count} Reviews)  </span>
                                </div>
                                <div className={styles.single__recome}>
                                    <span className={`${styles.single__bag_svg} ${styles.single__bag_svg}`}>  </span>
                                    <span className={styles.single__otg_text}> {item?.experience} Yrs Experience  </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </>
                :
                <></>
            }


            <div className={styles.bottomCard}>
                <Row className={styles.flexWrap}>


                    {isMobile
                        ?
                        <>

                            {item?.doctor_clinics?.length > 0 && item?.doctor_clinics?.map((items, index) => {
                                return (
                                    <div className={styles.boxMobile}>
                                        <CardInfoProfile doctorData={item} clinicsInfo={items} index={index} />
                                    </div>
                                )
                            })}
                        </>
                        :
                        <>
                            {item?.doctor_clinics?.length > 0 && item?.doctor_clinics?.map((items, index) => {
                                return (
                                    <Col lg={4} xs={6}>
                                        <CardInfoProfile doctorData={item} clinicsInfo={items} index={index} />
                                    </Col>
                                )
                            })}
                        </>
                    }
                </Row>
            </div>
        </div>
    )
}

export default DoctorProfileCard;

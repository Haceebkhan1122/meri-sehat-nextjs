import React from 'react'
import styles from './fad-add-review.module.scss';
import Image from 'next/image';
import DoctorSvgReview from 'public/svg/dr_png_review.svg';
import tickSvg from "public/svg/tick_svg_img.svg";
import HeaderOnlyLogo from '../../components/headerOnlyLogo/HeaderOnlyLogo';
import Star from 'public/svg/star_reviews_profile.svg';

const FadAddReview = () => {
    return (
        <>
            <HeaderOnlyLogo />
            <div className={styles.addReviewsWrapper}>
                <div className={styles.leftProfile}>
                    <div className={styles.topLeftProfile}>
                        <div className={styles.img_wrapperTop}>
                            <Image src={DoctorSvgReview} alt='' className={styles.doctor_left_reviewImg} />
                            <span className={styles.tickingSvg}>  </span>
                        </div>
                        <div className={styles.wrapper_info_topLeft}>
                            <div className={styles.names_verti}>
                                <span className={styles.nameDoc}> Dr. Iqra Mazhar  </span>
                                <span className={styles.desigDoc}> General Physician </span>
                            </div>
                            <div className={styles.wraperDate}>
                                <div className={styles.wraperSingleDate}>
                                    <span className={styles.calender_icon}>  </span>
                                    <span> 8/07/2023 </span>
                                </div>
                                <div className={styles.wraperSingleDate}>
                                    <span className={styles.person_icon}>  </span>
                                    <span> Fatima Ahmed Khan </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottomLeftProfile}>
                        <div className={styles.consultBar}>
                            <div className={styles.one}>
                                <span className={styles.videoSvg}>  </span>
                                <span>  Consult </span>
                            </div>
                            <div className={styles.second}> Video </div>
                        </div>
                        <hr />
                        <div className={styles.totaling_wrapper}>
                            <span className={styles.totalAmount}> Total Amount </span>
                            <span className={styles.price_total}> Rs. 1200 </span>
                        </div>
                        <button> VIEW PRESCRIPTION </button>
                    </div>
                </div>
                <div className={styles.rightProfile}>
                    <h3> Add Review </h3>
                    <p className={styles.rateDoc}> Please rate your doctor </p>
                    <div className={styles.stars}>
                        <Image width={24} height={23} src={Star} alt='' className={styles.iconStar} />
                        <Image width={24} height={23} src={Star} alt='' className={styles.iconStar} />
                        <Image width={24} height={23} src={Star} alt='' className={styles.iconStar} />
                        <Image width={24} height={23} src={Star} alt='' className={styles.iconStar} />
                        <Image width={24} height={23} src={Star} alt='' className={styles.iconStar} />
                    </div>
                    <div className={styles.last}>
                        <p className={styles.shareOptional}> Share your experience (Optional)  </p>
                        <div className={styles.hide}>
                            <input type="checkbox" />
                            <span> Hide my name  </span>
                        </div>
                    </div>
                    <div className={styles.carding} >
                        <textarea type='text' max={500} maxLength={500} /> 
                        <span> 500 character limit  </span>
                    </div>
                    <div className={styles.last}>
                        <span className={styles.skip}> Skip </span>
                        <button className={styles.submitingBtn}> SUBMIT </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FadAddReview;

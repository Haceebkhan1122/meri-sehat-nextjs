import React, { useState, useEffect, useRef } from 'react';
import styles from '../packageSection/packageSection.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import info from '../../../../public/svg/newPages/info.svg'
import star from '../../../../public/svg/newPages/star.svg'
import star2new from '../../../../public/svg/newPages/star2new.svg'
import rightarrowNew1 from '../../../../public/svg/newPages/rightarrowNew1.svg'
import closeBox from '../../../../public/svg/newPages/closeBox.svg'
import Takaful from '../../../../public/png/takaful.png'
import VitalScanModal from "../../../../components/componentsUpdated/Pricing/vitalScanModal/vitalScanModal";
import HealthCovrageModal from "../../../../components/componentsUpdated/Pricing/healthCovrageModal/healthCovrageModal";
import { APIV3 } from '@/utils/httpService';
import Cookies from "js-cookie";
import ImageLoader from '../../../ImageLoader';
import { motion, useAnimation } from 'framer-motion';
import arrowBtn1 from '../../../../public/svg/newPages/arrowBtn1.svg';
import mixpanel from "mixpanel-browser";
import SubscriptionModal from '../../../subscription/modalSubscription/modalSubscription';
import ConsultNowModal from '../../../../components/componentsUpdated/Pricing/consultNowModal/consultNowModal';

function packageSection({ pricingTableData, vitalInformation, healthInsuranceInformation, consultNowInformation }) {
    const [isChecked, setIsChecked] = useState(false);
    const [showVitalScan, setShowVitalScan] = useState(false);
    const handleCloseVital = () => setShowVitalScan(false);
    const handleShowVital = () => setShowVitalScan(true);

    const [consultNowModal, setConsultNowModal] = useState(false);
    const handleCloseConsultNow = () => setConsultNowModal(false);
    const handleShowConsultNow = () => setConsultNowModal(true);

    const [showhealthCovrageModal, setShowhealthCovrageModal] = useState(false);
    const [userData, setUserData] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showCorporate, setShowCorporate] = useState(false);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleCloseHealth = () => setShowhealthCovrageModal(false);
    const handleShowHealth = () => setShowhealthCovrageModal(true);
    const [activePackage1, setActivePackage1] = useState(null);
    const [isComplete, setIsComplete] = useState(false);
    const [xPosition, setXPosition] = useState(0);
    const [xPositionCancel, setXPositionCancel] = useState(0);
    const [addButtonClass, setAddButtonClass] = useState({}); // store classes for each item
    const buttonRef = useRef({})

    const handleClose = () => {
        setShow(false)
        setAddButtonClass({})
    };


    const handleDragEnd = (e, info, item, type) => {
        const buttonWidth = buttonRef.current ? buttonRef.current.offsetWidth : 0;
        const dragThreshold = buttonWidth + 10
        const dragPosition = info.offset.x;
        if (dragPosition >= dragThreshold) {
            setIsComplete(true);
            checkUser(e, item, type);
        } else {
            setIsComplete(false);
            setXPosition(0);
        }
    };

    const handleDragCancel = (e, info) => {
        const buttonWidth = buttonRef.current ? buttonRef.current.offsetWidth : 0;
        const dragThreshold = buttonWidth + 10
        const dragPosition = info.offset.x;


        if (dragPosition >= dragThreshold) {
            handleShow();
            setXPositionCancel(0);
        } else {
            setXPositionCancel(0);
        }
    };

    const handleViewDetails = (id, name, yearly) => {
        setActivePackage1(id);  // Set the clicked package as active
        mixpanel.track('View packages', {
            package: `${name} yearly`
        });
    };

    const handleCloseDetails = () => {
        setActivePackage1(null);  // Hide details by setting activePackage to null
    };

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        Cookies.remove("hasInsurance");
        if (typeof window !== "undefined") {
            const Authorization = Cookies.get("Authorization");
            if (!Authorization) {
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
                APIV3.get("/user")
                    .then((res) => setUserData(res?.data?.data?.user))
                    .catch((err) => console.log(err));
            }
        }
    }, []);

    const checkUser = (e, item, yearly) => {

        setAddButtonClass((prevState) => ({
            ...prevState,
            [item.id]: 'moveForward',
        }));
        if (userData?.is_corporate && userData?.subscription_recent !== null) {
            setShowCorporate(true)
        }
        else {
            const authorization = Cookies.get("Authorization");
            if (authorization && yearly) {
                if (item?.has_health_insurance == true) {
                    Cookies.set("hasInsurance", true);
                    window.location.href = `/order/${item?.id}?yearly=yearly`;
                } else {
                    Cookies.remove("hasInsurance");
                    window.location.href = `/order/${item?.id}?yearly=yearly`;
                }
            } else if (authorization) {
                if (item?.has_health_insurance == true) {
                    Cookies.set("hasInsurance", true);
                    window.location.href = `/order/${item?.id}`;
                } else {
                    Cookies.remove("hasInsurance");
                    window.location.href = `/order/${item?.id}`;
                }
            } else {
                Cookies.set("pricingLogin", true);
                window.location.href = "/phone-number";
            }
        }
    };

    const handleDragCancelDesktop = (item, info, type) => {
        setAddButtonClass((prevState) => ({
            ...prevState,
            [item.id]: 'moveForward', // dynamically set class for this item
        }));
        handleShow()
        // if (item.x > 300) {
        // }
    };

    return (
        <>
            <section className={`${styles.packagesSection} pt-80 pb-80 packagesOrder`} data-aos="fade-up" data-aos-duration="3000">
                <Container>
                    <Row>
                        <Col lg={12} className='mx-auto'>
                            <Row>
                                <Col lg={6}> <h2 className={`${styles.mb_30} d-lg-block d-none`}>   Our Plans</h2></Col>
                                <Col lg={6} className='my-auto'>
                                    <div className={styles.topToggleBox}>
                                        <div className={`${styles.tabsBox} ${!isChecked ? `${styles.active}` : 'monthly'}`}>
                                            <p>Monthly</p>
                                        </div>
                                        <div className={styles.checkBoxToggle}>
                                            <input
                                                type="checkbox"
                                                id="switch"
                                                checked={isChecked}
                                                onChange={handleToggle}
                                            />
                                            <label htmlFor="switch" className={`${styles.switch}`}> </label>
                                        </div>
                                        <div className={`${styles.tabsBox} ${isChecked ? `${styles.active}` : 'yearly'}`}>
                                            <span>{pricingTableData?.discounted_percent_yearly}% OFF</span>
                                            <p>Yearly</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <hr className={styles.hr1}></hr>
                                </Col>
                            </Row>
                        </Col>
                        {pricingTableData == null || Object.keys(pricingTableData).length === 0 ? (
                            <>
                                <ImageLoader />
                            </>
                        ) : (
                            <>
                                <Col lg={12} className='mx-auto'>
                                    <div>
                                        {!isChecked ? (
                                            <div className={`${styles.yearlyBox} monthly`}>
                                                <Row>
                                                    {pricingTableData?.monthly?.map((item) => {
                                                        const Authorization = Cookies.get("Authorization");
                                                        const subscription = userData?.subscription;
                                                        const isYearly = userData?.subscription?.is_yearly;
                                                        const isCorporate = userData?.is_corporate === true;
                                                        const isCurrentPlan = subscription?.package?.id === item?.id; // Condition to check if the package is the current subscription
                                                        const isUpgradable = subscription?.package?.id < item?.id; // Condition to check if the current subscription is less than the package
                                                        const isHigherPlan = subscription?.package?.id > item?.id; // Condition to check if the current subscription is greater than the package
                                                        const hasNoSubscription = !subscription; // Condition to check if the user has no subscription
                                                        const isCancel = userData?.subscription?.is_cancel; // Check the cancellation status
                                                        return (
                                                            <>
                                                                <Col lg={4}>

                                                                    {activePackage1 === item.id ? (
                                                                        <>
                                                                            <div className={`${styles.PkgBox}`}>
                                                                                <div className={styles.closeBtn} onClick={handleCloseDetails}>
                                                                                    <Image src={closeBox} className="img-fluid" width={24} height={24} />
                                                                                </div>
                                                                                <h4 className={styles.pkgBoxHeader}>{item?.name}</h4>
                                                                                <h3>PKR {Number(item?.price)?.toLocaleString()}</h3>
                                                                                {item?.name == "PLUS" && (
                                                                                    <span className={styles.textBigUp}> <Image src={star} className={`${styles.star} img-fluid dd`}></Image> MOST POPULAR</span>
                                                                                )}
                                                                                <ul className={`${styles.pkgListingBox}`}>
                                                                                    {item?.footer?.map((footer) => {
                                                                                        return (
                                                                                            <>
                                                                                                {footer?.status && (
                                                                                                    <>
                                                                                                        <li className={`${styles.pkgList}`}>
                                                                                                            <div className={`${styles.text} d-flex`}>
                                                                                                                <Image src={footer?.icon} width={20} height={20} className={`${styles.icoleft} img-fluid`}></Image>
                                                                                                                <p>{footer?.title}</p>
                                                                                                                {footer?.has_info_icon == true && (
                                                                                                                    <Image src={info} onClick={footer?.has_info_icon && footer?.options?.length > 0 ? handleShowHealth : footer?.title !== "Doctor Consults" ? handleShowVital : handleShowConsultNow} className={`${styles.icoright} img-fluid`}></Image>
                                                                                                                )}
                                                                                                            </div>
                                                                                                            <p className={`${styles.text01}`}>
                                                                                                                {footer?.options?.length > 0 ? (
                                                                                                                    <span className={`${styles.takaful}`}>
                                                                                                                        <Image src={Takaful} className={`img-fluid`} />
                                                                                                                    </span>
                                                                                                                ) : footer?.limit}
                                                                                                            </p>
                                                                                                        </li>
                                                                                                    </>
                                                                                                )}

                                                                                                {footer?.status && footer?.has_info_icon && footer?.options?.length > 0 && footer?.options?.map((options) => {
                                                                                                    return (
                                                                                                        <ul className={`${styles.subList}`}>
                                                                                                            <li className={`${styles.pkgList} ${styles.pkgListLast}  ${styles.noCoveragee}`}>
                                                                                                                <div className={`${styles.text}`}>
                                                                                                                    <p>{options?.title}</p>
                                                                                                                </div>
                                                                                                                <p className={`${styles.text01}`}>PKR {Number(options?.value)?.toLocaleString()}</p>
                                                                                                            </li>
                                                                                                        </ul>
                                                                                                    )
                                                                                                })}
                                                                                            </>
                                                                                        )
                                                                                    })}

                                                                                </ul>

                                                                                {!Authorization ? (
                                                                                    <button ref={buttonRef} className={`${styles.arrowBtnPlan}`}>
                                                                                        {/* <Image src={arrowBtn1} className={styles.arrowBtn1} /> */}
                                                                                        <motion.span
                                                                                            className='arrow_svvv' drag="x"
                                                                                            dragConstraints={{ left: 0, right: 0 }}
                                                                                            onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                            onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                                                                                            style={{ x: xPosition }}
                                                                                            dragElastic={0.75}
                                                                                            transition={{
                                                                                                type: "spring",
                                                                                                stiffness: 15,
                                                                                                damping: 7,
                                                                                                mass: 0.25,
                                                                                                bounce: 0.3
                                                                                            }}

                                                                                        />
                                                                                        <p>BUY NOW</p>
                                                                                    </button>
                                                                                ) :
                                                                                    isCorporate == true ? (
                                                                                        <button
                                                                                            className={`fw-500 btn__MA btn btn-lg btn-pricingBuy ff-Circular ${styles.pricing_package_disabled}`}
                                                                                        >
                                                                                            <Image src={arrowBtn1} ></Image>
                                                                                            <p>Buy Now</p>
                                                                                        </button>
                                                                                    ) :
                                                                                        isYearly == 1 ? (
                                                                                            <button className={`${styles.arrowBtnPlan} ${styles.pricing_package_disabled}`} disabled>
                                                                                                <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                                <span>Buy Now</span>
                                                                                            </button>
                                                                                        ) : (
                                                                                            <>
                                                                                                {/* If no subscription, allow Buy Now */}
                                                                                                {hasNoSubscription && (
                                                                                                    <button ref={buttonRef} className={`${styles.arrowBtnPlan}`}>
                                                                                                        {/* <Image src={arrowBtn1} className={styles.arrowBtn1} /> */}
                                                                                                        <motion.span
                                                                                                            className='arrow_svvv' drag="x"
                                                                                                            dragConstraints={{ left: 0, right: 0 }}
                                                                                                            onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                                            onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                                                                                                            style={{ x: xPosition }}
                                                                                                            dragElastic={0.75}
                                                                                                            transition={{
                                                                                                                type: "spring",
                                                                                                                stiffness: 15,
                                                                                                                damping: 7,
                                                                                                                mass: 0.25,
                                                                                                                bounce: 0.3
                                                                                                            }}
                                                                                                        />
                                                                                                        <p>Buy Now</p>
                                                                                                    </button>
                                                                                                )}

                                                                                                {/* If current plan, allow Cancel if isCancel == 0, otherwise show Buy Now for the same package */}
                                                                                                {isCurrentPlan && !hasNoSubscription && (
                                                                                                    <>
                                                                                                        {isCancel == 0 ? (
                                                                                                            <button ref={buttonRef} className={`${styles.arrowBtnPlan}`}>
                                                                                                                <motion.span
                                                                                                                    className="arrow_svvv"
                                                                                                                    drag="x"
                                                                                                                    dragConstraints={{ left: 0, right: 0 }}
                                                                                                                    onDrag={(e, info) => setXPositionCancel(info.point.x)}
                                                                                                                    onDragEnd={(e, info) => handleDragCancel(e, info)}
                                                                                                                    style={{ x: xPositionCancel }}
                                                                                                                    dragElastic={0.75}
                                                                                                                    transition={{
                                                                                                                        type: "spring",
                                                                                                                        stiffness: 15,
                                                                                                                        damping: 7,
                                                                                                                        mass: 0.25,
                                                                                                                        bounce: 0.3
                                                                                                                    }}
                                                                                                                />
                                                                                                                <p>Cancel</p>
                                                                                                            </button>
                                                                                                        ) : isUpgradable && isCancel == 1 && (
                                                                                                            <button ref={buttonRef} className={`${styles.arrowBtnPlan}`}>
                                                                                                                <motion.span
                                                                                                                    className='arrow_svvv' drag="x"
                                                                                                                    dragConstraints={{ left: 0, right: 0 }}
                                                                                                                    onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                                                    onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                                                                                                                    style={{ x: xPosition }}
                                                                                                                    dragElastic={0.75}
                                                                                                                    transition={{
                                                                                                                        type: "spring",
                                                                                                                        stiffness: 15,
                                                                                                                        damping: 7,
                                                                                                                        mass: 0.25,
                                                                                                                        bounce: 0.3
                                                                                                                    }}
                                                                                                                />
                                                                                                                {/* <Image src={arrowBtn1} className={styles.arrowBtn1} /> */}
                                                                                                                <p>Buy Now</p>
                                                                                                            </button>
                                                                                                        )}
                                                                                                    </>
                                                                                                )}

                                                                                                {/* If upgradable and isCancel is 1, allow Upgrade */}
                                                                                                {isCurrentPlan && isCancel !== 0 && (
                                                                                                    <button ref={buttonRef} className={`${styles.arrowBtnPlan}`}>
                                                                                                        <motion.span
                                                                                                            className='arrow_svvv' drag="x"
                                                                                                            dragConstraints={{ left: 0, right: 0 }}
                                                                                                            onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                                            onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                                                                                                            style={{ x: xPosition }}
                                                                                                            dragElastic={0.75}
                                                                                                            transition={{
                                                                                                                type: "spring",
                                                                                                                stiffness: 15,
                                                                                                                damping: 7,
                                                                                                                mass: 0.25,
                                                                                                                bounce: 0.3
                                                                                                            }}
                                                                                                        />
                                                                                                        <p>Buy Now</p>
                                                                                                    </button>
                                                                                                )}

                                                                                                {isUpgradable && !isCurrentPlan && isCancel !== 0 && (
                                                                                                    <button ref={buttonRef} className={`${styles.arrowBtnPlan}`} >
                                                                                                        {/* <Image src={arrowBtn1} className={styles.arrowBtn1} /> */}
                                                                                                        <motion.span
                                                                                                            className='arrow_svvv' drag="x"
                                                                                                            dragConstraints={{ left: 0, right: 0 }}
                                                                                                            onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                                            onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                                                                                                            style={{ x: xPosition }}
                                                                                                            dragElastic={0.75}
                                                                                                            transition={{
                                                                                                                type: "spring",
                                                                                                                stiffness: 15,
                                                                                                                damping: 7,
                                                                                                                mass: 0.25,
                                                                                                                bounce: 0.3
                                                                                                            }}
                                                                                                        />
                                                                                                        <p>Upgrade</p>
                                                                                                    </button>
                                                                                                )}
                                                                                                {isUpgradable && !isCurrentPlan && isCancel !== 1 && (
                                                                                                    <button ref={buttonRef} className={`${styles.arrowBtnPlan}`}>
                                                                                                        {/* <Image src={arrowBtn1} className={styles.arrowBtn1} /> */}
                                                                                                        <motion.span
                                                                                                            className='arrow_svvv' drag="x"
                                                                                                            dragConstraints={{ left: 0, right: 0 }}
                                                                                                            onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                                            onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                                                                                                            style={{ x: xPosition }}
                                                                                                            dragElastic={0.75}
                                                                                                            transition={{
                                                                                                                type: "spring",
                                                                                                                stiffness: 15,
                                                                                                                damping: 7,
                                                                                                                mass: 0.25,
                                                                                                                bounce: 0.3
                                                                                                            }}

                                                                                                        />
                                                                                                        <p>Upgrade</p>
                                                                                                    </button>
                                                                                                )}

                                                                                                {/* If current plan is higher and isCancel is 1, show enabled Buy Now */}
                                                                                                {isYearly == 0 && isHigherPlan && isCancel == 1 && (
                                                                                                    <button ref={buttonRef} className={`${styles.arrowBtnPlan} ${styles.pricing_package_disabled}`} disabled>
                                                                                                        {/* <Image src={arrowBtn1} className={styles.arrowBtn1} /> */}
                                                                                                        <motion.span
                                                                                                            className='arrow_svvv' drag="x"
                                                                                                            dragConstraints={{ left: 0, right: 0 }}
                                                                                                            onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                                            onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                                                                                                            style={{ x: xPosition }}
                                                                                                            dragElastic={0.75}
                                                                                                            transition={{
                                                                                                                type: "spring",
                                                                                                                stiffness: 15,
                                                                                                                damping: 7,
                                                                                                                mass: 0.25,
                                                                                                                bounce: 0.3
                                                                                                            }}

                                                                                                        />
                                                                                                        <p>Buy Now</p>
                                                                                                    </button>
                                                                                                )}

                                                                                                {/* If canceled, show disabled Buy Now */}
                                                                                                {isHigherPlan && isCancel !== 1 && (
                                                                                                    <button className={`${styles.arrowBtnPlan} ${styles.pricing_package_disabled}`} disabled>
                                                                                                        <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                                        <span>Buy Now</span>
                                                                                                    </button>
                                                                                                )}
                                                                                            </>
                                                                                        )}
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <div className='d-lg-none d-block'>
                                                                                <div className={styles.mainBoxPkg}>
                                                                                    <div className={`${styles.headerPkg} d-flex justify-content-between`}>
                                                                                        <div className={styles.box1}>
                                                                                            <h3 className={styles.pkgNameHeader}>{item?.name?.toLowerCase()}</h3>
                                                                                            <h4>PKR  {item?.price?.toLocaleString()}</h4>

                                                                                        </div>
                                                                                        <div className={styles.box2}>
                                                                                            {item?.header?.length > 0 && item?.header?.map((header) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        <div className={styles.packgTextHead}>
                                                                                                            <Image src={header?.icon} width={14} height={14} className={`${styles.icoleft} img-fluid`}></Image>
                                                                                                            <span className={header?.title == "No Health Insurance" ? styles.healthColr : ""}>  {header?.title} </span>
                                                                                                        </div>
                                                                                                    </>
                                                                                                )
                                                                                            })}
                                                                                        </div>
                                                                                    </div>
                                                                                    <button className={styles.viewDetailBtn} onClick={() => handleViewDetails(item.id, item?.name)}>
                                                                                        View Details  <Image src={rightarrowNew1} width={14} height={14} className={`${styles.icoleft} img-fluid`}></Image>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )}

                                                                    <div className={`${styles.PkgBox} d-lg-block d-none`}>
                                                                        <h4 className={styles.pkgBoxHeader}>{item?.name}
                                                                            {item?.name == "PLUS" && (
                                                                                <span> <Image src={star} className={`${styles.star} img-fluid dd`}></Image> Most Popular</span>
                                                                            )}
                                                                        </h4>
                                                                        <h3>PKR {item?.price?.toLocaleString()}</h3>
                                                                        <ul className={`${styles.pkgListingBox}`}>
                                                                            {item?.footer?.map((footer) => {
                                                                                return (
                                                                                    <>
                                                                                        {footer?.status && (
                                                                                            <li className={`${styles.pkgList}`}>
                                                                                                <div className={`${styles.text} d-flex`}>
                                                                                                    <Image src={footer?.icon} width={20} height={20} className={`${styles.icoleft} img-fluid`}></Image>
                                                                                                    <p>{footer?.title}</p>
                                                                                                    {footer?.has_info_icon == true && (
                                                                                                        <Image src={info} onClick={footer?.has_info_icon && footer?.options?.length > 0 ? handleShowHealth : footer?.title !== "Doctor Consults" ? handleShowVital : handleShowConsultNow} className={`${styles.icoright} img-fluid`}></Image>
                                                                                                    )}
                                                                                                </div>
                                                                                                <p className={`${styles.text01}`}>
                                                                                                    {footer?.options?.length > 0 ? (
                                                                                                        <span className={`${styles.takaful}`}>
                                                                                                            <Image src={Takaful} className={`img-fluid`} />
                                                                                                        </span>
                                                                                                    ) : footer?.limit}
                                                                                                </p>
                                                                                            </li>
                                                                                        )}

                                                                                        {footer?.status && footer?.has_info_icon && footer?.options?.length > 0 && footer?.options?.map((options) => {
                                                                                            return (
                                                                                                <ul className={`${styles.subList}`}>
                                                                                                    <li className={`${styles.pkgList} ${styles.pkgListLast}  ${styles.noCoveragee}`}>
                                                                                                        <div className={`${styles.text}`}>
                                                                                                            <p>{options?.title}</p>
                                                                                                        </div>
                                                                                                        <p className={`${styles.text01}`}>PKR {Number(options?.value)?.toLocaleString()}</p>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            )
                                                                                        })}
                                                                                    </>
                                                                                )
                                                                            })}

                                                                        </ul>
                                                                        {!Authorization ? (
                                                                            <button onClick={(e) => checkUser(e, item)} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''}`}>
                                                                                <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                <p>Buy Now</p>
                                                                            </button>
                                                                        ) :
                                                                            isCorporate == true ? (
                                                                                <button
                                                                                    className={`fw-500 btn__MA btn btn-lg btn-pricingBuy ff-Circular ${styles.pricing_package_disabled}`}
                                                                                >
                                                                                    <Image src={arrowBtn1} className={styles.arrowBtn1} />

                                                                                    <p>Buy Now</p>
                                                                                </button>
                                                                            ) :
                                                                                isYearly == 1 ? (
                                                                                    <button className={`${styles.arrowBtnPlan} ${styles.pricing_package_disabled}`} disabled>
                                                                                        <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                        <span>Buy Now</span>
                                                                                    </button>
                                                                                ) : (
                                                                                    <>
                                                                                        {/* If no subscription, allow Buy Now */}
                                                                                        {hasNoSubscription && (
                                                                                            <button onClick={(e) => checkUser(e, item)} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''} btn__MA`}>
                                                                                                <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                                <p>Buy Now</p>
                                                                                            </button>
                                                                                        )}

                                                                                        {/* If current plan, allow Cancel if isCancel == 0, otherwise show Buy Now for the same package */}
                                                                                        {isCurrentPlan && !hasNoSubscription && (
                                                                                            <>
                                                                                                {isCancel == 0 ? (
                                                                                                    <button onClick={(e) => handleDragCancelDesktop(item)} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''} cancelPlanBtn btn__MA`}>
                                                                                                        <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                                        <p>Cancel</p>
                                                                                                    </button>
                                                                                                ) : isUpgradable && isCancel == 1 && (
                                                                                                    <button className={`${styles.arrowBtnPlan}`}>
                                                                                                        <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                                        <span>Buy Now</span>
                                                                                                    </button>
                                                                                                )}
                                                                                            </>
                                                                                        )}

                                                                                        {/* If upgradable and isCancel is 1, allow Upgrade */}
                                                                                        {isCurrentPlan && isCancel !== 0 && (
                                                                                            <button onClick={(e) => checkUser(e, item)} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''} btn__MA`}>
                                                                                                <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                                <p>Buy Now</p>
                                                                                            </button>
                                                                                        )}

                                                                                        {isUpgradable && !isCurrentPlan && isCancel !== 0 && (
                                                                                            <button onClick={(e) => checkUser(e, item)} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''} btn__MA`} >
                                                                                                <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                                <p>Upgrade</p>
                                                                                            </button>
                                                                                        )}
                                                                                        {isUpgradable && !isCurrentPlan && isCancel !== 1 && (
                                                                                            <button onClick={(e) => checkUser(e, item)} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''} btn__MA`}>
                                                                                                <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                                <p>Upgrade</p>
                                                                                            </button>
                                                                                        )}

                                                                                        {/* If current plan is higher and isCancel is 1, show enabled Buy Now */}
                                                                                        {isYearly == 0 && isHigherPlan && isCancel == 1 && (
                                                                                            <button className={`${styles.arrowBtnPlan} ${styles.pricing_package_disabled}`} disabled>
                                                                                                <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                                <span>Buy Now</span>
                                                                                            </button>
                                                                                        )}

                                                                                        {/* If canceled, show disabled Buy Now */}
                                                                                        {isHigherPlan && isCancel !== 1 && (
                                                                                            <button className={`${styles.arrowBtnPlan} ${styles.pricing_package_disabled}`} disabled>
                                                                                                <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                                <span>Buy Now</span>
                                                                                            </button>
                                                                                        )}
                                                                                    </>
                                                                                )}
                                                                    </div>
                                                                </Col >
                                                            </>
                                                        )
                                                    })}
                                                </Row>
                                            </div>
                                        ) : (
                                            <div className={`${styles.yearlyBox} yearly`}>
                                                <Row> {pricingTableData?.yearly?.map((item) => {
                                                    const Authorization = Cookies.get("Authorization");
                                                    const subscription = userData.subscription;
                                                    const isYearly = userData.subscription?.is_yearly;
                                                    const isCorporate = userData.is_corporate === true;
                                                    const isCurrentPlan = subscription?.package?.id === item?.id; // Check if this package is the current subscription
                                                    const isUpgradable = subscription?.package?.id < item?.id; // Check if the current subscription is less than the package
                                                    const isHigherPlan = subscription?.package?.id > item?.id; // Check if the current subscription is greater than the package
                                                    const hasNoSubscription = !subscription; // Check if the user has no subscription
                                                    const isCancel = userData.subscription?.is_cancel; // Check the cancellation status
                                                    return (
                                                        <>
                                                            <Col lg={4}>
                                                                {activePackage1 === item.id ? (
                                                                    <>
                                                                        <div className={`${styles.PkgBox} d-lg-none d-block`}>
                                                                            <div className={styles.closeBtn} onClick={handleCloseDetails}>
                                                                                <Image src={closeBox} className="img-fluid" width={24} height={24} />
                                                                            </div>
                                                                            <h4 className={styles.pkgBoxHeader}>{item?.name}

                                                                            </h4>
                                                                            <h3>PKR {item?.price?.toLocaleString()}</h3>
                                                                            {item?.name == "PREMIUM" && (
                                                                                <span> <Image src={star2new} className={`${styles.star2} img-fluid dd`}></Image> OUR BEST PLAN </span>
                                                                            )}
                                                                            <ul className={`${styles.pkgListingBox}`}>
                                                                                {item?.footer?.map((footer) => {
                                                                                    return (
                                                                                        <>
                                                                                            {footer?.status && (
                                                                                                <>
                                                                                                    <li className={`${styles.pkgList}`}>
                                                                                                        <div className={`${styles.text} d-flex`}>
                                                                                                            <Image src={footer?.icon} width={20} height={20} className={`${styles.icoleft} img-fluid`}></Image>
                                                                                                            <p>{footer?.title}</p>
                                                                                                            {footer?.has_info_icon == true && (
                                                                                                                <Image src={info} onClick={footer?.has_info_icon && footer?.options?.length > 0 ? handleShowHealth : footer?.title !== "Doctor Consults" ? handleShowVital : handleShowConsultNow} className={`${styles.icoright} img-fluid`}></Image>
                                                                                                            )}
                                                                                                        </div>
                                                                                                        <p className={`${styles.text01}`}>
                                                                                                            {footer?.options?.length > 0 ? (
                                                                                                                <span className={`${styles.takaful}`}>
                                                                                                                    <Image src={Takaful} className={`img-fluid`} />
                                                                                                                </span>
                                                                                                            ) : footer?.limit}
                                                                                                        </p>
                                                                                                    </li>
                                                                                                </>
                                                                                            )}
                                                                                            {footer?.status && footer?.has_info_icon && footer?.options?.length > 0 && footer?.options?.map((options) => {
                                                                                                return (
                                                                                                    <ul className={`${styles.subList}`}>
                                                                                                        <li className={`${styles.pkgList} ${styles.pkgListLast}  ${styles.noCoveragee}`}>
                                                                                                            <div className={`${styles.text}`}>
                                                                                                                <p>{options?.title}</p>
                                                                                                            </div>
                                                                                                            <p className={`${styles.text01}`}>PKR {Number(options?.value)?.toLocaleString()}</p>
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                )
                                                                                            })}
                                                                                        </>
                                                                                    )
                                                                                })}

                                                                            </ul>
                                                                            {!Authorization ? (
                                                                                <button ref={buttonRef} className={`${styles.arrowBtnPlan}`}>
                                                                                    <motion.span
                                                                                        className='arrow_svvv' drag="x"
                                                                                        dragConstraints={{ left: 0, right: 0 }}
                                                                                        onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                        onDragEnd={(e, info) => handleDragEnd(e, info, item, 'yearly')}
                                                                                        style={{ x: xPosition }}
                                                                                        dragElastic={0.75}
                                                                                        transition={{
                                                                                            type: "spring",
                                                                                            stiffness: 15,
                                                                                            damping: 7,
                                                                                            mass: 0.25,
                                                                                            bounce: 0.3
                                                                                        }}
                                                                                    />
                                                                                    <p>Buy Now</p>
                                                                                </button>
                                                                            ) : isCorporate == true ? (
                                                                                <button className={`${styles.arrowBtnPlan} ${styles.pricing_package_disabled}`}>
                                                                                    <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                    <p>Buy Now</p>
                                                                                </button>
                                                                            ) : (
                                                                                <>
                                                                                    {isYearly == 1 ? (
                                                                                        <>
                                                                                            {isCurrentPlan && isCancel === 0 ? (
                                                                                                <button ref={buttonRef} className={`${styles.arrowBtnPlan}`}>
                                                                                                    <motion.span
                                                                                                        className="arrow_svvv"
                                                                                                        drag="x"
                                                                                                        dragConstraints={{ left: 0, right: 0 }}
                                                                                                        onDrag={(e, info) => setXPositionCancel(info.point.x)}
                                                                                                        onDragEnd={(e, info) => handleDragCancel(e, info)}
                                                                                                        style={{ x: xPositionCancel }}
                                                                                                        dragElastic={0.75}
                                                                                                        transition={{
                                                                                                            type: "spring",
                                                                                                            stiffness: 15,
                                                                                                            damping: 7,
                                                                                                            mass: 0.25,
                                                                                                            bounce: 0.3
                                                                                                        }}
                                                                                                    />
                                                                                                    <p>Cancel</p>
                                                                                                </button>
                                                                                            ) : isCurrentPlan && isCancel == 1 ? (
                                                                                                <button ref={buttonRef} className={`${styles.arrowBtnPlan}`}>
                                                                                                    {/* <Image src={arrowBtn1} className={styles.arrowBtn1} /> */}
                                                                                                    <motion.span
                                                                                                        className='arrow_svvv' drag="x"
                                                                                                        dragConstraints={{ left: 0, right: 0 }}
                                                                                                        onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                                        onDragEnd={(e, info) => handleDragEnd(e, info, item, 'yearly')}
                                                                                                        style={{ x: xPosition }}
                                                                                                        dragElastic={0.75}
                                                                                                        transition={{
                                                                                                            type: "spring",
                                                                                                            stiffness: 15,
                                                                                                            damping: 7,
                                                                                                            mass: 0.25,
                                                                                                            bounce: 0.3
                                                                                                        }}

                                                                                                    />
                                                                                                    <p>Buy Now</p>
                                                                                                </button>
                                                                                            ) : isUpgradable && !isCurrentPlan && isCancel !== 1 ? (
                                                                                                <>
                                                                                                    <button ref={buttonRef} className={`${styles.arrowBtnPlan}`}>
                                                                                                        {/* <Image src={arrowBtn1} className={styles.arrowBtn1} /> */}
                                                                                                        <motion.span
                                                                                                            className='arrow_svvv' drag="x"
                                                                                                            dragConstraints={{ left: 0, right: 0 }}
                                                                                                            onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                                            onDragEnd={(e, info) => handleDragEnd(e, info, item, 'yearly')}
                                                                                                            style={{ x: xPosition }}
                                                                                                            dragElastic={0.75}
                                                                                                            transition={{
                                                                                                                type: "spring",
                                                                                                                stiffness: 15,
                                                                                                                damping: 7,
                                                                                                                mass: 0.25,
                                                                                                                bounce: 0.3
                                                                                                            }}

                                                                                                        />
                                                                                                        <p>Upgrade</p>
                                                                                                    </button>
                                                                                                </>
                                                                                            ) : isUpgradable && isCancel == 1 ? (
                                                                                                <button ref={buttonRef} className={`${styles.arrowBtnPlan}`} >
                                                                                                    {/* <Image src={arrowBtn1} className={styles.arrowBtn1} /> */}
                                                                                                    <motion.span
                                                                                                        className='arrow_svvv' drag="x"
                                                                                                        dragConstraints={{ left: 0, right: 0 }}
                                                                                                        onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                                        onDragEnd={(e, info) => handleDragEnd(e, info, item, 'yearly')}
                                                                                                        style={{ x: xPosition }}
                                                                                                        dragElastic={0.75}
                                                                                                        transition={{
                                                                                                            type: "spring",
                                                                                                            stiffness: 15,
                                                                                                            damping: 7,
                                                                                                            mass: 0.25,
                                                                                                            bounce: 0.3
                                                                                                        }}

                                                                                                    />
                                                                                                    <p>Upgrade</p>
                                                                                                </button>
                                                                                            ) : isHigherPlan ? (
                                                                                                <button className={`${styles.arrowBtnPlan} ${styles.pricing_package_disabled}`} disabled>
                                                                                                    <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                                    <span>Buy Now</span>
                                                                                                </button>
                                                                                            ) : isCancel == 1 && isCurrentPlan ? (
                                                                                                <>
                                                                                                    <button className={`${styles.arrowBtnPlan}`}>
                                                                                                        <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                                        <span>Buy Now</span></button>
                                                                                                </>
                                                                                            ) : isCancel !== 0 && !isUpgradable && !isHigherPlan ? (
                                                                                                <button className={`${styles.arrowBtnPlan}`}>
                                                                                                    <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                                    <span>Buy Now</span>
                                                                                                </button>
                                                                                            ) : null}
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            {hasNoSubscription && (
                                                                                                <button ref={buttonRef} className={`${styles.arrowBtnPlan}`}>
                                                                                                    {/* <Image src={arrowBtn1} className={styles.arrowBtn1} /> */}
                                                                                                    <motion.span
                                                                                                        className='arrow_svvv' drag="x"
                                                                                                        dragConstraints={{ left: 0, right: 0 }}
                                                                                                        onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                                        onDragEnd={(e, info) => handleDragEnd(e, info, item, 'yearly')}
                                                                                                        style={{ x: xPosition }}
                                                                                                        dragElastic={0.75}
                                                                                                        transition={{
                                                                                                            type: "spring",
                                                                                                            stiffness: 15,
                                                                                                            damping: 7,
                                                                                                            mass: 0.25,
                                                                                                            bounce: 0.3
                                                                                                        }}

                                                                                                    />
                                                                                                    <p>Buy Now</p>
                                                                                                </button>
                                                                                            )}
                                                                                            {isYearly == 0 && isCurrentPlan && isCancel !== 1 && (
                                                                                                <button ref={buttonRef} className={`${styles.arrowBtnPlan}`}>
                                                                                                    {/* <Image src={arrowBtn1} className={styles.arrowBtn1} /> */}
                                                                                                    <motion.span
                                                                                                        className='arrow_svvv' drag="x"
                                                                                                        dragConstraints={{ left: 0, right: 0 }}
                                                                                                        onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                                        onDragEnd={(e, info) => handleDragEnd(e, info, item, 'yearly')}
                                                                                                        style={{ x: xPosition }}
                                                                                                        dragElastic={0.75}
                                                                                                        transition={{
                                                                                                            type: "spring",
                                                                                                            stiffness: 15,
                                                                                                            damping: 7,
                                                                                                            mass: 0.25,
                                                                                                            bounce: 0.3
                                                                                                        }}

                                                                                                    />
                                                                                                    <p>Upgrade</p>
                                                                                                </button>
                                                                                            )}

                                                                                            {isYearly == 0 && isCurrentPlan && isCancel == 1 ? (
                                                                                                <button className={`${styles.arrowBtnPlan}`}>
                                                                                                    <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                                    <span>Upgrade</span>
                                                                                                </button>
                                                                                            ) : isYearly == 0 && isCurrentPlan && isCancel !== 0 ? (
                                                                                                <button className={`${styles.arrowBtnPlan} ${styles.pricing_package_disabled}`} disabled>
                                                                                                    <span className='arrow_svvv'></span>
                                                                                                    <span>Buy Now</span>
                                                                                                </button>
                                                                                            ) : isYearly == 0 && isUpgradable && !isCurrentPlan && isCancel !== 1 ? (
                                                                                                <button ref={buttonRef} className={`${styles.arrowBtnPlan}`}>
                                                                                                    {/* <Image src={arrowBtn1} className={styles.arrowBtn1} /> */}
                                                                                                    <motion.span
                                                                                                        className='arrow_svvv' drag="x"
                                                                                                        dragConstraints={{ left: 0, right: 0 }}
                                                                                                        onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                                        onDragEnd={(e, info) => handleDragEnd(e, info, item, 'yearly')}
                                                                                                        style={{ x: xPosition }}
                                                                                                        dragElastic={0.75}
                                                                                                        transition={{
                                                                                                            type: "spring",
                                                                                                            stiffness: 15,
                                                                                                            damping: 7,
                                                                                                            mass: 0.25,
                                                                                                            bounce: 0.3
                                                                                                        }}

                                                                                                    />
                                                                                                    <p>Upgrade</p>
                                                                                                </button>
                                                                                            ) : isYearly == 0 && isHigherPlan && isCancel == 1 ? (
                                                                                                <button ref={buttonRef} className={`${styles.arrowBtnPlan}`}>
                                                                                                    {/* <Image src={arrowBtn1} className={styles.arrowBtn1} /> */}
                                                                                                    <motion.span
                                                                                                        className='arrow_svvv' drag="x"
                                                                                                        dragConstraints={{ left: 0, right: 0 }}
                                                                                                        onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                                        onDragEnd={(e, info) => handleDragEnd(e, info, item, 'yearly')}
                                                                                                        style={{ x: xPosition }}
                                                                                                        dragElastic={0.75}
                                                                                                        transition={{
                                                                                                            type: "spring",
                                                                                                            stiffness: 15,
                                                                                                            damping: 7,
                                                                                                            mass: 0.25,
                                                                                                            bounce: 0.3
                                                                                                        }}

                                                                                                    />
                                                                                                    <p>Upgrade</p>
                                                                                                </button>
                                                                                            ) : isYearly == 0 && isHigherPlan && (isCancel == 1 || isCancel == 0) ? (
                                                                                                <button ref={buttonRef} className={`${styles.arrowBtnPlan}`}>
                                                                                                    {/* <Image src={arrowBtn1} className={styles.arrowBtn1} /> */}
                                                                                                    <motion.span
                                                                                                        className='arrow_svvv' drag="x"
                                                                                                        dragConstraints={{ left: 0, right: 0 }}
                                                                                                        onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                                        onDragEnd={(e, info) => handleDragEnd(e, info, item, 'yearly')}
                                                                                                        style={{ x: xPosition }}
                                                                                                        dragElastic={0.75}
                                                                                                        transition={{
                                                                                                            type: "spring",
                                                                                                            stiffness: 15,
                                                                                                            damping: 7,
                                                                                                            mass: 0.25,
                                                                                                            bounce: 0.3
                                                                                                        }}

                                                                                                    />
                                                                                                    <p>Upgrade</p>
                                                                                                </button>
                                                                                            ) : isYearly == 0 && isUpgradable && isCancel == 1 ? (
                                                                                                <button ref={buttonRef} className={`${styles.arrowBtnPlan}`} >
                                                                                                    {/* <Image src={arrowBtn1} className={styles.arrowBtn1} /> */}
                                                                                                    <motion.span
                                                                                                        className='arrow_svvv' drag="x"
                                                                                                        dragConstraints={{ left: 0, right: 0 }}
                                                                                                        onDrag={(e, info) => setXPosition(info.point.x)}
                                                                                                        onDragEnd={(e, info) => handleDragEnd(e, info, item, 'yearly')}
                                                                                                        style={{ x: xPosition }}
                                                                                                        dragElastic={0.75}
                                                                                                        transition={{
                                                                                                            type: "spring",
                                                                                                            stiffness: 15,
                                                                                                            damping: 7,
                                                                                                            mass: 0.25,
                                                                                                            bounce: 0.3
                                                                                                        }}

                                                                                                    />
                                                                                                    <p>Upgrade</p>
                                                                                                </button>
                                                                                            ) : null}
                                                                                        </>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div className='d-lg-none d-block'>
                                                                            <div className={styles.mainBoxPkg}>
                                                                                <div className={`${styles.headerPkg} d-flex justify-content-between`}>
                                                                                    <div className={styles.box1}>
                                                                                        <h3 className={styles.pkgNameHeader}>{item?.name?.toLowerCase()}</h3>
                                                                                        <h4>PKR  {item?.price?.toLocaleString()}</h4>
                                                                                        {item?.name == "PREMIUM" && (
                                                                                            <span> <Image src={star2new} className={`${styles.star2} img-fluid dd`}></Image> OUR BEST PLAN </span>
                                                                                        )}
                                                                                    </div>
                                                                                    <div className={styles.box2}>

                                                                                        {item?.header?.length > 0 && item?.header?.map((header) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <div className={styles.packgTextHead}>
                                                                                                        <Image src={header?.icon} width={14} height={14} className={`${styles.icoleft} img-fluid`}></Image>
                                                                                                        <span className={header?.title == "No Health Insurance" ? styles.healthColr : ""}>  {header?.title} </span>
                                                                                                    </div>
                                                                                                </>
                                                                                            )
                                                                                        })}
                                                                                    </div>
                                                                                </div>
                                                                                <button className={styles.viewDetailBtn} onClick={() => handleViewDetails(item.id, item?.name, 'yearly')}>
                                                                                    View Details  <Image src={rightarrowNew1} width={14} height={14} className={`${styles.icoleft} img-fluid`}></Image>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </>

                                                                )}
                                                                <div className={`${styles.PkgBox} d-lg-block d-none`}>
                                                                    <h4 className={styles.pkgBoxHeader}>{item?.name}
                                                                        {item?.name == "PREMIUM" && (
                                                                            <span> <Image src={star2new} className={`${styles.star2} img-fluid dd`}></Image> Our best Plan</span>
                                                                        )}
                                                                    </h4>
                                                                    <h3>PKR {item?.price?.toLocaleString()}</h3>
                                                                    <ul className={`${styles.pkgListingBox}`}>
                                                                        {item?.footer?.map((footer) => {
                                                                            return (
                                                                                <>
                                                                                    {footer?.status && (
                                                                                        <>
                                                                                            <li className={`${styles.pkgList}`}>
                                                                                                <div className={`${styles.text} d-flex`}>
                                                                                                    <Image src={footer?.icon} width={20} height={20} className={`${styles.icoleft} img-fluid`}></Image>
                                                                                                    <p>{footer?.title}</p>
                                                                                                    {footer?.has_info_icon == true && (
                                                                                                        <Image src={info} onClick={footer?.has_info_icon && footer?.options?.length > 0 ? handleShowHealth : footer?.title !== "Doctor Consults" ? handleShowVital : handleShowConsultNow} className={`${styles.icoright} img-fluid`}></Image>
                                                                                                    )}
                                                                                                </div>
                                                                                                <p className={`${styles.text01}`}>
                                                                                                    {footer?.options?.length > 0 ? (
                                                                                                        <span className={`${styles.takaful}`}>
                                                                                                            <Image src={Takaful} className={`img-fluid`} />
                                                                                                        </span>
                                                                                                    ) : footer?.limit}
                                                                                                </p>
                                                                                            </li>
                                                                                        </>
                                                                                    )}
                                                                                    {footer?.status && footer?.has_info_icon && footer?.options?.length > 0 && footer?.options?.map((options) => {
                                                                                        return (
                                                                                            <ul className={`${styles.subList}`}>
                                                                                                <li className={`${styles.pkgList} ${styles.pkgListLast}  ${styles.noCoveragee}`}>
                                                                                                    <div className={`${styles.text}`}>
                                                                                                        <p>{options?.title}</p>
                                                                                                    </div>
                                                                                                    <p className={`${styles.text01}`}> PKR {Number(options?.value)?.toLocaleString()} </p>
                                                                                                </li>
                                                                                            </ul>
                                                                                        )
                                                                                    })}
                                                                                </>
                                                                            )
                                                                        })}

                                                                    </ul>
                                                                    {!Authorization ? (
                                                                        <button onClick={(e) => checkUser(e, item, 'yearly')} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''}`}>
                                                                            <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                            <p>Buy Now</p>
                                                                        </button>
                                                                    ) : isCorporate == true ? (
                                                                        <button className={`${styles.arrowBtnPlan} ${styles.pricing_package_disabled}`}>
                                                                            <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                            <p>Buy Now</p>
                                                                        </button>
                                                                    ) : (
                                                                        <>
                                                                            {isYearly == 1 ? (
                                                                                <>
                                                                                    {isCurrentPlan && isCancel === 0 ? (
                                                                                        <button onClick={(e) => handleDragCancelDesktop(item)} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''} cancelPlanBtn btn__MA`}>
                                                                                            <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                            <p>Cancel</p>
                                                                                        </button>
                                                                                    ) : isCurrentPlan && isCancel == 1 ? (
                                                                                        <button onClick={(e) => checkUser(e, item, 'yearly')} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''} btn__MA`}>
                                                                                            <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                            <p>Buy Now</p>
                                                                                        </button>
                                                                                    ) : isUpgradable && !isCurrentPlan && isCancel !== 1 ? (
                                                                                        <>
                                                                                            <button onClick={(e) => checkUser(e, item, 'yearly')} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''} btn__MA`}>
                                                                                                <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                                <p>Upgrade </p>
                                                                                            </button>
                                                                                        </>
                                                                                    ) : isUpgradable && isCancel == 1 ? (
                                                                                        <button onClick={(e) => checkUser(e, item, 'yearly')} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''} btn__MA`} >
                                                                                            <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                            <p>Upgrade</p>
                                                                                        </button>
                                                                                    ) : isHigherPlan ? (
                                                                                        <button className={`${styles.arrowBtnPlan} ${styles.pricing_package_disabled}`} disabled>
                                                                                            <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                            <span>Buy Now</span>
                                                                                        </button>
                                                                                    ) : isCancel == 1 && isCurrentPlan ? (
                                                                                        <>
                                                                                            <button className={`${styles.arrowBtnPlan}`}>
                                                                                                <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                                <span>Buy Now</span></button>
                                                                                        </>
                                                                                    ) : isCancel !== 0 && !isUpgradable && !isHigherPlan ? (
                                                                                        <button className={`${styles.arrowBtnPlan}`}>
                                                                                            <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                            <span>Buy Now</span>
                                                                                        </button>
                                                                                    ) : null}
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    {hasNoSubscription && (
                                                                                        <button onClick={(e) => checkUser(e, item, 'yearly')} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''} btn__MA`}>
                                                                                            <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                            <p>Buy Now</p>
                                                                                        </button>
                                                                                    )}
                                                                                    {isYearly == 0 && isCurrentPlan && isCancel !== 1 && (
                                                                                        <button onClick={(e) => checkUser(e, item, 'yearly')} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''} btn__MA`}>
                                                                                            <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                            <p>Upgrade</p>
                                                                                        </button>
                                                                                    )}

                                                                                    {isYearly == 0 && isCurrentPlan && isCancel == 1 ? (
                                                                                        <button onClick={(e) => checkUser(e, item, 'yearly')} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''} btn__MA`}>
                                                                                            <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                            <p>Upgrade</p>
                                                                                        </button>
                                                                                    ) : isYearly == 0 && isCurrentPlan && isCancel !== 0 ? (
                                                                                        <button className={`${styles.arrowBtnPlan} ${styles.pricing_package_disabled}`} disabled>
                                                                                            {/* <Image src={arrowBtn1} className={styles.arrowBtn1} /> */}
                                                                                            <span>Buy Now</span>
                                                                                        </button>
                                                                                    ) : isYearly == 0 && isUpgradable && !isCurrentPlan && isCancel !== 1 ? (
                                                                                        <button onClick={(e) => checkUser(e, item, 'yearly')} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''} btn__MA`}>
                                                                                            <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                            <p>Upgrade</p>
                                                                                        </button>
                                                                                    ) : isYearly == 0 && isHigherPlan && isCancel == 1 ? (
                                                                                        <button onClick={(e) => checkUser(e, item, 'yearly')} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''} btn__MA`}>
                                                                                            <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                            <p>Upgrade</p>
                                                                                        </button>
                                                                                    ) : isYearly == 0 && isHigherPlan && (isCancel == 1 || isCancel == 0) ? (
                                                                                        <button

                                                                                            onClick={(e) => checkUser(e, item, 'yearly')}
                                                                                            className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''} btn__MA`}>
                                                                                            <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                            <p>Upgrade</p>
                                                                                        </button>
                                                                                    ) : isYearly == 0 && isUpgradable && isCancel == 1 ? (
                                                                                        <button onClick={(e) => checkUser(e, item, 'yearly')} className={`${styles.arrowBtnPlan} ${addButtonClass[item.id] || ''} btn__MA`} >
                                                                                            <Image src={arrowBtn1} className={styles.arrowBtn1} />
                                                                                            <p>Upgrade</p>
                                                                                        </button>
                                                                                    ) : null}
                                                                                </>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </Col>
                                                        </>
                                                    )
                                                })}
                                                </Row>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </>
                        )}
                    </Row>


                </Container>
            </section >
            <SubscriptionModal backdrop={true} setShow={setShow} show={show} handleShow={handleShow} handleClose={handleClose} />

            <ConsultNowModal
                consultNowInformation={consultNowInformation}
                consultNowModal={consultNowModal}
                handleCloseConsultNow={handleCloseConsultNow}
                handleShowConsultNow={handleShowConsultNow}
            />
            <VitalScanModal
                vitalInformation={vitalInformation}
                showVitalScan={showVitalScan}
                handleCloseVital={handleCloseVital}
                handleShowVital={handleShowVital}
            />
            <HealthCovrageModal
                healthInsuranceInformation={healthInsuranceInformation}
                showhealthCovrageModal={showhealthCovrageModal}
                handleCloseHealth={handleCloseHealth}
                handleShowHealth={handleShowHealth}
            />
        </>
    )
}

export default packageSection
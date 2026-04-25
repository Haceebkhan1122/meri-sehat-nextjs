import styles from './priceTabs.module.css';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import infoIcon from '../../../public/svg/newPages/info.svg'
import closeBox from '../../../public/svg/newPages/closeBox.svg'
import arrowBtn11 from '../../../public/svg/newPages/arrowBtn11.svg'
import starNew from '../../../public/svg/newPages/starNew.svg'
import arrowBtn1 from '../../../public/svg/newPages/rightarrowNew1.svg'
import useMediaQuery from '@mui/material/useMediaQuery';
import VitalScanModal from '../../../components/componentsUpdated/Pricing/vitalScanModal/vitalScanModal';
import HealthCovrageModal from '../../../components/componentsUpdated/Pricing/healthCovrageModal/healthCovrageModal';
import Cookies from "js-cookie";
import SubscriptionModal from '../../subscription/modalSubscription/modalSubscription';
import { getVitalScan, getHealthInsurance, getConsultNowInfo } from '@/utils/endpoints';
import ConsultNowModal from '../../../components/componentsUpdated/Pricing/consultNowModal/consultNowModal';
import { APIV3 } from '@/utils/httpService';


const PriceTabs = ({ userDetails, subscriptionDetails }) => {
    const [isCorporate, setIsCorporate] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [showhealthCovrageModal, setShowhealthCovrageModal] = useState(false);
    const [show, setShow] = useState(false);
    const [activePackage1, setActivePackage1] = useState(null);
    const [showVitalScan, setShowVitalScan] = useState(false);
    const handleCloseVital = () => setShowVitalScan(false);
    const handleShowVital = () => setShowVitalScan(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const isMobile = useMediaQuery('(max-width:767px)');
    const [vitalInformation, setVitalInformation] = useState(null);
    const [consultNowInformation, setConsultNowInformation] = useState(null);
    const [healthInsuranceInformation, setHealthInsuranceInformation] = useState(null);

    const [consultNowModal, setConsultNowModal] = useState(false);
    const handleCloseConsultNow = () => setConsultNowModal(false);
    const handleShowConsultNow = () => setConsultNowModal(true);


    const handleViewDetails = (id) => {
        setActivePackage1(id);  // Set the clicked package as active
    };

    const handleCloseHealth = () => setShowhealthCovrageModal(false);
    const handleShowHealth = () => setShowhealthCovrageModal(true);

    const handleCloseDetails = () => {
        setActivePackage1(null);  // Hide details by setting activePackage to null
    };
    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        setIsCorporate(userDetails?.user?.is_corporate)
    }, [userDetails])

    const checkUser = (e, item, yearly) => {
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
    };

    const isBuyPlanVisible = (subPackId, subscription, switchChecked) => {
        if (!subscription) return true;
        if (subscription.is_weekly) return true;

        if (switchChecked === false) {
            if (subscription.is_yearly === 1) return true;
            return subscription.package?.id ? (
                subPackId === subscription.package.id && subscription.is_cancel === 1
                || subPackId > subscription.package.id
            ) : true;
        }

        if (switchChecked === true) {
            if (subscription.is_yearly === 0) return true;
            return subscription.package?.id ? (
                subPackId === subscription.package.id && subscription.is_cancel === 1
                || subPackId > subscription.package.id
            ) : true;
        }

        return true;
    };

    const isSubscriptionUpgradable = (subPackId, subscription, switchChecked) => {
        if (!subscription) return false;
        if (subscription.is_weekly) return true;

        if (switchChecked === false) {
            if (subscription.is_yearly === 1) return false;
            return subscription.package?.id ? subPackId > subscription.package.id : false;
        }

        if (switchChecked === true) {
            if (subscription.is_yearly === 0) return true;
            return subscription.package?.id ? subPackId > subscription.package.id : false;
        }

        return false;
    };

    const isBuyPlanDisabled = (subPackId, subscription, switchChecked) => {
        if (!subscription) return false;
        if (subscription.is_weekly) return false;

        if (switchChecked === false) {
            if (subscription.is_yearly === 1) return true;
            return subscription.package?.id ? subPackId <= subscription.package.id : false;
        }

        if (switchChecked === true) {
            if (subscription.is_yearly === 0) return false;
            return subscription.package?.id ? subPackId <= subscription.package.id : false;
        }

        return false;
    };

    const fetchVitalsData = async () => {
        const headers = {
            Locale: 1, // Set your desired locale header value
        };
        const res = await APIV3.get(getVitalScan, headers)
        if (res?.status == 200) {
            setVitalInformation(res?.data?.data)
        }
    }

    const fetchConsultNowData = async () => {
        const headers = {
            Locale: 1, // Set your desired locale header value
        };
        const res = await APIV3.get(getConsultNowInfo, headers)
        if (res?.status == 200) {
            setConsultNowInformation(res?.data?.data)
        }
    }

    const fetchHealthInsuranceData = async () => {
        const headers = {
            Locale: 1, // Set your desired locale header value
        };
        const res = await APIV3.get(getHealthInsurance, headers)
        if (res?.status == 200) {
            setHealthInsuranceInformation(res?.data?.data)
        }
    }

    useEffect(() => {
        fetchVitalsData();
        fetchHealthInsuranceData();
        fetchConsultNowData();
    }, [])

    return (
        <>
            <div className=''>
                <div className={`${styles.topToggleBox} mx-4`}>
                    <div className={`${styles.tabsBox} ${!isChecked ? `${styles.active}` : 'monthly'}`}>
                        <p>Monthly  </p>
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
                        <p>Yearly</p>
                        <span>{subscriptionDetails?.discounted_percent_yearly}% OFF</span>

                    </div>
                </div>
                <div className={styles.scrollBar}>
                    <div className='mx-4'>
                        {!isChecked ? (
                            <div className={`${styles.yearlyBox} ${styles.newPackage}`}>
                                <div>
                                    {subscriptionDetails?.monthly?.length > 0 && subscriptionDetails?.monthly?.map((pkg) => {
                                        const Authorization = Cookies.get("Authorization");
                                        const subscription = userDetails?.user?.subscription;
                                        const isYearly = userDetails?.user?.subscription?.is_yearly;
                                        const isCorporate = userDetails?.user?.is_corporate === true;
                                        const isCurrentPlan = subscription?.package?.id === pkg?.id; // Condition to check if the package is the current subscription
                                        const isUpgradable = subscription?.package?.id < pkg?.id; // Condition to check if the current subscription is less than the package
                                        const isHigherPlan = subscription?.package?.id > pkg?.id; // Condition to check if the current subscription is greater than the package
                                        const hasNoSubscription = !subscription; // Condition to check if the user has no subscription
                                        const isCancel = userDetails?.user?.subscription?.is_cancel; // Check the cancellation status
                                        return (
                                            <div key={pkg?.id}>
                                                {activePackage1 === pkg?.id ? (
                                                    <div className={styles.pkg_detail_Box}>
                                                        <div className={styles.closeBtn} onClick={handleCloseDetails}>
                                                            <Image src={closeBox} className="img-fluid" />
                                                        </div>
                                                        <h3>{pkg?.name?.toLowerCase()}</h3>
                                                        <h4>
                                                            <span>PKR</span>{pkg?.price?.toLocaleString()}
                                                        </h4>
                                                        {pkg?.id == 2 && (
                                                            <div className={`${styles.pkgPop} d-flex`}>
                                                                <Image src={starNew} className="img-fluid" />
                                                                <p>Most Popular</p>
                                                            </div>
                                                        )}
                                                        <ul className="mt-4 pt-1">
                                                            {pkg?.footer?.map((footer) => {
                                                                return (
                                                                    <>
                                                                        {footer?.status && (
                                                                            <li className={styles.pkgList}>
                                                                                <div className={`${styles.text} d-flex`}>
                                                                                    <Image
                                                                                        src={footer?.icon}
                                                                                        className={`${styles.icoleft} img-fluid`}
                                                                                        width={27}
                                                                                        height={27}
                                                                                    />
                                                                                    <p className={styles.nameDet}>{footer?.title}</p>
                                                                                    {footer?.has_info_icon && (
                                                                                        <Image
                                                                                            src={infoIcon}
                                                                                            onClick={footer?.has_info_icon && footer?.options?.length > 0 ? handleShowHealth : footer?.title !== "Doctor Consults" ? handleShowVital : handleShowConsultNow}
                                                                                            className={`${styles.icoright} img-fluid`}
                                                                                            width={27}
                                                                                        />
                                                                                    )}
                                                                                </div>

                                                                                <p className={styles.text01}>{footer?.limit}</p>
                                                                            </li>
                                                                        )}
                                                                        {footer?.status && footer?.has_info_icon && footer?.options?.length > 0 && (
                                                                            <ul className="insuranceData">
                                                                                {footer?.options?.map((options) => (
                                                                                    <li key={options?.title}>
                                                                                        <span className="title">{options?.title}</span>
                                                                                        <span className="title value">PKR {options?.value}</span>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        )}
                                                                    </>
                                                                )
                                                            })}
                                                        </ul>

                                                        {/* Show Buy Now or Upgrade based on subscription and cancel status */}
                                                        {!Authorization ? (
                                                            <button onClick={(e) => checkUser(e, pkg)} className={styles.arrowBtnPlan}>
                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                <span>BUY NOW</span>
                                                            </button>
                                                        ) : subscription?.is_weekly ? (
                                                            <button onClick={(e) => checkUser(e, pkg)} className={styles.arrowBtnPlan}>
                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                <span>{isCorporate ? 'UPGRADE' : 'BUY NOW'}</span>
                                                            </button>
                                                        ) : isYearly == 1 ? (
                                                            <button className={`${styles.arrowBtnPlan} pricing_package_disabled`} disabled>
                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                <span>Buy Now</span>
                                                            </button>
                                                        ) : (
                                                            <>
                                                                {/* If no subscription, allow Buy Now */}
                                                                {hasNoSubscription && (
                                                                    <button onClick={(e) => checkUser(e, pkg)} className={`${styles.arrowBtnPlan}`}>
                                                                        <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                        <span>Buy Now</span>
                                                                    </button>
                                                                )}

                                                                {/* If current plan, allow Cancel if isCancel == 0, otherwise show Buy Now for the same package */}
                                                                {isCurrentPlan && !hasNoSubscription && (
                                                                    <>
                                                                        {isCancel == 0 ? (
                                                                            <button onClick={handleShow} className={`${styles.arrowBtnPlan}`}>
                                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                <span>Cancel</span>
                                                                            </button>
                                                                        ) : isUpgradable && isCancel == 1 && (
                                                                            <button onClick={(e) => checkUser(e, pkg)} className={`${styles.arrowBtnPlan}`}>
                                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                <span>Buy Now</span>
                                                                            </button>
                                                                        )}
                                                                    </>
                                                                )}

                                                                {/* If upgradable and isCancel is 1, allow Upgrade */}
                                                                {isCurrentPlan && isCancel !== 0 && (
                                                                    <button onClick={(e) => checkUser(e, pkg)} className={`${styles.arrowBtnPlan}`}>
                                                                        <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                        <span>Buy Now</span>
                                                                    </button>
                                                                )}

                                                                {isUpgradable && !isCurrentPlan && isCancel !== 0 && (
                                                                    <button onClick={(e) => checkUser(e, pkg)} className={`${styles.arrowBtnPlan}`} >
                                                                        <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                        <span>Upgrade</span>
                                                                    </button>
                                                                )}
                                                                {isUpgradable && !isCurrentPlan && isCancel !== 1 && (
                                                                    <button onClick={(e) => checkUser(e, pkg)} className={`${styles.arrowBtnPlan}`}>
                                                                        <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                        <span>Upgrade</span>
                                                                    </button>
                                                                )}

                                                                {/* If current plan is higher and isCancel is 1, show enabled Buy Now */}
                                                                {isYearly == 0 && isHigherPlan && isCancel == 1 && (
                                                                    <button onClick={(e) => checkUser(e, pkg)} className={`${styles.arrowBtnPlan} pricing_package_disabled`} disabled>
                                                                        <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                        <span>Buy Now</span>
                                                                    </button>
                                                                )}

                                                                {/* If canceled, show disabled Buy Now */}
                                                                {isHigherPlan && isCancel !== 1 && (
                                                                    <button className={`${styles.arrowBtnPlan} pricing_package_disabled`} disabled>
                                                                        <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                        <span>Buy Now</span>
                                                                    </button>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className={styles.mainBoxPkg}>
                                                        <div className={`${styles.headerPkg} d-flex justify-content-between`}>
                                                            <div className={styles.box1}>
                                                                <h3>{pkg?.name?.toLowerCase()}</h3>
                                                                <h4>PKR {pkg?.price?.toLocaleString()}</h4>
                                                            </div>
                                                            <div className={styles.box2}>
                                                                {pkg?.header?.map((header) => (
                                                                    <p key={header?.title}>
                                                                        {isMobile && <Image src={header?.icon} width={12} height={12} className={`${styles.icoleft} img-fluid`}></Image>}
                                                                        {header?.title}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <button className={styles.viewDetailBtn} onClick={() => handleViewDetails(pkg?.id)}>
                                                            View Details
                                                            <span className={styles.mobileShow}>
                                                                {isMobile && <Image src={arrowBtn1} className=''></Image>}

                                                            </span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className={`${styles.yearlyBox} ${styles.newPackage}`}>
                                <div>
                                    {subscriptionDetails?.yearly?.length > 0 && subscriptionDetails?.yearly?.map((pkg) => {
                                        const Authorization = Cookies.get("Authorization");
                                        const subscription = userDetails?.user?.subscription;
                                        const isYearly = userDetails?.user?.subscription?.is_yearly;
                                        const isCorporate = userDetails?.user?.is_corporate === true;
                                        const isCurrentPlan = subscription?.package?.id === pkg?.id; // Check if this package is the current subscription
                                        const isUpgradable = subscription?.package?.id < pkg?.id; // Check if the current subscription is less than the package
                                        const isHigherPlan = subscription?.package?.id > pkg?.id; // Check if the current subscription is greater than the package
                                        const hasNoSubscription = !subscription; // Check if the user has no subscription
                                        const isCancel = userDetails?.user?.subscription?.is_cancel; // Check the cancellation status
                                        return (
                                            <div key={pkg?.id}>
                                                {activePackage1 === pkg?.id ? (
                                                    <div className={styles.pkg_detail_Box}>
                                                        <div className={styles.closeBtn} onClick={handleCloseDetails}>
                                                            <Image src={closeBox} className="img-fluid" />
                                                        </div>
                                                        <h3>{pkg?.name?.toLowerCase()}</h3>
                                                        <h4>
                                                            <span>PKR</span>{pkg.price?.toLocaleString()}
                                                        </h4>
                                                        {pkg?.id == 2 && (
                                                            <div className={`${styles.pkgPop} d-flex`}>
                                                                <Image src={starNew} className="img-fluid" />
                                                                <p>Most Popular</p>
                                                            </div>
                                                        )}
                                                        <ul className="mt-4 pt-1">
                                                            {pkg?.footer?.map((footer) => (
                                                                <React.Fragment key={footer?.title}>
                                                                    {footer?.status && (
                                                                        <li className={styles.pkgList}>
                                                                            <div className={`${styles.text} d-flex`}>
                                                                                <Image
                                                                                    src={footer?.icon}
                                                                                    className={`${styles.icoleft} img-fluid`}
                                                                                    width={27}
                                                                                    height={27}
                                                                                />
                                                                                <p className={styles.nameDet}>{footer?.title}</p>
                                                                                {footer?.has_info_icon && (
                                                                                    <Image
                                                                                        src={infoIcon}
                                                                                        onClick={footer?.has_info_icon && footer?.options?.length > 0 ? handleShowHealth : footer?.title !== "Doctor Consults" ? handleShowVital : handleShowConsultNow}
                                                                                        className={`${styles.icoright} img-fluid`}
                                                                                        width={27}
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                            <p className={styles.text01}>{footer?.limit}</p>
                                                                        </li>
                                                                    )}
                                                                    {footer?.status && footer?.has_info_icon && footer?.options?.length > 0 && (
                                                                        <ul className="insuranceData">
                                                                            {footer?.options?.map((options) => (
                                                                                <li key={options?.title}>
                                                                                    <span className="title">{options?.title}</span>
                                                                                    <span className="title value"> PKR {options?.value}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}
                                                        </ul>

                                                        {/* Show Buy Now, Cancel, Upgrade, or Disabled based on subscription and cancel status */}
                                                        {!Authorization ? (
                                                            <button onClick={(e) => checkUser(e, pkg, 'yearly')} className={`${styles.arrowBtnPlan} pricing_package_disabled`}>
                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                <span>BUY NOW</span>
                                                            </button>
                                                        ) : subscription?.is_weekly ? (
                                                            <button onClick={(e) => checkUser(e, pkg)} className={styles.arrowBtnPlan}>
                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                <span>{isCorporate ? 'UPGRADE' : 'BUY NOW'}</span>
                                                            </button>
                                                        ) : (
                                                            <>
                                                                {isYearly == 1 ? (
                                                                    <>
                                                                        {isCurrentPlan && isCancel === 0 ? (
                                                                            <button onClick={handleShow} className={`${styles.arrowBtnPlan}`}>
                                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                <span>Cancel</span>
                                                                            </button>
                                                                        ) : isCurrentPlan && isCancel == 1 ? (
                                                                            <button onClick={(e) => checkUser(e, pkg, 'yearly')} className={`${styles.arrowBtnPlan}`}>
                                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                <span>Buy Now</span>
                                                                            </button>
                                                                        ) : isUpgradable && !isCurrentPlan && isCancel !== 1 ? (
                                                                            <>
                                                                                <button onClick={(e) => checkUser(e, pkg, 'yearly')} className={`${styles.arrowBtnPlan}`}>
                                                                                    <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                    <span>Upgrade</span>
                                                                                </button>
                                                                            </>
                                                                        ) : isUpgradable && isCancel == 1 ? (
                                                                            <button onClick={(e) => checkUser(e, pkg, 'yearly')} className={`${styles.arrowBtnPlan}`} >
                                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                <span>Upgrade</span>
                                                                            </button>
                                                                        ) : isHigherPlan ? (
                                                                            <button className={`${styles.arrowBtnPlan} pricing_package_disabled`} disabled>
                                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                <span>Buy Now</span>
                                                                            </button>
                                                                        ) : isCancel == 1 && isCurrentPlan ? (
                                                                            <>
                                                                                <button onClick={(e) => checkUser(e, pkg, 'yearly')} className={`${styles.arrowBtnPlan}`}>
                                                                                    <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                    <span>Buy Now</span></button>
                                                                            </>
                                                                        ) : isCancel !== 0 && !isUpgradable && !isHigherPlan ? (
                                                                            <button onClick={(e) => checkUser(e, pkg, 'yearly')} className={`${styles.arrowBtnPlan}`}>
                                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                <span>Buy Now</span>
                                                                            </button>
                                                                        ) : null}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {hasNoSubscription && (
                                                                            <button onClick={(e) => checkUser(e, pkg, 'yearly')} className={`${styles.arrowBtnPlan}`}>
                                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                <span>Buy Now</span>
                                                                            </button>
                                                                        )}
                                                                        {isYearly == 0 && isCurrentPlan && isCancel !== 1 && (
                                                                            <button onClick={(e) => checkUser(e, pkg, 'yearly')} className={`${styles.arrowBtnPlan}`}>
                                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                <span>Upgrade</span>
                                                                            </button>
                                                                        )}

                                                                        {isYearly == 0 && isCurrentPlan && isCancel == 1 ? (
                                                                            <button onClick={(e) => checkUser(e, pkg, 'yearly')} className={`${styles.arrowBtnPlan}`}>
                                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                <span>Upgrade</span>
                                                                            </button>
                                                                        ) : isYearly == 0 && isCurrentPlan && isCancel !== 0 ? (
                                                                            <button className={`${styles.arrowBtnPlan} pricing_package_disabled`} disabled>
                                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                <span>Buy Now </span>
                                                                            </button>
                                                                        ) : isYearly == 0 && isUpgradable && !isCurrentPlan && isCancel !== 1 ? (
                                                                            <button onClick={(e) => checkUser(e, pkg, 'yearly')} className={`${styles.arrowBtnPlan}`}>
                                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                <span>Upgrade </span>
                                                                            </button>
                                                                        ) : isYearly == 0 && isHigherPlan && isCancel == 1 ? (
                                                                            <button onClick={(e) => checkUser(e, pkg, 'yearly')} className={`${styles.arrowBtnPlan}`}>
                                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                <span>Upgrade</span>
                                                                            </button>
                                                                        ) : isYearly == 0 && isHigherPlan && (isCancel == 1 || isCancel == 0) ? (
                                                                            <button onClick={(e) => checkUser(e, pkg, 'yearly')} className={`${styles.arrowBtnPlan}`}>
                                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                <span>Upgrade</span>
                                                                            </button>
                                                                        ) : isYearly == 0 && isUpgradable && isCancel == 1 ? (
                                                                            <button onClick={(e) => checkUser(e, pkg, 'yearly')} className={`${styles.arrowBtnPlan}`} >
                                                                                <Image src={arrowBtn11} className={styles.arrowBtn1} />
                                                                                <span>Upgrade</span>
                                                                            </button>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className={styles.mainBoxPkg}>
                                                        <div className={`${styles.headerPkg} d-flex justify-content-between`}>
                                                            <div className={styles.box1}>
                                                                <h3>{pkg?.name?.toLowerCase()}</h3>
                                                                <h4>PKR {pkg?.price?.toLocaleString()}</h4>
                                                            </div>
                                                            <div className={styles.box2}>
                                                                {pkg?.header?.map((header) => (
                                                                    <p key={header?.title}>{header?.title}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <button className={styles.viewDetailBtn} onClick={() => handleViewDetails(pkg?.id)}>
                                                            View Details
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div >

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
                showhealthCovrageModal={showhealthCovrageModal}
                handleCloseHealth={handleCloseHealth}
                handleShowHealth={handleShowHealth}
            />
            <SubscriptionModal backdrop={true} setShow={setShow} show={show} handleShow={handleShow} handleClose={handleClose} />

        </>
    )
}
export default PriceTabs;
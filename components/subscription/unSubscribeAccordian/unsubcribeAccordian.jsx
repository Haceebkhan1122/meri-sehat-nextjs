import React, { useEffect, useState } from 'react'
import styles from './unsubcribeAccordian.module.css';
import { Card, Nav } from 'react-bootstrap';
import { useRouter } from "next/router";
import SubscriptionModal from '../../subscription/modalSubscription/modalSubscription';
import infoIconSvg from '../../../public/svg/infoIconSvg.svg'
import Image from "next/image";
import ModalVitals from '../../modalVitals/ModalVitals';
import LearnMoreModal from '../../learnMoreModal/LearnMoreModal';
import Cookies from 'js-cookie';


const UnsubcribeAccordian = ({ Scans, isCorporate, yearlyTab3, setYearlyTab3, monthlyTab3, setMonthlyTab3, accordionOpen, setYearlyTab2, monthlyTab2, setMonthlyTab2, yearlyTab2, index, userDetails, subscriptionDetails, setSelectedBox, isActivePackage, getInsuranceInfo, subscriptionID, monthlyTab, setMonthlyTab, yearlyTab, setYearlyTab, subscription, isAuthorized, isCancel, isYearly }) => {
    const router = useRouter();
    const [localMonthlyTab, setLocalMonthlyTab] = useState(true);
    const [localYearlyTab, setLocalYearlyTab] = useState(false);

    const [localMonthlyTab2, setLocalMonthlyTab2] = useState(true);
    const [localYearlyTab2, setLocalYearlyTab2] = useState(false);
    const [consumedData, setConsumedData] = useState([]);

    const [localMonthlyTab3, setLocalMonthlyTab3] = useState(true);
    const [localYearlyTab3, setLocalYearlyTab3] = useState(false);

    const [showVitals, setShowVitals] = useState(false)
    const [showLearn, setShowLearn] = useState(false);
    const [insuranceMonthlyLite, setInsuranceMonthlyLite] = useState(false);
    const [insuranceYearlyLite, setInsuranceYearlyLite] = useState(false);
    const [insuranceMonthlyPlus, setInsuranceMonthlyPlus] = useState(false);
    const [insuranceYearlyPlus, setInsuranceYearlyPlus] = useState(false);
    const [insuranceMonthlyPremium, setInsuranceMonthlyPremium] = useState(false);
    const [insuranceYearlyPremium, setInsuranceYearlyPremium] = useState(false);

    const handleCloseVital = () => setShowVitals(false);
    const handleShowVital = () => setShowVitals(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseLearn = () => setShowLearn(false);
    const handleShowLearn = () => setShowLearn(true);


    Cookies.remove("hasInsurance")

    useEffect(() => {
        if (subscriptionDetails) {
            // Using some instead of map to check if any item satisfies the condition
            if (subscriptionDetails[0]?.consumed_data?.monthly?.some(monthlyLite => monthlyLite?.has_insurance === true)) {
                setInsuranceMonthlyLite(true)
            }
            if (subscriptionDetails[0]?.consumed_data?.yearly?.some(YearlyLite => YearlyLite?.has_insurance === true)) {
                setInsuranceYearlyLite(true)
            }

            if (subscriptionDetails[1]?.consumed_data?.monthly?.some(monthlyLite => monthlyLite?.has_insurance === true)) {
                setInsuranceMonthlyPlus(true)
            }

            if (subscriptionDetails[1]?.consumed_data?.yearly?.some(YearlyLite => YearlyLite?.has_insurance === true)) {
                setInsuranceYearlyPlus(true)
            }
            if (subscriptionDetails[2]?.consumed_data?.monthly?.some(monthlyLite => monthlyLite?.has_insurance === true)) {
                setInsuranceMonthlyPremium(true)
            }

            if (subscriptionDetails[2]?.consumed_data?.yearly?.some(YearlyLite => YearlyLite?.has_insurance === true)) {
                setInsuranceYearlyPremium(true)
            }

        }
    }, [])

    const pushToSubscription = (subscriptionID) => {
        if (accordionOpen == 1) {
            if (monthlyTab) {
                if (insuranceMonthlyLite) {
                    Cookies.set("hasInsurance", true)
                    window.location.href = `/order/${subscriptionID}`;
                }
                else {
                    window.location.href = `/order/${subscriptionID}`;
                }
            }
            else if (yearlyTab) {
                if (insuranceYearlyLite) {
                    Cookies.set("hasInsurance", true)
                    window.location.href = `/order/${subscriptionID}?yearly=yearly`;
                } else {
                    window.location.href = `/order/${subscriptionID}?yearly=yearly`;
                }
            }
        } else if (accordionOpen == 2) {
            if (monthlyTab2) {
                if (insuranceMonthlyPlus) {
                    Cookies.set("hasInsurance", true)
                    window.location.href = `/order/${subscriptionID}`;
                } else {
                    window.location.href = `/order/${subscriptionID}`;

                }
            }
            else if (yearlyTab2) {
                if (insuranceYearlyPlus) {
                    Cookies.set("hasInsurance", true)
                    window.location.href = `/order/${subscriptionID}?yearly=yearly`;
                } else {
                    window.location.href = `/order/${subscriptionID}?yearly=yearly`;
                }
            }
        }
        else if (accordionOpen == 3) {
            if (monthlyTab3) {
                if (insuranceMonthlyPremium) {
                    Cookies.set("hasInsurance", true)
                    window.location.href = `/order/${subscriptionID}`;
                } else {
                    window.location.href = `/order/${subscriptionID}`;
                }
            }
            else if (yearlyTab3) {
                if (insuranceYearlyPremium) {
                    Cookies.set("hasInsurance", true)
                    window.location.href = `/order/${subscriptionID}?yearly=yearly`;
                } else {
                    window.location.href = `/order/${subscriptionID}?yearly=yearly`;
                }
            }
        }
    }

    const pushToPricing = () => {
        router.push('/pricing');
    }

    const handleTab = (tab) => {
        setSelectedBox(subscriptionDetails?.id)
        if (tab === "link-1") {
            setLocalMonthlyTab(true);
            setLocalYearlyTab(false);
            setMonthlyTab(true);
            setYearlyTab(false);
        }
        if (tab === "link-2") {
            setLocalYearlyTab(true);
            setLocalMonthlyTab(false);
            setYearlyTab(true);
            setMonthlyTab(false);
        }
    }

    const handleTab2 = (tab) => {
        setSelectedBox(subscriptionDetails?.id)
        if (tab === "link-1") {
            setLocalMonthlyTab2(true);
            setLocalYearlyTab2(false);
            setMonthlyTab2(true);
            setYearlyTab2(false);
        }
        if (tab === "link-2") {
            setLocalYearlyTab2(true);
            setLocalMonthlyTab2(false);
            setYearlyTab2(true);
            setMonthlyTab2(false);
        }
    }

    const handleTab3 = (tab) => {
        setSelectedBox(subscriptionDetails?.id)
        if (tab === "link-1") {
            setLocalMonthlyTab3(true);
            setLocalYearlyTab3(false);
            setMonthlyTab3(true);
            setYearlyTab3(false);
        }
        if (tab === "link-2") {
            setLocalYearlyTab3(true);
            setLocalMonthlyTab3(false);
            setYearlyTab3(true);
            setMonthlyTab3(false);
        }
    }


    const disableBuyNowButtonMonthly = () => {
        if (subscription.isYearly == 1) {
            return true;
        } else if (subscriptionID == subscription.id) {
            if (subscription.isCancel == 0) {
                return true;
            }
        } else if (subscriptionID <= subscription.package.id) {
            return true;
        } else {
            return false;
        }
        return false;
    }

    const disableBuyNowButtonYearly = () => {
        if (subscription.isYearly == 0) {
            return false;
        } else if (subscriptionID == subscription.package.id) {
            if (currentSubscription.isCancel == 0) {
                return true;
            }
        } else if (subscriptionID <= subscription.package.id) {
            return true;
        } else {
            return false;
        }
        return false;
    }

    useEffect(() => {
        if (userDetails?.user?.subscription_recent) {
            setConsumedData(userDetails?.user?.subscription_recent)
        }
    }, [userDetails?.user?.subscription_recent])


    return (
        <>
            <div className={`${styles.wrapperSubscriptionWallet} `}>
                <div className={styles.wrapperAll}>
                    <div className={styles.leftMonthly}>
                        <div className={styles.MonthYearTabs} >
                            {index == 0 && (
                                <Nav variant="underline" defaultActiveKey="link-1" className={`${styles.tabHeader} tabHeader`} onSelect={handleTab}>
                                    <Nav.Item className={styles.itemOne}>
                                        <Nav.Link eventKey="link-1" className={` ${styles.descTabs} descTabsMonthly `}> Monthly</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className={styles.itemTwo}>
                                        <Nav.Link className={` ${styles.descTabs} descTabsMonthly `} eventKey="link-2">Yearly</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            )}
                            {index == 1 && (
                                <Nav variant="underline" defaultActiveKey="link-1" className={`${styles.tabHeader} tabHeader`} onSelect={handleTab2}>
                                    <Nav.Item className={styles.itemOne}>
                                        <Nav.Link eventKey="link-1" className={` ${styles.descTabs} descTabsMonthly `}> Monthly</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className={styles.itemTwo}>
                                        <Nav.Link className={` ${styles.descTabs} descTabsMonthly `} eventKey="link-2">Yearly</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            )}
                            {index == 2 && (
                                <Nav variant="underline" defaultActiveKey="link-1" className={`${styles.tabHeader} tabHeader`} onSelect={handleTab3}>
                                    <Nav.Item className={styles.itemOne}>
                                        <Nav.Link eventKey="link-1" className={` ${styles.descTabs} descTabsMonthly `}> Monthly</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className={styles.itemTwo}>
                                        <Nav.Link className={` ${styles.descTabs} descTabsMonthly `} eventKey="link-2">Yearly</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            )}
                        </div>
                    </div>

                    <div className={styles.packageDetails}>
                        <div className={styles.cardDetails}>
                            {(localMonthlyTab && !localYearlyTab && accordionOpen == 1) && <Card.Text>
                                <div className='detailsPackageSubs'>
                                    <h4 >Details</h4>
                                </div>
                                {(isActivePackage == userDetails?.user?.subscription?.package?.name) && userDetails?.user?.subscription_recent?.is_yearly == 0 ?
                                    consumedData?.consumed_data?.map((itemsConsumed) => (
                                        itemsConsumed?.status == true ? (
                                            <div className={styles.mobileViewDetailBtnContainer}>
                                                <div className='d-block w-100 boxPrice'>
                                                    <p className={`${styles.descriptionParaAccordians}`}>
                                                        <Image className='me-2' height={26} width={26} src={itemsConsumed?.icon} />
                                                        {itemsConsumed?.title === 'Vital Scans' || itemsConsumed?.title === 'Health Insurance' ? (
                                                            <>{itemsConsumed?.title}<Image height={18} width={18} className='ms-1' src={infoIconSvg} onClick={itemsConsumed?.title === 'Vital Scans' ? handleShowVital : handleShowLearn} /></>
                                                        ) : (
                                                            itemsConsumed?.title
                                                        )}
                                                    </p>
                                                    {itemsConsumed?.has_insurance == true ? (
                                                        itemsConsumed?.options?.map((options) => (
                                                            <div className={`ms-5 ${styles.optionsHealthInsurance}`}>
                                                                <p>{options?.title}</p>
                                                                <p>PKR {options?.value?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                            </div>
                                                        ))
                                                    ) : null}
                                                </div>
                                                <p className={`${styles.descriptionParaAccordians} ${styles.rightPera}`} >{itemsConsumed?.total_consumed_value}</p>
                                            </div>
                                        )
                                            :
                                            null
                                    )) :
                                    Scans?.consumed_data?.monthly?.map((consumedNonPackage) => (
                                        consumedNonPackage?.status == true ? (
                                            <div className={styles.mobileViewDetailBtnContainer}>
                                                <div className='d-block w-100 boxPrice'>
                                                    <p className={styles.descriptionParaAccordians}>
                                                        <Image className='me-2' height={26} width={26} src={consumedNonPackage?.icon} />
                                                        {consumedNonPackage?.title === 'Vital Scans' || consumedNonPackage?.title === 'Health Insurance' ? (
                                                            <>{consumedNonPackage?.title} <Image height={18} width={18} className='ms-1' src={infoIconSvg} onClick={consumedNonPackage?.title === 'Vital Scans' ? handleShowVital : handleShowLearn} /></>
                                                        ) : (
                                                            consumedNonPackage?.title
                                                        )}
                                                    </p>
                                                    {consumedNonPackage?.has_insurance == true ? (
                                                        consumedNonPackage?.options?.map((options) => (
                                                            <div className={`ms-5 ${styles.optionsHealthInsurance}`}>
                                                                <p>{options?.title}</p>
                                                                <p>PKR {options?.value?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                            </div>
                                                        ))
                                                    ) : null}
                                                </div>
                                                <p className={`${styles.descriptionParaAccordians} ${styles.rightPera}`}>
                                                    {consumedNonPackage?.title == 'Vital Scans' || consumedNonPackage?.title == 'Doctor Consults' ?
                                                        (
                                                            consumedNonPackage?.title_value == 'unlimited' ? consumedNonPackage?.title_value : `${consumedNonPackage?.title_value} per month`
                                                        ) : null}
                                                </p>
                                            </div>
                                        )
                                            :
                                            null

                                    ))
                                }
                            </Card.Text>
                            }
                            {(!localMonthlyTab && localYearlyTab && accordionOpen == 1) && <Card.Text>
                                <div className='detailsPackageSubs'>
                                    <h4 >Details</h4>
                                </div>
                                {(isActivePackage == userDetails?.user?.subscription?.package?.name) && userDetails?.user?.subscription_recent?.is_yearly == 1 ?
                                    consumedData?.consumed_data.map((itemsConsumed) => (
                                        itemsConsumed?.status == true ? (

                                            <div className={styles.mobileViewDetailBtnContainer}>
                                                <div className='d-block w-100 boxPrice'>
                                                    <p className={styles.descriptionParaAccordians}>
                                                        <Image className='me-2' height={26} width={26} src={itemsConsumed?.icon} />
                                                        {itemsConsumed?.title === 'Vital Scans' || itemsConsumed?.title === 'Health Insurance' ? (
                                                            <>{itemsConsumed?.title} <Image height={18} width={18} className='ms-1' src={infoIconSvg} onClick={itemsConsumed?.title === 'Vital Scans' ? handleShowVital : handleShowLearn} /></>
                                                        ) : (
                                                            itemsConsumed?.title
                                                        )}
                                                    </p>
                                                    {itemsConsumed?.has_insurance == true ? (
                                                        itemsConsumed?.options?.map((options) => (
                                                            <div className={`ms-5 ${styles.optionsHealthInsurance}`}>
                                                                <p>{options?.title}</p>
                                                                <p>PKR {options?.value?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                            </div>
                                                        ))
                                                    ) : null}
                                                </div>

                                                <p className={`${styles.descriptionParaAccordians} ${styles.rightPera}`}>{itemsConsumed?.total_consumed_value}</p>
                                            </div>
                                        )
                                            :
                                            null
                                    )) :
                                    Scans?.consumed_data?.yearly?.map((consumedNonPackage) => (
                                        consumedNonPackage?.status == true ? (
                                            <div className={styles.mobileViewDetailBtnContainer}>
                                                <div className='d-block w-100 boxPrice'>
                                                    <p className={styles.descriptionParaAccordians}>
                                                        <Image className='me-2' height={26} width={26} src={consumedNonPackage?.icon} />
                                                        {consumedNonPackage?.title === 'Vital Scans' || consumedNonPackage?.title === 'Health Insurance' ? (
                                                            <>{consumedNonPackage?.title} <Image height={18} width={18} className='ms-1' src={infoIconSvg} onClick={consumedNonPackage?.title === 'Vital Scans' ? handleShowVital : handleShowLearn} /></>
                                                        ) : (
                                                            consumedNonPackage?.title
                                                        )}
                                                    </p>
                                                    {consumedNonPackage?.has_insurance == true ? (
                                                        consumedNonPackage?.options?.map((options) => (
                                                            <div className={`ms-5 ${styles.optionsHealthInsurance}`}>
                                                                <p>{options?.title}</p>
                                                                <p>PKR {options?.value?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                            </div>
                                                        ))
                                                    ) : null}
                                                </div>
                                                <p className={`${styles.descriptionParaAccordians} ${styles.rightPera}`}>
                                                    {consumedNonPackage?.title == 'Vital Scans' || consumedNonPackage?.title == 'Doctor Consults' ?
                                                        (
                                                            consumedNonPackage?.title_value == 'unlimited' ? consumedNonPackage?.title_value : `${consumedNonPackage?.title_value} per month`
                                                        ) : null}
                                                </p>
                                            </div>
                                        )
                                            :
                                            null

                                    ))
                                }
                            </Card.Text>
                            }
                            {(localMonthlyTab2 && !localYearlyTab2 && accordionOpen == 2) && <Card.Text>
                                <div className='detailsPackageSubs'>
                                    <h4 >Details</h4>
                                </div>
                                {(isActivePackage == userDetails?.user?.subscription?.package?.name) && userDetails?.user?.subscription_recent?.is_yearly == 0 ?
                                    consumedData?.consumed_data?.map((itemsConsumed) => (
                                        itemsConsumed?.status == true ? (
                                            <div className={styles.mobileViewDetailBtnContainer}>
                                                <div className='d-block w-100 boxPrice'>
                                                    <p className={styles.descriptionParaAccordians}>
                                                        <Image className='me-2' height={26} width={26} src={itemsConsumed?.icon} />
                                                        {itemsConsumed?.title === 'Vital Scans' || itemsConsumed?.title === 'Health Insurance' ? (
                                                            <>{itemsConsumed?.title} <Image height={18} width={18} className='ms-1' src={infoIconSvg} onClick={itemsConsumed?.title === 'Vital Scans' ? handleShowVital : handleShowLearn} /></>
                                                        ) : (
                                                            itemsConsumed?.title
                                                        )}
                                                    </p>
                                                    {itemsConsumed?.has_insurance == true ? (
                                                        itemsConsumed?.options?.map((options) => (
                                                            <div className={`ms-5 ${styles.optionsHealthInsurance}`}>
                                                                <p>{options?.title}</p>
                                                                <p>PKR {options?.value?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                            </div>
                                                        ))
                                                    ) : null}
                                                </div>
                                                <p className={`${styles.descriptionParaAccordians} ${styles.rightPera}`}>{itemsConsumed?.total_consumed_value}</p>
                                            </div>
                                        )
                                            :
                                            null
                                    )) :
                                    Scans?.consumed_data?.monthly?.map((consumedNonPackage) => (
                                        consumedNonPackage?.status == true ? (
                                            <div className={styles.mobileViewDetailBtnContainer}>
                                                <div className='d-block w-100 boxPrice'>
                                                    <p className={styles.descriptionParaAccordians}>
                                                        <Image className='me-2' height={26} width={26} src={consumedNonPackage?.icon} />
                                                        {consumedNonPackage?.title === 'Vital Scans' || consumedNonPackage?.title === 'Health Insurance' ? (
                                                            <>{consumedNonPackage?.title} <Image height={18} width={18} className='ms-1' src={infoIconSvg} onClick={consumedNonPackage?.title === 'Vital Scans' ? handleShowVital : handleShowLearn} /></>
                                                        ) : (
                                                            consumedNonPackage?.title
                                                        )}
                                                    </p>
                                                    {consumedNonPackage?.has_insurance == true ? (
                                                        consumedNonPackage?.options?.map((options) => (
                                                            <div className={`ms-5 ${styles.optionsHealthInsurance}`}>
                                                                <p>{options?.title}</p>
                                                                <p>PKR {options?.value?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                            </div>
                                                        ))
                                                    ) : null}
                                                </div>
                                                <p className={`${styles.descriptionParaAccordians} ${styles.rightPera}`}>
                                                    {consumedNonPackage?.title == 'Vital Scans' || consumedNonPackage?.title == 'Doctor Consults' ?
                                                        (
                                                            consumedNonPackage?.title_value == 'unlimited' ? consumedNonPackage?.title_value : `${consumedNonPackage?.title_value} per month`
                                                        ) : null}
                                                </p>
                                            </div>
                                        )
                                            :
                                            null

                                    ))
                                }
                            </Card.Text>
                            }
                            {(!localMonthlyTab2 && localYearlyTab2 && accordionOpen == 2) && <Card.Text>
                                <div className='detailsPackageSubs'>
                                    <h4 >Details</h4>
                                </div>
                                {(isActivePackage == userDetails?.user?.subscription?.package?.name) && userDetails?.user?.subscription_recent?.is_yearly == 1 ?
                                    consumedData?.consumed_data.map((itemsConsumed) => (
                                        itemsConsumed?.status == true ? (

                                            <div className={styles.mobileViewDetailBtnContainer}>
                                                <div className='d-block w-100 boxPrice'>
                                                    <p className={styles.descriptionParaAccordians}>
                                                        <Image className='me-2' height={26} width={26} src={itemsConsumed?.icon} />
                                                        {itemsConsumed?.title === 'Vital Scans' || itemsConsumed?.title === 'Health Insurance' ? (
                                                            <>{itemsConsumed?.title} <Image height={18} width={18} className='ms-1' src={infoIconSvg} onClick={itemsConsumed?.title === 'Vital Scans' ? handleShowVital : handleShowLearn} /></>
                                                        ) : (
                                                            itemsConsumed?.title
                                                        )}
                                                    </p>
                                                    {itemsConsumed?.has_insurance == true ? (
                                                        itemsConsumed?.options?.map((options) => (
                                                            <div className={`ms-5 ${styles.optionsHealthInsurance}`}>
                                                                <p>{options?.title}</p>
                                                                <p>PKR {options?.value?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                            </div>
                                                        ))
                                                    ) : null}
                                                </div>

                                                <p className={`${styles.descriptionParaAccordians} ${styles.rightPera}`}>{itemsConsumed?.total_consumed_value}</p>
                                            </div>
                                        )
                                            :
                                            null
                                    )) :
                                    Scans?.consumed_data?.yearly?.map((consumedNonPackage) => (
                                        consumedNonPackage?.status == true ? (
                                            <div className={styles.mobileViewDetailBtnContainer}>
                                                <div className='d-block w-100 boxPrice'>
                                                    <p className={styles.descriptionParaAccordians}>
                                                        <Image className='me-2' height={26} width={26} src={consumedNonPackage?.icon} />
                                                        {consumedNonPackage?.title === 'Vital Scans' || consumedNonPackage?.title === 'Health Insurance' ? (
                                                            <>{consumedNonPackage?.title} <Image height={18} width={18} className='ms-1' src={infoIconSvg} onClick={consumedNonPackage?.title === 'Vital Scans' ? handleShowVital : handleShowLearn} /></>
                                                        ) : (
                                                            consumedNonPackage?.title
                                                        )}
                                                    </p>
                                                    {consumedNonPackage?.has_insurance == true ? (
                                                        consumedNonPackage?.options?.map((options) => (
                                                            <div className={`ms-5 ${styles.optionsHealthInsurance}`}>
                                                                <p>{options?.title}</p>
                                                                <p>PKR {options?.value?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                            </div>
                                                        ))
                                                    ) : null}
                                                </div>
                                                <p className={styles.descriptionParaAccordians}>
                                                    {consumedNonPackage?.title == 'Vital Scans' || consumedNonPackage?.title == 'Doctor Consults' ?
                                                        (
                                                            consumedNonPackage?.title_value == 'unlimited' ? consumedNonPackage?.title_value : `${consumedNonPackage?.title_value} per year`
                                                        ) : null}
                                                </p>
                                            </div>
                                        )
                                            :
                                            null

                                    ))
                                }
                            </Card.Text>
                            }
                            {(localMonthlyTab3 && !localYearlyTab3 && accordionOpen == 3) && <Card.Text>
                                <div className='detailsPackageSubs'>
                                    <h4 >Details</h4>
                                </div>
                                {(isActivePackage == userDetails?.user?.subscription?.package?.name) && userDetails?.user?.subscription_recent?.is_yearly == 0 ?
                                    consumedData?.consumed_data?.map((itemsConsumed) => (
                                        itemsConsumed?.status == true ? (
                                            <div className={styles.mobileViewDetailBtnContainer}>
                                                <div className='d-block w-100 boxPrice'>
                                                    <p className={styles.descriptionParaAccordians}>
                                                        <Image className='me-2' height={26} width={26} src={itemsConsumed?.icon} />
                                                        {itemsConsumed?.title === 'Vital Scans' || itemsConsumed?.title === 'Health Insurance' ? (
                                                            <>{itemsConsumed?.title} <Image height={18} width={18} className='ms-1' src={infoIconSvg} onClick={itemsConsumed?.title === 'Vital Scans' ? handleShowVital : handleShowLearn} /></>
                                                        ) : (
                                                            itemsConsumed?.title
                                                        )}
                                                    </p>
                                                    {itemsConsumed?.has_insurance == true ? (
                                                        itemsConsumed?.options?.map((options) => (
                                                            <div className={`ms-5 ${styles.optionsHealthInsurance}`}>
                                                                <p>{options?.title}</p>
                                                                <p>PKR {options?.value?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                            </div>
                                                        ))
                                                    ) : null}
                                                </div>
                                                <p className={`${styles.descriptionParaAccordians} ${styles.rightPera}`}>{itemsConsumed?.total_consumed_value}</p>
                                            </div>
                                        )
                                            :
                                            null
                                    )) :
                                    Scans?.consumed_data?.monthly?.map((consumedNonPackage) => (
                                        consumedNonPackage?.status == true ? (
                                            <div className={styles.mobileViewDetailBtnContainer}>
                                                <div className='d-block w-100 boxPrice'>
                                                    <p className={styles.descriptionParaAccordians}>
                                                        <Image className='me-2' height={26} width={26} src={consumedNonPackage?.icon} />
                                                        {consumedNonPackage?.title === 'Vital Scans' || consumedNonPackage?.title === 'Health Insurance' ? (
                                                            <>{consumedNonPackage?.title} <Image height={18} width={18} className='ms-1' src={infoIconSvg} onClick={consumedNonPackage?.title === 'Vital Scans' ? handleShowVital : handleShowLearn} /></>
                                                        ) : (
                                                            consumedNonPackage?.title
                                                        )}
                                                    </p>
                                                    {consumedNonPackage?.has_insurance == true ? (
                                                        consumedNonPackage?.options?.map((options) => (
                                                            <div className={`ms-5 ${styles.optionsHealthInsurance}`}>
                                                                <p>{options?.title}</p>
                                                                <p>PKR {options?.value?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                            </div>
                                                        ))
                                                    ) : null}
                                                </div>
                                                <p className={`${styles.descriptionParaAccordians} ${styles.rightPera}`}>
                                                    {consumedNonPackage?.title == 'Vital Scans' || consumedNonPackage?.title == 'Doctor Consults' ?
                                                        (
                                                            consumedNonPackage?.title_value == 'unlimited' ? consumedNonPackage?.title_value : `${consumedNonPackage?.title_value} per month`
                                                        ) : null}
                                                </p>
                                            </div>
                                        )
                                            :
                                            null

                                    ))
                                }
                            </Card.Text>
                            }
                            {(!localMonthlyTab3 && localYearlyTab3 && accordionOpen == 3) && <Card.Text>
                                <div className='detailsPackageSubs'>
                                    <h4 >Details</h4>
                                </div>
                                {(isActivePackage == userDetails?.user?.subscription?.package?.name) && userDetails?.user?.subscription_recent?.is_yearly == 1 ?
                                    consumedData?.consumed_data.map((itemsConsumed) => (
                                        itemsConsumed?.status == true ? (

                                            <div className={styles.mobileViewDetailBtnContainer}>
                                                <div className='d-block w-100 boxPrice'>
                                                    <p className={styles.descriptionParaAccordians}>
                                                        <Image className='me-2' height={26} width={26} src={itemsConsumed?.icon} />
                                                        {itemsConsumed?.title === 'Vital Scans' || itemsConsumed?.title === 'Health Insurance' ? (
                                                            <>{itemsConsumed?.title} <Image height={18} width={18} className='ms-1' src={infoIconSvg} onClick={handleShowVital} /></>
                                                        ) : (
                                                            itemsConsumed?.title
                                                        )}
                                                    </p>

                                                    {itemsConsumed?.has_insurance == true ? (
                                                        itemsConsumed?.options?.map((options) => (
                                                            <div className={`ms-5 ${styles.optionsHealthInsurance}`}>
                                                                <p>{options?.title}</p>
                                                                <p>PKR {options?.value?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                            </div>
                                                        ))
                                                    ) : null}
                                                </div>

                                                <p className={`${styles.descriptionParaAccordians} ${styles.rightPera}`}>{itemsConsumed?.total_consumed_value}</p>
                                            </div>
                                        )
                                            :
                                            null
                                    )) :
                                    Scans?.consumed_data?.yearly?.map((consumedNonPackage) => (
                                        consumedNonPackage?.status == true ? (
                                            <div className={styles.mobileViewDetailBtnContainer}>
                                                <div className='d-block w-100 boxPrice'>
                                                    <p className={styles.descriptionParaAccordians}>
                                                        <Image className='me-2' height={26} width={26} src={consumedNonPackage?.icon} />
                                                        {consumedNonPackage?.title === 'Vital Scans' || consumedNonPackage?.title === 'Health Insurance' ? (
                                                            <>{consumedNonPackage?.title} <Image height={18} width={18} className='ms-1' src={infoIconSvg} onClick={handleShowVital} /></>
                                                        ) : (
                                                            consumedNonPackage?.title
                                                        )}
                                                    </p>
                                                    {consumedNonPackage?.has_insurance == true ? (
                                                        consumedNonPackage?.options?.map((options) => (
                                                            <div className={`ms-5 ${styles.optionsHealthInsurance}`}>
                                                                <p>{options?.title}</p>
                                                                <p>PKR {options?.value?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                            </div>
                                                        ))
                                                    ) : null}
                                                </div>
                                                <p className={`${styles.descriptionParaAccordians} ${styles.rightPera}`}>
                                                    {consumedNonPackage?.title == 'Vital Scans' || consumedNonPackage?.title == 'Doctor Consults' ?
                                                        (
                                                            consumedNonPackage?.title_value == 'unlimited' ? consumedNonPackage?.title_value : `${consumedNonPackage?.title_value} per year`
                                                        ) : null}
                                                </p>
                                            </div>
                                        )
                                            :
                                            null

                                    ))
                                }
                            </Card.Text>
                            }
                        </div>
                        {/* {!isMobile &&
                            <div className={styles.rightMonthly}>
                                <button onClick={pushToPricing} className={styles.btnViewDetails}> View Details </button>
                            </div>
                        } */}
                    </div>
                </div>

                {/* lite monthly */}
                {localMonthlyTab && accordionOpen == 1 &&
                    <>
                        {!subscription ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk}`}> Subscribe </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA`}> Subscribe </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized > 1 ? (
                            <>
                                <div className={styles.centerClass}> <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> Subscribe </button> </div>
                            </>
                        ) : isAuthorized == 1 && !isCancel && !isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button className={`${styles.subscribeBtn} ${styles.cancelBtn} ${styles.disabled__hk}`}> Cancel </button>
                                    ) :
                                        <button onClick={handleShow} className={`${styles.subscribeBtn} ${styles.cancelBtn} hovering_green_btn_MA`}> Cancel </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized == 1 && isCancel && !isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn}  ${styles.disabled__hk}`}> Subscribe </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn}  hovering_green_btn_MA`}> Subscribe </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized == 1 && !isCancel && isYearly ? (
                            <>
                                <div className={styles.centerClass}> <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> Subscribe </button> </div>
                            </>
                        ) : isAuthorized == 1 && isCancel && isYearly ? (
                            <>
                                <div className={styles.centerClass}> <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> Subscribe </button> </div>
                            </>
                        )
                            : ''}
                    </>
                }

                {/* lite yearly */}
                {!localMonthlyTab && accordionOpen == 1 &&
                    <>
                        {!subscription ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk}`}> Subscribe </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA`}> Subscribe </button>

                                    }
                                </div>
                            </>
                        ) : isAuthorized > 1 && isYearly ? (
                            <>
                                <div className={styles.centerClass}> <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> Subscribe </button> </div>
                            </>
                        ) : isAuthorized > 1 && !isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> {isCancel ? 'Subscribe' : 'Upgrade'} </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA `}> {isCancel ? 'Subscribe' : 'Upgrade'} </button>

                                    }
                                </div>
                            </>
                        ) : isAuthorized == 1 && !isCancel && !isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> Upgrade </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA `}> Upgrade </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized == 1 && isCancel && !isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn}  ${styles.disabled__hk}`}> Subscribe </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn}  hovering_green_btn_MA`}> Subscribe </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized == 1 && !isCancel && isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.cancelBtn} ${styles.disabled__hk}`}> Cancel </button>
                                    ) :
                                        <button onClick={handleShow} className={`${styles.subscribeBtn} ${styles.cancelBtn} hovering_green_btn_MA`}> Cancel </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized == 1 && isCancel && isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk}`}> Subscribe </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA`}> Subscribe </button>
                                    }
                                </div>
                            </>
                        )
                            : ''}
                    </>
                }

                {/* plus monthly */}
                {localMonthlyTab2 && accordionOpen == 2 &&
                    <>
                        {!subscription ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk}`}> Subscribe </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA`}> Subscribe </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized > 2 ? (
                            <>
                                <div className={styles.centerClass}> <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> Subscribe </button> </div>
                            </>
                        ) : isAuthorized < 2 && !isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> {isCancel ? 'Subscribe' : 'Upgrade'} </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA `}> {isCancel ? 'Subscribe' : 'Upgrade'} </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized < 2 && isYearly ? (
                            <>
                                <div className={styles.centerClass}> <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> Subscribe </button> </div>
                            </>
                        ) : isAuthorized == 2 && !isCancel && !isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.cancelBtn} ${styles.disabled__hk}`}> Cancel </button>
                                    ) :
                                        <button onClick={handleShow} className={`${styles.subscribeBtn} ${styles.cancelBtn} hovering_green_btn_MA`}> Cancel </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized == 2 && isCancel && !isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn}  ${styles.disabled__hk}`}> Subscribe </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn}  hovering_green_btn_MA`}> Subscribe </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized == 2 && !isCancel && isYearly ? (
                            <>
                                <div className={styles.centerClass}> <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> Subscribe </button> </div>
                            </>
                        ) : isAuthorized == 2 && isCancel && isYearly ? (
                            <>
                                <div className={styles.centerClass}> <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> Subscribe </button> </div>
                            </>
                        )
                            : ''}
                    </>
                }

                {/* plus yearly */}
                {!localMonthlyTab2 && accordionOpen == 2 &&
                    <>
                        {!subscription ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn}  ${styles.disabled__hk}`}> Subscribe </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA`}> Subscribe </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized > 2 && isYearly ? (
                            <>
                                <div className={styles.centerClass}> <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> Subscribe </button> </div>
                            </>
                        ) : isAuthorized > 2 && !isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> {isCancel ? 'Subscribe' : 'Upgrade'} </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA `}> {isCancel ? 'Subscribe' : 'Upgrade'} </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized < 2 ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> {isCancel ? 'Subscribe' : 'Upgrade'} </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA `}> {isCancel ? 'Subscribe' : 'Upgrade'} </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized == 2 && !isCancel && !isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> Upgrade </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA `}> Upgrade </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized == 2 && isCancel && !isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn}  ${styles.disabled__hk}`}> Subscribe </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn}  hovering_green_btn_MA`}> Subscribe </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized == 2 && !isCancel && isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.cancelBtn} ${styles.disabled__hk}`}> Cancel </button>
                                    ) :
                                        <button onClick={handleShow} className={`${styles.subscribeBtn} ${styles.cancelBtn} hovering_green_btn_MA`}> Cancel </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized == 2 && isCancel && isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk}`}> Subscribe </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA`}> Subscribe </button>
                                    }
                                </div>
                            </>
                        )
                            : ''}
                    </>
                }

                {/* premium monthly */}
                {localMonthlyTab3 && accordionOpen == 3 &&
                    <>
                        {subscription && isAuthorized > 3 && isCorporate && isYearly == false && (
                            <div className={styles.centerClass}>
                                <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> {isCancel ? 'Subscribe' : 'Upgrade'} </button>
                            </div>
                        )}
                        {!subscription ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk}`}> Subscribe </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA`}> Subscribe </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized < 3 && !isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> {isCancel ? 'Subscribe' : 'Upgrade'} </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA `}> {isCancel ? 'Subscribe' : 'Upgrade'} </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized < 3 && isYearly ? (
                            <>
                                <div className={styles.centerClass}> <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> Subscribe </button> </div>
                            </>
                        ) : isAuthorized == 3 && !isCancel && !isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.cancelBtn} ${styles.disabled__hk}`}> Cancel </button>
                                    ) :
                                        <button onClick={handleShow} className={`${styles.subscribeBtn} ${styles.cancelBtn} hovering_green_btn_MA`}> Cancel </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized == 3 && isCancel && !isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn}  ${styles.disabled__hk}`}> Subscribe </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn}  hovering_green_btn_MA`}> Subscribe </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized == 3 && !isCancel && isYearly ? (
                            <>
                                <div className={styles.centerClass}> <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> Subscribe </button> </div>
                            </>
                        ) : isAuthorized == 3 && isCancel && isYearly ? (
                            <>
                                <div className={styles.centerClass}> <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> Subscribe </button> </div>
                            </>
                        )
                            : ''}
                    </>
                }
                {/* premium yearly */}
                {!localMonthlyTab3 && accordionOpen == 3 &&
                    <>
                        {subscription && isAuthorized > 3 && isCorporate && (isYearly == false || isYearly) && (
                            <div className={styles.centerClass}>
                                <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> {isCancel ? 'Subscribe' : 'Upgrade'} </button>
                            </div>
                        )}
                        {!subscription ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk}`}> Subscribe </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA`}> Subscribe </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized < 3 ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn}  ${styles.disabled__hk} `}> {isCancel ? 'Subscribe' : 'Upgrade'} </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA `}> {isCancel ? 'Subscribe' : 'Upgrade'} </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized <= 3 && !isCancel && !isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk} `}> Upgrade </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA `}> Upgrade </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized <= 3 && isCancel && !isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn}  ${styles.disabled__hk}`}> Subscribe </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn}  hovering_green_btn_MA`}> Subscribe </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized <= 3 && !isCancel && isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.cancelBtn} ${styles.disabled__hk}`}> Cancel </button>
                                    ) :
                                        <button onClick={handleShow} className={`${styles.subscribeBtn} ${styles.cancelBtn} hovering_green_btn_MA`}> Cancel </button>
                                    }
                                </div>
                            </>
                        ) : isAuthorized <= 3 && isCancel && isYearly ? (
                            <>
                                <div className={styles.centerClass}>
                                    {isCorporate ? (
                                        <button disabled={true} className={`${styles.subscribeBtn} ${styles.disabled__hk}`}> Subscribe </button>
                                    ) :
                                        <button onClick={() => pushToSubscription(subscriptionID)} className={`${styles.subscribeBtn} hovering_green_btn_MA`}> Subscribe </button>
                                    }
                                </div>
                            </>
                        )
                            : ''}
                    </>
                }
                <SubscriptionModal backdrop={true} setShow={setShow} show={show} handleShow={handleShow} handleClose={handleClose} />
                <ModalVitals showVitals={showVitals} handleClose={handleCloseVital} />
                <LearnMoreModal
                    getInsuranceInfo={getInsuranceInfo}
                    showLearn={showLearn}
                    handleCloseLearn={handleCloseLearn}
                    handleShowLearn={handleShowLearn}
                />
            </div>
        </>
    )
}

export default UnsubcribeAccordian;

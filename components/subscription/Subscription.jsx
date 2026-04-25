import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import styles from './subscription.module.css';
import Certificate from '../../public/svg/certificateTopup.svg';
import Image from 'next/image';
import PriceTabs from './priceTabs/PriceTabs';
import HistoryCard from './historyCard/HistoryCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderOnlyLogo from '../headerOnlyLogo/HeaderOnlyLogo';
import WrapperContainerWallet from '../wrapperContainerCustomWallet/wrapperContainerWallet';
import HeaderMobileWalletUpdated from '../header_mobile_wallet_updated/header_mobile_wallet_updated';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/store/userSlice';
import { APIV3 } from '@/utils/httpService';
import { useRouter } from "next/router";
import Loader from '../customLoader/Loader';


const Subscription = () => {


    const dispatch = useDispatch();
    const router = useRouter();

    let userDetails = useSelector((state) => state.user.userData);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch])


    const [subscriptionDetails, setSubscriptionDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [getInsuranceInfo, setGetInsuranceInfo] = useState({})

    const fetchInsuranceInfo = async () => {
        try {
            const resp = await APIV3.get('/health-insurance-info')
            if (resp?.status == 200) {
                setGetInsuranceInfo(resp?.data?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchInsuranceInfo();
    }, [])
    const isMobile = useMediaQuery('(max-width:768px)');


    //subscribe Now //
    const pushToPricing = () => {
        router.push('/pricing')
    }

    // Details of packages //
    const getSubscriptionDetails = async () => {
        try {
            const response = await APIV3.get('/subscription-packages');
            if (response?.status == 200) {
                setSubscriptionDetails(response?.data.data);
                setLoading(false);
            }
        } catch (e) {
        }
    }
    // Details of packages //

    //UseEffect To call getSubscriptionDetails // 
    useEffect(() => {
        getSubscriptionDetails()
    }, [])

    //UseEffect To call getSubscriptionDetails // 

    const handleBackClicked = () => {
        Router.back()
    }
    return (
        <div className={`${styles.subscriptionWalletpage} subscriptionWalletpageMain`}>
            {!isMobile
                ? <HeaderOnlyLogo toastAnnouce={false} />
                :
                <HeaderMobileWalletUpdated title="Subscription" desc="" handleBackClicked={handleBackClicked} />
            }

            {loading ? (
                <Loader />
            )
                :
                <div className={`${styles.subscriptionWrapper} `}>
                    <WrapperContainerWallet>
                        {!isMobile &&
                            <div className={styles.wrapperBtn}>
                                {/* <button className={styles.backBtn} onClick={() => router.push("/wallet")}> <span className={styles.back_arrow_svg}  onClick={() => router.push("/wallet")}/> Back  </button> */}
                            </div>
                        }
                        <div className={styles.wrapperFields}>
                            <div className={styles.leftSubs}>
                                {!isMobile && <h5 className={styles.headSubs}> <span className={styles.back_arrow_svg} onClick={() => router.push("/wallet")} /> Subscription </h5>}
                                <div className={styles.card2}>
                                    <div className={styles.wrapperSubscription}>
                                        <Image src={Certificate} alt="certificate" className={styles.certificateTopup} />
                                        {userDetails?.user?.subscription ? (
                                            <h2 className={styles.headingsVoucher}>1 Active</h2>
                                        ) : (
                                            <h2 onClick={pushToPricing} className={styles.headingsVoucher}>Subscribe Now</h2>
                                        )}
                                    </div>
                                    <span className={styles.descCard2}> {<span>{userDetails?.user?.subscription ? `Expiring on ${userDetails?.user?.subscription?.formated_end_date}` : "No active subscription currently"}  </span>} </span>
                                    <span className={styles.descCard3}>
                                        {isMobile && (
                                            userDetails?.user?.subscription?.package?.name ?
                                                `${userDetails?.user?.subscription?.package?.name} Package` : 'Subscribe'
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.rightSubs}>
                                <Tabs
                                    defaultActiveKey="packages"
                                    id="uncontrolled-tab-example"
                                    className={`${styles.tabs_wrapper} tabs_wrapper_subscription mb-3`}
                                >
                                    <Tab eventKey="packages" title="Packages" className={styles.content}>
                                        <PriceTabs getInsuranceInfo={getInsuranceInfo} userDetails={userDetails} subscriptionDetails={subscriptionDetails} />
                                    </Tab>
                                    <Tab eventKey="history" title="History">
                                        <HistoryCard userDetails={userDetails} />
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </WrapperContainerWallet>
                </div>
            }

        </div>
    )
}
export default Subscription;
import React, { useEffect, useState } from 'react'
import styles from './rewardPoints.module.css';
import { Tab, Tabs } from 'react-bootstrap';
import BulbReward from '../../public/svg/buld_reward_points.svg';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderOnlyLogo from '../headerOnlyLogo/HeaderOnlyLogo';
import WrapperContainerWallet from '../wrapperContainerCustomWallet/wrapperContainerWallet';
import HeaderMobileWalletUpdated from '../header_mobile_wallet_updated/header_mobile_wallet_updated';
import { useRouter } from 'next/router';
import AvailableVouchers from './rewardCreditsCard/rewardCreditCard';
import ReedemedVouchers from './reedemedVouchers/reedemedVouchers';
import ExpiredVouchers from './ExpiredVouchers/ExpiredVouchers';
import Cookies from 'js-cookie';

const RewardPoints = ({ loader, vouchers, redeemVoucherFunc }) => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const router = useRouter();

  // If user is not logged in so it redirect to home page
  const autherization = Cookies.get('Authorization');
  useEffect(() => {

    if (!autherization) {
      router.push('/')
    }
  }, [])

  const handleBackClicked = () => {
    router.back();
  }

  return (
    <div className='mainRewardPage'>
      {!isMobile
        ? <HeaderOnlyLogo toastAnnouce={false} />
        :
        <HeaderMobileWalletUpdated title="Reward Points" desc="" handleBackClicked={handleBackClicked} />
      }
      <div className={styles.subscriptionWrapper}>
        <WrapperContainerWallet>
          {!isMobile &&
            <div className={styles.wrapperBtn}>
              <button className={styles.backBtn} onClick={() => router.push('/wallet')}> <span className={styles.back_arrow_svg} /> Back  </button>
            </div>
          }
          <div className={styles.wrapperFields}>
            <div className={styles.leftSubs}>
              {/* {!isMobile && <h5 className={styles.headSubs}> Vouchers </h5>} */}
              <div className={styles.card2}>
                <div className={styles.wrapperSubscription}>
                  <Image src={BulbReward} alt="BulbReward" className={styles.certificateTopup} />
                  <h2 className={styles.headingsVoucher}>  {vouchers?.vouchar_amount} PKR </h2>
                </div>
                <span className={styles.descCard2}> {!isMobile ? <span>
                  {vouchers?.upcoming_expire && vouchers?.upcoming_expire !== null ? (
                    <>
                      <b className='weight500'>PKR {vouchers?.upcoming_expire?.amount_per_user}</b> expiring {vouchers?.upcoming_expire?.formated_end_date}
                    </>
                  ) : 'No credits at the moment'}
                </span> : <span>
                  {vouchers?.upcoming_expire && vouchers?.upcoming_expire !== null ? (
                    <>
                      PKR {vouchers?.upcoming_expire?.amount_per_user} expiring {vouchers?.upcoming_expire?.formated_end_date}
                    </>
                  ) : 'No credits at the moment'}
                </span>} </span>
              </div>
            </div>

            {isMobile && <h3 className={styles.title_header}> Reward Points  </h3>}
            <div className={`${styles.rightSubs} rightSubs`}>
              <Tabs
                defaultActiveKey="available"
                id="uncontrolled-tab-example"
                className={`${styles.tabs_wrapper} tabs_wrapper mb-3`}
              >
                <Tab eventKey="available" title="Available" className={styles.content}>
                  <AvailableVouchers loader={loader} redeemVoucherFunc={redeemVoucherFunc} availableCredits={vouchers?.available} />
                </Tab>
                <Tab eventKey="redeemed" title="Redeemed">
                  <ReedemedVouchers redeemCredits={vouchers?.redeem} />
                </Tab>
                <Tab eventKey="expired" title="Expired">
                  <ExpiredVouchers expiredCredits={vouchers?.expired} />
                </Tab>
              </Tabs>
            </div>
          </div>
        </WrapperContainerWallet>
      </div>
    </div>
  )
}

export default RewardPoints;

import React, { useEffect, useState } from 'react'
import RewardPoints from '../../components/rewardPoints/reward';
import { getAllVoucher, redeemVoucher } from "@/utils/endpoints";
import { APIV3 } from "@/utils/httpService";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { ToastContainer,toast } from "react-toastify";


const RewardPage = () => {
    const [vouchers, setVouchers] = useState([]);
    const [loader, setLoader] = useState(false)
    const router = useRouter();
    const autherization = Cookies.get('Authorization');

    useEffect(() => {

        if (!autherization) {
            window.location.href = "/phone-number";
        }
    }, [])

    // get all voucher api function
    const getVouchersList = async () => {
        try {
            setLoader(true)
            const response = await APIV3.get(`${getAllVoucher}`);
            if (response?.status == 200) {
                setVouchers(response?.data?.data)
                setLoader(false)
            }
        } catch (e) {
        }
    }

    // hit getVoucherList Api
    useEffect(() => {
        getVouchersList()
    }, [])

    // Voucher Redeem function post Api
    const redeemVoucherFunc = async (id) => {
        setLoader(true)
        try {
            let data = {
                voucher_campaign_id: id
            };
            const response = await APIV3.post(`${redeemVoucher}`, data);
            if (response?.status == 200) {
                getVouchersList()
            } else {
                toast.error(response?.data?.message);
            }
        } catch (e) {
            console.log(e, "");
        }
        setLoader(false)
    }

    return (
        <div>
            <ToastContainer />
            <RewardPoints loader={loader} vouchers={vouchers} redeemVoucherFunc={redeemVoucherFunc} />
        </div>
    )
}

export default RewardPage;
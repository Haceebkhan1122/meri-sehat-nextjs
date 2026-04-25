import React, { useEffect, useState } from 'react'
import Wallet from '../../components/wallet/wallet'
import styles from '../../components/wallet/wallet.module.css';
import { getAllTransactions, walletDetailsApi } from "@/utils/endpoints";
import { fetchUser } from '@/store/userSlice';
import { APIV3 } from "@/utils/httpService";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import { walletPageFromServer, faqs_category_wallet } from "@/utils/endpoints";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { wrapper } from "@/store/store";
import { addTranslation } from "@/store/translationSlice";
import { MetaDataCustom } from "@/components/metaDataCustom";


const WalletPage = (props) => {
    const { walletData, _nextI18Next, walletFaq } = props;
    const [transactions, setTransactions] = useState([])
    const [walletDetails, setWalletDetails] = useState({})


    const dispatch = useDispatch();
    let userDetails = useSelector((state) => state.user.userData);

    const initialLocale = _nextI18Next?.initialLocale;
    const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;

    useEffect(() => {
        if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
            dispatch(addTranslation(i18n));
        }
    }, [i18n]);


    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch])

    // get all transactions api function
    const getTransctionsList = async () => {
        try {
            const response = await APIV3.get(`${getAllTransactions}?page=1`);
            if (response?.status == 200) {
                setTransactions(response?.data?.data?.data)
            }
        } catch (e) {
            console.log(e);
        }
    }

    // hit getTransctionsList Api
    useEffect(() => {
        getTransctionsList()
    }, [])

    // get wallet api for wallet details function
    const getWalletDetails = async () => {
        try {
            const response = await APIV3.get(`${walletDetailsApi}`);
            if (response?.status == 200) {
                setWalletDetails(response?.data?.data)
            }
        } catch (e) {
            console.log(e);
        }
    }
    // hit wallet details Api
    useEffect(() => {
        getWalletDetails()
    }, [])

    return (
        <>
            <MetaDataCustom metaData={props?.walletData} />
            <div className={`${styles.wrapperWalletPageMain} mainWalletPage`}>
                <Wallet walletPageDetail={props?.walletData} walletFaq={walletFaq} userDetails={userDetails} transactions={transactions} walletDetails={walletDetails} />
            </div>
        </>
    )
}





export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ locale }) => {
            const langChecker = Cookies.get("lang");
            const apiLocale = locale === "ur" || langChecker == "2" ? 2 : 1;

            try {
                const walletData = await APIV3.get(walletPageFromServer, {
                    headers: {
                        platform: "web",
                        locale: apiLocale,
                    },
                });
                const walletDataContent = walletData?.data?.data;

                return {
                    props: {
                        walletData: walletDataContent || null, // Set to null if undefined
                        ...(await serverSideTranslations(locale, ["common"])),
                        ...(await serverSideTranslations(locale, ["common"], null, [
                            "en",
                            "ur",
                        ])),
                    },
                };
            } catch (error) {
                console.error("Error fetching wallet data:", error);
                return {
                    props: {
                        walletData: null, // Set to null in case of an error
                        ...(await serverSideTranslations(locale, ["common"])),
                        ...(await serverSideTranslations(locale, ["common"], null, [
                            "en",
                            "ur",
                        ])),
                    },
                };
            }
        }
);

export default WalletPage;

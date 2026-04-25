import React, { useEffect, useState } from 'react'
import AllTransactionsWallet from '../../components/allTransactionsWallet/allTransactionsWallet'
import { getAllTransactions, walletPageFromServer } from "@/utils/endpoints";
import  { APIV3 } from "@/utils/httpService";
import LoaderAssets from "../../public/gif/asset_loader.gif";
import Image from 'next/image';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { wrapper } from "@/store/store";
import { addTranslation } from "@/store/translationSlice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDispatch, useSelector } from 'react-redux';


const AllTransactionsWalletPage = (props) => {
    const { walletData, _nextI18Next } = props;
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [transactionResponse, serTransactionResponse] = useState([]);
    const [lastPage, setLastPage] = useState();

    
    const router = useRouter();
    const dispatch = useDispatch();

    const initialLocale = _nextI18Next?.initialLocale;
    const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;

    useEffect(() => {
        if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
            dispatch(addTranslation(i18n));
        }
    }, [i18n]);

      const loadMore = () => {
        // Ensure that this code only runs in the client-side environment
        if (typeof window !== 'undefined') {
            getTransactionsList(page);
        }
    };

    // If user is not logged in so it redirect to home page
    const autherization = Cookies.get('Authorization');
    useEffect(() => {
        if (!autherization) {
            if (!autherization) {
                window.location.href = "/phone-number";
            }
        }
    }, [])

    const getTransactionsList = async () => {
        let limit = 10;
        try {
            setLoading(true);
            const response = await APIV3.get(`${getAllTransactions}?page=${page}`);
            serTransactionResponse(response?.data?.data?.data)
            if (response && response.status == 200) {
                const newTrans = response?.data?.data?.data;
                const sliced = newTrans.slice(0, limit)
                setTransactions((prevTransactions) => [...prevTransactions, ...sliced]);
                // setTransactions((prevTransactions) => [...prevTransactions, ...response?.data?.data?.data]);
                setPage(page + 1);
                setLastPage(response?.data?.data?.last_page)
            }
        } catch (e) {
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        getTransactionsList(); 
    }, []);

    return (
        <div>
            {loading ? (
                <div className="flex_center">
                    <Image
                        className="loading_gif m-auto"
                        src={LoaderAssets}
                        alt="loader"
                        width={90}
                        height={90}
                    />
                </div>
            ) : (
                <>
                    <AllTransactionsWallet lastPage={lastPage} loadMore={loadMore} page={page} getTransactionsList={getTransactionsList} transactions={transactions} />
                </>
            )}
        </div>
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

export default AllTransactionsWalletPage;

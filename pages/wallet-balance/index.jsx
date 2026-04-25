import React, { useEffect, useState } from 'react'
import WalletBalanceComp from '../../components/wallet-balance/wallet-balance';
import {APIV3} from "@/utils/httpService";
import { topupConfig, getAllCards, walletDetailsApi, deleteCard } from "@/utils/endpoints";
import Loader from '../../components/Loader';

const WalletBalancePage = () => {
    const [topupData, setTopupData] = useState([]);
    const [getListSavedCards, setGetListSavedCards] = useState([]);
    const [walletDetails, setWalletDetails] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [singleSavedCardShow, setSingleSavedCardShow] = useState(false);


    // fetching Topup data to get max and min values
    const fetchDataForTopupConfig = async () => {
        try {
            const response = await APIV3.get(topupConfig);
            setTopupData(response.data?.data)
        } catch (error) {
            console.log(error);
        }
    };

    // calling fetch func only when component load
    useEffect(() => {
        fetchDataForTopupConfig();
    }, []);

    // get lists of call saved cards func
    const getAllSavedCards = async () => {
        try {
            const response = await APIV3.get(getAllCards);
            setGetListSavedCards(response.data?.data)
        } catch (error) {
            console.log(error);
        }
    };

    // calling get all saved card function api
    useEffect(() => {
        getAllSavedCards();
    }, []);

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

    // calling delete api to remove saved card, this func is using in singleRemoveCardModal
    const handleRemoveCard = async (id) => {
        setIsLoading(true)
           try {
               const response = await APIV3.delete(`${deleteCard}/${id}`)
               if(response?.status == 200) {
                    setIsLoading(false)
                    getAllSavedCards();
                    setSingleSavedCardShow(false)
               }
           } catch (error) {
               console.log(error)
           }
       }


    return (
        <div>
            {isLoading && <Loader />}
            <WalletBalanceComp setSingleSavedCardShow={setSingleSavedCardShow} singleSavedCardShow={singleSavedCardShow} handleRemoveCard={handleRemoveCard} walletDetails={walletDetails} getListSavedCards={getListSavedCards} topupData={topupData && topupData} />
        </div>
    )
}

export default WalletBalancePage;

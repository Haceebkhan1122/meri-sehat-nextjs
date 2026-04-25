import React, { useState } from 'react'
import styles from './allTransactionsWallet.module.css';
import Image from 'next/image';
import Router from 'next/router';
import TransactionModal from '../TransactionModal/TransactionModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../Loader';

const AllTransactionsWallet = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState([]);
    const { transactions, getTransactionsList, lastPage,page } = props;
    const handleModal = (tranData) => {
        setModalShow(true)
        setModalData(tranData)
    }


    const handleClose = () => setModalShow(false);
    return (
        <>
            <div className={styles.wrapperAllTransactionsContainer}>
                <div className={styles.wrapperAllTransactions}>
                    <div className={styles.wrapperHeadTransac}>
                        <span className={styles.back_transa} onClick={() => Router.back()}>  </span>
                        <span className={styles.head_title}> All Transactions </span>
                    </div>
                    <div className={styles.singleTrsancs}>
                        <InfiniteScroll
                            dataLength={transactions?.length ? transactions?.length : null}
                            next={() => {
                                getTransactionsList()
                            }}
                            hasMore={lastPage >= page ? true : false}
                            loader={<Loader />}
                            endMessage={<p className='textNomore'>No more items to show</p>}
                        >
                            {transactions?.length > 0 && transactions?.map((item) => (
                                <>
                                    <div className={styles.singleTrasactionWrapper} id={item?.id} onClick={() => handleModal(item)}>
                                        <div className={styles.wrapeFirstTrans}>
                                            <div className={styles.transactionImgBottomWrapper}>
                                                {item?.image && (
                                                    <Image width={73} height={73} src={item?.image} alt='transaction-img' className={styles.transactionImgBottom} />
                                                )}
                                            </div>
                                            <div className={styles.detailsTransac}>
                                                <h3 className={styles.transactionHeading}>
                                                    {item?.reference_type === 'subscription' ?
                                                        item?.subscription?.is_yearly === 1 ?
                                                            `${item?.subscription?.package?.name} Yearly` : `${item?.subscription?.package?.name} Monthly` :
                                                        item?.reference_type === 'labs' ? 'Lab Tests' : item?.reference_type === 'one_time' ? 'Doctor Consult' :
                                                            item?.reference_type === 'top_up' ? 'Wallet' : item?.reference_type === 'top_up_send' ? 'Credits Sent' : item?.reference_type === 'top_up_receive' ? 'Credits Received' : null}
                                                </h3>
                                                <span className={styles.transactionDescription}> {item?.buy_date}</span>
                                            </div>
                                        </div>
                                        <h3 className={styles.priceTransactions}>
                                            <span className={styles.transcPriceAll}> Rs. {item?.formated_price} </span>
                                            {item?.status == true ? <span className={styles.verifiedTickTransac}> </span> : <span className={styles.unSuccTickTransac}> </span>}
                                        </h3>
                                    </div>
                                </>
                            ))}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
            {modalShow ? (
                <>
                    <TransactionModal show={modalShow} handleClose={handleClose} modalData={modalData} />
                </>
            ) : null}
        </>
    )
}
export default AllTransactionsWallet;

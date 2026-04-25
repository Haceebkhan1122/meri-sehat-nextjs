import React, { useEffect, useState } from 'react';
import styles from "./promocodes.module.css";
import { Nav } from 'react-bootstrap';
import { Button, Modal } from 'antd';
import Image from "next/image";
import WrapperContainerWallet from "../../components/wrapperContainerCustomWallet/wrapperContainerWallet";
import PromocodeLayer from "../../public/svg/PromocodeLayer.svg"
import AddPromocodeSvg from "../../public/svg/AddPromocodeSvg.svg"
import PromoAvailableSvg from "../../public/svg/PromoAvailableSvg.svg"
import Arrow from "../../public/svg/RoundArrow.svg";
import SelectPromocodeSvg from "../../public/svg/SelectPromocodeSvg.svg";
import CancelBtn from "../../public/svg/cancelbtn.svg";
import mobileBackBtn from "../../public/svg/mobileBackBtn.svg";
import PlusSvg from "../../public/svg/PlusSvg.svg";
import DottedLines from "../../public/svg/DottedLines.svg";
import { isMobile } from "react-device-detect";
import Loader from '../../components/Loader';
import Router, { useRouter } from "next/router";
import { APIV3 } from "@/utils/httpService";
import { getAllPromocodes, addNewPromocode } from "@/utils/endpoints";
import Cookies from 'js-cookie';
import LoaderGif from "../../public/gif/asset_loader.gif";
import HeaderOnlyLogo from '@/components/headerOnlyLogo/HeaderOnlyLogo';
import ContainerWrapperFindDoc from '@/components/container-wrapper-find-doc/container-wrapper-find-doc';


const Promocodes = () => {
    const [availableTab, setAvailableTab] = useState(true)
    const [redeemedTab, setRedeemedTab] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [promocodeInputValue, setPromocodeInputValue] = useState('');
    const [promocodesList, setPromocodesList] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [inputValidation, setInputValidation] = useState(false)
    const [selectedPromoId, setSelectedPromoId] = useState(null);
    const [selectedPromocode, setSelectedPromocode] = useState(null)
    const [validInput, setValidInput] = useState(false);

    const router = useRouter()

    // If user is not logged in so it redirect to home page
    const autherization = Cookies.get('Authorization');
    useEffect(() => {

        if (!autherization) {
            window.location.href = "/phone-number";
        }
    }, [])

    // getting all promocodes
    const gettingAllPromocodes = async () => {
        setIsLoading(true)
        try {
            const response = await APIV3.get(getAllPromocodes);
            if (response?.status == 200) {
                setPromocodesList(response.data?.data)
                setIsModalOpen(false);
                setIsLoading(false)
                setValidInput(false)
            } else {
                console.log('error')
            }
        } catch (error) {
            console.log(error);
        }
    };

    // fetching all promocode when component mount
    useEffect(() => {
        gettingAllPromocodes();
    }, [])

    useEffect(() => {
        try {
            if (Cookies.get('selectedPromocode')) {
                const getPromocode = JSON.parse(Cookies.get('selectedPromocode'))
                setSelectedPromocode(getPromocode)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const showModal = () => {
        setIsModalOpen(true);
    };

    // calling post api to add new promocode
    const handleAddNewPromocode = async () => {
        setIsLoading(true)
        try {
            const data = {
                code: promocodeInputValue
            }

            const response = await APIV3.post(addNewPromocode, data)
            if (response?.status == 200) {
                setIsLoading(false)
                setValidInput(true);
                setTimeout(() => {
                    gettingAllPromocodes();
                    setIsModalOpen(false);
                    setPromocodeInputValue('')
                    setIsLoading(false);
                }, 3000);

            } else if (response?.status == 400) {
                setIsLoading(false)
                setInputValidation(true)
                setIsModalOpen(true);
            }
        } catch (error) {
            setPromocodeInputValue('')
            console.log(error)
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleTab = (tab) => {
        if (tab === 'link-1') {
            setAvailableTab(true)
            setRedeemedTab(false)
        } else if (tab === "link-2") {
            setAvailableTab(false)
            setRedeemedTab(true)
        }
    }

    const handlePromoInputChange = (e) => {
        setPromocodeInputValue(e.target.value)
    }

    // setting single selectedPromocode to cookies to get in payment process page
    const oneTimeCookie = Cookies.get('oneTime')
    const orderQueryCookie = Cookies.get('orderQuery')
    const handlePromocodeApply = (selectedPromocode) => {
        setSelectedPromoId(selectedPromocode?.id === selectedPromoId ? null : selectedPromocode?.id);
        Cookies.set('selectedPromocode', JSON.stringify(selectedPromocode))
        setSelectedPromocode([])

        if (oneTimeCookie) {
            window.location.href = '/no-subscription'
        } else if (orderQueryCookie) {
            window.location.href = `/order/${orderQueryCookie}`
        }
    }

    const handleRemovePromocode = () => {
        Cookies.remove('selectedPromocode')
        setSelectedPromocode([])
        setSelectedPromoId('')
    }

    useEffect(() => {
        if (!isModalOpen) {
            setInputValidation(false)
            setPromocodeInputValue("")
        }
    }, [isModalOpen])

    return (
        <>
            <HeaderOnlyLogo />
            {/* <HeaderOnlyLogo /> */}
            {isLoading && <Loader />}
            <div className={styles.promocodeFullContainer}>
                {!isMobile &&
                    <div className={styles.wrapperBtnSecured} onClick={() => Router.back()}>
                        <div className={styles.wrapperBtn}>
                            {/* <Image
                                src={mobileBackBtn}
                                alt=""
                                width={24}
                                height={24}
                                className={styles.backBtnMobile}
                            /> */}
                            <button className={styles.backBtn} > <span className={styles.back_arrow_svg} /> Promocodes  </button>
                        </div>
                    </div>
                }

                {isMobile && <>
                    <div className={styles.mobileHeader}>
                        <div style={{ marginLeft: '10px' }} onClick={() => Router.back()}>
                            <Image
                                src={mobileBackBtn}
                                alt=""
                                width={24}
                                height={24}
                                className={styles.backBtnMobile}
                            />
                        </div>
                        <div style={{ width: '85%' }}>
                            <h1>Discounts</h1>
                        </div>

                    </div>
                </>}


                <div className={styles.mainContainer}>
                    <WrapperContainerWallet>
                        <div className={styles.promoParentDiv}>

                            {!isMobile && <div className={styles.promoInnerDiv}>
                                {promocodesList?.available?.length > 0 && <div className={`${styles.btnInnerDiv} ${styles.btnInnerPromo}`} onClick={showModal}>
                                    <Image
                                        src={AddPromocodeSvg}
                                        alt=""
                                        width={20}
                                        height={20}
                                        className="LayerImg"
                                    />
                                    <a className={styles.addPromo}>Add Promocode</a>
                                </div>}

                            </div>}
                            <div className={styles.ParentContent}>

                                <div className={styles.rightSubs}>
                                    <Nav variant="underline" defaultActiveKey="link-1" className={styles.tabHeader} onSelect={handleTab}>
                                        <Nav.Item className={styles.itemOne}>
                                            <Nav.Link eventKey="link-1" className={` ${styles.descTabs} tabsHeaderContent`}>Available</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className={styles.itemOne}>
                                            <Nav.Link eventKey="link-2" className={` ${styles.descTabs} tabsHeaderContent`}> Redeemed </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <div className={styles.tabContentDiv}>
                                        {availableTab &&
                                            (!promocodesList?.available?.length > 0 ? (
                                                <div className={styles.noAvailablePromoParent}>
                                                    <div className={styles.availableContentDiv}>
                                                        <Image
                                                            src={PromocodeLayer}
                                                            alt=""
                                                            width={81}
                                                            height={52}
                                                            className="LayerImg"
                                                        />
                                                        {!isMobile ? <p>No promocodes currently <br /> available</p> : <p>No discount coupons <br /> currently available</p>}

                                                        {!isMobile && <button className={styles.addPromoBtn} onClick={showModal}>
                                                            <div className={styles.addPromoBtnInnerDiv}>

                                                                Add new PROMOcode
                                                            </div>
                                                        </button>}

                                                    </div>
                                                </div>
                                            ) :
                                                <div className={styles.availableCardParent}>

                                                    {isLoading ? (
                                                        <div className="d-block text-center">
                                                            <Image src={LoaderGif} width={80} height={80} alt="Loader" />
                                                        </div>
                                                    ) : (
                                                        promocodesList && promocodesList?.available.map((item) => (

                                                            <div className={(selectedPromocode?.id == item?.id || selectedPromoId === item.id) ? styles.SelectedAvailableCardDiv : styles.availableCardDiv}>
                                                                <div key={item?.id} id={item?.id} className={styles.innerDiv} >
                                                                    {(selectedPromocode?.id == item?.id || selectedPromoId === item.id) ? <Image
                                                                        src={SelectPromocodeSvg}
                                                                        alt=""
                                                                        width={isMobile ? 34 : 48}
                                                                        height={isMobile ? 34 : 48}
                                                                        className="LayerImg"
                                                                    /> : <Image
                                                                        src={PromoAvailableSvg}
                                                                        alt=""
                                                                        width={isMobile ? 34 : 48}
                                                                        height={isMobile ? 34 : 48}
                                                                        className="LayerImg"
                                                                    />
                                                                    }
                                                                    <div className={styles.cardInnerDiv}>
                                                                        <h5>{item.promocode.code}</h5>
                                                                        <p>{`Expires in ${item.remeaning_days} days`}</p>
                                                                    </div>
                                                                    <span className={(selectedPromocode?.id == item?.id || selectedPromoId === item.id) ? styles.selectedVerticleDots : styles.verticleDots}>
                                                                        <Image
                                                                            src={DottedLines}
                                                                            alt=""
                                                                            width={isMobile ? 50 : 70}
                                                                            height={isMobile ? 50 : 70}
                                                                            className=""
                                                                        />
                                                                    </span>
                                                                </div>
                                                                <div className={(selectedPromocode?.id == item?.id || selectedPromoId === item.id) ? styles.selectedApplyBtnDiv : styles.applyBtnDiv}>
                                                                    {
                                                                        (selectedPromocode?.id == item?.id || selectedPromoId === item.id) ?
                                                                            <div className={styles.removeDiv} onClick={handleRemovePromocode}>
                                                                                <Image
                                                                                    src={CancelBtn}
                                                                                    alt=""
                                                                                    width={isMobile ? 24 : 30.4}
                                                                                    height={isMobile ? 24 : 30.4}
                                                                                    className="LayerImg"
                                                                                />
                                                                                <p className={styles.promoRemoveBtn}>Remove</p>
                                                                            </div>
                                                                            :
                                                                            <button className={styles.appyBtn} onClick={() => handlePromocodeApply(item)}>Apply</button>
                                                                    }
                                                                </div>
                                                            </div>

                                                        ))
                                                    )}

                                                </div>

                                            )}
                                        {redeemedTab && <>
                                            <div className={styles.availableCardParent}>
                                                {promocodesList?.redeem && promocodesList?.redeem.map((item) => (
                                                    <>
                                                        <div className={styles.availableCardDiv}>
                                                            <div className={styles.innerDiv}>
                                                                <Image
                                                                    src={PromoAvailableSvg}
                                                                    alt=""
                                                                    width={isMobile ? 34 : 48}
                                                                    height={isMobile ? 34 : 48}
                                                                    className="LayerImg"
                                                                />
                                                                <div className={styles.cardInnerDiv}>
                                                                    <h5>Mastercard</h5>
                                                                    <p>Expires in 20 days</p>
                                                                </div>
                                                                <span className={styles.verticleDotsRedeemed}>
                                                                    <Image
                                                                        src={DottedLines}
                                                                        alt=""
                                                                        width={isMobile ? 50 : 70}
                                                                        height={isMobile ? 50 : 70}
                                                                        className="LayerImg"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className={styles.redeemedBtnDiv}>
                                                                <button className={styles.redeemedBtn}>Redeemed</button>
                                                            </div>
                                                        </div>
                                                    </>
                                                ))}
                                            </div>
                                        </>}
                                    </div>
                                </div>
                            </div>


                            {/* Mobile Add New promo Button */}
                            {isMobile && <>
                                <div className={styles.parentDivAddNew}>
                                    <div className={styles.addNewPromoBtn} onClick={showModal}>
                                        <Image
                                            src={PlusSvg}
                                            alt=""
                                            width={28}
                                            height={28}
                                            className="LayerImg"
                                        />
                                        <h1>Add new discount code</h1>
                                    </div>
                                </div>
                            </>
                            }
                        </div>
                    </WrapperContainerWallet>
                </div>
                <Modal centered title="" footer={null} open={isModalOpen} onCancel={handleCancel} width={'360px'} height={'260px'} className='modaladdPromo'>
                    <div className={styles.modalBody}>
                        <h5>{isMobile ? 'Add Discount Code' : 'Add  Promocode'}</h5>
                        <div className={styles.inputPromoDiv}>
                            <input className={inputValidation ? styles.inputPromo : validInput ?  styles.validValid :  styles.ValidationInputPromo} type='text' value={promocodeInputValue} placeholder={isMobile ? 'Enter discount/promo code' : 'Enter promocode'} onChange={(e) => handlePromoInputChange(e)} />
                            {inputValidation && <span className={styles.validationText}><span style={{ marginRight: "-3px" }}> * </span><span  > Invalid promocode</span></span>}
                            {/* {inputValidation && <span className={styles.validationText}>* Invalid promocode</span>} */}
                        </div>
                        <button className={styles.addPromoBtn} onClick={handleAddNewPromocode}>ADD</button>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default Promocodes;

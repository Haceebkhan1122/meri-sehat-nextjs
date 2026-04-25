import React, { useState, useEffect, Suspense } from "react";
import { MetaDataCustom } from "@/components/metaDataCustom";
import mixpanel from 'mixpanel-browser';
import { APIV3 } from "@/utils/httpService";
import Cookies from 'js-cookie';
import { ambulatoryLandingPage } from '@/utils/endpoints';
import { wrapper } from "@/store/store";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { renderWidget } from "@/utils/common";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styles from "./ambulatory.module.scss"
import Loader from "@/components/Loader";
import { addTranslation } from "@/store/translationSlice";
import WhatWeDo from "../../components/componentsUpdated/ambulatory/whatwedo/WhatWeDo"
import WhyChoose from "../../components/componentsUpdated/ambulatory/whychoose/WhyChoose"
const AmbulatoryService = (props) => {
    const { ambulatoryData, _nextI18Next } = props;
    const [bnrContent, setBnrContent] = useState("");
    const [pageName, setPageName] = useState();
    const router = useRouter();
    const dispatch = useDispatch();

        const initialLocale = _nextI18Next?.initialLocale;
    const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;

    useEffect(() => {
        if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
            dispatch(addTranslation(i18n));
        }
    }, [i18n]);

    useEffect(() => {
        setPageName(ambulatoryData?.slug)
    }, [ambulatoryData])

    return (
        <>
            <MetaDataCustom metaData={ambulatoryData} />
            <section className={`ambulatory_service ${styles.ambulatory_service}`}>
                <Suspense fallback={<Loader />}>

                    {ambulatoryData?.widgets?.map((item, index) => {
                        const { key_type } = item;
                        return renderWidget(key_type, item, index, false, bnrContent, pageName);
                    })}

                </Suspense>

                {/* <WhatWeDo /> */}
                {/* <WhyChoose /> */}

            </section>
        </>
    )
}



export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ locale }) => {
            const langChecker = Cookies.get("lang");
            const apiLocale = locale === "ur" || langChecker == "2" ? 2 : 1;
            try {
                const ambulatoryData = await APIV3.get(ambulatoryLandingPage, {
                    headers: {
                        platform: "web",
                        locale: apiLocale,
                    },
                });
                const ambulatoryDataContent = ambulatoryData?.data?.data;
                return {
                    props: {

                        ambulatoryData: ambulatoryDataContent || null,
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
                        ambulatoryData: null,
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



export default AmbulatoryService;
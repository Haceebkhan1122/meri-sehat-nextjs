import React, { useState, useEffect, Suspense } from "react";
import { MetaDataCustom } from "@/components/metaDataCustom";
import mixpanel from 'mixpanel-browser';
import { APIV3 } from "@/utils/httpService";
import Cookies from 'js-cookie';
import { ccmPageV3 } from '@/utils/endpoints';
import { wrapper } from "@/store/store";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { renderWidget } from "@/utils/common";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { addTranslation } from "@/store/translationSlice";

const CCMPage = (props) => {
    const { ccmContent, _nextI18Next } = props;
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
        setPageName(ccmContent?.slug)
    }, [ccmContent])


    return (
        <>
            <MetaDataCustom metaData={ccmContent} />
            <section className={`ccmPage`}>
                <Suspense fallback={<Loader />}>
                    {ccmContent?.widgets?.map((item, index) => {
                        const { key_type } = item;
                        return renderWidget(key_type, item, index, false, bnrContent, pageName);
                    })}
                </Suspense>
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
                const response = await APIV3.get(ccmPageV3, {
                    headers: {
                        platform: "web",
                        locale: apiLocale,
                    },
                });

                const ccmContent = response?.data?.data;

                return {
                    props: {
                        ccmContent: ccmContent || null,
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
                        ccmContent: null,
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

export default CCMPage;
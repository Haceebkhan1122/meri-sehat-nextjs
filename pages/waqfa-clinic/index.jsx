import API, { APICMS } from '@/utils/httpService';
import { walletPageFromServer, waqfaClinic, waqfaClinicApi } from '@/utils/endpoints';
import { wrapper } from '@/store/store';
import Cookies from 'js-cookie';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MetaDataCustom } from '@/components/metaDataCustom';
import { Suspense, useEffect } from 'react';
import Loader from '@/components/Loader';
import { renderWidget } from '@/utils/common';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addTranslation } from '@/store/translationSlice';

const WaqfaClinicPage = (props) => {
    const { waqfaClinicWidgets, _nextI18Next } = props;
    const dispatch = useDispatch();
    let router = useRouter();
    let path = router.pathname;

    const initialLocale = _nextI18Next?.initialLocale;
    const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;

    useEffect(() => {
        if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
            dispatch(addTranslation(i18n));
        }
    }, [i18n]);


    return (
        <>
            <MetaDataCustom metaData={waqfaClinicWidgets} />
            <section className={"waqfaClinicWidgets"}>
                <Suspense fallback={<Loader />}>
                    {waqfaClinicWidgets?.widgets?.map((item, index) => {
                        const { key_type } = item;
                        return renderWidget(key_type, item, index, path);
                    })}
                </Suspense>
            </section>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const { locale } = context;
    const langChecker = Cookies.get("lang");
    const apiLocale = locale === "ur" || langChecker == "2" ? 2 : 1;
    let response;
    try {
        context.res.setHeader(
            "Cache-Control",
            "public, s-maxage=600, stale-while-revalidate=600"
        );
        response = await APICMS.get(waqfaClinicApi, {
            headers: {
                platform: "web",
                locale: apiLocale,
            },
        });

        let waqfaClinicWidgets = response?.data?.data;
        return {
            props: {
                waqfaClinicWidgets,
                ...(await serverSideTranslations(locale, ["common"])),
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                waqfaClinicWidgets: [],
            },
        };
    }
};



export default WaqfaClinicPage;


import React, { useEffect, useState, Suspense, useMemo } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { wrapper } from "@/store/store";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { addTranslation } from "@/store/translationSlice";
import img1 from "../../public/png/img1.png";
import img2 from "../../public/png/img2.png";
import img3 from "../../public/png/img3.png";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { downloadNowPage } from "@/utils/endpoints";
import { APIV3 } from "@/utils/httpService";
import { MetaDataCustom } from '@/components/metaDataCustom';
import { useRouter } from 'next/router';
import { isAndroid } from 'react-device-detect';
import { renderWidget } from "@/utils/common";
import Loader from "@/components/Loader";

function downloadNow(props) {

    const [i18nData, setI18nData] = useState(null);
    const [pageName, setPageName] = useState();
    let i18nDataTwo = useSelector((state) => state.translation.i18n);
    const router = useRouter();
    const [bnrContent, setBnrContent] = useState("");
    const { _nextI18Next } = props;
    const dispatch = useDispatch();
    const initialLocale = _nextI18Next?.initialLocale;
    const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;

    useEffect(() => {
        setPageName(props.downloadNowData?.slug);
    }, [props.downloadNowData])

    // useEffect(() => {
    //     const redirectUser = () => {
    //         if (isAndroid) {
    //             window.location.href = 'https://play.google.com/store/apps/details?id=pk.merisehat.app&pli=1';
    //         } else {
    //             router.push('/download');
    //         }
    //     };

    //     redirectUser();
    // }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setI18nData(i18nDataTwo);
        }
    }, [i18nDataTwo]);

    useEffect(() => {
        if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
            dispatch(addTranslation(i18n));
        }
    }, [i18n]);

    return (
        <div>
            <MetaDataCustom metaData={props?.downloadNowData} />
            <section className={"downloadNowPage"}>
                <Suspense fallback={<Loader />}>
                    {props?.downloadNowData?.widgets?.map((item, index) => {
                        const { key_type } = item;
                        return renderWidget(key_type, item, index, false, bnrContent, pageName);
                    })}
                </Suspense>
            </section>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {

    const langChecker = Cookies.get("lang");
    const apiLocale = locale === "ur" || langChecker === "2" ? 2 : 1;
    try {
        const response = await APIV3.get(downloadNowPage, {
            headers: {
                platform: "web",
                locale: apiLocale,
            },
        });
        let downloadNowData = response?.data?.data;

        if (response?.status == 200) {
            return {
                props: {
                    downloadNowData,
                    ...(await serverSideTranslations(locale, ["common"])),
                },
            };
        } else {
            return { props: { downloadNowData: [] } };
        }
    } catch (error) {
        return { props: { downloadNowData: [] } };
    }
}
);

export default downloadNow;

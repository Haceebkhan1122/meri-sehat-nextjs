import React, { useEffect, useState } from "react";
import MaintenanceComp from '../../components/maintenanceComp/maintenanceComp';
import NavMaintainenance from '../../components/maintenanceComp/navMaintainenance/NavMaintainenance';
import { APIV3 } from "@/utils/httpService";
import Cookies from "js-cookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { maintenancePageFromServer } from "@/utils/endpoints";
import { useDispatch } from "react-redux";
import { addTranslation } from "@/store/translationSlice";

const Maintenance = (props) => {
    const { maintenanceData, _nextI18Next } = props;
    const initialLocale = _nextI18Next?.initialLocale;
    const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
            dispatch(addTranslation(i18n));
        }
    }, [i18n]);

    return (
        <section className='maintenancePage'>
            <NavMaintainenance />
            <MaintenanceComp maintenanceData={maintenanceData} />
        </section>
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
        response = await APIV3.get(maintenancePageFromServer, {
            headers: {
                platform: "web",
                locale: apiLocale,
            },
        });

        let maintenanceData = response?.data?.data;
        return {
            props: {
                maintenanceData,
                ...(await serverSideTranslations(locale, ["common"])),
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                maintenanceData: [],
            },
        };
    }
};

export default Maintenance;

import React, { useEffect, useState } from 'react'
import DoctorProfile from '../../components/doctor-profile/doctor-profile';
import API, { APIV3 } from "@/utils/httpService";
import { doctorProfileDetail } from "@/utils/endpoints";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { addTranslation } from "@/store/translationSlice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { wrapper } from "@/store/store";
import { useRouter } from 'next/router';
import { parseCookies } from '../../middlewares/cookieMiddleware';
import Head from "next/head";

const DoctorProfilePage = (props) => {
    const { doctorProfile, _nextI18Next, } = props;
    Cookies.remove('findASpecialist')
    Cookies.remove('specModal');
    const dispatch = useDispatch();
    const [i18nData, setI18nData] = useState(null);
    let i18nDataTwo = useSelector((state) => state.translation.i18n);


    useEffect(() => {
        if (typeof window !== "undefined") {
            setI18nData(i18nDataTwo);
        }
    }, [i18nDataTwo]);

    const initialLocale = _nextI18Next?.initialLocale;
    const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;

    useEffect(() => {
        if (typeof i18n === "object" && Object?.keys(i18n)?.length > 0) {
            dispatch(addTranslation(i18n));
        }
    }, [i18n]);

    return (
        <div>
            <Head>
                <title>{props?.doctorProfile?.user?.name ? `${props?.doctorProfile?.user?.prefix}. ${props?.doctorProfile?.user?.name} | Best ${props?.doctorProfile?.user?.doctor_specialities?.map((item, index) =>
                    index == props?.doctorProfile?.user?.doctor_specialities?.length - 1
                        ? `${item} `
                        : `${item} `
                )} in ${props?.doctorProfile?.user?.city
                    } | Online Consultation & Appointment`
                    : 'Doctor'}</title>
                <meta name="title" content={props?.doctorProfile?.user?.name ? `${props?.doctorProfile?.user?.prefix}. ${props?.doctorProfile?.user?.name} | Best ${props?.doctorProfile?.user?.doctor_specialities?.map((item, index) =>
                    index == props?.doctorProfile?.user?.doctor_specialities?.length - 1
                        ? `${item} `
                        : `${item} `
                )} in ${props?.doctorProfile?.user?.city
                    } | Online Consultation & Appointment`
                    : 'Doctor'} />
                <meta name="description" content={`Access the expertise of ${props?.doctorProfile?.user?.prefix}. ${props?.doctorProfile?.user?.name
                    }, renowned as the best ${props?.doctorProfile?.user?.doctor_specialities?.map((item, index) =>
                        index == props?.doctorProfile?.user?.doctor_specialities?.length - 1
                            ? `${item} `
                            : `${item} `
                    )} in ${props?.doctorProfile?.user?.city}. Opt for online doctor consultations and book appointments for personalized healthcare and comprehensive medical guidance`} />
                <meta property="og:description" content={`Access the expertise of ${props?.doctorProfile?.user?.prefix}. ${props?.doctorProfile?.user?.name
                    }, renowned as the best ${props?.doctorProfile?.user?.doctor_specialities?.map((item, index) =>
                        index == props?.doctorProfile?.user?.doctor_specialities?.length - 1
                            ? `${item} `
                            : `${item} `
                    )} in ${props?.doctorProfile?.user?.city}. Opt for online doctor consultations and book appointments for personalized healthcare and comprehensive medical guidance`} key="og-desc" />
                <link rel="canonical" href={`https://merisehat.pk${props?.doctorProfile?.user?.redirect_url}`} />
                <meta property="og:image" content={props?.doctorProfile?.user?.image} />

            </Head>
            <DoctorProfile doctorProfile={doctorProfile} />
        </div>
    )
}
export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale, req, params }) => {
    // Retrieve the 'lang' cookie
    const langChecker = Cookies.get("lang");

    const apiLocale = locale === "ur" || langChecker == "2" ? 2 : 1;
    const lastParam = params.id[params.id.length - 1];

    const cookies = parseCookies(req);

    // console.log('Request Headers:', {
    //     platform: "web",
    //     locale: apiLocale,
    // });
    try {
        const doctorProfileData = await APIV3.get(`/user?user=${lastParam}`, {
            headers: {
                platform: "web",
                locale: apiLocale,
            },
        });


        const DoctorDataContent = doctorProfileData?.data?.data;
        if (!DoctorDataContent || doctorProfileData?.code == 400) {
            return {
                redirect: {
                    destination: "/"
                },
                props: {
                    doctorProfile: null,
                    ...(await serverSideTranslations(locale, ["common"])),
                },
            };
        }
        else {
            return {
                props: {
                    doctorProfile: DoctorDataContent,
                    ...(await serverSideTranslations(locale, ["common"])),
                },
            };
        }
    } catch (error) {
        // Handle API error
        console.error('Error fetching doctor profile:', error);

        return {
            props: {
                doctorProfile: null,
                ...(await serverSideTranslations(locale, ["common"])),
            },
        };
    }
});


export default DoctorProfilePage;

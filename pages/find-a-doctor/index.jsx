
import React, { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { APIV3 } from '@/utils/httpService';
import { findADoctorPageV3 } from '@/utils/endpoints';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MetaDataCustom } from '@/components/metaDataCustom';
import Loader from '@/components/Loader';
import { renderWidget } from '@/utils/common';
import { useDispatch } from 'react-redux';
import { addTranslation } from '@/store/translationSlice';

const FadPage = (props) => {
  const { fadWidgets, _nextI18Next } = props;
  const [pageName, setPageName] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  Cookies.remove('specDiseaseModal')

  const initialLocale = _nextI18Next?.initialLocale;
  const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;

  useEffect(() => {
    if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
      dispatch(addTranslation(i18n));
    }
  }, [i18n]);

  useEffect(() => {
    setPageName(fadWidgets?.slug)
  }, [])

  return (
    <>
      <MetaDataCustom metaData={fadWidgets} />
      <Suspense fallback={<Loader />}>
        <section className='findADoctorPage'>
          {fadWidgets?.widgets?.map((item, index) => {
            const { key_type } = item;
            return renderWidget(key_type, item, index, false, pageName);
          })}
        </section>
      </Suspense>
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

    response = await APIV3.get(findADoctorPageV3, {
      headers: {
        platform: "web",
        locale: apiLocale,
      },
    });

    let fadWidgets = response?.data?.data;
    return {
      props: {
        fadWidgets,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        fadWidgets: [],
      },
    };
  }
};

export default FadPage;
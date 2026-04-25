
import React, { useState, useEffect, Suspense } from "react";
import { APIV3 } from "@/utils/httpService";
import { MetaDataCustom } from "@/components/metaDataCustom";
import Cookies from 'js-cookie';
import { cwpWorkshopLanding } from '@/utils/endpoints';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { renderWidget } from "@/utils/common";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { addTranslation } from "@/store/translationSlice";

const CorporateWellnessProgramWorkshop = (props) => {
  const { cwpWorkshop, _nextI18Next } = props;
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
    setPageName(cwpWorkshop?.slug)
  }, [cwpWorkshop])


  return (
    <>
      <MetaDataCustom metaData={cwpWorkshop} />
      <section className={`cwpPage cwpWorkShop`}>
        <Suspense fallback={<Loader />}>
          {cwpWorkshop?.widgets?.map((item, index) => {
            const { key_type } = item;
            return renderWidget(key_type, item, index, false, bnrContent, pageName);
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
    response = await APIV3.get(cwpWorkshopLanding, {
      headers: {
        platform: "web",
        locale: apiLocale,
      },
    });

    let cwpWorkshop = response?.data?.data;
    return {
      props: {
        cwpWorkshop,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        cwpWorkshop: [],
      },
    };
  }
};


export default CorporateWellnessProgramWorkshop;

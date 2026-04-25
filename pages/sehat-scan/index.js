import React, { useEffect, useState, Suspense } from "react";
import { sehatScanPageWidgets } from "@/utils/endpoints";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDispatch } from "react-redux";
import { addTranslation } from "@/store/translationSlice";
import Cookies from "js-cookie";
import Loader from "@/components/Loader";
import { APIV3 } from "@/utils/httpService";
import { MetaDataCustom } from "@/components/metaDataCustom";
import { renderWidget } from "@/utils/common";
import { useRouter } from "next/router";
import mixpanel from "mixpanel-browser";

export default function index(props) {
  const { sehatScanWidgets, _nextI18Next } = props;
  const [page, setPage] = useState("");
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
    setPageName(sehatScanWidgets?.slug)
  }, [sehatScanWidgets])

  useEffect(() => {
    setTimeout(() => {
      mixpanel.track('Sehat Scan Landing Page');
    }, 5000);
  }, [])


  return (
    <>
      <div className="vitalScanPage">
        <MetaDataCustom metaData={sehatScanWidgets} />
        <section className={"vitalScanPage"}>
          <Suspense fallback={<Loader />}>
            {sehatScanWidgets?.widgets?.map((item, index) => {
              const { key_type } = item;
              return renderWidget(key_type, item, index, false, bnrContent, pageName);
            })}
          </Suspense>
        </section>
      </div>
    </>
  );
};



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
    response = await APIV3.get(sehatScanPageWidgets, {
      headers: {
        platform: "web",
        locale: apiLocale,
      },
    });

    let sehatScanWidgets = response?.data?.data;
    return {
      props: {
        sehatScanWidgets,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        sehatScanWidgets: [],
      },
    };
  }
};

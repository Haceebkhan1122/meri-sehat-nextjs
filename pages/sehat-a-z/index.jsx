import React, { useEffect, useState, Suspense } from "react";
import WraperDoctor from '../../components/componentsUpdated/doctorNow/wraperDoctor/WraperDoctor';
import { getSehatAtoZ } from '@/utils/endpoints';
import { APIV3 } from '@/utils/httpService';
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDispatch } from "react-redux";
import { addTranslation } from "@/store/translationSlice";
import Cookies from "js-cookie";
import Loader from "@/components/Loader";
import { renderWidget } from "@/utils/common";
import { MetaDataCustom } from "@/components/metaDataCustom";


export default function index(props) {
  const { sehatAtoZWidgets, _nextI18Next } = props;
  const [bnrContent, setBnrContent] = useState("");
  const [clssForSpace, setClssForSpace] = useState("");
  const [loading, setLoading] = useState(true);
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
    setPageName(sehatAtoZWidgets?.slug)
  }, [sehatAtoZWidgets])

  return (
    <WraperDoctor>
      <MetaDataCustom metaData={sehatAtoZWidgets} />
      <section className={`homepage sehatAzPage checkMobile pt-md-0 HomePageDesignNew ${clssForSpace} ${sehatAtoZWidgets?.class_name}`}
      >
        <Suspense fallback={<Loader />}>
          {sehatAtoZWidgets?.widgets?.map((item, index) => {
            const { key_type } = item;
            return renderWidget(key_type, item, index, false, bnrContent, pageName);
          })}
        </Suspense>
      </section>
    </WraperDoctor>
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
    response = await APIV3.get(getSehatAtoZ, {
      headers: {
        platform: "web",
        locale: apiLocale,
      },
    });

    let sehatAtoZWidgets = response?.data?.data;

    return {
      props: {
        sehatAtoZWidgets,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        sehatAtoZWidgets: [],
      },
    };
  }
};

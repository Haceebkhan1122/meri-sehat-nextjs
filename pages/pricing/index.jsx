import React, { useEffect, useState, Suspense } from "react";
import PackageSection from "../../components/componentsUpdated/Pricing/packageSection/packageSection";
// import vitalScanModal from "../../components/componentsUpdated/Pricing/vitalScanModal/vitalScanModal";
import Cookies from "js-cookie";
import { renderWidget } from "@/utils/common";
import { MetaDataCustom } from "@/components/metaDataCustom";
import { pricingPageFromServer, getSubscriptions, getVitalScan, getHealthInsurance, getConsultNowInfo } from '@/utils/endpoints';
import { APIV3 } from '@/utils/httpService';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDispatch } from "react-redux";
import { addTranslation } from "@/store/translationSlice";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import mixpanel from "mixpanel-browser";


export default function index(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { pricingWidgets, _nextI18Next } = props;
  const initialLocale = _nextI18Next?.initialLocale;
  const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;
  const [pageName, setPageName] = useState();
  const [bnrContent, setBnrContent] = useState("");
  const [clssForSpace, setClssForSpace] = useState("");
  const [loading, setLoading] = useState(true);
  const [pricingTableData, setPricingTableData] = useState({});
  const [vitalInformation, setVitalInformation] = useState(null);
  const [consultNowInformation, setConsultNowInformation] = useState(null);
  const [healthInsuranceInformation, setHealthInsuranceInformation] = useState(null);

  useEffect(() => {
    if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
      dispatch(addTranslation(i18n));
    }
  }, [i18n]);

  useEffect(() => {
    setPageName(pricingWidgets?.slug)
  }, [pricingWidgets])

  const fetchPricingData = async () => {
    const headers = {
      Locale: 1, // Set your desired locale header value
    };

    const res = await APIV3.get(getSubscriptions, headers)
    if (res?.status == 200) {
      setPricingTableData(res?.data?.data)
    }
  }

  const fetchVitalsData = async () => {
    const headers = {
      Locale: 1, // Set your desired locale header value
    };
    const res = await APIV3.get(getVitalScan, headers)
    if (res?.status == 200) {
      setVitalInformation(res?.data?.data)
    }
  }

  const fetchConsultNowData = async () => {
    const headers = {
      Locale: 1, // Set your desired locale header value
    };
    const res = await APIV3.get(getConsultNowInfo, headers)
    if (res?.status == 200) {
      setConsultNowInformation(res?.data?.data)
    }
  }

  const fetchHealthInsuranceData = async () => {
    const headers = {
      Locale: 1, // Set your desired locale header value
    };
    const res = await APIV3.get(getHealthInsurance, headers)
    if (res?.status == 200) {
      setHealthInsuranceInformation(res?.data?.data)
    }
  }

  useEffect(() => {
    fetchPricingData();
    fetchVitalsData();
    fetchHealthInsuranceData();
    fetchConsultNowData();
  }, [])

  useEffect(() => {
    setTimeout(() => {
      mixpanel.track('Pricing Landing Page');
    }, 5000);
  }, [])

  useEffect(() => {
    Cookies.remove('clinic_info');
    Cookies.remove('paymentMethod');
    Cookies.remove('docProfileApp');
  }, [])

  return (
    <>
      <MetaDataCustom metaData={pricingWidgets} />
      <section className={`homepage pricingPageSelf checkMobile pt-md-0 ${clssForSpace} ${pricingWidgets?.class_name}`}
      >
        <div className="pricingPage">
          <Suspense fallback={<Loader />}>
            {pricingWidgets?.widgets?.map((item, index) => {
              const { key_type } = item;
              return renderWidget(key_type, item, index, false, bnrContent, pageName);
            })}
          </Suspense>
          <PackageSection consultNowInformation={consultNowInformation} pricingTableData={pricingTableData} vitalInformation={vitalInformation} healthInsuranceInformation={healthInsuranceInformation} />
        </div>
      </section>

    </>
  );
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
    response = await APIV3.get(pricingPageFromServer, {
      headers: {
        platform: "web",
        locale: apiLocale,
      },
    });

    let pricingWidgets = response?.data?.data;

    return {
      props: {
        pricingWidgets,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        pricingWidgets: [],
      },
    };
  }
};

import React, { useEffect, useState, Suspense } from "react";
import { getHomePageWidgetApi } from "@/utils/endpoints";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDispatch } from "react-redux";
import { addTranslation } from "@/store/translationSlice";
import Cookies from "js-cookie";
import Loader from "@/components/Loader";
import { APIV3 } from "../utils/httpService"; 
import { MetaDataCustom } from "@/components/metaDataCustom";
import { renderWidget } from "@/utils/common";
// import mixpanel from "mixpanel-browser";


function HomePage(props) {
  const { homePageWidgets, _nextI18Next } = props;
  const [bnrContent, setBnrContent] = useState("");
  const [clssForSpace, setClssForSpace] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletedAccount, setDeletedAccount] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [pageName, setPageName] = useState();
  const initialLocale = _nextI18Next?.initialLocale;
  const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    router.isReady && setLoading(false);
  }, [router.isReady]);

  useEffect(() => {
    setPageName(homePageWidgets?.slug)
  }, [homePageWidgets])

  useEffect(() => {
    if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
      dispatch(addTranslation(i18n));
    }
  }, [i18n]);

  useEffect(() => {
    const accountDeleted = Cookies.get('accountDeleted');
    if (accountDeleted) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        Cookies.remove('accountDeleted'); // Remove the cookie after showing the message
      }, 4000);
    }
  }, []);

  return (
    <>
      <MetaDataCustom metaData={homePageWidgets} />
      {loading && <Loader />}
      <section
        className={`homepage checkMobile pt-md-0 ${clssForSpace} ${homePageWidgets?.class_name}`}
      >
        {showMessage && (
          <div className='p-relative'>
            <div className="account-delete">
              Your account has been deleted
            </div>
          </div>
        )}
        <Suspense fallback={<Loader />}>
          {homePageWidgets?.widgets?.map((item, index) => {
            console.log({item})
            const { key_type } = item;
            return (
              <div key={index}>
                {renderWidget(key_type, item, index, false, bnrContent, pageName)}
              </div>
            );
          })}
        </Suspense>
      </section>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { locale } = context;

  // As cookies are client-side, you won't have access to them directly in `getStaticProps`.
  // Consider passing it via query params or other means, if necessary.
  const apiLocale = locale === "ur" ? 2 : 1;

  let response;
  try {
    response = await APIV3.get(getHomePageWidgetApi, {
      headers: {
        platform: "web",
        locale: apiLocale,
      },
    });

    let homePageWidgets = response?.data?.data;

    return {
      props: {
        homePageWidgets,
        ...(await serverSideTranslations(locale, ["common"])),
      },
      // revalidate: 600, // Regenerate the page every 600 seconds (10 minutes)
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        homePageWidgets: [],
      },
      // revalidate: 600, // ISR fallback in case of errors
    };
  }
};

export default HomePage;

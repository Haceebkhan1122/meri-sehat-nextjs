import { wrapper } from "@/store/store";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import { appWithTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import "@/styles/bootstrap.min.css";
import "@/styles/slick.css";
import "@/styles/globals.css";
import "@/styles/stylenewupdate.css";
import "@/styles/globalsTwo.css";
import "../components/SectionHeading/sectionHeading.css";
import "../components/layout/navbar.css";
import "../components/layout/toast.css";
import "../components/layout/footer.css";
import "@/styles/miscComponents.css";
import "@/styles/miscComponentsUrdu.css";
import "@/styles/miscComponentsResp.css";
import "@/styles/labTest.css";
import "@/styles/bakhabarnoujawan.css";
import "@/styles/WellnessProgrammBanner.scss";
import '@/styles/corporate-wellness-program.css';
import '@/styles/learnMoreModal.scss';
import "@/styles/globalupdated.scss";
import "@/styles/doctorPage.scss";
import Loader from "../components/Loader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { addTranslation } from "@/store/translationSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import AOS from "aos";
import "aos/dist/aos.css";
import runOneSignal from "@/utils/api/oneSignalIntegration";
import { mixPanelInit } from "@/utils/utilFunctions";
import { APIV3 } from "@/utils/httpService";
import 'react-range-slider-input/dist/style.css';

function App({ Component, pageProps, isMaintenance }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const initialLocale = pageProps?._nextI18Next?.initialLocale;
  const i18n = pageProps?._nextI18Next?.initialI18nStore[initialLocale]?.common;
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (router.pathname.includes('search-for-doctor') !== true) {
      Cookies.remove('rejoin')
    }
  }, [router.pathname])

  useEffect(() => {
    Cookies.remove('bookingDetails')
    Cookies.remove('cart')
    setTimeout(() => {
      AOS.init();
    }, 1000);
  }, []);

  useEffect(() => {
    if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
      dispatch(addTranslation(i18n));
    }
  }, [i18n]);

  useEffect(() => {
    mixPanelInit();
  }, [mixPanelInit]);


  useEffect(() => {
    setTimeout(() => {
      if (initialLocale == "ur") {
        Cookies.remove("lang");
        Cookies.set("lang", "2");
        document.body.classList.add("urdu");
        document.body.classList.remove("english"); //   Remove classes for 'en' language if it exists
        window.localStorage.setItem("lang", 2);
        window.localStorage.setItem("i18nextLng", "ur");
      } else if (initialLocale == "en") {
        Cookies.remove("lang");
        Cookies.set("lang", "1");
        document.body.classList.remove("urdu"); // Remove class for 'ur' language if it exist
        document.body.classList.add("english");
        window.localStorage.setItem("lang", 1);
        window.localStorage.setItem("i18nextLng", "en");
      }
    }, 100);
  }, [initialLocale]);

  useEffect(() => {
    if (router.pathname !== "/sehat-a-z" && router?.pathname !== "/ur/sehat-a-z") {
      setTimeout(() => {
        var externalResource = document.getElementsByClassName(
          "videoask-embed__button_right--V-il1"
        );
        for (var i = 0; i < externalResource.length; i++) {
          externalResource[i]?.remove();
        }
      }, 100);
    }
  }, [router.pathname]);


  useEffect(() => {
    if (router?.pathname !== "/sehat-scan" && router?.pathname !== "/ur/sehat-scan") {
      setTimeout(() => {
        var externalResource = document.getElementsByClassName(
          "videoask-embed__button_right--V-il1"
        );
        for (var i = 0; i < externalResource.length; i++) {
          externalResource[i]?.remove();
        }
      }, 100);

    }
  }, [router.pathname])


  useEffect(() => {
    runOneSignal()
      .then((value) => value)
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    checkMaintenance()
    Cookies.remove('pricingLogin')
  }, [])

  const checkMaintenance = async () => {
    try {
      setLoading(true)
      const response = await APIV3.get('/check/update');
      if (response?.status == 200) {
        if (response.data?.data?.is_maintenance_available == true) {
          router.push('/maintenance');
          setLoading(false)
        } else {
          setLoading(false)
        }
      }
    } catch (error) {
      console.error('Error fetching maintenance status:', error);
    }
  };

  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="t53_gQXKcEhyQXiK10aOApmuK0PRGErdpGOoi8RDeoA"
        />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0" />
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.4/TweenMax.min.js" />
      </Head>
      <Layout>
        {!router.isReady || loading && <Loader />}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default wrapper.withRedux(appWithTranslation(App));



import { footerUrl, headerUrl } from "@/utils/endpoints";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Toast from "./Toast";
import API from "@/utils/httpService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from '../Loader';
import FloatingBtn from "../../components/floatingBtn/FloatingBtn";
import WhatsappButton from "../whatsappButton/WhatsappButton";
import { isMobile } from "react-device-detect";
import { APIV3 } from "../../utils/httpService";

function Layout({ children }) {
  const [navbar, setNavbar] = useState([]);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);
  const [footer, setFooter] = useState({});
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", stopLoading);
    router.events.on("routeChangeError", stopLoading);

    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", stopLoading);
      router.events.off("routeChangeError", stopLoading);
    };
  }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     let locale;

  //     if (router.locale == "en") locale = 1;
  //     else locale = 2;

  //     let cachedNavbar = null;

  //     if (locale === 1) cachedNavbar = window.localStorage.getItem("navbar");
  //     else cachedNavbar = window.localStorage.getItem("navbar-urdu");

  //     if (cachedNavbar) {
  //       cachedNavbar = JSON.parse(cachedNavbar);

  //       const currentTime = new Date().getTime();
  //       const cacheExpirationTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  //       if (
  //         cachedNavbar.timestamp &&
  //         currentTime - cachedNavbar.timestamp < cacheExpirationTime
  //       ) {
  //         setNavbar(cachedNavbar.data);
  //       } else {
  //         fetchDataFromAPI(locale);
  //       }
  //     } else {
  //       if (router.locale) {
  //         fetchDataFromAPI(locale);
  //       }
  //     }
  //   }
  // }, [router.locale]);

  // function fetchDataFromAPI(locale) {
  //   if (router.locale) {
  //     APIV3.get(headerUrl, {
  //       headers: {
  //         locale,
  //         platform: "web",
  //       },
  //     }).then((response) => {
  //       if (response?.status === 200) {
  //         setNavbar(response?.data);

  //         if (typeof window !== "undefined") {
  //           const cacheKey = locale === 1 ? "navbar" : "navbar-urdu";
  //           const cachedData = {
  //             data: response?.data,
  //             timestamp: new Date().getTime(),
  //           };
  //           window.localStorage.setItem(cacheKey, JSON.stringify(cachedData));
  //         }
  //       }
  //     });
  //   }
  // }

  useEffect(() => {
    if (typeof window !== "undefined") {
      let locale = router.locale === "en" ? 1 : 2;

      // Fetch the data from API every time
      fetchDataFromAPI(locale);
    }
  }, [router.locale]);

  function fetchDataFromAPI(locale) {
    if (router.locale) {
      APIV3.get(headerUrl, {
        headers: {
          locale,
          platform: "web",
        },
      }).then((response) => {
        if (response?.status === 200) {
          setNavbar(response?.data);

          if (typeof window !== "undefined") {
            // Update the local storage with the latest API response
            const cacheKey = locale === 1 ? "navbar" : "navbar-urdu";
            const cachedData = {
              data: response?.data,
              timestamp: new Date().getTime(),
            };
            window.localStorage.setItem(cacheKey, JSON.stringify(cachedData));
          }
        }
      });
    }
  }


  useEffect(() => {
    let locale;
    if (router.locale === "ur") {
      locale = 2
    }
    else {
      locale = 1
    }
    APIV3.get(footerUrl, {
      headers: {
        locale,
        platform: "web",
      },
    }).then((response) => {
      if (response?.status === 200) {
        setFooter(response?.data?.data);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            "uan_number",
            response?.data?.data?.settings?.uan_number
          );
          window.localStorage.setItem("footer", JSON.stringify(response?.data?.data));
        }
      }
    });
  }, []);

  useEffect(() => {
    if (router.locale === "ur") {
      const restrictedUrls = ["/wellness"]; // Add the URLs you want to restrict here

      if (restrictedUrls.includes(router.pathname)) {
        setIsLoading(true);
        router.push("/");
      }
    }
  }, [router.pathname]);

  useEffect(() => {
    if (router.locale === "ur") {
      const restrictedUrls = ["/bakhabar-noujawan", "/healthcare-hubs"]; // Add the URLs you want to restrict here

      if (restrictedUrls.includes(router.pathname)) {
        setIsLoading(true);
        router.push("/");
      }
    }
  }, [router.name])

  useEffect(() => {
    const pathName = router.pathname;
    const mobile = isMobile;
    if (pathName === "/lab-details" && mobile) {
      setHideFooter(true)
    }
    if (pathName === "/wallet-balance" || pathName === "/wallet-balance?res=succeed") {
      setHideFooter(true)
    }
    if (pathName === "/maintenance") {
      setHideFooter(true)
      setHideNavbar(true)
    }
    if (pathName === "/labs-payment-process" && (mobile || !mobile)) {
      setHideFooter(true)
      setHideNavbar(true)
    }
    if (pathName === "/subscription") {
      setHideNavbar(true)
      setHideFooter(true)
    }

    if (pathName === "/reward-points") {
      setHideNavbar(true)
    }

    if (pathName === "/add-card") {
      setHideNavbar(true)
    }
    if (pathName === "/wallet") {
      setHideNavbar(false)
    }
    if (pathName === "/doctor-review") {
      setHideFooter(true)
      setHideNavbar(true)
    }
    if (pathName === "/promocodes") {
      setHideFooter(true)
      setHideNavbar(true)
    }
  }, [router.pathname])

  useEffect(() => {
    const pathName = router.pathname;
    if (pathName === "/wallet-balance") {
      setHideNavbar(true)
    }
  }, [router.pathname])

  return (
    <>
      {isLoading && router.pathname.includes('/corporate-wellness-workshop-listing') !== true && router.pathname.includes('nursing') !== true && <Loader />}
      {router.pathname.includes('book-a-nurse') !== true && (
        <>
          <section className="toast_main">
            {<Toast text="zain" link="zain" />}
          </section>
          {!hideNavbar && <Navbar data={navbar} />}
        </>
      )}
      {children}
      {router.pathname == '/wallet' || router.pathname == '/wallet-balance' || router.pathname == '/subscription' || router.pathname == '/reward-points' || router.pathname == '/promocodes' || router.pathname == '/corporate-wellness-program' ? '' : <FloatingBtn />}
      {!hideFooter && router.pathname.includes('book-a-nurse') !== true && <Footer data={footer} />}
      {!(isMobile && router.pathname === '/sehat-scan') || router.pathname !== '/maintenance' && <WhatsappButton />}
    </>
  );
}


export default Layout;

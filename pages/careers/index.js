import React, { useEffect, useState, Suspense } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import Image from 'next/image';

import { getCareerLandingPage } from "@/utils/endpoints";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDispatch } from "react-redux";
import { addTranslation } from "@/store/translationSlice";
import Cookies from "js-cookie";
import Loader from "@/components/Loader";
import { APIV3 } from "@/utils/httpService";
import { MetaDataCustom } from "@/components/metaDataCustom";
import { renderWidget } from "@/utils/common";

function index(props) {

  const { careerWidgets, _nextI18Next } = props;
  const [pageName, setPageName] = useState();
  const [bnrContent, setBnrContent] = useState("");

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
    setPageName(careerWidgets?.slug);
  }, [careerWidgets])

  return (
    <>
      <MetaDataCustom metaData={careerWidgets} />
      <section className={"careerPage"}>
        <Suspense fallback={<Loader />}>
          {careerWidgets?.widgets?.map((item, index) => {
            const { key_type } = item;
            return renderWidget(key_type, item, index, false, bnrContent, pageName);
          })}
        </Suspense>
      </section>
    </>
  );
}

function safeJson(obj) {
  return JSON.parse(JSON.stringify(obj, (_, value) =>
    value === undefined ? null : value
  ));
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
    response = await APIV3.get(getCareerLandingPage, {
      headers: {
        platform: "web",
        locale: apiLocale,
      },
    });

    let careerWidgets = safeJson(response?.data?.data ?? null);


    return {
      props: {
        careerWidgets,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        careerWidgets: [],
      },
    };
  }
};


export default index;

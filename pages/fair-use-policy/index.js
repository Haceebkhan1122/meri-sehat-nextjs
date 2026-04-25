import React, { useEffect, useState } from 'react'
import { fairPolicyPageFromServer } from "@/utils/endpoints";
import Cookies from "js-cookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addTranslation } from "@/store/translationSlice";
import API from "@/utils/httpService";
import { Col, Container, Row, Accordion } from "react-bootstrap";
import parse from 'html-react-parser';


export default function index(props) {
  const { _nextI18Next } = props;
  const [fairPolicy, setFairPolicy] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (props?.policiesData) {
      setFairPolicy(props?.policiesData);
    }
  }, []);
  const initialLocale = _nextI18Next?.initialLocale;
  const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;

  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

  return (
    <section className='mt-5 FairSection'>
      <Container>
        {fairPolicy?.widgets?.map((items) => (
           <div className='Faircontainer py-4'>
           <h5 className='fairTitle'>
             {parse(items?.heading)}
           </h5>
           <div className='py-4'>
             <p>
                {parse(items?.description)}
             </p>
           </div>
         </div>
        ))}
      </Container>
    </section>
  )
}

export async function getServerSideProps({ locale }) {
  const langChecker = Cookies.get("lang");
  const apiLocale = locale === "ur" || langChecker == "2" ? 2 : 1;
  try {
    const response = await API.get(fairPolicyPageFromServer, {
      headers: {
        platform: "web",
        locale: apiLocale,
      },
    });
    let policiesData = response?.data;
    if (response?.code == 200) {
      return {
        props: {
          policiesData: policiesData,
          ...(await serverSideTranslations(locale, ["common"])),
        },
      };
    } else {
      return { props: { policiesData: [] } };
    }

  } catch (error) {
    return { props: { policiesData: [] } };
  }
}

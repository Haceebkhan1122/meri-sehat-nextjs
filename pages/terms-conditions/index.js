import React, { useEffect, useState } from "react";
import { termsConditionFromServer } from "@/utils/endpoints";
import API from "@/utils/httpService";
import { renderWidget } from "@/utils/common";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { addTranslation } from "@/store/translationSlice";
import { useDispatch } from "react-redux";

function index(props) {
  const { _nextI18Next } = props
  const dispatch = useDispatch()
  const [termsCondition, setTermsCondition] = useState(null);

  useEffect(() => {
    setTermsCondition(props?.termConditionData);
  }, []);


  const initialLocale = _nextI18Next?.initialLocale;
  const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;

  useEffect(() => {
    if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
      dispatch(addTranslation(i18n));
    }
  }, [i18n]);

  return (
    <section className="terms_condition_self pt-5 mt-3 mb-5">

      {termsCondition?.widgets?.map((item, index) => {
        const { key_type } = item;
        return renderWidget(key_type, item, index, false);
      })}
    </section>
  );
}

export async function getServerSideProps({ locale }) {
  try {
    const response = await API.get(termsConditionFromServer);

    let termsConditions = response?.data;

    if (response?.code === 200) {
      return {
        props: {
          termConditionData: termsConditions,
          ...(await serverSideTranslations(locale, ["common"])),

        },
      };
    } else {
      return { props: { termsConditions: [] } };
    }
  } catch (error) {
    return { props: { termsConditions: [] } };
  }
}

export default index;

import React, { useEffect, useState } from 'react';
import HeadingDesc from "../HeadingDesc/HeadingDesc";
import HeadingWithSpace from "../headingWithSpace/headingWithSpace";
import SectionHeadingSmall from "../SectionHeadingSmall/SectionHeadingSmall";
// import './resourceSingleArticle.css';
// import i18n from '../../i18n';
import RightArrowWithBorder from "../rightArrowWithBorder/RightArrowWithBorder";
import AnchorLink from "../ancerWithUnderline/anchorLink";
import Image from 'next/image';
import { useSelector } from 'react-redux';

function ResourceSingleArticle(props) {
  const { widgetData = [], key } = props;
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo])

  return (
    <section
      key={key}
      data-reference_widget_id={widgetData?.id}
      data-widget_id={widgetData?.widget_id}
      className="newsresource dynamic-widget"
    >
      {widgetData?.data?.[0]?.data?.image && (
        <div className="img_box">
          <Image crossorigin="anonymous" width={332} height={332} src={widgetData?.data?.[0]?.data?.image} alt="img" />
        </div>
      )}
      <div className="content">
        <HeadingWithSpace text={i18nData?.newsresource} />
        {widgetData?.data?.[0]?.data?.name && (
          <SectionHeadingSmall text={widgetData?.data?.[0]?.data?.name} />
        )}
        {widgetData?.data?.[0]?.data?.descripton && (
          <HeadingDesc
            text={
              <p
                dangerouslySetInnerHTML={{
                  __html: widgetData?.data?.[0]?.data?.descripton || ''
                }}
              />
            }
          />
        )}
        {widgetData?.data?.[0]?.data?.redirect_url && (
          <div className="btns_container">
            <RightArrowWithBorder />
            <AnchorLink
              to={widgetData?.data?.[0]?.data?.redirect_url}
              text={i18nData?.read_more}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default ResourceSingleArticle;

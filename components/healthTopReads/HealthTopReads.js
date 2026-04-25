/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ArticleWithShortDesc from "../articleWithShortDesc/ArticleWithShortDesc";
import ArticleItemLists from '../articleItemLists/ArticleItemLists';
import SectionHeading from '../SectionHeading/SectionHeading';
import AnchorLink from '../ancerWithUnderline/anchorLink';
import { RightArrowWithBorder } from '../rightArrowWithBorder';
// import i18n from '../../../i18n';
import { useSelector } from "react-redux";


function HealthTopReads(props) {
  const { widgetData = {}, key } = props;


  const [removeFirstIndex, setRemoveFirstIndex] = useState();
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);
  useEffect(() => {

    if (widgetData?.data) {
      setRemoveFirstIndex(widgetData?.data?.slice(1));
    }

  }, [JSON.stringify(widgetData)])


  const firstArticle = widgetData?.data?.[0];

  const hasRedirectUrl = widgetData?.redirect_url ? true : false;

  return (
    <section
      key={key}
      data-reference_widget_id={widgetData?.id}
      data-widget_id={widgetData?.widget_id}
      className="top_reads health article dynamic-widget sehatatozee d-none-urdu"
      data-aos="fade-up" data-aos-duration="800"
    >
      <Container>
        <SectionHeading
          heading={widgetData?.heading}
          icon={hasRedirectUrl && <RightArrowWithBorder />}
          link={
            hasRedirectUrl && (
              <AnchorLink
                to={widgetData?.redirect_url}
                // text={i18n.t('view_all') || 'View All'}
                text="View All"
              />

            )
          }
        />
        <Row>
          <Col lg={7} md={12} className="pe-lg-0 _d-none _d-md-block">
            <ArticleWithShortDesc
              label={widgetData?.data?.[0]?.data?.label}
              image={firstArticle?.data?.image}
              topic={firstArticle?.data?.name}
              desc={firstArticle?.data?.descripton}
              // btnText={i18n.t('read_more') || 'Read More'}
              btnText={i18nData?.read_more}

              link={firstArticle?.data?.redirect_url}
            />
          </Col>




















          <Col lg={5} md={12} className='ss'>
            {removeFirstIndex?.map((item, index) => {
              return (
                <ArticleItemLists
                  label={item?.data?.label}
                  key={index}
                  image={item?.data?.image}
                  statusProgress={''}
                  // statusText={i18n.t('status_text') || 'Status Text'}
                  statusText="Status Text"
                  heading={item?.data?.name}
                  desc={item?.data?.descripton}
                  // btnText={i18n.t('read_more') || 'Read More'}
                  btnText={i18nData?.read_more}
                  link={item?.data?.redirect_url}
                />
              );
            })}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default React.memo(HealthTopReads);

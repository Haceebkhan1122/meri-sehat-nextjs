/* eslint-disable react/no-array-index-key */
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ArticleItemLists from "../articleItemLists/ArticleItemLists";
import SectionHeadingMed from "../SectionHeadingMed/SectionHeadingMed";
import Image from "next/image";

function MoreInHealth(props) {
  const {
    widgetData = [],
    key,
    heading,
    children,
    colorHeading,
    icon,
    link,
    endText,
    label,
  } = props;

  const hasRedirect = widgetData?.redirect_url ? true : false;

  const articleArr = widgetData?.data;

  return (
    <section
      key={key}
      data-reference_widget_id={widgetData?.id}
      data-widget_id={widgetData?.widget_id}
      className="top_reads moreInHealth article ffff dynamic-widget onlyParaShowPage ss"
    >
      <Container>
        {/* <SectionHeadingMed text={widgetData?.heading} />
        <div className="border_line" />
        <div className="btn_icon_box">
          {icon || ''}
          {link || ''}
        </div> */}
        <div className="section-heading border_md_Bottom d-flex">
          <div>
            <h2 dir="auto" className="text-initial fw-600">
              <SectionHeadingMed text={widgetData?.heading} />
            </h2>
          </div>
          {children && <div className="children">{children || ""}</div>}
          <div className="border_line" />
          <div class="btn_icon_box">
            <div>
              <Image
                src="/right-arrow-border.svg"
                width={30}
                height={30}
                alt="arrow-with-border"
                class="arrow_right_border"
              />
            </div>
            <div>
              <a
                class="underline_ancer text-uppercase"
                href={widgetData?.redirect_url}
              >
                {i18nData?.view_all}
              </a>
            </div>
          </div>
        </div>
        <Row>
          {articleArr?.map((item, index) => {
            return (
              <Col lg={6} md={12}>
                <ArticleItemLists
                  key={index}
                  label={item?.data?.label}
                  image={item?.data?.image}
                  heading={item?.data?.name}
                  desc={item?.data?.descripton}
                  btnText={
                    // i18n.t('read_more')
                    `Read More`
                  }
                  link={item?.data?.redirect_url}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}

export default MoreInHealth;

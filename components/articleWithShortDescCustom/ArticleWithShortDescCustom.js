import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import { TopicHeading } from "../TopicHeading";
import { HeadingDescSmall } from "../headingDescSmall";
import { HeadingDescVsmall } from "../headingDescVsmall";
import Status from "../status/Status";
// import './articleWithShortDesc.css';
import CustomPopOver from "../customPopOver/CustomPopOver";
import { RightArrowWithBorder } from "../rightArrowWithBorder";
import Image from "next/image";
import { useSelector } from "react-redux";

function ArticleWithShortDescCustom(props) {
  const { image, topic, desc, link, btnText, type, label } = props;
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);
  return (
    <a href={link || ""}>
      <div className="card articleWithShortDesc cardWithHeaderImage boxShadowOnBox">
        <Row className="align-items-start for_bg_custom_article">
          <Col md={5} className="p-0 py-0 mb-0">
            <div className="header_img img_box hk_big_left">
              <Image
                crossorigin="anonymous"
                src={image}
                width={100}
                height={100}
                alt="cardImage"
              />
            </div>
          </Col>
          <Col md={7}>
            <div className="card_body hk_big_right">
              {label && (
                <CustomPopOver
                  trigger="hover"
                  content={
                    <HeadingDescVsmall
                      text={
                        <p
                          dangerouslySetInnerHTML={{
                            __html: label?.description,
                          }}
                        />
                      }
                    />
                  }
                >
                  <Status text={label?.value} bgColor={label?.color} />
                </CustomPopOver>
              )}
              {/* <StatusList status={status} /> */}
              <TopicHeading text={topic} />
              <HeadingDescSmall text={desc} />
              {link && (
                <div className="btn_container">
                  <RightArrowWithBorder />
                  <button
                    type="button"
                    className="underline_ancer text-uppercase"
                  >
                    {btnText || i18nData?.read_more}
                  </button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </a>
  );
}

export default ArticleWithShortDescCustom;

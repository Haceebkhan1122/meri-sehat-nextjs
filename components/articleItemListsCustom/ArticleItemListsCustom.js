import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import Link from "next/link";
// import i18n from '../../i18n';
import CustomPopOver from "../customPopOver/CustomPopOver";
import { HeadingDesc } from "../HeadingDesc";
import { HeadingDescVsmall } from "../headingDescVsmall";
import { HeadingWithSpace } from "../headingWithSpace";
import { ListHeading } from "../listHeading";
import { RightArrowWithBorder } from "../rightArrowWithBorder";
import Status from "../status/Status";
import { useSelector } from "react-redux";

// import './articleItemLists.css';

function ArticleItemListsCustom(props) {
  const { image, type, heading, btnText, link, desc, drName, label } = props;
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);
  return (
    <Col md={4}>
      <a href={link || ""}>
        <div className="card articleItemLists boxShadowOnBox">
          <div>
            <div className="card_body p-4">
              <div>
                <div className="drName">
                  <HeadingWithSpace text={drName} />
                </div>
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
                <ListHeading text={heading} />
                <HeadingDesc text={desc} custom_class={"elipsis"} />
              </div>
              <div className="btn_container">
                <RightArrowWithBorder />
                <button
                  type="button"
                  className="underline_ancer text-uppercase"
                >
                  {btnText || i18nData?.read_more}
                </button>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Col>
  );
}

export default ArticleItemListsCustom;

import React, { useState, useEffect } from "react";
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

function ArticleWithShortDescRight(props) {
  const { image, topic, desc, link, btnText, type, label } = props;
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);
  return (
    <Link href={link || ""}>
      <div className="card articleWithShortDesc cardWithHeaderImage boxShadowOnBox">
        <div className="header_img img_box">
          <Image
            width={100}
            height={100}
            crossorigin="anonymous"
            src={image}
            alt="cardImage"
          />
        </div>
        <div className="card_body">
          <div className="p-20">
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
                <button type="button" className="underline_ancer text-uppercase">
                  {btnText || i18nData?.read_more}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArticleWithShortDescRight;

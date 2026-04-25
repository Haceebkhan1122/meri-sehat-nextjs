// import i18n from '../../i18n';
import { useSelector } from "react-redux";
import CustomPopOver from "../customPopOver/CustomPopOver";
import { HeadingDescVsmall } from "../headingDescVsmall";
import { HeadingWithSpace } from "../headingWithSpace";
import { RightArrowWithBorder } from "../rightArrowWithBorder";
import Status from "../status/Status";
// import { useTranslation } from 'next-i18next';
// import './articleItemLists.css';
// import mixpanel from 'mixpanel-browser';
// import { useSelector, useDispatch } from 'react-redux';
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";

function ArticleItemLists(props) {
  const router = useRouter();
  const { image, type, heading, btnText, link, desc, drName, label } = props;
  const isMobile = useMediaQuery('(max-width:768px)');
  // const { t } = useTranslation('common');

  // const dispatch = useDispatch();
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

  const mixPanelTracking = () => {
    // mixpanel.track('Article Read More', {
    //     Name: userDetailsInfo?.name,
    //     Email: userDetailsInfo?.email,
    //     Number: userDetailsInfo?.phone
    // });
  };

  // useEffect(() => {

  //   dispatch(getUserDetail())

  // }, [])

  return (
    <Link href={link ? `${link}` : `${link}`}>
      <div className="card articleItemLists boxShadowOnBox boxShadowHideMobile">
        <div>
          <div className="card_img img_box bordertbRadius">
            <Image
              crossorigin="anonymous"
              src={image}
              alt="img"
              width={isMobile ? 125 : 213}
              height={isMobile ? 140 : 213}
            />
          </div>
          <div className="card_body">
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

              {/* <ListHeading text={heading} /> */}
              <a href={`${link}` || ""} className="articleLinkChangeAnchor">
                {heading}
              </a>
              {/* <h5 className='heading_desc_small'></h5> */}
              {/* <HeadingDesc text={desc} custom_class={'elipsis'} /> */}
            </div>
            <div>
              <p className="fs-16 textDescriptionArticleAll">{desc}</p>
            </div>
            <div className="btn_container">
              <RightArrowWithBorder />
              <button
                type="button"
                className="underline_ancer text_border"
                onClick={mixPanelTracking}
              >
                {i18nData?.read_more}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArticleItemLists;

import React, { useCallback, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPrint, faEnvelope } from "@fortawesome/fontawesome-free-solid";
// import './socialLinks.css';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import ReactToPrint from "react-to-print";
// import ShareArticleDetail from '../ShareArticleDetail/ShareArticleDetail';
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
// import mixpanel from 'mixpanel-browser';

function SocialLinks(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);
  const {
    title,
    url,
    slug,
    onClickForPrint = () => { },
    print,
    componentRef,
  } = props;
  const onPrint = useCallback(() => {
    onClickForPrint();
  }, []);

  const siteUrl = process.env.NEXT_PUBLIC_PATIENT_URL;
  const mixPanelTrackingFb = () => {
    //   mixpanel.track('Share Disease Article via Facebook', {
    //     'Name': userDetailsInfo?.name, 'Email': userDetailsInfo?.email, 'Number': userDetailsInfo?.phone
    //   });
    // }
    // const mixPanelTrackingTwitter = () => {
    //   mixpanel.track('Share Disease Article via Twitter', {
    //     'Name': userDetailsInfo?.name, 'Email': userDetailsInfo?.email, 'Number': userDetailsInfo?.phone
    //   });
    // }
    // const mixPanelTrackingEmail = () => {
    //   mixpanel.track('Share Disease Article via Email', {
    //     'Name': userDetailsInfo?.name, 'Email': userDetailsInfo?.email, 'Number': userDetailsInfo?.phone
    //   });
    //   window.location.href = encodeURI(`mailto:?subject=${`Share Article from Merisehat.pk`}&body=\n\n ${`${window.location.origin}${slug}`}\n\n`);
  };

  // useEffect(() => {
  //   dispatch(getUserDetail())
  // }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);


  return (
    <div className="socialLinks fontSizeSocial">
      <Dropdown.Item href="#/action-4">
        <ReactToPrint
          trigger={() => {
            return (
              <button onClick={onPrint} className="share_icons">
                <FontAwesomeIcon icon={faPrint} />
              </button>
            );
          }}
          content={() => componentRef}
        />
      </Dropdown.Item>
      <div>
        <Dropdown
          className="shareArticleDropdown"
          onMouseOver={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <Dropdown.Toggle
            className="main-style article-drop"
            id="dropdown-basic"
          >
            {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-share" /> */}
            <span className="icon_arrow_arti">  </span>
            <span>{i18nData?.share_this_article}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu
            show={showDropdown}
            className="d-flex align-items-center justify-content-center hide"
          >
            <Dropdown.Item>
              <FacebookShareButton
                // onClick={mixPanelTrackingFb}
                title={title}
                className="share_icons"
                url={`${siteUrl}${slug}`}
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </FacebookShareButton>
            </Dropdown.Item>
            <Dropdown.Item>
              <TwitterShareButton
                // onClick={mixPanelTrackingTwitter}
                title={title}
                className="share_icons"
                url={`${siteUrl}${slug}`}
              >
                <FontAwesomeIcon icon={faTwitter} />
              </TwitterShareButton>
            </Dropdown.Item>
            <Dropdown.Item>
              <EmailShareButton
                title={title}
                className="share_icons"
                url={`${siteUrl}${slug}`}
              // onClick={mixPanelTrackingEmail}
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </EmailShareButton>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default SocialLinks;

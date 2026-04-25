import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import FooterLogo from "./FooterLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faYoutube,
  faLinkedin,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import visa from "../../public/png/Visa_Logo.png";
import master from "../../public/png/mastercard_Logo.png";
import GoogleStore from "../../public/png/google_store.png";
import AppStore from "../../public/png/app_store.png";
import logof1 from "../../public/svg/logof1.svg";
import logof2 from "../../public/svg/logof2.svg";
import logof3 from "../../public/svg/logof3.svg";
import logof4 from "../../public/svg/logof4.svg";
import logof5 from "../../public/svg/logof5.svg";
import logof6 from "../../public/svg/logof6.svg";
import Image from "next/image";
import { useRouter } from 'next/router';

function Footer({ data }) {
  const [isMobile, setIsMobile] = useState(false);
  const [uanNumber, setUanNumber] = useState("");
  const router = useRouter();
  const currentPath = router.pathname;

  const mixPanelTracking = () => {
    // mixpanel.track('Call Now', {
    //   Name: userDetailsInfo?.name,
    //   Email: userDetailsInfo?.email,
    //   Number: userDetailsInfo?.phone
    // });
  };
  useEffect(() => {
    import("react-device-detect").then((item) => {
      setIsMobile(item.isMobile);
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const number = window.localStorage.getItem("uan_number");

      if (number) {
        setUanNumber(number);
      }
    }
  }, []);


  return (
    <section dir="auto" className="footer position-relative" >
      <Container >
        <Row>
          <Col md={6}> <FooterLogo /></Col>
          <Col md={6} className="text-end my-auto">
            <div className={`cardsImagesContainer grayScaleImage d-flex align-items-center apps_img ${router.pathname.includes('/corporate-wellness-workshop-detail/[id]') && 'workshop_spacing'}`}>
              {data?.settings?.app_store && (
                <a
                  target="_blank"
                  className="appStore"
                  href={data?.settings?.app_store}
                  rel="noreferrer"
                >
                  <Image src={AppStore} alt="app_store" className="me-2 img-fluid" />
                </a>
              )}
              {data?.settings?.google_play && (
                <a
                  target="_blank"
                  className="google_play"
                  href={data?.settings?.google_play}
                  rel="noreferrer"
                >
                  <Image src={GoogleStore} alt="google_store" className=" img-fluid" />
                </a>
              )}
            </div>
          </Col>
          <Col md={12}><hr className="footerLine"></hr></Col>

          <Col md={12} className="row mt-5 mt-md-0">
            {data?.footer?.map((item, index) => {
              return (
                <Col className={`col-xs-6 col-lg-2 ${(item?.name == "For Corporates" || item?.name == "Public Health") ? 'd-none' : ''}`}>
                  <div className="mb-4 mb-md-0">
                    <h5> {item?.name} </h5>
                    <ul dir="auto" className="footer_links">
                      {item?.children?.map((child) => {
                        return (
                          child?.link && (
                            <>
                              <li key={child?.id}>
                                <a href={child?.link || ""}>
                                  {" "}
                                  {child?.name}{" "}
                                </a>
                              </li>
                            </>
                          )
                        );
                      })}
                      {index === 1 ? (
                        <>
                          <h5 className="mt-3 ss check1">{data?.footer?.[2]?.name}</h5>
                          <li key={data?.footer?.[2]?.children?.[0]?.id}>
                            <a href={data?.footer?.[2]?.children?.[0]?.link || ""}>
                              {" "}
                              {data?.footer?.[2]?.children?.[0]?.name}{" "}
                            </a>
                          </li>
                        </>
                      ) : null}
                      {index === 3 ? (
                        <>
                          <h5 className="mt-3 ss test">{data?.footer?.[4]?.name}</h5>
                          <li key={data?.footer?.[4]?.children?.[0]?.id}>
                            <a href={data?.footer?.[4]?.children?.[0]?.link || ""}>
                              {" "}
                              {data?.footer?.[4]?.children?.[0]?.name}{" "}
                            </a>
                          </li>
                          <li key={data?.footer?.[4]?.children?.[1]?.id}>
                            <a href={data?.footer?.[4]?.children?.[1]?.link || ""}>
                              {" "}
                              {data?.footer?.[4]?.children?.[1]?.name}{" "}
                            </a>
                          </li>
                        </>
                      ) : null}
                    </ul>

                    {isMobile &&
                      <div dir="auto" className="justify-content-center social_icons cardsImagesContainer grayScaleImage">
                        {data?.settings?.facebook_link && (
                          <a
                            target="_blank"
                            // href="https://www.facebook.com/MeriSehat.pk"
                            href={data?.settings?.facebook_link}
                            rel="noreferrer"
                          >
                            <FontAwesomeIcon icon={faFacebookF} />
                          </a>
                        )}
                        {data?.settings?.instagram_link && (
                          <a
                            target="_blank"
                            // href="https://www.instagram.com/merisehat.pk"
                            href={data?.settings?.instagram_link}
                            rel="noreferrer"
                          >
                            <FontAwesomeIcon icon={faInstagram} />
                          </a>
                        )}
                        {data?.settings?.youtube_link && (
                          <a
                            target="_blank"
                            // href="https://www.youtube.com/merisehat"
                            href={data?.settings?.youtube_link}
                            rel="noreferrer"
                          >
                            <FontAwesomeIcon icon={faYoutube} />
                          </a>
                        )}
                        {data?.settings?.twitter_link && (
                          <a
                            target="_blank"
                            className="TwitterBg"
                            // href="https://www.youtube.com/merisehat"
                            href={data?.settings?.twitter_link}
                            rel="noreferrer"
                          >
                            <FontAwesomeIcon icon={faTwitter} />
                          </a>
                        )}
                        {data?.settings?.lindedin_link && (
                          <a
                            target="_blank"
                            className="LinkedinBg"
                            // href="https://www.youtube.com/merisehat"
                            href={data?.settings?.lindedin_link}
                            rel="noreferrer"
                          >
                            <FontAwesomeIcon icon={faLinkedin} />
                            <i class="fa-brands fa-linkedin-in"></i>
                          </a>
                        )}
                      </div>
                    }

                  </div>

                </Col>
              );
            })}

            <Col className="col-xs-12 col-lg-2 hk_12">
              <div>
                <div className={`${router.pathname.includes("/doctor/") && isMobile ? "margin_for_fad" : ""} cardsImagesContainer grayScaleImage d-flex align-items-center card_img justify-content-start mb-3`}>
                  <Image src={visa} alt="visa" className="me-4 img-fluid" />
                  <Image src={master} alt="master" className="img-fluid" />
                </div>
                {uanNumber && (
                  <p className="footerColumn">
                    <a onClick={mixPanelTracking} href={`tel:${uanNumber}`}>
                      UAN: {uanNumber}
                    </a>
                  </p>
                )}

                <p className="footerColumn">
                  {data?.settings?.email && (
                    <a href="mailto:help@merisehat.pk">
                      Email: {data?.settings?.email}
                    </a>
                  )}
                </p>

                <div className="trustedBy">
                  <h5>Trusted By</h5>
                  <div className="logoFooter">
                    <div className="boxFoot">
                      <Image src={logof1} className="img-fluid"></Image>
                    </div>
                    <div className="boxFoot">
                      <Image src={logof2} className="img-fluid"></Image>
                    </div>
                    <div className="boxFoot">
                      <Image src={logof3} className="img-fluid"></Image>
                    </div>
                    <div className="boxFoot">
                      <Image src={logof4} className="img-fluid"></Image>
                    </div>
                    <div className="boxFoot">
                      <Image src={logof5} className="img-fluid"></Image>
                    </div>
                    <div className="boxFoot">
                      <Image src={logof6} className="img-fluid"></Image>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Col>

          <Col md={12}><hr className="bottomHr"></hr></Col>

          <Col md={6}>



            <div dir="auto" className="social_icons d-none d-md-flex">
              {data?.settings?.facebook_link && (
                <a
                  target="_blank"
                  // href="https://www.facebook.com/MeriSehat.pk"
                  href={data?.settings?.facebook_link}
                  rel="noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 31 32" fill="none">
                    <path d="M23.4878 0H6.81903C3.05298 0 0 3.05298 0 6.81903V24.2454C0 28.0115 3.05298 31.0645 6.81903 31.0645H23.4878C27.2538 31.0645 30.3068 28.0115 30.3068 24.2454V6.81903C30.3068 3.05298 27.2538 0 23.4878 0Z" fill="white" />
                    <path d="M15.8695 22.4616V16.3669H17.9152L18.2183 13.9909H15.8695V12.4755C15.8695 11.7876 16.0597 11.3193 17.0469 11.3193H18.3039V9.19256C17.6953 9.12864 17.0837 9.09753 16.4718 9.09937C16.0557 9.06947 15.638 9.13091 15.2481 9.27937C14.8582 9.42783 14.5055 9.65973 14.2146 9.95883C13.9237 10.2579 13.7018 10.617 13.5642 11.0109C13.4267 11.4048 13.3769 11.824 13.4184 12.2392V13.9909H11.3651V16.3669H13.4184V22.4616H15.8695Z" fill="#0F345A" />
                  </svg>
                </a>
              )}
              {data?.settings?.instagram_link && (
                <a
                  target="_blank"
                  // href="https://www.instagram.com/merisehat.pk"
                  href={data?.settings?.instagram_link}
                  rel="noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 31 32" fill="none">
                    <path d="M23.7885 6.10352e-05H7.11972C3.35367 6.10352e-05 0.30069 3.05304 0.30069 6.81909V24.2455C0.30069 28.0115 3.35367 31.0645 7.11972 31.0645H23.7885C27.5545 31.0645 30.6075 28.0115 30.6075 24.2455V6.81909C30.6075 3.05304 27.5545 6.10352e-05 23.7885 6.10352e-05Z" fill="white" />
                    <path d="M21.9597 13.0206C21.949 12.4664 21.8439 11.9181 21.6491 11.3992C21.4771 10.9553 21.2144 10.5522 20.8778 10.2157C20.5412 9.87907 20.1381 9.61639 19.6943 9.44437C19.1755 9.24986 18.6275 9.14482 18.0736 9.13373C17.3576 9.09963 17.1311 9.09206 15.3165 9.09206C13.5018 9.09206 13.2753 9.09963 12.5623 9.13146C12.0084 9.14233 11.4604 9.24738 10.9417 9.4421C10.4948 9.6098 10.0903 9.87363 9.75669 10.2149C9.41738 10.5485 9.15448 10.9518 8.98614 11.3969C8.79052 11.9157 8.68445 12.464 8.67246 13.0183C8.64215 13.7335 8.63382 13.9601 8.63382 15.7747C8.63382 17.5893 8.64215 17.8159 8.67246 18.5288C8.68322 19.083 8.78827 19.6313 8.98311 20.1502C9.15508 20.5941 9.41775 20.9972 9.75434 21.3338C10.0909 21.6704 10.494 21.9331 10.9379 22.105C11.4569 22.2996 12.0051 22.4047 12.5593 22.4157C13.2715 22.4467 13.4988 22.4551 15.3134 22.4551C17.1281 22.4551 17.3546 22.4475 18.0676 22.4157C18.6215 22.4048 19.1695 22.2998 19.6882 22.105C20.1324 21.9334 20.5357 21.6708 20.8725 21.3342C21.2093 20.9976 21.472 20.5943 21.6438 20.1502C21.8383 19.6312 21.9433 19.083 21.9544 18.5288C21.9855 17.8159 21.9938 17.5893 21.9938 15.7747C21.9938 13.9601 21.9915 13.7335 21.9597 13.0206ZM20.7565 18.4758C20.753 18.899 20.6761 19.3184 20.5292 19.7153C20.418 20.0044 20.2473 20.267 20.0283 20.4861C19.8094 20.7052 19.5469 20.876 19.2579 20.9875C18.8609 21.134 18.4415 21.2109 18.0183 21.2148C17.3137 21.2458 17.1023 21.2542 15.3195 21.2542C13.5367 21.2542 13.3223 21.2458 12.6199 21.2148C12.1967 21.2112 11.7773 21.1343 11.3804 20.9875C11.0903 20.8811 10.828 20.7107 10.6129 20.4889C10.3906 20.2729 10.2195 20.0099 10.112 19.7191C9.96548 19.3221 9.88859 18.9028 9.88473 18.4796C9.85367 17.775 9.84533 17.5636 9.84533 15.7808C9.84533 13.998 9.85291 13.7835 9.88473 13.0819C9.88827 12.6587 9.96517 12.2393 10.112 11.8424C10.2185 11.5517 10.3901 11.2891 10.6136 11.0749C10.8291 10.8536 11.0914 10.6833 11.3811 10.5763C11.7782 10.4298 12.1975 10.3529 12.6207 10.349C13.3253 10.318 13.5367 10.3096 15.3195 10.3096C17.1023 10.3096 17.3167 10.3172 18.0183 10.349C18.4415 10.3526 18.8609 10.4295 19.2579 10.5763C19.5479 10.6827 19.8103 10.8531 20.0254 11.0749C20.2466 11.2905 20.4169 11.5527 20.5239 11.8424C20.6705 12.2394 20.7473 12.6588 20.7512 13.0819C20.7823 13.7866 20.7906 13.998 20.7906 15.7808C20.7906 17.5636 20.7876 17.7712 20.7565 18.4766V18.4758Z" fill="#0F345A" />
                    <path d="M15.3167 12.3418C14.6377 12.3418 13.974 12.5431 13.4094 12.9203C12.8449 13.2976 12.4049 13.8337 12.145 14.461C11.8852 15.0883 11.8172 15.7786 11.9497 16.4445C12.0822 17.1105 12.4091 17.7222 12.8892 18.2023C13.3693 18.6824 13.981 19.0094 14.647 19.1418C15.3129 19.2743 16.0032 19.2063 16.6305 18.9465C17.2578 18.6866 17.7939 18.2466 18.1712 17.6821C18.5484 17.1175 18.7497 16.4538 18.7497 15.7748C18.7495 14.8644 18.3878 13.9913 17.744 13.3475C17.1002 12.7037 16.2271 12.342 15.3167 12.3418ZM15.3167 18.0008C14.8763 18.0008 14.4458 17.8702 14.0796 17.6255C13.7134 17.3809 13.428 17.0331 13.2594 16.6262C13.0909 16.2193 13.0468 15.7716 13.1327 15.3396C13.2186 14.9076 13.4307 14.5109 13.7421 14.1994C14.0536 13.888 14.4503 13.6759 14.8823 13.59C15.3143 13.5041 15.762 13.5482 16.1689 13.7167C16.5758 13.8853 16.9236 14.1707 17.1682 14.5369C17.4129 14.9031 17.5435 15.3336 17.5435 15.774C17.5435 16.3646 17.3089 16.931 16.8913 17.3486C16.4737 17.7662 15.9073 18.0008 15.3167 18.0008Z" fill="#0F345A" />
                    <path d="M19.6872 12.206C19.6872 12.3645 19.6402 12.5195 19.5521 12.6513C19.4641 12.7832 19.3389 12.8859 19.1924 12.9466C19.0459 13.0073 18.8847 13.0231 18.7292 12.9922C18.5737 12.9613 18.4309 12.8849 18.3188 12.7728C18.2067 12.6607 18.1303 12.5179 18.0994 12.3624C18.0685 12.2069 18.0844 12.0457 18.145 11.8992C18.2057 11.7527 18.3085 11.6276 18.4403 11.5395C18.5721 11.4514 18.7271 11.4044 18.8856 11.4044C19.0982 11.4044 19.3021 11.4888 19.4525 11.6392C19.6028 11.7895 19.6872 11.9934 19.6872 12.206Z" fill="#0F345A" />
                  </svg>
                </a>
              )}
              {data?.settings?.youtube_link && (
                <a
                  target="_blank"
                  // href="https://www.youtube.com/merisehat"
                  href={data?.settings?.youtube_link}
                  rel="noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 31 32" fill="none">
                    <path d="M24.089 6.10352e-05H7.4203C3.65426 6.10352e-05 0.601273 3.05304 0.601273 6.81909V24.2455C0.601273 28.0115 3.65426 31.0645 7.4203 31.0645H24.089C27.8551 31.0645 30.9081 28.0115 30.9081 24.2455V6.81909C30.9081 3.05304 27.8551 6.10352e-05 24.089 6.10352e-05Z" fill="white" />
                    <path d="M23.0409 12.8902V17.1786C23.031 17.2415 23.0166 17.3036 23.0121 17.3665C22.9897 17.8674 22.8974 18.3626 22.7378 18.8379C22.6391 19.1381 22.4782 19.414 22.2657 19.6479C22.0531 19.8817 21.7937 20.0681 21.5043 20.1949C20.9998 20.4069 20.4603 20.5235 19.9132 20.5389C19.3639 20.5677 18.8123 20.5737 18.2615 20.5745C16.0082 20.5745 13.7549 20.5745 11.5023 20.5662C10.8159 20.5773 10.1336 20.4572 9.49223 20.2123C8.96745 20.0159 8.5304 19.638 8.26025 19.147C7.97703 18.6033 7.8289 17.9993 7.82838 17.3862C7.79732 16.1383 7.79732 14.8958 7.79732 13.6501C7.79732 13.1599 7.82081 12.6652 7.85566 12.1788C7.87859 11.7811 7.99127 11.3939 8.18524 11.046C8.34613 10.7884 8.5595 10.5675 8.81145 10.3977C9.06341 10.228 9.34829 10.1133 9.64755 10.0611C10.2906 9.91104 10.9497 9.84155 11.6099 9.85422C14.0617 9.85119 16.5133 9.84968 18.9646 9.84968C19.6744 9.83273 20.3839 9.89448 21.08 10.0338C21.5214 10.1132 21.9339 10.3079 22.2756 10.5983C22.6704 10.99 22.9102 11.5112 22.9507 12.0659C22.9886 12.3394 23.0098 12.6152 23.0394 12.8902M13.6624 15.1428C13.6624 15.6731 13.6624 16.2035 13.6624 16.7339C13.6479 16.8313 13.6625 16.9309 13.7044 17.0201C13.7463 17.1093 13.8136 17.1841 13.8978 17.2352C13.9821 17.2863 14.0796 17.3113 14.178 17.3072C14.2765 17.303 14.3715 17.2699 14.4512 17.212C15.4705 16.6816 16.4896 16.1512 17.5084 15.6208C17.606 15.5852 17.6904 15.5204 17.75 15.4352C17.8096 15.3501 17.8416 15.2486 17.8416 15.1447C17.8416 15.0407 17.8096 14.9392 17.75 14.8541C17.6904 14.7689 17.606 14.7041 17.5084 14.6685C16.4896 14.1416 15.4735 13.6138 14.4603 13.0849C14.3803 13.0259 14.2847 12.9919 14.1854 12.9871C14.0862 12.9823 13.9877 13.007 13.9025 13.058C13.8172 13.109 13.7489 13.1841 13.7062 13.2738C13.6635 13.3636 13.6483 13.4639 13.6624 13.5623C13.6624 14.0881 13.6624 14.6139 13.6624 15.1397" fill="#0F345A" />
                  </svg>
                </a>
              )}
              {data?.settings?.twitter_link && (
                <a
                  target="_blank"
                  className="TwitterBg"
                  // href="https://www.youtube.com/merisehat"
                  href={data?.settings?.twitter_link}
                  rel="noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M24.3892 6.10352e-05H7.72049C3.95445 6.10352e-05 0.901466 3.05304 0.901466 6.81909V24.2455C0.901466 28.0115 3.95445 31.0645 7.72049 31.0645H24.3892C28.1553 31.0645 31.2083 28.0115 31.2083 24.2455V6.81909C31.2083 3.05304 28.1553 6.10352e-05 24.3892 6.10352e-05Z" fill="white" />
                    <path d="M14.0711 9.85019H10.7288L18.5752 21.3785H22.0069L14.0711 9.85019ZM12.0157 10.583H13.5706L20.6127 20.6099H19.0578L12.0157 10.583Z" fill="#0F345A" />
                    <path d="M20.6126 9.7966H21.5778L11.7296 21.2713H10.7287L20.6126 9.7966Z" fill="#0F345A" />
                  </svg>
                </a>
              )}
              {data?.settings?.lindedin_link && (
                <a
                  target="_blank"
                  className="LinkedinBg"
                  // href="https://www.youtube.com/merisehat"
                  href={data?.settings?.lindedin_link}
                  rel="noreferrer"
                >

                  <svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.6899 6.10352e-05H7.02118C3.25513 6.10352e-05 0.202148 3.05304 0.202148 6.81909V24.2455C0.202148 28.0115 3.25513 31.0645 7.02118 31.0645H23.6899C27.456 31.0645 30.5089 28.0115 30.5089 24.2455V6.81909C30.5089 3.05304 27.456 6.10352e-05 23.6899 6.10352e-05Z" fill="white" />
                    <g clip-path="url(#clip0_11716_20816)">
                      <path d="M11.7667 8.66979C11.7667 9.48399 11.1389 10.144 10.1067 10.144C9.13566 10.1427 8.50781 9.48399 8.50781 8.66979C8.50781 7.8556 9.15561 7.19557 10.1479 7.19557C11.1402 7.19557 11.7468 7.83521 11.7667 8.66979ZM8.58895 20.7885V11.3061H11.6656V20.7885H8.58895Z" fill="#0F345A" />
                      <path d="M13.5063 14.3311C13.5063 13.1487 13.4664 12.1599 13.4252 11.3062H16.0975L16.2398 12.625H16.301C16.7054 12.0045 17.6977 11.0934 19.3578 11.0934C21.3823 11.0934 22.9 12.3931 22.9 15.1848V20.7886H19.8233V15.5339C19.8233 14.312 19.3777 13.4787 18.2644 13.4787C17.4144 13.4787 16.9089 14.0406 16.6855 14.5834C16.6043 14.7771 16.5844 15.0485 16.5844 15.3199V20.7874H13.5077V14.3298L13.5063 14.3311Z" fill="#0F345A" />
                    </g>
                    <defs>
                      <clipPath id="clip0_11716_20816">
                        <rect width="14.3925" height="13.5929" fill="white" transform="translate(8.50781 7.19557)" />
                      </clipPath>
                    </defs>
                  </svg>

                </a>
              )}
            </div>
          </Col>
          <Col md={6}>
            <p className="text-right footerText">© {new Date().getFullYear()} MeriSehat. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
      <span class="react_app_version">V: 13.0.0</span>
    </section>
  );
}

export default Footer;

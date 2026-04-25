import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import HeadingDesc from "../HeadingDesc/HeadingDesc";
import leftImageArticle from "../../public/png/articleHeadingIcon.png";
import Image from "next/image";
import ImageLoader from "../ImageLoader";

function TopicBanner(props) {
  const router = useRouter();

  let mySlug = router.pathname;
  // mySlug = mySlug.replace(/\/page\//, "");

  const {
    bgImg,
    colorHeading,
    title,
    desc,
    showContent,
    slug,
    className,
    banner_color,
    type,
    alt
  } = props;
  
  const pagesToExclude = [
    "/page/terms-and-conditions",
    "/page/privacy-policy",
    "/page/cookie-policy",
    "/page/disclaimer",
    "/page/acceptable-use-policy",
    "/page/end-user-license-agreement",
    "/page/return-refund-policy",
  ];

  return (
    <>
      <div
        className={`mt-5 pt-5 ${bgImg ? "_topicBanner" : ""} ${className ? className : "sehat_a_to_z_only"
          } `}
      >
        <Container data-aos="fade-up" data-aos-duration="800">

          <div style={{ backgroundColor: banner_color }} className="banner_content_container banner-alignment wellnessBanner">
            <Row>
              {bgImg ? (
                <Col
                  xs={12} lg={4}
                  className={`offset-md-1 order-2 order-md-1 ${pagesToExclude.includes(slug) && "order-1"
                    }`}
                >
                  <Image
                    crossorigin="anonymous"
                    className="column-image img-fluid"
                    src={bgImg}
                    alt={alt}
                    width={323}
                    height={335}
                  />
                </Col>
              ) : <ImageLoader/>}

              <Col
                xs={12} lg={7}
                className="d-md-flex align-items-center forText mb-3 order-1 order-md-2 ms-auto"
              >
                <div className="banner_inner_image mt-0 me-3">
                  {pagesToExclude?.includes(mySlug) && (
                    <Image
                      src={leftImageArticle}
                      alt="banner-img"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
                {showContent && (
                  <div className="banner_text">
                    <h2
                      dir="auto"
                      className="banner_title"
                    >
                      <span>{colorHeading || ""} </span> {title || ""}
                    </h2>
                    <div >
                      <HeadingDesc text={desc || ""} />
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default TopicBanner;

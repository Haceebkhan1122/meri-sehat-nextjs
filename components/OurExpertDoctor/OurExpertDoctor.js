import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { HeadingDescVsmall } from "../headingDescVsmall";
import Link from "next/link";
import { getTopics } from "@/pages/api/topicAPI";
import { Status } from "../status";
import { CustomPopOver } from "../customPopOver";
import iconRight from "../../public/svg/right-arrow-border.svg";
import Image from "next/image";
import ImageLoader from "../ImageLoader";

function OurExpertDoctor(props) {
  const { widgetData = [], key } = props;
  const [data, setData] = useState([]);
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState({});

  useEffect(() => {
    setData(widgetData?.data);
  }, [widgetData]);

  useEffect(() => {
    async function getArticles() {
      try {
        setLoading(true);
        const res = await getTopics("wellness");
        if (res.code === 200) {
          setTopics(res.data);
          setLoading(false);
        } else {
          navigate("/");
        }
      } catch (error) {
        setLoading(false);
      }
    }

    getArticles();
  }, []);

  return (
    <>
      <section className="doctors_waiting trackyourhealth forFonts our_experts_wellness">
        <Container>
          <Col md={12} className="px-3">
            <div class="section-heading border_Bottom d-flex">
              <div>
                <h2 dir="auto" class="text-initial fw-600">
                  {widgetData.heading}
                  <span class="text-lowercase"></span>
                </h2>
              </div>
              <div class="btn_icon_box">
                <div>
                  <Image
                    src={iconRight}
                    width={30}
                    height={30}
                    alt="arrow-with-border"
                    class="arrow_right_border"
                  />
                </div>
                <div>
                  <Link
                    className="underline_ancer text-uppercase"
                    href="/wellness-experts"
                  >
                    {i18nData?.view_all}
                  </Link>
                </div>
              </div>
            </div>
          </Col>
          <Row>
            <Col md={6} className="px-3">
              <div className="for_background_expert">
                {widgetData?.data?.[0].image ? 
                <Image
                width={411}
                height={635}
                crossorigin="anonymous"
                src={widgetData?.data?.[0].image}
                alt="brands"
                className="left_side img-fluid"
              />
                 : 
                <ImageLoader/>
                }
                
              </div>
            </Col>
            <Col md={6} className="px-3 desc-ourExpert text-start">
              <Link href="/wellness-expert-profile/1019">
                <h2 className="text-initial fw-600 border-bottom-0">
                  {widgetData?.data?.[0].heading}
                </h2>
                <h4 className="text-initial fw-500">
                  {widgetData?.data?.[0].sub_head}
                </h4>
                <h5 className="heading_desc">
                  {widgetData?.data?.[0].description}
                </h5>
              </Link>
              <>
                {topics?.widgets
                  ?.filter((value) => {
                    if (value?.data?.[0]?.type === "double_column") {
                      return value;
                    }
                  })
                  .map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="hk_diff row marginTop_hk_diff"
                      >
                        {item?.data.map((itemm) => {
                          return (
                            <>
                              <Col md={6}>
                                <Card>
                                  <Link href={itemm?.data?.redirect_url || ""}>
                                    {/* <FontAwesomeIcon icon={faCheck} /> */}
                                    <CustomPopOver
                                      trigger="hover"
                                      content={
                                        <HeadingDescVsmall
                                          text={
                                            <p
                                              dangerouslySetInnerHTML={{
                                                __html:
                                                  itemm?.data?.label
                                                    ?.description,
                                              }}
                                            />
                                          }
                                        />
                                      }
                                    >
                                      <Status
                                        text={itemm?.data?.label?.value}
                                        bgColor={itemm?.data?.label?.color}
                                      />
                                    </CustomPopOver>

                                    <h3>{itemm?.data?.name}</h3>
                                    <div className="mt-5 wellnessFixedBottomReadMore">
                                      <Image
                                        src={iconRight}
                                        width={50}
                                        height={50}
                                        alt="Icon"
                                      />
                                      <span className="underline_ancer">
                                        READ MORE
                                      </span>
                                    </div>
                                  </Link>
                                </Card>
                              </Col>
                            </>
                          );
                        })}
                      </div>
                    );
                  })}
              </>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default OurExpertDoctor;

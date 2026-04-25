import Link from "next/link";
import { Container } from "react-bootstrap";
import { SectionHeadingMed } from "../SectionHeadingMed";
import { HeadingDesc } from "../HeadingDesc";
import { SubSectionHeading } from "../SubSectionHeading";
import { AnchorLink } from "../ancerWithUnderline";
import { RightArrowWithBorder } from "../rightArrowWithBorder";
// import './healthConditions.css';
// import i18n from '../../../i18n';
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useEffect, useState } from "react";

function HealthConditions(props) {
  const { widgetData = [], id, widget_id, key } = props;
  // const userDetailsInfo = useSelector((state) => state.AuthReducer.user);
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

  const mixPanelTracking = () => {
    // mixpanel.track('Sehat A-Z view all', {
    //     'Name': userDetailsInfo?.name, 'Email': userDetailsInfo?.email, 'Number': userDetailsInfo?.phone
    // });
  };

  // useEffect(() => {

  //   dispatch(getUserDetail())

  // }, [])

  const webDisease = widgetData?.data?.map((item) => item);
  return (
    <section
      key={key}
      data-reference_widget_id={widgetData?.id}
      data-widget_id={widgetData?.widget_id}
      className="section galleryBoxes dynamic-widget"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <Container>
        {webDisease?.length > 0 && (
          <div className="large box mobile">
            <div>
              <div className="d-flex justify-content-between mt-2">
                <SectionHeadingMed text={widgetData?.heading} />
                <div className="d-flex align-items-center">
                  <RightArrowWithBorder />
                  {widgetData?.redirect_url && (
                    <AnchorLink
                      to={`${widgetData?.redirect_url}`}
                      text={i18nData?.view_all}
                    />
                  )}
                </div>
              </div>
              <div className="mt-3 mb-5">
                <HeadingDesc text={widgetData?.description} />
              </div>
              {/* {widgetData?.redirect_url && (
                <SimpleAncer
                  to={`${widgetData?.redirect_url}`}
                  text={i18n.t('view_all')}
                />
              )} */}
            </div>
          </div>
        )}
      </Container>
      <Container className="healthConditions">
        {webDisease.length > 0 && (
          <div className="large _box desktop">
            <div>
              <SectionHeadingMed text={widgetData?.heading} />
              <p> {widgetData?.description} </p>
              <div
                className="d-flex _underline_ancerView healthBtns align-items-center"
                onClick={mixPanelTracking}
              >
                <RightArrowWithBorder />
                {widgetData?.redirect_url && (
                  <AnchorLink
                    to={`${widgetData?.redirect_url}`}
                    text={i18nData?.view_all}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {webDisease[0]?.disease?.name && (
          <Link
            className="boxLink medium"
            href={`${webDisease[0]?.disease?.redirect_url || ""}`}
          >
            <div
              className="box"
              // style={{backgroundColor: '#C8E5B4'}}
              style={{
                backgroundColor: widgetData?.data?.[0]?.card_color
                  ? widgetData?.data?.[0]?.card_color
                  : "#29bcc1",
              }}
            >
              <SubSectionHeading
                text={webDisease[0]?.disease?.name}
                color={widgetData?.data?.[0]?.text_color}
              />
              <Image
                crossorigin="anonymous"
                src={webDisease[0]?.image}
                alt={webDisease?.[0]?.alt ? webDisease?.[0]?.alt : null}
                width="200"
                height="200"
              />
            </div>
          </Link>
        )}
        {webDisease[1]?.disease?.name && (
          <Link
            className="boxLink large"
            href={`${webDisease[1]?.disease?.redirect_url || ""}`}
          >
            <div
              className="box"
              // style={{backgroundColor: '#BEF5F1'}}
              style={{
                backgroundColor: widgetData?.data?.[1]?.card_color
                  ? widgetData?.data?.[1]?.card_color
                  : "#29bcc1",
              }}
            >
              <SubSectionHeading
                text={webDisease[1]?.disease?.name}
                color={widgetData?.data?.[1]?.text_color}
              />
              <Image
                crossorigin="anonymous"
                src={webDisease[1]?.image}
                alt={webDisease?.[1]?.alt ? webDisease?.[1]?.alt : null}
                width="210"
                height="240"
              />
            </div>
          </Link>
        )}
        {webDisease[2]?.disease?.name && (
          <Link
            className="boxLink large"
            href={`${webDisease[2]?.disease?.redirect_url || ""}`}
          >
            <div
              className="box"
              // style={{backgroundColor: '#FACEDA'}}
              style={{
                backgroundColor: widgetData?.data?.[2]?.card_color
                  ? widgetData?.data?.[2]?.card_color
                  : "#29bcc1",
              }}
            >
              <SubSectionHeading
                text={webDisease[2]?.disease?.name}
                color={widgetData?.data?.[2]?.text_color}
              />
              <Image
                crossorigin="anonymous"
                src={webDisease[2]?.image}
                alt={webDisease?.[2]?.alt ? webDisease?.[2]?.alt : null}
                width="141"
                height="240"
              />
            </div>
          </Link>
        )}
        {webDisease[3]?.disease?.name && (
          <Link
            className="boxLink medium"
            href={`${webDisease[3]?.disease?.redirect_url || ""}`}
          >
            <div
              className="box"
              // style={{backgroundColor: '#BEF5F1'}}
              style={{
                backgroundColor: widgetData?.data?.[3]?.card_color
                  ? widgetData?.data?.[3]?.card_color
                  : "#29bcc1",
              }}
            >
              <SubSectionHeading
                text={webDisease[3]?.disease?.name}
                color={widgetData?.data?.[3]?.text_color}
              />
              <Image
                crossorigin="anonymous"
                src={webDisease[3]?.image}
                alt={webDisease?.[3]?.alt ? webDisease?.[3]?.alt : null}
                width="204"
                height="200"
              />
            </div>
          </Link>
        )}
        {webDisease[4]?.disease?.name && (
          <Link
            className="boxLink medium"
            href={`${webDisease[4]?.disease?.redirect_url || ""}`}
          >
            <div
              className="box"
              // style={{backgroundColor: '#FFF1A0'}}
              style={{
                backgroundColor: widgetData?.data?.[4]?.card_color
                  ? widgetData?.data?.[4]?.card_color
                  : "#29bcc1",
              }}
            >
              <SubSectionHeading
                text={webDisease[4]?.disease?.name}
                color={widgetData?.data?.[4]?.text_color}
              />
              <Image
                crossorigin="anonymous"
                src={webDisease[4]?.image}
                alt={webDisease?.[4]?.alt ? webDisease?.[4]?.alt : null}
                width="218"
                height="200"
              />
            </div>
          </Link>
        )}
      </Container>
    </section>
  );
}

export default HealthConditions;

import Link from "next/link";
import { Rating } from "../icons/rating";
import { imagePath } from "@/utils/powerFunctions";
// import './profilecard.css';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Tick from "../../public/png/icon_tick.png";
import pricingArrowGreenForward from "../../public/svg/pricing-green-arrow.svg";
import { useRouter } from "next/router";
import Image from "next/image";
import ImageLoader from "../ImageLoader";
import { useEffect, useState } from "react";
import experienceSvg from 'public/svg/experience__fad.svg'
import videocallSvg from 'public/svg/video__Fad.svg'


function ProfileCard(props) {
  const { card = {}, key } = props;

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Profile Verified by Meri Sehat
    </Tooltip>
  );

  const mixPanelTracking = () => {
    // mixpanel.track('Doctor Profile', {
    //     'Name': userDetailsInfo?.name, 'Email': userDetailsInfo?.email, 'Number': userDetailsInfo?.phone
    // });
  };

  // useEffect(() => {
  //   dispatch(getUserDetail())
  // }, [])

  const router = useRouter();

  const [fromFad, setFromFad] = useState(false);
  const [inPricing, setInPricing] = useState(false);

  useEffect(() => {
    if (router.pathname === "/find-a-doctor") {
      setFromFad(true)
    }
    if (router.pathname === "/pricing") {
      setInPricing(true)
    }
  }, [router.pathname]);

  return (
    <a href={card?.redirect_url || "/"} key={key} onClick={mixPanelTracking}>
      <div
        className={
          fromFad
            ? "card profile up_for_is_featured fad__card__sliderRight  me-0 "
            : inPricing
              ? "card profile up_for_is_featured pricing_card  me-0 "
              : "card profile up_for_is_featured me-0"
        }
      >
        {!fromFad && <Rating text={card?.average_rating || 0} subText={5} />}
        <div
          className={fromFad ? "img_box img_boxing_fad" : inPricing ? "img_box img_boxing_pricing" : "img_box"}
          style={{ backgroundColor: card?.bgColor || "" }}
        >
          {!fromFad && card?.is_featured ? (
            <>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <Image src={Tick} alt="Icon" className="is_f" />
              </OverlayTrigger>
            </>
          ) : null}
          {card?.image ? (
            <Image
              crossorigin="anonymous"
              src={imagePath(card?.image)}
              alt="profile image"
              className="profile_img"
              width="135"
              height="135"
            />
          ) : (
            <ImageLoader />
          )}
          {(fromFad || inPricing) && (
            <div className={inPricing ? "redirectArrow arrow_pricing" : "redirectArrow"}>
              <Image src={pricingArrowGreenForward} alt="pricing arrow" />
            </div>
          )}
        </div>
        <div className={fromFad ? "wraper_info_slider_fad" : inPricing ? "wraper_info_slider_fad pricing_wrapingInfo" : ""}>
          <h3 dir="auto" className="name mt-0">
            {router?.locale === "en"
              ? `${card?.prefix != undefined ? `${card?.prefix}.` : ""} ${card?.name || card?.heading
              }`
              : `${card?.prefix != undefined ? `${card?.prefix}` : ""} ${card?.name || card?.heading
              }`}
          </h3>
          <h5
            dir="auto"
            className={
              fromFad || inPricing ? "professtion hk_color" : "professtion"
            }
            style={{}}
          >
            {(!fromFad &&
              card?.doctor_specialities?.map((item, index) =>
                index == card?.doctor_specialities?.length - 1
                  ? `${item}`
                  : `${item}, `
              )) ||
              card?.description}

            {fromFad && card?.doctor_specialities?.[0] ? (
              <>{card?.doctor_specialities?.[0]}</>
            ) : null}
          </h5>
          {fromFad && (
            <h5 dir="auto" className="professtion">
              {/* {card?.doctor_educations?.map((item, index) => (
              <>
                {item}
                {(index ? ', ' : '') + item?.name}
              </>
            ))} */}
              {card?.doctor_educations?.slice(0, 2).map((item, index) => (
                <>
                  {index > 0 && ","} {item}
                </>
              ))}
            </h5>
          )}
          {inPricing && (
            <h5 dir="auto" className="professtion">
              {/* {card?.doctor_educations?.map((item, index) => (
              <>
                {item}
                {(index ? ', ' : '') + item?.name}
              </>
            ))} */}
              {card?.doctor_educations?.slice(0, 2).map((item, index) => (
                <>
                  {index > 0 && ","} {item}
                </>
              ))}
            </h5>
          )}
          {fromFad && (
            <>
              <div className="wraper_fad__info_bottom_verti">
                <hr />
                <div className="single__fad_bottom_holder_all">
                  <div className="single__fad_bottom">
                    <Image src={experienceSvg} alt="" />
                    <span>
                      {" "}
                      {card?.experience_year ? card?.experience_year : "0"}{" "}
                      years of experience{" "}
                    </span>
                  </div>
                  <div className="single__fad_bottom  ">
                    <Image src={videocallSvg} alt="" />
                    <span> {card?.total_video_consultation ? card?.total_video_consultation : "0"} video consults </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {inPricing && (
            <>
              <div className="wraper_fad__info_bottom_verti">
                <hr />
                <div className="single__fad_bottom_holder_all">
                  <div className="single__fad_bottom">
                    <Image src={experienceSvg} alt="" />
                    <span>
                      {" "}
                      {card?.experience_year ? card?.experience_year : "0"}{" "}
                      years of experience{" "}
                    </span>
                  </div>
                  <div className="single__fad_bottom">
                    <Image src={videocallSvg} alt="" />
                    <span> {card?.total_video_consultation ? card?.total_video_consultation : "0"} video consults </span>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* <p dir="auto" className="desc">
            {card?.doctor_educations || ''}
          </p> */}
        </div>
        {(!fromFad && !inPricing) && (
          <div className="redirectArrow">
            <Image src={pricingArrowGreenForward} alt="pricing arrow" />
          </div>
        )}

        {/* <p dir="auto" className="desc">
          {`Experience : ${card?.experience_year}+ Years`}
        </p> */}
      </div>
    </a>
  );
}

export default ProfileCard;

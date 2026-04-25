import { TopicHeading } from "../TopicHeading";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HeadingDescSmall } from "../headingDescSmall";
// import './cardWithHeaderImage.css';
import Link from "next/link";
// import i18n from '../../../i18n';
// import mixpanel from 'mixpanel-browser';
import img1 from "../../public/svg/right-arrow-border.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import ImageLoader from "../ImageLoader";

function CardWithHeaderImage(props) {
  const { cardData, onClick, key, btnText } = props;

  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);


  const router = useRouter();

  const currentLocale = router.locale;

  const currentLocationURL = router.pathname;


  // const dispatch = useDispatch();
  // const userDetailsInfo = useSelector((state) => state.AuthReducer.user);

  const mixPanelTracking = () => {
    // mixpanel.track(`${cardData?.data?.name === 'Beauty' && 'Beauty' || cardData?.data?.name === 'Sexual Health' && 'Sexual Health' || cardData?.data?.name === 'Fitness & Nutrition' && 'Fitness & Nutrition' || cardData?.data?.name === 'Mental Health & Sleep' && 'Mental Health & Sleep' || cardData?.data?.name === 'Parenthood' && 'Parenthood' || cardData?.data?.name === 'Longevity' && 'Longevity'}`, {
    //     'Name': userDetailsInfo?.name, 'Email': userDetailsInfo?.email, 'Number': userDetailsInfo?.phone
    // });
  };

  // useEffect(() => {

  //   dispatch(getUserDetail())

  // }, [])

  return (
    <a
      href={cardData?.data?.redirect_url || "#"}
      key={key}
      onClick={mixPanelTracking}
    >
      <div onClick={onClick} className="card cardWithHeaderImage homepageCard">
        <div className="header_img bg-transparent mt100Insverse">
          {cardData?.data?.image ? (
            <Image
              crossorigin="anonymous"
              src={cardData?.data?.image}
              alt="cardImage"
              className="img-fluid"
              width={254}
              height={380}
            />
          ) : <ImageLoader/> }
        </div>
        <div className="card_body px-0 pb-0 pss-0">
          <TopicHeading text={cardData?.data?.name} />
          {cardData?.data?.descripton ? (
            <p>{cardData?.data?.descripton} </p>
          ) : (
            <p>
              {cardData?.data?.specialties?.map((item) => `${item?.name},`) ||
                ""}
            </p>
          )}
          {cardData?.data?.redirect_url && (
            <div className="btn_container mb-0 mt-4">
              <Image
                src={img1}
                width={30}
                height={30}
                alt="right-arrow-border"
                className="arrow_right_border"
              />
              <button type="button" className="underline_ancer forBtnResponsive text-uppercase">
                {/* {cardData?.data?.btn_text || i18n.t(btnText)}
                 */}
                {(currentLocale === '/ur' && currentLocationURL === '/') || (currentLocale === 'en' && currentLocationURL === '/') ? (
                  i18nData?.view_more_capital
                ) : i18nData?.explore_topics}
              </button>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

export default CardWithHeaderImage;

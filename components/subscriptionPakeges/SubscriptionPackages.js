import React from 'react';
import SectionHeadingLarge from "../sectionHeadingLarge/SectionHeadingLarge";
import SectionInnerHeading from "../sectionInnerHeading/SectionInnerHeading";
import HeadingDescSmall from '../headingDescSmall/HeadingDescSmall';
import HeadingDesc from "../HeadingDesc/HeadingDesc";
import HeadingDescVsmall from "../headingDescVsmall/HeadingDescVsmall";
import Image from 'next/image';

function SubscriptionPakeges(props) {
  const {
    image,
    subsName,
    subsPrice,
    discountedPrice,
    timePeriod,
    detail,
    status,
    expiryDate,
    btnText,
    subsPointsHeading,
    subsPoints,
    themeColor,
    bordered,
    onClick = () => { }
  } = props;

  return (
    <div
      style={{ borderColor: themeColor || '' }}
      className={`subscriptionPakeges box ${bordered && 'bordered_style_card'}`}
    >
      <div className="starIcon">{image && <Image crossorigin="anonymous" src={image} alt="start icon" />}</div>
      <SectionInnerHeading color={themeColor} text={subsName} />
      <div className="priceContainer">
        <SectionHeadingLarge text={subsPrice} />
        <HeadingDesc text={discountedPrice} />
      </div>
      <div className="timePeriod">
        <HeadingDescSmall text={timePeriod} />
        <HeadingDescSmall text={detail} />
      </div>
      {status === true ? (
        <div className="currentPlanContainer">
          <HeadingDescVsmall text={i18n.t('current_plan')} />
          <HeadingDescVsmall text={expiryDate} />
        </div>
      ) : (
        <button className="simple_ancer_small" style={{ backgroundColor: themeColor }} onClick={onClick}>{btnText}</button>
        // <SimpleAncerSmall bgColor={themeColor} text={btnText} />
      )}
      <HeadingDescSmall text={subsPointsHeading} />
      <ul className="subsPoints">{subsPoints}</ul>
    </div>
  );
}

export default React.memo(SubscriptionPakeges);

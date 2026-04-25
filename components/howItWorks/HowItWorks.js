/* eslint-disable react/no-array-index-key */
import React from 'react';
const icon1 = "/svg/customers-rosepink.svg";
const icon2 = "/svg/doctor-tiffanyblue.svg";
const icon3 = "/svg/doctor-appointment-yellow.svg";
import ContentWithIconBox from '../contentWithIconBox/ContentWithIconBox';
// import i18n from '../../../i18n';

function HowItWorks(props) {
  const { widgetData = [], key } = props;
  ////console.log(widgetData, 'asdfsadfa');
  return (
    <section className="howItWorks" key={key}>
      <ContentWithIconBox
        heading={
          widgetData?.heading !== '' ? widgetData?.heading : i18n.t('how_it_works')
        }
        desc={
          widgetData?.description !== ''
            ? widgetData?.description
            : i18n.t('meri_sehet_leading')
        }
        iconBoxes={[
          {
            icon: icon1,
            title: 'Click on instant consultation or go via Health Check'
          },
          {
            icon: icon2,
            title: 'Connect on an Audio/ video call with a evidence doctor'
          },
          {
            icon: icon3,
            title: 'Get a digital prescription & a free follow-up'
          }
        ]}
      />
    </section>
  );
}

export default HowItWorks;

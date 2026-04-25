import React from 'react';
import ImageWithPoints from "../imageWithPoints/ImageWithPoints";
const docImg = "/png/male-doc.png";
const checkIcon = "/svg/check-white.svg";
const icon = "/png/end-call-red.png";
// import i18n from '../../../i18n';

function benefitsOFOnlineConsult() {

  return (
    <div className="benefitsOFOnlineConsult">
      <ImageWithPoints
        iconImage={icon}
        image="/png/male-doc.png"
        title={i18n.t('benefits_of_online_consultation') || 'Benefits of online consultation'}
        icon={checkIcon}
        iconpoints={[
          {
            heading: 'Consult Top Doctors 24x7',
            desc: 'Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.'
          },
          {
            heading: 'Convenient and Easy',
            desc: 'Start an instant consultation within 2 minutes or do video consultation at the scheduled time.'
          },
          {
            heading: '100% Safe Consultations',
            desc: 'Be assured that your online consultation will be fully private and secured.'
          },
          {
            heading: 'Similar Clinic Experience',
            desc: 'Experience clinic-like consultation through a video call with the doctor.'
          }
        ]}
      />
    </div>
  );
}

export default benefitsOFOnlineConsult;

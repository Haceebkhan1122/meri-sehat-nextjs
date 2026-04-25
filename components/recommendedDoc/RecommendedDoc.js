import React from 'react';
import { Col } from 'react-bootstrap';
import CallToAction from '../callToAction/CallToAction';
import SectionHeadingMed from "../SectionHeadingMed/SectionHeadingMed";
import HeadingDesc from '../HeadingDesc/HeadingDesc';
import SimpleAncer from '../simpleAncer/SimpleAncer';
// import { URL } from '../../../constants';
// import './recomendedDoc.css';
// import img1 from '../../public/png/approveddoc.png'
import Image from 'next/image';

function RecomendedDoc() {
  return (
    <CallToAction
      leftContent={<LeftContent />}
      rightContent={<RightConten />}
    />
  );
}

function RightConten() {
  return (
    <Col md={5} className="order-lg-2 order-1">
      <div>
        <Image src='../../public/png/approveddoc.png' alt="bloodpressure" />
      </div>
    </Col>
  );
}

function LeftContent() {
  return (
    <Col md={7} className="order-lg-1 order-2">
      <div>
        <SectionHeadingMed text="Approved and recommended by doctors" />
        <HeadingDesc text="Our SehatScan technology is approved through a series of global clinical trials and medical boards. It’s also been tested and recommended by a variety of doctors in different specializations" />
        <HeadingDesc text="We have developed it so you can stay healthy and well informed - Anytime, Anywhere!" />
        <SimpleAncer
          // to={URL.startVitalScan}
          text="SehatScan Now"
        />
      </div>
    </Col>
  );
}

export default RecomendedDoc;

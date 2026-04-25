import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import SectionHeadingMed from "../SectionHeadingMed/SectionHeadingMed";
import AccordionComp from '../accordionComp/AccordionComp';
import { useSelector } from 'react-redux';

const questions = [
  {
    heading:
      'What kind of doctors will be available for unlimited online consultations?',
    desc: 'Prof. Dr. Nadia Khurshid Ahmed has the following degrees: M.B.B.S, F.C.P.S.',
    content: '(Gynecology & Obstetrician), M.C.P.S'
  },
  {
    heading:
      'What kind of doctors will be available for unlimited online consultations?',
    desc: 'Prof. Dr. Nadia Khurshid Ahmed has the following degrees: M.B.B.S, F.C.P.S.',
    content: '(Gynecology & Obstetrician), M.C.P.S'
  },
  {
    heading:
      'What kind of doctors will be available for unlimited online consultations?',
    desc: 'Prof. Dr. Nadia Khurshid Ahmed has the following degrees: M.B.B.S, F.C.P.S.',
    content: '(Gynecology & Obstetrician), M.C.P.S'
  },
  {
    heading:
      'What kind of doctors will be available for unlimited online consultations?',
    desc: 'Prof. Dr. Nadia Khurshid Ahmed has the following degrees: M.B.B.S, F.C.P.S.',
    content: '(Gynecology & Obstetrician), M.C.P.S'
  }
];

function FrequentlyAskedQues() {

  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);



  return (
    <div className="frequentlyAskedQues">
      <Container>
        {/* <SectionHeadingMed text={i18n.t("frequently_asked")} /> */}
        <SectionHeadingMed />
        <AccordionComp data={questions} />
      </Container>
    </div>
  );
}

export default FrequentlyAskedQues;

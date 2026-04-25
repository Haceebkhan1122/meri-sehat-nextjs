/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import AnchorLink from "../ancerWithUnderline/anchorLink";
import SimpleCard from "../simpleCard/SimpleCard";
import HeadingDescSmall from "../headingDescSmall/HeadingDescSmall";
import SectionInnerHeading from "../sectionInnerHeading/SectionInnerHeading";
import RightArrowWithBorder from "../rightArrowWithBorder/RightArrowWithBorder";
import SectionHeading from "../SectionHeading/SectionHeading";
import { imagePath } from "../../utils/powerFunctions";
// import i18n from '../../../i18n';
import Image from 'next/image';
import { useSelector } from 'react-redux';

function FeaturedDoctor(props) {
  const { widgetData = [], key } = props;
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

  return (
    <section
      key={key}
      className="featuredDoctor dynamic-widget"
      data-reference_widget_id={widgetData?.id}
      data-widget_id={widgetData?.widget_id}
    >
      <Container>
        <SectionHeading
          heading={widgetData?.heading}
          icon={widgetData?.redirect_url && <RightArrowWithBorder />}
          link={
            widgetData?.redirect_url && (
              <AnchorLink to={widgetData?.redirect_url} text={i18nData?.view_all} />
            )
          }
        />
        <div className="featuredDoctorRow">
          <Row>
            {widgetData?.data?.map((item, index) => {
              return (
                <Col key={index} md={3}>
                  <SimpleCard link={item?.data?.redirect_url}>
                    <div className="imgBox">
                      <Image crossorigin="anonymous" width={100} height={100} src={imagePath(item?.data?.image)} alt="docImg" />
                    </div>
                    <div className="cardBody">
                      <SectionInnerHeading
                        text={`${item?.data?.prefix}. ${item?.data?.name}`}
                      />
                      <HeadingDescSmall
                        text={`${i18nData?.experience}: ${item?.data?.experience_year}+ ${i18nData?.years}`}
                      />
                    </div>
                  </SimpleCard>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedDoctor;

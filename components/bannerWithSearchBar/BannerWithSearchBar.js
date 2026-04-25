import React from 'react';
import { Container } from 'react-bootstrap';
import HealthCareFilter from "../healthCareFilter/HealthCareFilter";
import HeadingDesc from "../HeadingDesc/HeadingDesc";
import SectionHeading from "../SectionHeading/SectionHeading";
import TypingAnimation from "../typingAnimation/TypingAnimation";
// import './bannerWithSearchBar.css';

function BannerWithSearchBar(props) {
  const { widgetData = [], key } = props;
  let cropAnimationText = widgetData?.data?.meta_text?.split(','[0]);
  return (
    <section
      key={key}
      data-reference_widget_id={widgetData?.id}
      data-widget_id={widgetData?.widget_id}
      className="bannerWithSearchBar dynamic-widget"
    >
      <Container>
        <SectionHeading
          heading={`${widgetData?.heading?.split('{placeholder}')[0] || ''}`}
          // endText={`${widgetData?.heading?.split('{placeholder}')[1] || ''}`}
          colorHeading={
            cropAnimationText?.length > 0 && (
              <TypingAnimation textArry={cropAnimationText} endText={`${widgetData?.heading?.split('{placeholder}')[1] || ''}`} />
            )
          }
        />
        {widgetData?.description && (
          <HeadingDesc
            text={
              <p
                dangerouslySetInnerHTML={{ __html: widgetData?.description }}
              />
            }
          />
        )}
        <HealthCareFilter />
      </Container>
    </section>
  );
}

export default BannerWithSearchBar;

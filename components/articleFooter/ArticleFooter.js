import React, { useEffect, useState } from 'react';
import { Col, Accordion, Row, Container } from 'react-bootstrap';
import { slugify } from '@/utils/powerFunctions';
import { HeadingDesc } from '../HeadingDesc';
import { HeadingDescVsmall } from '../headingDescVsmall';
import SocialLinks from "../socialLinks/SocialLinks";
import {  useRouter } from 'next/router';

// import './articleFooter.css';

function ArticleFooter(props) {


    const {
        sourceReviewDate,
        sourceHeading,
        sourceDesc,
        sourceContent,
        widgetData,
        key
    } = props;
    const router = useRouter();
    const [slugState, setSlugState] = useState('');
    const widgetId =
        slugify(widgetData?.data?.badge_title || '') + '-' + widgetData?.id;
   useEffect(() => {
    if(router?.pathname?.includes('disease')){
        setSlugState(`/disease/${router?.query?.slug}`)
            }
    else if(router?.pathname?.includes('article')){
        setSlugState(`/article/${router?.query?.slug}`)
    }
   }, [router?.pathname])
   
    return (
        <section
            key={key}
            id={widgetId}
            data-reference_widget_id={widgetData?.id}
            data-widget_id={widgetData?.widget_id}
            className="articleFooter wdvef dynamic-widget"
        >
            <Container>
                <Row>
                    <Col md={12}>
                        <Accordion id="accordion">
                            <SocialLinks slug={slugState} />
                            <Accordion.Item className="refTextSetTop" eventKey="0">
                                <Accordion.Header>
                                    {sourceReviewDate && (
                                        <div className="sourceReviewDate">
                                            {/* <HeadingDescVsmall text="Last medically reviewed on " /> */}
                                            <HeadingDescVsmall text={sourceReviewDate} />
                                        </div>
                                    )}
                                    {sourceHeading && (
                                        <div>
                                            <HeadingDesc text={sourceHeading} />
                                        </div>
                                    )}
                                </Accordion.Header>
                                <Accordion.Body className="zain">
                                    {sourceDesc}
                                    {sourceContent}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        {/* <Sources
            reviewDate={sourceReviewDate}
            // totalSources="+ 18 sources"
            totalSources={
              <AccordionComp
              data={[
                {
                  heading: sourceHeading,
                  desc: sourceDesc,
                  content: sourceContent
                  }
                ]}
                />
              }
            /> */}
                    </Col>
                    {/* <Col md={4}></Col> */}
                </Row>
            </Container>
        </section>
    );
}

export default ArticleFooter;

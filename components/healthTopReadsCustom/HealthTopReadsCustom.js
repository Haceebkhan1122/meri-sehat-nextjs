import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AnchorLink } from '../ancerWithUnderline';
import { RightArrowWithBorder } from '../rightArrowWithBorder';
// import './healthTopReads.css';
// import i18n from '../../../i18n';
import { ArticleItemListsCustom } from '../articleItemListsCustom';
import { ArticleWithShortDescRight } from '../articleWithShortDescRight';
import { ArticleWithShortDescCustom } from '../articleWithShortDescCustom';
import { SectionHeading } from '../SectionHeading';
import { TopicHeading } from '../TopicHeading';
import { HeadingDescSmall } from '../headingDescSmall';


function HealthTopReadsCustom(props) {
    const { image, type, heading, btnText, link, desc, drName, label, topic } = props;
    const { widgetData = {}, key } = props;

    const removeFirstIndex = widgetData?.data?.slice(2);

    const firstArticle = widgetData?.data?.[0];
    const secondArticle = widgetData?.data?.[1];


    const hasRedirectUrl = widgetData?.redirect_url ? true : false;

    const statusLabel = widgetData?.data.map((item) => item);

    return (
        <>
            <section
                data-aos="fade-up" data-aos-duration="800"
                key={key}
                data-reference_widget_id={widgetData?.id}
                data-widget_id={widgetData?.widget_id}
                className=" top_reads health article dynamic-widget article_hk_custom"
            >
                <Container>

                    <SectionHeading
                        heading={widgetData?.heading}
                        icon={hasRedirectUrl && <RightArrowWithBorder />}
                        link={
                            hasRedirectUrl && (
                                <AnchorLink differentSite={true} to={widgetData?.redirect_url} text={`view all`} />
                            )
                        }
                    />
                    <Row>
                        <Col lg={9} md={9} className="pe-lg-0 s ss">
                            {/* <Row className='parent-box1'> */}
                            <div className='parent-box1  '>
                                <Col md={12}>
                                    <ArticleWithShortDescCustom
                                        label={widgetData?.data?.[0]?.data?.label}
                                        image={firstArticle?.data?.image}
                                        topic={firstArticle?.data?.name}
                                        desc={firstArticle?.data?.descripton}
                                        btnText={
                                            // i18n.t('read_more')
                                            `Read More`
                                        }
                                        link={firstArticle?.data?.redirect_url}
                                    />
                                </Col>


                            </div>
                            {/* </Row> */}
                            <Row className='mt-3 hk_same_height trending_mob'>
                                {removeFirstIndex?.map((item, index) => {
                                    return (
                                        <ArticleItemListsCustom
                                            label={item?.data?.label}
                                            key={index}
                                            image={item?.data?.image}
                                            statusProgress={''}
                                            statusText={
                                                // i18n.t('status_text')
                                                `Status Text`
                                            }
                                            heading={item?.data?.name}
                                            desc={item?.data?.descripton}
                                            btnText={
                                                // i18n.t('read_more')
                                                `Read More`
                                            }
                                            link={item?.data?.redirect_url}
                                        />
                                    );
                                })}
                            </Row>
                        </Col>

                        <Col lg={3} md={3} className="right_area_art  d-md-block">

                            <ArticleWithShortDescRight
                                label={widgetData?.data[1]?.data?.label}
                                image={secondArticle?.data?.image}
                                topic={secondArticle?.data?.name}
                                desc={secondArticle?.data?.descripton}
                                btnText={
                                    // i18n.t('read_more')
                                    `Read More`
                                }
                                link={secondArticle?.data?.redirect_url}
                            />
                        </Col>
                    </Row>
                    {/* <div className='sliderForText'>
            <FullSlider />
      </div> */}
                </Container>
            </section>
            <Row>
                <Col md={9}>
                </Col>
            </Row>
        </>
    );
}

export default React.memo(HealthTopReadsCustom);

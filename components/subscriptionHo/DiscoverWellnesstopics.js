/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SectionHeadingMed } from '../SectionHeadingMed';
import { CardWithHeaderImage } from '../cardWithHeaderImage';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import './discoverWellnessTopics.css';
// import mixpanel from 'mixpanel-browser';
// import i18n from '../../../i18n';
import Arrow from '../../public/svg/right-arrow-border.svg'
import Image from 'next/image';


function DiscoverWellnesstopics(props) {

    const router = useRouter();
    const { pathname, query } = router;

    const { widgetData = [] } = props;

    const pushToArticle = useCallback((url) => {
        if (url) {
            router.push(url);
        } else {
            return;
        }
    }, []);


    let HomePageURL = pathname;

    // const dispatch = useDispatch();
    // const userDetailsInfo = useSelector((state) => state.AuthReducer.user);

    const mixPanelTracking = () => {
        // mixpanel.track('Discover Wellness view all', {
        //     Name: userDetailsInfo?.name,
        //     Email: userDetailsInfo?.email,
        //     Number: userDetailsInfo?.phone
        // });
    };

    // useEffect(() => {

    //   dispatch(getUserDetail())

    // }, [])

    return (
        <section
            data-reference_widget_id={widgetData?.id}
            data-widget_id={widgetData?.widget_id}
            className="discoverWellnessTopics dynamic-widget"
        >
            <Container>
                <div className="d-flex forBorder-wellness justify-content-between ">
                    <SectionHeadingMed text={widgetData?.heading} />

                    {HomePageURL === '/' ? (
                        <Link href="/wellness">
                            {' '}
                            <button className="btn_icon_box" onClick={mixPanelTracking}>
                                <Image src={Arrow} width={50} height={50} alt="Arrow Icon" />
                                <span className="underline_ancer">
                                    {/* {i18n.t('view_all')} */}
                                    View All
                                </span>
                            </button>{' '}
                        </Link>
                    ) : null}
                </div>
                <div className="pt-md-5 borderTop  ">
                    <Row className="mt-5 pt-5 paddingInMobile">
                        {widgetData?.data?.map((cardData, index) => (
                            <Col md={3} key={index}>
                                <CardWithHeaderImage
                                    btnText={'view_more_capital'}
                                    onClick={() => pushToArticle(cardData?.data?.redirect_url)}
                                    cardData={cardData}
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </section>
    );
}

export default DiscoverWellnesstopics;

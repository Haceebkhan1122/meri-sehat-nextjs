import React from 'react';
import { HeadingDesc } from '../HeadingDesc';
import { HeadingWithSpace } from '../headingWithSpace';
import { SectionHeadingSmall } from '../SectionHeadingSmall';
import SubscriptionInput from '../subscriptionInput/SubscriptionInput';
// import './newsLetter.css';
// import i18n from '../../i18n';
import Image from 'next/image';

function NewsLetter(props) {
    const { widgetData = [], key } = props;
    return (
        <section
            key={key}
            data-reference_widget_id={widgetData?.id}
            data-widget_id={widgetData?.widget_id}
            className="newsletter dynamic-widget"
        >
            {widgetData?.data?.image_url && (
                <div className="img_box">
                    <Image crossorigin="anonymous" src={widgetData?.data?.image_url} alt="img" />
                </div>
            )}
            <div className="content">
                <HeadingWithSpace text={i18n.t('newsletter')} />
                {widgetData?.data?.heading && (
                    <SectionHeadingSmall text={widgetData?.data?.heading} />
                )}
                {widgetData?.data?.description && (
                    <HeadingDesc
                        text={
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: widgetData?.data?.description || ''
                                }}
                            />
                        }
                    />
                )}
                <SubscriptionInput />
            </div>
        </section>
    );
}

export default NewsLetter;

import React from 'react';
import { HeadingDesc } from '../HeadingDesc';
import { HeadingWithSpace } from '../headingWithSpace';
import { SectionHeadingSmall } from '../SectionHeadingSmall';
import { AncerWithUnderlineSmall } from '../ancerWithUnderlineSmall';
// import './resource.css';
import { RightArrowWithBorder } from '../rightArrowWithBorder';
// import i18n from '../../i18n';
import img from '../../public/svg/merisehat-resources.svg'
import Image from 'next/image';



function Resource(props) {
    const { widgetData = [], key } = props;
    return (
        <section
            key={key}
            data-reference_widget_id={widgetData?.id}
            data-widget_id={widgetData?.widget_id}
            className="resource dynamic-widget"
        >
            <div className="img_box">
                <Image src={img} alt="img" />
            </div>
            <div className="content">
                <HeadingWithSpace text={i18n.t('resource')} />
                <SectionHeadingSmall text={i18n.t('can_affect')} />
                <HeadingDesc text={i18n.t('climate_change')} />
                <div className="btn_container">
                    <RightArrowWithBorder />
                    <AncerWithUnderlineSmall text={i18n.t('read_more')} />
                </div>
            </div>
        </section>
    );
}

export default Resource;

import React from 'react';
import { Container } from 'react-bootstrap';
import { SimpleSlider } from '../sliders/simpleSlider';
import { IconCard } from '../icons/IconCard';
// import './finDocByDisease.css';

function FinDocByDisease(props) {
    const { widgetData, key } = props;

    return (
        <section
            key={key}
            data-reference_widget_id={widgetData?.id}
            data-widget_id={widgetData?.widget_id}
            className="finDocByDisease dynamic-widget"
        >
            <Container>
                {widgetData?.data && (
                    <SimpleSlider
                        sliderBoxWidth={true}
                        infinite={false}

                        adaptiveHeight={true}
                        className="profileSlider"
                        sliderTitle={widgetData?.heading}
                        sliderDesc={widgetData?.description}
                        viewAllLink={widgetData?.redirect_url}
                    >
                        {widgetData?.data?.map((item, index) => {
                            return (
                                <div key={index + 1}>
                                    {item?.data?.image && item?.data?.name && (
                                        <IconCard
                                            link={item?.data?.redirect_url}
                                            img={item?.data?.image}
                                            heading={item?.data?.name}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </SimpleSlider>
                )}
            </Container>
        </section>
    );
}

export default React.memo(FinDocByDisease);

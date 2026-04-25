import React, { useState, useEffect } from 'react';
import { ArticleSection } from '@/components/ArticleSection';
import { log, slugify } from '@/utils/powerFunctions';
import VisibilitySensor from 'react-visibility-sensor';
// import './gerdSymtoms.css';
import useWindowDimensions from '@/hooks/useWindowDimensions';
// import ReactVisibilitySensor from "react-visibility-sensor";


function GerdSymtoms(props) {
    const { widgetData = [], key, visibleCallback = null } = props;
    const { height, width } = useWindowDimensions();
    const pageHeight = height < 1 ? 550 : height * 0.8;

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        import("react-device-detect").then((item) => {
            setIsMobile(item.isMobile);
        });
    }, []);

    const widgetId = slugify(widgetData?.data?.badge_title || '') + '-' + widgetData?.id;


    // async function visibleChange(isVisible, widgetId) {
    //     if (isVisible) {
    //         const statusLinks = document.querySelectorAll('.statusLink');
    //         statusLinks.forEach((link) => {
    //             // Find the anchor element inside the structure
    //             const anchor = link.querySelector('div.status p a');
                
    //             if (anchor) {
    //                 // Get the data-to-scrollspy-id attribute from the anchor
    //                 const scrollspyId = anchor.getAttribute('data-to-scrollspy-id');
    //                 link.classList.remove('active');
    //                 link.classList.add('normal');
    //                 // Check if the visible section ID matches the data-to-scrollspy-id
    //                 if (scrollspyId === widgetId) {
    //                     // If matched, remove .normal class and add .active class
    //                     link.classList.remove('normal');
    //                     link.classList.add('active');
    //                 } else {
    //                     // Optionally, reset the other links that don't match
    //                     link.classList.remove('active');
    //                     link.classList.add('normal');
    //                 }
    //             }
    //         });
    //     }
    // }

    return (
        <VisibilitySensor
            minTopValue={pageHeight}
            partialVisibility={isMobile ? true : false}
            onChange={(isVisible) => {
                if (isVisible && typeof visibleCallback == 'function'){
                    visibleCallback(widgetId);
                }
            }}
        >
            <section
                key={key}
                id={widgetId}
                data-reference_widget_id={widgetData?.id}
                data-widget_id={widgetData?.widget_id}
                className="gerdSymtoms dynamic-widget"
            >
                <ArticleSection
                    heading={widgetData?.heading}
                    desc={
                        <p dangerouslySetInnerHTML={{ __html: widgetData?.description }} />
                    }
                    slug={widgetData}
                />
            </section>
        </VisibilitySensor>

        // <ReactVisibilitySensor 
        //     offset={{ top: 10 }}
        //         // minTopValue={pageHeight}
        //         partialVisibility={isMobile ? true : false}
        // onChange={(isVisible) => visibleChange(isVisible, widgetId)}>
        //     <section
        //         key={key}
        //         id={widgetId}
        //         data-reference_widget_id={widgetData?.id}
        //         data-widget_id={widgetData?.widget_id}
        //         className="gerdSymtoms dynamic-widget"
        //     >
        //         <ArticleSection
        //             heading={widgetData?.heading}
        //             desc={
        //                 <p dangerouslySetInnerHTML={{ __html: widgetData?.description }} />
        //             }
        //         />
        //     </section>
        // </ReactVisibilitySensor>
    );
}

export default GerdSymtoms;

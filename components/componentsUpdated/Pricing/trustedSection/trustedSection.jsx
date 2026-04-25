import React from 'react'
import styles from '../trustedSection/trustedSection.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';

function trustedSection(props) {

    function stripHtmlTags(html) {
        if (typeof window !== "undefined") {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
            return tempDiv.textContent || tempDiv.innerText || "";
        }
        return html; // Fallback for server-side rendering
    }

    let textOne = props?.widgetData?.data?.[0]?.heading
        ? stripHtmlTags(props?.widgetData?.data?.[0]?.heading)
        : "";

    let textTwo = props?.widgetData?.data?.[0]?.sub_head
        ? stripHtmlTags(props?.widgetData?.data?.[0]?.sub_head)
        : "";


    return (
        <>
            <section className={`${styles.trustedSection} trustedSection01`} style={{
                backgroundColor: props.widgetData?.data?.[0]?.card_1_color
            }}>
                <Container>
                    <Row>
                        <Col md={8} className='text-center mx-auto'>
                            <div className={`${styles.flexBox} d-flex`}>
                                <Image src={props?.widgetData?.data?.[0]?.image} width={50} height={50} alt="trust icon"></Image>
                                <h5>
                                    <TypeAnimation
                                        sequence={[
                                            `${textOne}`,
                                            5000, 
                                            `${textTwo}`,
                                            5000,
                                        ]}
                                        wrapper="span"
                                        speed={50}
                                        repeat={Infinity}
                                    />
                                </h5>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default trustedSection
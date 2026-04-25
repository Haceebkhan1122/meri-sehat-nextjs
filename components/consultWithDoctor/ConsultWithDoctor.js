import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { SectionWithTwoCards } from '../sectionsWithTwoCards';
import { HeadingDesc } from '../HeadingDesc';
import { SectionHeadingSmall } from '../SectionHeadingSmall';
import { SimpleCard } from '../simpleCard';
import { RightArrowWithBorder } from '../rightArrowWithBorder';
// import './consultWithDoctor.css';
import { AnchorLink } from '../ancerWithUnderline';
import { URL } from '../constants';
// import img1 from '../../public/png/bookappointment.png'
// import img2 from '../../public/png/instant-consultant.png'
import Image from 'next/image';



function ConsultWithDoctor(props) {
    const { widgetData = [], key } = props;

    return (
        <section
            key={key}
            data-reference_widget_id={widgetData?.id}
            data-widget_id={widgetData?.widget_id}
            className="consultWithDoctor dynamic-widget"
        >
            <SectionWithTwoCards
                leftCardContent={<LeftCardContent />}
                rightCardContent={<RightCardContent />}
            />
        </section>
    );
}

function RightCardContent(props) {
    const { widgetData } = props;

    return (
        <SimpleCard bgColor="#FEF1A0">
            <Row>
                <Col md={8}>
                    <div className="content_container">
                        <SectionHeadingSmall
                            text={i18n.t("book_consultation")}
                            color="#0F345A"
                        />
                        <HeadingDesc text={i18n.t("verified_doctors")} />
                    </div>
                    <div className="btn_container">
                        <RightArrowWithBorder />
                        <AnchorLink to={URL.doctorListing} text={i18n.t("learn_more")} />
                    </div>
                </Col>
                <Col md={4}>
                    <div className="instantConsult">
                        <Image src='../../public/png/instant-consultant.png' alt="instantConsultant" />
                    </div>
                </Col>
            </Row>
        </SimpleCard>
    );
}

function LeftCardContent(props) {
    const { onClick } = props;
    return (
        <SimpleCard bgColor="#BEF5F1">
            <Row>
                <Col md={9}>
                    <div className="content_container">
                        <SectionHeadingSmall
                            text="Find And Book Appointment With evidence Doctors - Online or book a visit!"
                            color="#0F345A"
                        />
                        {/* 16000+ PMC evidence Doctors */}
                        <HeadingDesc text={i18n.t('16000+_evidence_doctors')} />
                        <div className="btn_container">
                            <RightArrowWithBorder />
                            <AnchorLink to={URL.doctorListing} text="VIEW ALL DOCTORS" />
                        </div>
                    </div>
                </Col>
                <Col md={2}>
                    <div className="bookAppointment">
                        <Image src='../../public/png/bookappointment.png' alt="bookAppointment" />
                    </div>
                </Col>
            </Row>
        </SimpleCard>
    );
}

export default ConsultWithDoctor;

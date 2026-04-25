import React from 'react'
import styles from './bookAppointDoctorFind.module.scss';
import ContainerWrapperFindDoc from '../container-wrapper-find-doc/container-wrapper-find-doc';
import { SectionHeadingMed } from '../SectionHeadingMed';
import { Accordion, Container } from 'react-bootstrap';
import parse from 'html-react-parser';


const BookAppointDoctorFind = (props) => {
    return (
        <>
            <ContainerWrapperFindDoc>
                {/* <div className={styles.wrapper}>
                    {props?.doctorListing?.speciality?.length > 0 && 
                    props?.doctorListing?.speciality?.map((item) => (
                        <>
                            <h3>{item?.heading}</h3>
                            <p>{item?.description && parse(item?.description)}</p>
                        </>
                    ))
                    }
                </div> */}
                <div className={styles.wrapper}>
                    {props?.doctorListing?.speciality?.speciality_text !== "" && typeof props?.doctorListing?.speciality?.speciality_text === 'string' && parse(props?.doctorListing?.speciality?.speciality_text)}
                </div>
            </ContainerWrapperFindDoc>
            {props?.doctorListing?.speciality_faq?.length > 0 && (
                <section
                    style={{ marginRight: '65px !important' }}
                    className={` instantFAQ ${styles.wraperFAD_ques} wraperFAD_ques faqss`}
                    data-aos="fade-up"
                    data-aos-duration="800"
                >
                    <Container>
                        <SectionHeadingMed
                            className={`  ${styles.fad_heading_ques}`}
                            text="FAQs"
                        />
                        {props?.doctorListing?.speciality_faq?.map((item, index) => (
                            <Accordion defaultActiveKey={item?.id}>
                                <Accordion.Item
                                    className="pricing-accordion-item"
                                    key={item?.id}
                                >
                                    <Accordion.Header className="pricing-accordion-question">
                                        {item?.faq_question && parse(item?.faq_question)}
                                    </Accordion.Header>
                                    <Accordion.Body className="pricing-accordion-answer">
                                        { item?.faq_answer && parse(item?.faq_answer)}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        ))}
                    </Container>
                </section>
            )}
        </>

    )
}

export default BookAppointDoctorFind

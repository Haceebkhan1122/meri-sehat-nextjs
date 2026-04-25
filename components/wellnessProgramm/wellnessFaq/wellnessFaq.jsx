import React from 'react'
import { Accordion } from "react-bootstrap";
import useMediaQuery from '@mui/material/useMediaQuery';
import parse from 'html-react-parser';

function wellnessFaq({ faqData }) {
    const isMobile = useMediaQuery('(max-width:768px)');
    const item = [
        {
            heading:
                'What is Meri Sehat   wellness program?',
            desc: 'Prof. Dr. Nadia Khurshid Ahmed has the following degrees: M.B.B.S, F.C.P.S.',
            content: '(Gynecology & Obstetrician), M.C.P.S'
        },
        {
            heading:
                'How does focused health monitoring work?',
            desc: 'Prof. Dr. Nadia Khurshid Ahmed has the following degrees: M.B.B.S, F.C.P.S.',
            content: '(Gynecology & Obstetrician), M.C.P.S'
        },
        {
            heading:
                'What are the benefits of focused diet plans?',
            desc: 'Prof. Dr. Nadia Khurshid Ahmed has the following degrees: M.B.B.S, F.C.P.S.',
            content: '(Gynecology & Obstetrician), M.C.P.S'
        },
        {
            heading:
                'How can employees access dedicated doctors with 24/7 availability?',
            desc: 'Prof. Dr. Nadia Khurshid Ahmed has the following degrees: M.B.B.S, F.C.P.S.',
            content: '(Gynecology & Obstetrician), M.C.P.S'
        },
        {
            heading:
                'Is participation in the wellness program mandatory for employees?',
            desc: 'Prof. Dr. Nadia Khurshid Ahmed has the following degrees: M.B.B.S, F.C.P.S.',
            content: '(Gynecology & Obstetrician), M.C.P.S'
        },
        {
            heading:
                'Are there any costs associated with the wellness program?',
            desc: 'Prof. Dr. Nadia Khurshid Ahmed has the following degrees: M.B.B.S, F.C.P.S.',
            content: '(Gynecology & Obstetrician), M.C.P.S'
        },
        {
            heading:
                'How is employee confidentiality ensured within the wellness program?',
            desc: 'Prof. Dr. Nadia Khurshid Ahmed has the following degrees: M.B.B.S, F.C.P.S.',
            content: '(Gynecology & Obstetrician), M.C.P.S'
        }
    ];
    return (
        <>
            <div className="faqContainerWellness pb100">
                <div className="faqContainer">
                    <h2 className="faqText mb-5">FAQs</h2>
                </div>
                {faqData?.map((item, index) => (
                    <Accordion defaultActiveKey={0} className='
                        mobile_width'>
                        <Accordion.Item
                            className="pricing-accordion-item accordianWallet spacing"
                            key={index}
                        >
                            <Accordion.Header className="pricing-accordion-question">
                                {item?.question}
                            </Accordion.Header>
                            <Accordion.Body className="pricing-accordion-answer">
                                { item?.answer && parse(item?.answer)}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))}
            </div>
        </>
    )
}

export default wellnessFaq
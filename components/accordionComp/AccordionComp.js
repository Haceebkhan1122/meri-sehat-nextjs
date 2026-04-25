/* eslint-disable react/no-array-index-key */
import React from "react";
import { Accordion } from "react-bootstrap";
import HeadingDescSmall from "../headingDescSmall/HeadingDescSmall";
import arrow from '../../public/svg/select-arrow.svg'
import Image from 'next/image';

function AccordionComp(props) {
  const { data = [], icon } = props;
  return (
    <div className="accordionComp">
      <Accordion>
        {data?.map((item, index) => {
          return (
            <div key={index}>
              <Accordion.Item eventKey={index}>
                <Accordion.Header>
                  <HeadingDescSmall text={item?.question || ''} />
                  {icon ? <Image src={arrow} alt="arrow" className='accordionIcon' /> : ''}
                </Accordion.Header>
                <Accordion.Body>
                  <HeadingDescSmall
                    text={
                      (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item?.answer || "",
                          }}
                        />
                      ) || ""
                    }
                  />
                  {/* <HeadingDescSmall text={} /> */}
                </Accordion.Body>
              </Accordion.Item>
            </div>
          );
        })}
      </Accordion>
    </div>
  );
}

export default AccordionComp;

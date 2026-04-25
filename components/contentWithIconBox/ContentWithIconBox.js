import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeadingDesc from "../HeadingDesc/HeadingDesc";
import SectionHeadingMed from "../SectionHeadingMed/SectionHeadingMed";
import SectionHeadingSmall from "../SectionHeadingSmall/SectionHeadingSmall";
import styles from "../../styles/ContentWithIconBox.module.css";
import Image from 'next/image';

function ContentWithIconBox(props) {
  const { heading, desc, iconBoxes } = props;
  return (
    <div className={`${styles.contentWithIcon}`}>
      <Container>
        <Row>
          <Col md={8} className="offset-lg-2">
            <SectionHeadingMed text={heading} />
            <HeadingDesc text={desc} />
          </Col>
          <Col md={12}>
            <div className={`${styles.iconBoxContainer}`}>
              {iconBoxes.map((iconBoxe, index) => {
                const { icon, countedUser, title } = iconBoxe;
                return (
                  <div className={`${styles.iconBox}`} key={index}>
                    <div className={`${styles.imgBox}`}>
                      <Image crossorigin="anonymous" src={icon} alt="icon" />
                    </div>
                    <SectionHeadingSmall text={countedUser} />
                    <SectionHeadingSmall text={title} />
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContentWithIconBox;

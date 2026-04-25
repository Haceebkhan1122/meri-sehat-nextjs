import React from "react";
import { Row } from "react-bootstrap";
import styles from "../../styles/CallToAction.module.css";

function CallToAction(props) {
  const { leftContent, rightContent, customClass } = props;

  return (
    <section className={styles.callToAction}>
      <div className="container px-0">
        <Row className={customClass}>
          {leftContent}
          {rightContent}
        </Row>
      </div>
    </section>
  );
}

export default CallToAction;

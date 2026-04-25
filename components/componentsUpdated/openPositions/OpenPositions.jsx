import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./openPositions.module.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useRouter } from "next/router";

function OpenPositions(props) {
  const router = useRouter();
  const handleApplyClick = (id) => {
       router.push(`/job-details?id=${id}`);
  };
  return (
    <div className={styles.openPositions}>
      <Container id="open-position">
        <Row>
          <Col lg={12}>
            <h2 className="mb-5 position">Open positions</h2>
            <div className={`${styles.openPos} openPos`}>
           
              <Tabs
                defaultActiveKey="all"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                {/* All Tab */}
                   
                <Tab eventKey="all" title="All">
                  <h6>{props?.widgetData?.data?.jobs?.length} Jobs listed</h6>
                  {props?.widgetData?.data?.jobs?.map((job) => (
                    <div
                      key={job?.id}
                      className="boxJob"
                      onClick={() => handleApplyClick(job?.id)}
                    >

                      <div>
                        <h4>{job?.title}</h4>
                        <p>{job?.department?.name}</p>
                      </div>
                      <div className="d-flex btnBox">
                        <p>{job?.job_type}</p>
                        <button className="applyBtn">Apply Now</button>
                      </div>
                    </div>
                  ))}
                </Tab>

                {/* Department wise tabs */}
                {props?.widgetData?.data?.departments?.map((dept) => (
                  <Tab key={dept?.id} eventKey={dept?.slug} title={dept?.name}>
                    <h6>{dept?.careers?.length} Jobs listed</h6>
                    {dept?.careers?.map((job) => (
                      <div
                        key={job?.id}
                        className="boxJob"
                        onClick={() => handleApplyClick(job?.id)}
                        
                      >
                        <div>
                          <h4>{job?.title}</h4>
                          <p>{dept?.name}</p>
                        </div>
                        <div className="d-flex btnBox">
                          <p>{job?.job_type}</p>
                          <button className="applyBtn">Apply Now</button>
                        </div>
                      </div>
                    ))}
                  </Tab>
                ))}
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default OpenPositions;

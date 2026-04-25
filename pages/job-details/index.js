import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import JobDetail from "../../components/componentsUpdated/jobDetail/jobDetail"
import CareerForm from "../../components/componentsUpdated/careerForm/careerForm"
import CareersDoctorBanner from "../../components/componentsUpdated/careersDoctorBanner/careersDoctorBanner"
import styles from "./applyJob.module.scss"
import { APIV3 } from "../../utils/httpService";
import { useRouter } from "next/router";

function index({jobDetails}) {

    const router = useRouter()
    return (
        <>
        <div className={`${styles.applyJob} applyJob`}>
            <Container>
                <Row>
                    <Col lg={12}>
                        <h6 style={{cursor: 'pointer'}} onClick={() => router.push('/careers')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24" fill="none"  >
                                <g clip-path="url(#clip0_6818_88074)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.9283 11H10.2348L16.9794 5.4L15.2932 4L5.6582 12L15.2932 20L16.9794 18.6L10.2348 13H24.9283V11Z" fill="#0F345A" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_6818_88074">
                                        <rect width="28.9051" height="24" fill="white" transform="translate(0.839844)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Careers</h6>
                    </Col>
                    <Col lg={6}>
                        <JobDetail jobDetails={jobDetails} />
                    </Col>
                    <Col lg={6}>
                        <CareerForm jobDetails={jobDetails} />
                    </Col>
                </Row>

            </Container>


        </div>
        <CareersDoctorBanner/>
        </>
    )
}


export async function getServerSideProps(context) {
  const { id } = context.query;
  let jobDetails = null;

  try {
    const res = await APIV3.get(`/careers/details/${id}`);
    if (res?.status === 200) {
      jobDetails = res.data?.data || null;
    }
  } catch (err) {
    console.error("Error fetching job details:", err.message);
  }

  return {
    props: { jobDetails },
  };
}

export default index

import React from 'react'
import styles from "./jobDetail.module.scss"

function jobDetail({ jobDetails }) {
    return (

        <div className={`${styles.applyJobBox} applyJobBox`}>
            <h2>{jobDetails?.title} ({jobDetails?.department?.name})</h2>
            <h3>{jobDetails?.city?.name}</h3>
            <hr></hr>
            <div className={`${styles.scrollBox}  `} >
                <h4>
                    Job Description:

                </h4>
                <ul>
                    {jobDetails?.job_description}
                </ul>
                <h4>
                    Qualifications:
                </h4>
                <p> Bachelor’s Degree in Computer Sciences or related field
                    3-4 years of relevant experience</p>

                <h4>
                    Location:
                </h4>
                <p> Karachi, Sindh - Pakistan</p>
            </div>
        </div >


    )
}

export default jobDetail

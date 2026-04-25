import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';
import parse from 'html-react-parser';


const LearnMoreModal = ({ showLearn, handleCloseLearn, handleShowLearn, getInsuranceInfo }) => {
    return (
        <>
            <Modal centered show={showLearn} onHide={handleCloseLearn} className="learnMorePkgModal">
                <Modal.Body>
                    <span className='close__svg' onClick={handleCloseLearn}></span>
                    <div className="wraper">
                        <div className=''>
                            <h3 onClick={handleShowLearn} className={"heads"}> {getInsuranceInfo?.page?.name}  </h3>
                            <hr className='divider' />

                            <iframe src={getInsuranceInfo?.video} title="Sehat Show | Seenay Ki Jalan, Instantly Ho Khatam | Episode# 02" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" data-gtm-yt-inspected-97936982_33="true" id="444427348" data-gtm-yt-inspected-7="true" data-gtm-yt-inspected-12="true" data-gtm-yt-inspected-17="true" className='frameBox'></iframe>
                        </div>
                        {/* <iframe src="https://www.youtube.com/watch?v=gHm23uOubCE" frameborder="0" className='video__modal' allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" /> */}
                        <h3> {getInsuranceInfo?.faqs?.[0]?.question} </h3>
                        <div className="desc">
                            <p className='firs'>{getInsuranceInfo?.page?.widget?.[1]?.description && parse(getInsuranceInfo?.page?.widget?.[1]?.description)}</p>
                        </div>
                    </div>
                    <div className="mobileWraperBottomBtn">
                        <button onClick={handleCloseLearn}> DONE </button>
                    </div>
                </Modal.Body>
            </Modal >
        </>
    )
}

export default LearnMoreModal;

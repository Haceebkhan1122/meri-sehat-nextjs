import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';
import close from '../../public/svg/close-vector-svg.svg'
import Image from 'next/image';


const VitalScan = ({ showVitalScan, handleCloseVital,handleShowVital }) => {

    return (
        <>
            <Modal centered show={showVitalScan} onHide={handleCloseVital} className="showVitalPkgModal" >
                <Modal.Header>
                <div className='closeItem'>
                    <Image src={close} width={13} onClick={handleCloseVital} height={13} />
                    </div>
                </Modal.Header>
                <Modal.Body> 

                    <div className='wholeContainerVitals'>
                        <div className='headingVitalScan'>
                            <h4>Vital Scan</h4>
                        </div>
                        <div className='paragraphVitalScan' >
                            <p> Users are limited to a maximum of 10 scans per day. </p>
                            <br />
                            <p> This stands regardless of any package that has been bought by the (‘User”). </p>
                            <br />
                            <p> Each use is defined as a completed “Vital Scan” that gives you visible results. Users exceeding the Usage Limit may experience restrictions or limitations on their access to the App.</p>
                            <p className='mt-3'>  Read more about our <span onClick={() => window.location.href = '/fair-use-policy'}  style={{color:'#19B3B5', fontWeight:"500", borderBottom:"1px solid #19B3B5"}} className='fairPolicy'>Fair use policy</span></p>
                            <div className='btnVitalScan mt-4'>
                            <button onClick={handleCloseVital} className=''>DONE</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal >
        </>
    )
}

export default VitalScan;

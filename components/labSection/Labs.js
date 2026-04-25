
import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Image from "next/image";
import lab1 from "../../public/png/lab1.png"
import righticon from "../../public/png/right-icon.png"


const Labs = ({ labsByCities, handleNameChange, myCart }) => {


    return (
        <>
            {labsByCities && labsByCities?.length > 0 ? labsByCities?.map((lab) => {
                return (
                    <>
                        <div className={myCart?.lab_cart?.length > 0 ? 'col-12 col-lg-4 mb-3' : 'col-12 col-lg-3 mb-3'}>
                            <div className='checkboxSelection d-flex position-relative align-items-center' id={lab?.id}>
                                <Image src={lab?.image || ''} width={40} height={40} className='img-fluid'></Image>
                                <Form.Check
                                    type="radio"
                                    label={lab?.lab_name}
                                    name={lab?.lab_name}
                                    value={lab?.id}
                                    onChange={(e) => handleNameChange(e, lab)}
                                    className='inputcheckBox'
                                />
                                <Image src={righticon} className='img-fluid rightIcon'></Image>
                            </div>
                        </div>
                    </>
                )
            }) : null}
        </>
    )
}


export default Labs
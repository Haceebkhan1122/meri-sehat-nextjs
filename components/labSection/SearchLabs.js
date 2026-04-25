
import React, { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import Image from "next/image";
import info from "../../public/svg/info.svg"
import SpecialInstructions from '../specialInstructions/specialInstructions'

const SearchLabs = () => {

    return (
        <>
            <Col className={'col-md-3'} xs={12}>
                <div className="checkbox_test">
                    <Form>
                        <Form.Check
                            type="checkbox"
                            id={1}
                        >
                            <Form.Check.Input type="checkbox" name={1} value={1} isValid />
                            <Form.Check.Label>
                                <span className='label_checkbox'>CBC</span>
                                <span className='price_checkbox'>
                                    <i className='pr_ch'>PKR 500 </i>
                                    <Image src={info} className='img-fluid icon_checkbox' />
                                </span>
                            </Form.Check.Label>
                        </Form.Check>
                    </Form>
                </div>
            </Col>
            {/* {LabsTest?.length > 0 ? LabsTest?.map((item) => (
                <React.Fragment key={item.id}>
                    <Col className={myCart?.lab_cart?.length > 0 ? 'col-md-4' : 'col-md-3'} xs={12}>
                        <div className="checkbox_test">
                            <Form>
                                <Form.Check
                                    type="checkbox"
                                    id={item.id}
                                >
                                    <Form.Check.Input type="checkbox" name={item.id} value={item?.id} onChange={(e) => onCartItemChange(e, item)} isValid />
                                    <Form.Check.Label>
                                        <span className='label_checkbox'>{item.lab_test}</span>
                                        <span className='price_checkbox'>
                                            <i className='pr_ch'>PKR {item.price} </i>
                                            {item.note ? (
                                                <Image onClick={(e) => handleModal(e, item)} src={info} className='img-fluid icon_checkbox' />
                                            ) : null}
                                        </span>
                                    </Form.Check.Label>
                                </Form.Check>
                            </Form>
                        </div>
                    </Col>
                    <SpecialInstructions instructionsModalListner={instructionsModalListner} addToCartFunc={addToCartFunc} instructionsModal={instructionsModal} setInstructionsModal={setInstructionsModal} notes={modalData} />
                </React.Fragment>
            )) : null} */}
        </>
    )
}


export default SearchLabs
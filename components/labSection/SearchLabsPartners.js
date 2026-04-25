
import React, { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import Image from "next/image";
import info from "../../public/svg/info.svg"
import SpecialInstructions from '../specialInstructions/specialInstructions'
import lab1 from "../../public/png/lab1.png"
import righticon from "../../public/png/right-icon.png"

const SearchLabsPartners = ({ setSearchVal, searchVal, filteredLabs, handleNameChange, popularLabs, setInstructionsModalListner, instructionsModalListner, myCart, LabsTest, addToCartFunc, removeToCartFunc }) => {
    const [instructionsModal, setInstructionsModal] = useState(false)
    const [modalData, setModalData] = useState({})

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        import("react-device-detect").then((item) => {
            setIsMobile(item.isMobile);
        });
    }, []);


    return (
        <>
            {!isMobile ? (
                <>
                    <h6 className='mt-4 mb-4 '>Popular Labs</h6>
                    {!filteredLabs?.length > 0 && popularLabs?.length > 0 && popularLabs?.map((item) => {
                        return (
                            <>
                                <Col className={'col-md-3'} xs={12}>
                                    <div className={'col-12 col-lg-3 mb-3'}>
                                        <div className='checkboxSelection d-flex position-relative align-items-center' id={1}>
                                            <Image src={item?.image || ''} width={40} height={40} className='img-fluid' ></Image>
                                            <Form.Check
                                                type="radio"
                                                label={item?.lab_name}
                                                name={item?.lab_name}
                                                value={item?.id}
                                                onChange={(e) => handleNameChange(e, item)}
                                                className='inputcheckBox'
                                            />
                                            <Image src={righticon} className='img-fluid rightIcon'></Image>
                                        </div>
                                    </div>
                                </Col>
                            </>
                        )
                    })}
                    {filteredLabs?.length > 0 && filteredLabs?.map((item) => {
                        return (
                            <>
                                <Col className={'col-md-3'} xs={12}>
                                    <div className={'col-12 col-lg-3 mb-3'}>
                                        <div className='checkboxSelection d-flex position-relative align-items-center' id={1}>
                                            <Image src={item?.image || ''} width={40} height={40} className='img-fluid' ></Image>
                                            <Form.Check
                                                type="radio"
                                                label={item?.lab_name}
                                                name={item?.lab_name}
                                                value={item?.id}
                                                onChange={(e) => handleNameChange(e, item)}
                                                className='inputcheckBox'
                                            />
                                            <Image src={righticon} className='img-fluid rightIcon'></Image>
                                        </div>
                                    </div>
                                </Col>
                            </>
                        )
                    })}
                </>
            ) : (
                <>
                    <Form className='searchbox_mod'>
                        <Form.Group className="position-relative" >
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchVal}
                                onChange={(e) => setSearchVal(e.target.value)}
                                className="searchfield"
                            />
                        </Form.Group>
                    </Form>
                    <h2 className="select_test text-left">Popular Labs</h2>
                    {!filteredLabs?.length > 0 && popularLabs?.length > 0 && popularLabs?.map((item) => {
                        return (
                            <>
                                <Col className={myCart?.lab_cart?.length > 0 ? 'col-md-4' : 'col-md-3'} xs={12}>
                                    <div className="checkbox_test isMobile">
                                        <Form>
                                            <Form.Check
                                                type="radio"
                                                label={item?.lab_name}
                                                name={item?.lab_name}
                                                value={item?.id}
                                                className='inputcheckBox'
                                            >
                                                <Form.Check.Input type="checkbox" name={item.id} value={item?.id} onChange={(e) => handleNameChange(e, item)} isValid />
                                                <Form.Check.Label>
                                                    <span className='label_checkbox'>{item.lab_name}</span>
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Form>
                                    </div>
                                </Col>
                            </>
                        )
                    })}
                    {filteredLabs?.length > 0 && filteredLabs?.map((item) => {
                        return (
                            <>
                                <div className="checkbox_test isMobile">
                                    <Form>
                                        <Form.Check
                                            type="radio"
                                            label={item?.lab_name}
                                            name={item?.lab_name}
                                            value={item?.id}
                                            className='inputcheckBox'
                                        >
                                            <Form.Check.Input type="checkbox" name={item.id} value={item?.id} onChange={(e) => handleNameChange(e, item)} isValid />
                                            <Form.Check.Label>
                                                <span className='label_checkbox'>{item.lab_name}</span>
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </Form>
                                </div>
                            </>
                        )
                    })}
                </>
            )}
        </>
    )
}


export default SearchLabsPartners
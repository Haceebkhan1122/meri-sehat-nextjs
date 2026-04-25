
import React, { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import Image from "next/image";
import info from "../../public/png/info.png"
import SpecialInstructions from '../specialInstructions/specialInstructions'
import SpecialInstructionsPackages from '../../components/specialInstructionsPackages/specialInstructionsPackages'


const SearchTestAndPackages = ({ nextCitySelectedListner, singleLabsDetails, setSearchValTests, searchValTests, filteredLabsPackages, popularLabsPackages, listnerForLabTest, filteredLabsTests, popularLabsTests, setInstructionsModalListner, instructionsModalListner, myCart, LabsTest, addToCartFunc, removeToCartFunc }) => {
    const [instructionsModal, setInstructionsModal] = useState(false)
    const [modalData, setModalData] = useState({})
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        import("react-device-detect").then((item) => {
            setIsMobile(item.isMobile);
        });
    }, []);

    const handleModal = (e, item) => {
        e.preventDefault();
        setInstructionsModalListner(true)
        setModalData(item)
        setInstructionsModal(true)
    }

    const onCartItemChange = (e, item) => {
        if (e.target.checked === true) {
            addToCartFunc(parseInt(e.target.value, 10))
        }
        else {
            removeToCartFunc(parseInt(e.target.value, 10))
        }
    };

    const handleModal2 = (item, e) => {
        e.preventDefault();
        setInstructionsModalListner(true)
        setModalData(item)
        setInstructionsModal(true)
    }

    const onCartItemChange2 = (e, item) => {
        if (e.target.checked === true) {
            addToCartFunc(parseInt(e.target.value, 10))
        }
        else {
            removeToCartFunc(item?.package_id, true)
        }
    };

    return (
        <>
            {!isMobile ? (
                <>
                    <h6 className='mt-4 mb-4 popularTexthP'>Popular Test</h6>
                    {listnerForLabTest && !filteredLabsTests?.length > 0 && !searchValTests && popularLabsTests?.length > 0 && popularLabsTests?.map((item) => {
                        return (
                            <>
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
                                                        <i className='pr_ch'>PKR {item.formated_price} </i>
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
                            </>
                        )
                    })}
                    {listnerForLabTest && filteredLabsTests?.length > 0 && filteredLabsTests?.map((item) => {
                        return (
                            <>
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
                                                        <i className='pr_ch'>PKR {item.formated_price} </i>
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
                            </>
                        )
                    })}
                    {!filteredLabsTests?.length > 0 && !filteredLabsPackages?.length > 0 && searchValTests ? (
                        <div className='text-center'>
                            No result found
                        </div>
                    ) : null}
                    {!listnerForLabTest && !filteredLabsPackages?.length > 0 && !searchValTests && popularLabsPackages?.length > 0 && popularLabsPackages?.map((item) => {
                        return (
                            <>
                                <Col className={myCart?.lab_cart?.length > 0 ? 'col-md-4' : 'col-md-3'}>
                                    <div key={item?.package?.id} className="checkbox_test packages_checkbox">
                                        <Form>
                                            <Form.Check type="checkbox" id={item?.id}>
                                                <Form.Check.Input type="checkbox" name={item.id} value={item?.package?.id} onChange={(e) => onCartItemChange2(e, item)} isValid />
                                                <Form.Check.Label>
                                                    <div className='pkg_bx'><span className='label_checkbox'><span className='circle01'></span>{item?.package?.name} </span> <span className='price_checkbox'>
                                                        {item?.package?.introduction ? (
                                                            <>
                                                                <Image onClick={(e) => handleModal2(item, e)} src={info} className='img-fluid icon_checkbox'></Image>
                                                            </>
                                                        ) : null}
                                                        <i className='pr_ch'>PKR {item?.package?.formated_amount} </i></span></div>
                                                    <p className='w-100 '>{item?.package?.introduction}</p>
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Form>
                                    </div>
                                </Col>
                                <SpecialInstructionsPackages myCart={myCart} instructionsModalListner={instructionsModalListner} addToCartFunc={addToCartFunc} instructionsModal={instructionsModal} setInstructionsModal={setInstructionsModal} notes={modalData} />
                            </>
                        )
                    })}

                    {!listnerForLabTest && filteredLabsPackages?.length > 0 && filteredLabsPackages?.map((item) => {
                        return (
                            <>
                                <Col className={myCart?.lab_cart?.length > 0 ? 'col-md-4' : 'col-md-3'}>
                                    <div key={item?.package?.id} className="checkbox_test packages_checkbox">
                                        <Form>
                                            <Form.Check type="checkbox" id={item?.id}>
                                                <Form.Check.Input type="checkbox" name={item.id} value={item?.package?.id} onChange={(e) => onCartItemChange2(e, item)} isValid />
                                                <Form.Check.Label>
                                                    <div className='pkg_bx'><span className='label_checkbox'><span className='circle01'></span>{item?.package?.name} </span> <span className='price_checkbox'>
                                                        {item?.package?.introduction ? (
                                                            <>
                                                                <Image onClick={(e) => handleModal2(item, e)} src={info} className='img-fluid icon_checkbox'></Image>
                                                            </>
                                                        ) : null}
                                                        <i className='pr_ch'>PKR {item?.package?.formated_amount} </i></span></div>
                                                    <p className='w-100 '>{item?.package?.introduction}</p>
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Form>
                                    </div>
                                </Col>
                                <SpecialInstructionsPackages myCart={myCart} instructionsModalListner={instructionsModalListner} addToCartFunc={addToCartFunc} instructionsModal={instructionsModal} setInstructionsModal={setInstructionsModal} notes={modalData} />
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
                                placeholder="Search test..."
                                value={searchValTests}
                                onChange={(e) => setSearchValTests(e.target.value)}
                                className="searchfield mobile_field"
                            />
                        </Form.Group>
                    </Form>
                    <h2 class="select_test text-left ss">Popular Tests</h2>
                    {listnerForLabTest && !filteredLabsTests?.length > 0 && !searchValTests && popularLabsTests?.length > 0 && popularLabsTests?.map((item) => (
                        <React.Fragment key={item.id}>
                            <Col className={myCart?.lab_cart?.length > 0 ? 'col-md-4' : 'col-md-3'} xs={12}>
                                <div className="checkbox_test isMobile mobile_searchBox">
                                    <Form>
                                        <Form.Check
                                            type="checkbox"
                                            id={item.id}
                                        >
                                            <Form.Check.Input type="checkbox" name={item.id} value={item?.id} onChange={(e) => onCartItemChange(e, item)} isValid />
                                            <Form.Check.Label>
                                                <span className='label_checkbox'>{item.lab_test}</span>
                                                <span className='price_checkbox'>
                                                    <i className='pr_ch'>PKR {item.formated_price} </i>
                                                    {/* {item.note ? (
                                                        <Image onClick={(e) => handleModal(e, item)} src={info} className='img-fluid icon_checkbox' />
                                                    ) : null} */}
                                                </span>
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </Form>
                                </div>
                            </Col>
                            <SpecialInstructions instructionsModalListner={instructionsModalListner} addToCartFunc={addToCartFunc} instructionsModal={instructionsModal} setInstructionsModal={setInstructionsModal} notes={modalData} />
                        </React.Fragment>
                    ))}
                    {listnerForLabTest && filteredLabsTests?.length > 0 && filteredLabsTests?.map((item) => (
                        <React.Fragment key={item.id}>
                            <Col className={myCart?.lab_cart?.length > 0 ? 'col-md-4' : 'col-md-3'} xs={12}>
                                <div className="checkbox_test isMobile">
                                    <Form>
                                        <Form.Check
                                            type="checkbox"
                                            id={item.id}
                                        >
                                            <Form.Check.Input type="checkbox" name={item.id} value={item?.id} onChange={(e) => onCartItemChange(e, item)} isValid />
                                            <Form.Check.Label>
                                                <span className='label_checkbox'>{item.lab_test}</span>
                                                <span className='price_checkbox'>
                                                    <i className='pr_ch'>PKR {item.formated_price} </i>
                                                    {/* {item.note ? (
                                                        <Image onClick={(e) => handleModal(e, item)} src={info} className='img-fluid icon_checkbox' />
                                                    ) : null} */}
                                                </span>
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </Form>
                                </div>
                            </Col>
                            <SpecialInstructions instructionsModalListner={instructionsModalListner} addToCartFunc={addToCartFunc} instructionsModal={instructionsModal} setInstructionsModal={setInstructionsModal} notes={modalData} />
                        </React.Fragment>
                    ))}
                    {!filteredLabsTests?.length > 0 && !filteredLabsPackages?.length > 0 && searchValTests ? (
                        <div className='text-center'>
                            No result found
                        </div>
                    ) : null}
                    {!listnerForLabTest && !filteredLabsPackages?.length > 0 && !searchValTests && popularLabsPackages?.length > 0 && popularLabsPackages?.map((item) => (
                        <React.Fragment key={item.id}>
                            <Col className={myCart?.lab_cart?.length > 0 ? 'col-md-4' : 'col-md-3'}>
                                <div key={item?.package?.id} className="checkbox_test isMobile packages_checkbox">
                                    <Form>
                                        <Form.Check type="checkbox" id={item?.id}>
                                            <Form.Check.Input type="checkbox" name={item.id} value={item?.package?.id} onChange={(e) => onCartItemChange(e, item)} isValid />
                                            <Form.Check.Label>
                                                <div className='pkg_bx mb-4'><span className='label_checkbox'><span className='circle01'></span>{item?.package?.name} </span> <span className='price_checkbox'>
                                                    {item?.package?.introduction ? (
                                                        <>
                                                            <Image onClick={(e) => handleModal(item, e)} src={info} className='img-fluid icon_checkbox'></Image>
                                                        </>
                                                    ) : null}
                                                    <i className='pr_ch'>PKR {item?.package?.formated_amount} </i></span></div>
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </Form>
                                </div>
                            </Col>
                            <SpecialInstructionsPackages myCart={myCart} instructionsModalListner={instructionsModalListner} addToCartFunc={addToCartFunc} instructionsModal={instructionsModal} setInstructionsModal={setInstructionsModal} notes={modalData} />
                        </React.Fragment>
                    ))}
                    {!listnerForLabTest && filteredLabsPackages?.length > 0 && filteredLabsPackages?.map((item) => (
                        <React.Fragment key={item.id}>
                            <Col className={myCart?.lab_cart?.length > 0 ? 'col-md-4' : 'col-md-3'}>
                                <div key={item?.package?.id} className="checkbox_test isMobile packages_checkbox">
                                    <Form>
                                        <Form.Check type="checkbox" id={item?.id}>
                                            <Form.Check.Input type="checkbox" name={item.id} value={item?.package?.id} onChange={(e) => onCartItemChange(e, item)} isValid />
                                            <Form.Check.Label>
                                                <div className='pkg_bx mb-4'><span className='label_checkbox'><span className='circle01'></span>{item?.package?.name} </span> <span className='price_checkbox'>
                                                    {item?.package?.introduction ? (
                                                        <>
                                                            <Image onClick={(e) => handleModal(item, e)} src={info} className='img-fluid icon_checkbox'></Image>
                                                        </>
                                                    ) : null}
                                                    <i className='pr_ch'>PKR {item?.package?.formated_amount} </i></span></div>
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </Form>
                                </div>
                            </Col>
                            <SpecialInstructionsPackages myCart={myCart} instructionsModalListner={instructionsModalListner} addToCartFunc={addToCartFunc} instructionsModal={instructionsModal} setInstructionsModal={setInstructionsModal} notes={modalData} />
                        </React.Fragment>
                    ))}
                </>
            )}
        </>
    )
}


export default SearchTestAndPackages
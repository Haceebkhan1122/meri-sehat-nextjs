
import React, { useEffect, useState, useRef } from 'react';
import { Col, Form } from 'react-bootstrap';
import Image from "next/image";
import info from "../../public/svg/info.svg"
import SpecialInstructions from '../../components/specialInstructions/specialInstructions'

const SingleTests = ({ setInstructionsModalListner, instructionsModalListner, myCart, LabsTest, addToCartFunc, removeToCartFunc }) => {
    const [instructionsModal, setInstructionsModal] = useState(false)
    const [modalData, setModalData] = useState({})
    const [labCheckbox, setLabCheckbox] = useState({})

    const handleModal = (e, item) => {
        e.preventDefault();
        setInstructionsModalListner(true)
        setModalData(item)
        setInstructionsModal(true)
    }

    async function checkboxChanged(e, item) {
        if (e.target.checked === false) {
            try {
                await removeToCartFunc(item?.id);
                const updatedCheckedItems = { ...labCheckbox, [item.id]: false };
                setLabCheckbox(updatedCheckedItems);
            } catch (error) {

            }

        }

        else {
            try {
                await addToCartFunc(item?.id);
                const updatedCheckedItems = { ...labCheckbox, [item.id]: true };
                setLabCheckbox(updatedCheckedItems)
            } catch (error) {

            }

        }

    }

    useEffect(() => {
        if (myCart && typeof myCart === "object" && Object?.keys(myCart).length > 0) {
            if (myCart?.lab_cart?.length > 0) {
                const updatedState = Object.fromEntries(
                    Object.entries(labCheckbox).map(([key, value]) => [key, false])
                );

                setLabCheckbox(updatedState);
                myCart?.lab_cart?.forEach((item) => {
                    if (item?.lab_test?.id) {
                        setLabCheckbox(prevState => ({
                            ...prevState,
                            [item?.lab_test?.id]: true
                        }))
                    }
                })
            }

            else {
                setLabCheckbox({});
            }
        }
    }, [JSON.stringify(myCart)])

    return (
        <>
            {LabsTest?.length > 0
                ? LabsTest?.map((item) => {
                    return (
                        <React.Fragment key={item.id}>
                            <Col
                                className={
                                    myCart?.lab_cart?.length > 0 ? "col-md-4" : "col-md-3"
                                }
                                xs={12}
                            >
                                <div
                                    className="checkbox_test"
                                // onClick={(e)=> checkboxChanged(e,item)}
                                >
                                    <Form>
                                        <Form.Check
                                            type="checkbox"
                                        // checked={labCheckbox[item?.id] === true || false}
                                        >
                                            <Form.Check.Input
                                                type="checkbox"
                                                onChange={(e) => checkboxChanged(e, item)}
                                                checked={labCheckbox[item?.id] === true}
                                                id={`lab-checkbox-${item.id}`}
                                                defaultChecked={labCheckbox[item?.id]}
                                                name={item.id}
                                                value={item?.id}
                                                isValid
                                            />
                                            <Form.Check.Label htmlFor={`lab-checkbox-${item.id}`}>
                                                <span className="label_checkbox">
                                                    {item.lab_test}
                                                </span>
                                                <span className="price_checkbox">
                                                    <i className="pr_ch">
                                                        PKR {item.formated_price}{" "}
                                                    </i>
                                                    {item.note ? (
                                                        <Image
                                                            onClick={(e) => handleModal(e, item)}
                                                            src={info}
                                                            width={16}
                                                            height={16}
                                                            className="img-fluid icon_checkbox"
                                                        />
                                                    ) : null}
                                                </span>
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </Form>
                                </div>
                            </Col>
                            <SpecialInstructions
                                instructionsModalListner={instructionsModalListner}
                                addToCartFunc={addToCartFunc}
                                instructionsModal={instructionsModal}
                                setInstructionsModal={setInstructionsModal}
                                notes={modalData}
                            />
                        </React.Fragment>
                    );
                })
                : null}
        </>
    );
}


export default SingleTests
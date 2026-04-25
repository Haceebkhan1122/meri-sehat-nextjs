import React, { useState, useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import Image from "next/image";
import info from "../../public/svg/info.svg";
import SpecialInstructionsPackages from "../../components/specialInstructionsPackages/specialInstructionsPackages";

const Package = ({
    labsbyCities,
    setInstructionsModalListner,
    instructionsModalListner,
    myCart,
    LabsPackages,
    addToCartFunc,
    removeToCartFunc,
}) => {
    const [instructionsModal, setInstructionsModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [packageCheckbox, setPackageCheckbox] = useState({});

    const handleModal = (item, e) => {
        e.preventDefault();
        setInstructionsModalListner(true);
        setModalData(item);
        setInstructionsModal(true);
    };

    const onCartItemChange = (e, item) => {
        if (e.target.checked === true) {
            addToCartFunc(parseInt(e.target.value, 10));
            const updatedCheckedItems = {
                ...packageCheckbox,
                [item.id]: e.target.checked,
            };
            setPackageCheckbox(updatedCheckedItems);
        } else {
            removeToCartFunc(item?.package_id, true);
            const updatedCheckedItems = {
                ...packageCheckbox,
                [item.id]: e.target.checked,
            };
            setPackageCheckbox(updatedCheckedItems);
        }
    };

    async function checkboxChanged(e, item) {
        if (e.target.checked === false) {
            try {
                await removeToCartFunc(item?.package_id, true);
                const updatedCheckedItems = {
                    ...packageCheckbox,
                    [item.package_id]: false,
                };
                setPackageCheckbox(updatedCheckedItems);
            } catch (error) { }
        } else {
            try {
                await addToCartFunc(item?.package_id);
                const updatedCheckedItems = {
                    ...packageCheckbox,
                    [item.package_id]: true,
                };
                setPackageCheckbox(updatedCheckedItems);
            } catch (error) { }
        }
    }

    useEffect(() => {
        if (myCart && Object.keys(myCart).length > 0) {
            if (myCart?.lab_cart?.length > 0) {
                const updatedState = Object.fromEntries(
                    Object.entries(packageCheckbox).map(([key, value]) => [key, false])
                );

                setPackageCheckbox(updatedState);
                myCart?.lab_cart?.forEach((item) => {
                    if (item?.package_id) {
                        setPackageCheckbox((prevState) => ({
                            ...prevState,
                            [item?.package_id]: true,
                        }));
                    }
                });
            } else {
                setPackageCheckbox({});
            }
        }
    }, [JSON.stringify(myCart)]);

    return (
        <>
            {LabsPackages?.length > 0
                ? LabsPackages?.map((item) => {
                    return (
                        <>
                            <Col
                                className={
                                    myCart?.lab_cart?.length > 0 ? "col-md-4" : "col-md-3"
                                }
                            >
                                <div
                                    key={item?.package?.id}
                                    className="checkbox_test packages_checkbox"
                                >
                                    <Form>
                                        <Form.Check type="checkbox">
                                            <Form.Check.Input
                                                onChange={(e) => checkboxChanged(e, item)}
                                                checked={packageCheckbox[item?.package_id] || false}
                                                type="checkbox"
                                                id={`checkbox-${item?.package_id}`}
                                                defaultChecked={packageCheckbox[item?.package_id]}
                                                name={item.id}
                                                value={item?.package?.id}
                                                isValid
                                            />
                                            <Form.Check.Label
                                                htmlFor={`checkbox-${item?.package_id}`}
                                            >
                                                <div className="pkg_bx">
                                                    <span className="label_checkbox">
                                                        <span className="circle01"></span>
                                                        {item?.package?.name}{" "}
                                                    </span>{" "}
                                                    <span className="price_checkbox">
                                                        {item?.package?.introduction ? (
                                                            <>
                                                                <Image
                                                                    onClick={(e) => handleModal(item, e)}
                                                                    src={info}
                                                                    width={16}
                                                                    height={16}
                                                                    className="img-fluid icon_checkbox"
                                                                ></Image>
                                                            </>
                                                        ) : null}
                                                        <i className="pr_ch">
                                                            PKR {item?.package?.formated_amount}{" "}
                                                        </i>
                                                    </span>
                                                </div>
                                                <p className="w-100 introductionlabPackage">
                                                    {item?.package?.introduction}
                                                </p>
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </Form>
                                </div>
                            </Col>
                            <SpecialInstructionsPackages
                                labsbyCities={labsbyCities}
                                myCart={myCart}
                                instructionsModalListner={instructionsModalListner}
                                addToCartFunc={addToCartFunc}
                                instructionsModal={instructionsModal}
                                setInstructionsModal={setInstructionsModal}
                                notes={modalData}
                            />
                        </>);
                })
                : null}
        </>
    );
};

export default Package;

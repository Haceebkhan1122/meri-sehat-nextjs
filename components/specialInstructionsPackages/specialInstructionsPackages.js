import React, { useState } from "react";
import { Button, Modal } from "antd";
import Accordion from 'react-bootstrap/Accordion';
import aghakhan from "../../public/png/aghakhan.png"
import Image from "next/image";


const specialInstructionsPackages = ({ myCartPackage, myCart, labsbyCities, instructionsModalListnerPackage, setInstructionsModalListnerPackage, instructionsModalListner, addToCartFunc, notes, instructionsModal, setInstructionsModal }) => {

  const addCartFunc = (notes) => {
    addToCartFunc(notes?.package_id)
  }


  return (
    <>
      {instructionsModal && instructionsModalListner || instructionsModalListnerPackage ? (
        <>
          <Modal
            className="specialInstructionsModal newSpecialInstruction"
            footer={null}
            centered
            open={instructionsModal || instructionsModalListnerPackage}
            onCancel={instructionsModalListnerPackage ? () => setInstructionsModalListnerPackage(false) : () => setInstructionsModal(false)}
            maskClosable={false} // Add this line
          >
            <div className="specialInstructionsPop NewSpecialInstructionsPop package">
              <div className="d-flex align-items-center">
                <div className="lab_img">
                  <Image className="" src={labsbyCities?.[0]?.image || myCart?.lab?.image} width={100} height={100} ></Image>
                </div>
                <h6 className="lab_name">{labsbyCities?.[0]?.lab_name || myCart?.lab?.lab_name}</h6>
              </div>
              <hr className="borderBelowInstructions"></hr>
              <p className="specialPopHeading text-capitalize text-center">{notes?.package?.name || myCartPackage?.name}</p>
              <div className="testInfo" >
                <p className=" " >This package includes the following tests</p>
                <hr className="borderBelowInstructions" />
                <Accordion>
                  {notes?.package?.lab_packages_bundle?.length > 0 ? notes?.package?.lab_packages_bundle?.map((item) => (
                    <>
                      <Accordion.Item eventKey={item?.lab_test?.[0]?.id}>
                        <Accordion.Header>{item?.lab_test?.[0]?.lab_test}</Accordion.Header>
                        <Accordion.Body>
                          <hr className="borderAccordian" />
                          {item?.lab_test?.[0]?.note}
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  )) : myCartPackage?.lab_packages_bundle?.length > 0 ? myCartPackage?.lab_packages_bundle?.map((item) => (
                    <>
                      <Accordion.Item eventKey={item?.lab_test?.[0]?.id}>
                        <Accordion.Header>{item?.lab_test?.[0]?.lab_test}</Accordion.Header>
                        <Accordion.Body>
                          <hr className="borderAccordian" />
                          {item?.lab_test?.[0]?.note}
                        </Accordion.Body>
                      </Accordion.Item>
                    </>
                  )) : null}


                </Accordion>
              </div>
              {!instructionsModalListnerPackage ? (
                <>
                  <div className="blueButton">
                    <button onClick={() => addCartFunc(notes)}>ADD TO CART</button>
                  </div>
                </>
              ) : null}
            </div>
          </Modal>
        </>
      ) : null
      }
    </>
  )
}

export default specialInstructionsPackages
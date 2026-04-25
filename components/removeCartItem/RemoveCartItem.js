import React, { useState } from 'react'
import { Button, Modal } from "antd";
import { Col, Row } from 'react-bootstrap';


export const RemoveCartItem = ({ removeModal, setRemoveModal, removeModalData, removeToCartFunc }) => {

  const goForRemove = (removeModalData) => {
    if (removeModalData?.lab_test_id) {
      removeToCartFunc(removeModalData?.lab_test_id)
    } else {
      removeToCartFunc(removeModalData?.package_id, true)
    }
  }

  return (
    <>
      {removeModal ? (
        <>
          <Modal
            className="removeCartModal"
            footer={null}
            centered
            open={removeModal}
            onCancel={() => setRemoveModal(false)}
          >
            <div className="removeCartPop">
              <h1 className='confirmTest'>Are you sure you want to remove this item from your cart?</h1>
              <div className='testDetailsCart'>
                <p className='testName' >
                  {removeModalData && removeModalData?.lab_test?.lab_test || removeModalData?.package?.name}
                </p>
                <p className='testRate' >Rs. {removeModalData && removeModalData?.lab_test?.price || removeModalData?.package?.amount}</p>
              </div>
              <div className='btnGroup mt-5 d-block'>
                <Row>
                  <Col md={6} >
                    <button className='noBtn' onClick={() => setRemoveModal(false)}>NO</button>
                  </Col>
                  <Col md={6} >
                    <button className='yesBtn' onClick={() => goForRemove(removeModalData)}>YES</button>
                  </Col>
                </Row>
              </div>
            </div>
          </Modal>
        </>
      ) : null}

    </>
  )
}

export default RemoveCartItem

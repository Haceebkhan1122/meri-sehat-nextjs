import React, { useState } from "react";
import { Button, Modal } from "antd";


const specialInstructions = ({ setInstructionsModalListnerLabs, instructionsModalListnerLabs, instructionsModalListner, addToCartFunc, notes, instructionsModal, setInstructionsModal }) => {

  const addCartFunc = (notes) => {
    addToCartFunc(notes?.id)
  }


  return (
    <>
      {instructionsModal && instructionsModalListner || instructionsModalListnerLabs ? (
        <>
          <Modal
            className="specialInstructionsModal newSpecialInstruction for_lab_test_modal"
            footer={null}
            centered
            open={instructionsModal || instructionsModalListnerLabs}
            onCancel={instructionsModalListnerLabs ? () => setInstructionsModalListnerLabs(false) : () => setInstructionsModal(false)}
            maskClosable={false} // Add this line
          >
            <div className="specialInstructionsPop NewSpecialInstructionsPop ">
              <p className="specialPopHeading text-capitalize" >{notes?.lab_test}  Test</p>
              <div className="testInfo" >
                <p>{notes?.note}</p>
              </div>

              {!instructionsModalListnerLabs ? (
                <>
                  <div onClick={() => addCartFunc(notes)} className="blueButton">
                    <button>ADD TO CART</button>
                  </div>
                </>
              ) : null}
            </div>
          </Modal>
        </>
      ) : null}

    </>
  )
}

export default specialInstructions
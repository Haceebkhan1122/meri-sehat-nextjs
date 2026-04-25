import React, { useState } from "react";
import { Button, Modal } from "antd";


const selectLab = () => {

  const [instructionsModal, setInstructionsModal] = useState(false)

  return (
    <div >
      <Button type="primary" onClick={() => setInstructionsModal(true)}>
        select Lab
      </Button>
      <Modal
        className="specialInstructionsModal"
        footer={null}
        // title="Location"
        centered
        open={instructionsModal}
        onCancel={() => setInstructionsModal(false)}
      >
        <div className="specialInstructionsPop">
          <p className="specialPopHeading" >Vitamin D Test</p>
          <div className="testInfo" >
            <p className="instructions">
              Avoid drinking or eating anything for 8-12 hours before the test. <br /> <br />
              You may drink only water. You should not eat 3 hours before the clinical blood test. <br /> <br />
              Eat less fatty and fried food, and avoid alcohol 1-2 days prior to the test.  <br /><br />
            </p>
          </div>
          <div className="blueButton">
            <button>
              ADD TO CART
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default selectLab
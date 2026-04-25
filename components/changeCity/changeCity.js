import { Modal } from "antd";
import Cookies from "js-cookie";




const changeCity = ({ myCart, switchCityFunc, setIsModalVisibleCityChange, isModalVisibleCityChange }) => {

  const removeAllItemFromCart = () => {
    let cartId = myCart?.id
    switchCityFunc(cartId)
  }

  return (
    <>
      {isModalVisibleCityChange ? (
        <Modal
          className="specialInstructionsModal newSpecialInstruction for_lab_test_modal changeCityMod"
          footer={null}
          centered
          open={isModalVisibleCityChange}
          onCancel={() => setIsModalVisibleCityChange(false)}
          maskClosable={false}
        // Add this line
        >
          <div className="specialInstructionsPop NewSpecialInstructionsPop pt-4">
            <p className="specialPopHeading" >Switching cities clears your cart <br /> and requires selecting a new lab. <br />Do you want to continue?</p>
            <div className="blueButton">
              <button onClick={removeAllItemFromCart}>PROCEED</button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  )
}

export default changeCity
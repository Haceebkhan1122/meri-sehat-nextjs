import { Modal } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";




const changeLab = ({ guestIDValue, switchCartFunc, emptyCartFunc, newSelectedValue, setIsModalVisible, isModalVisible, fetchSingleLabDetails }) => {
  const [isMobile, setIsMobile] = useState(false);
  const auth = Cookies.get('Authorization')

  useEffect(() => {
    import("react-device-detect").then((item) => {
      setIsMobile(item.isMobile);
    });
  }, []);

  const removeAllItemFromCart = () => {
    let id = Cookies.get("labId")

    if (!isMobile) {
      fetchSingleLabDetails(newSelectedValue)
      emptyCartFunc()
      if (!auth && guestIDValue) {
        switchCartFunc(newSelectedValue, guestIDValue);
      } else {
        switchCartFunc(newSelectedValue)
      }
    } else {
      fetchSingleLabDetails(id)
      emptyCartFunc()
      if (!auth && guestIDValue) {
        switchCartFunc(id, guestIDValue);
      } else {
        switchCartFunc(id)
      }
    }

  }

  return (
    <>
      {isModalVisible ? (
        <Modal
          className="specialInstructionsModal newSpecialInstruction for_lab_test_modal"
          footer={null}
          centered
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          maskClosable={false} // Add this line
        >
          <div className="specialInstructionsPop NewSpecialInstructionsPop pt-4">
            <p className="specialPopHeading" >Changing Lab will remove items from your cart. <br />Do you want to continue?</p>
            <div className="blueButton">
              <button onClick={removeAllItemFromCart}>PROCEED</button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  )
}

export default changeLab
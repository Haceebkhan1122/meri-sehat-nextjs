import React from "react";
import { Button, Modal } from "antd";
import Accordion from 'react-bootstrap/Accordion';
import Image from "next/image";
import { addToCart } from "@/utils/endpoints";
import Cookies from "js-cookie";
import API from "@/utils/httpService";
import swal from 'sweetalert';
import { fetchCart } from '@/store/myCartSlice';
import { useDispatch } from "react-redux";


const LabPackagesModal = ({ getCartIdData, notes, instructionsModalPackage, setInstructionsModalPackage }) => {
  const dispatch = useDispatch();

  const addToCartLabPackage = async (id) => {
    const guestID = Cookies.get('guestId')
    const auth = Cookies.get('Authorization')
    try {
      let data;
      data = {
        userId: getCartIdData?.user_id,
        cart_id: getCartIdData?.id,
        package_id: id,
      };

      if (!auth) {
        data.guest_id = guestID;
      }
      const response = await API.post(`${addToCart}`, data);
      if (response?.code === 200) {
        setInstructionsModalPackage(false)
        dispatch(fetchCart());
      } else {
        swal("", `${response?.message}`, "error");
      }
    } catch (e) {
    }
  }

  const addCartFunc = (notes) => {
    addToCartLabPackage(notes?.lab_package?.[0]?.package_id)
  }

  return (
    <>
      {instructionsModalPackage ? (
        <>
          <Modal
            className="specialInstructionsModal newSpecialInstruction"
            footer={null}
            centered
            open={instructionsModalPackage}
            onCancel={() => setInstructionsModalPackage(false)} // Use a function here
            maskClosable={false}
          >
            <div className="specialInstructionsPop NewSpecialInstructionsPop package">
              <div className="d-flex align-items-center">
                <div className="lab_img">
                  <Image className="" src={notes?.lab_package?.[0]?.lab?.image} width={40} height={40} ></Image>
                </div>
                <h6 className="lab_name">{notes?.lab_package?.[0]?.lab?.lab_name}</h6>
              </div>
              <hr className="borderBelowInstructions"></hr>
              <p className="specialPopHeading text-capitalize text-center">{notes?.name}</p>
              <div className="testInfo" >
                <p className=" " >This package includes the following tests</p>
                <hr className="borderBelowInstructions" />
                <Accordion>
                  {notes?.lab_package?.[0]?.package?.lab_packages_bundle?.length > 0 ? notes?.lab_package?.[0]?.package?.lab_packages_bundle?.map((item) => (
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
              <div className="blueButton">
                <button onClick={() => addCartFunc(notes)}>ADD TO CART</button>
              </div>
            </div>
          </Modal>
        </>
      ) : null
      }
    </>
  )
}

export default LabPackagesModal
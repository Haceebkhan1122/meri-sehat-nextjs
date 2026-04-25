
import React, { useState } from 'react';
import Image from "next/image";
import info from "../../public/svg/info.svg"
import close from "../../public/svg/close.svg"
import RemoveCartItem from "../../components/removeCartItem/RemoveCartItem";
import SpecialInstructions from '../../components/specialInstructions/specialInstructions'
import SpecialInstructionsPackages from '../../components/specialInstructionsPackages/specialInstructionsPackages'

const CartItem = ({ setRemoveModal, removeModal, myCart, removeToCartFunc }) => {
    const [removeModalData, setRemoveModalData] = useState({})
    const [modalData, setModalData] = useState({})
    const [instructionsModalListnerLabs, setInstructionsModalListnerLabs] = useState(false)
    const [instructionsModalListnerPackage, setInstructionsModalListnerPackage] = useState(false)

    const handleRemoveItem = (cart) => {
        setRemoveModalData(cart)
        setRemoveModal(true)
    }

    const handleModal = (cart, e) => {
        e.preventDefault();
        setModalData(cart)
        if (cart?.lab_test) {
            setInstructionsModalListnerLabs(true)
        }
        else {
            setInstructionsModalListnerPackage(true)
        }
    }

    return (
        <>
            {myCart?.lab_cart?.length > 0 ? myCart?.lab_cart?.map((cart) => (
                <>
                    <div className='d-flex cart_box mb-2' id={cart?.id} key={cart?.id}>
                        <div className='d-flex  align-items-center'>
                            {cart?.lab_test?.note || cart?.package?.introduction ? (
                                <>
                                    <Image style={{ cursor: 'pointer' }} onClick={(e) => handleModal(cart, e)} src={info} width={16} height={16} className='img-fluid icon_checkbox'></Image>
                                </>
                            ) : null}
                            <p>{cart?.package?.name || cart?.lab_test?.lab_test}</p></div>
                        <div className='d-flex  align-items-center' style={{ cursor: 'pointer' }}><h6>PKR {cart?.package !== null ? cart?.package?.formated_amount : cart?.lab_test?.formated_price} </h6> <Image onClick={() => handleRemoveItem(cart)} src={close} className='img-fluid '></Image></div>
                    </div>
                    <RemoveCartItem removeToCartFunc={removeToCartFunc} removeModal={removeModal} setRemoveModal={setRemoveModal} removeModalData={removeModalData} />
                    <SpecialInstructions
                        instructionsModalListnerLabs={instructionsModalListnerLabs}
                        setInstructionsModalListnerLabs={setInstructionsModalListnerLabs}
                        notes={modalData?.lab_test} />

                    <SpecialInstructionsPackages
                        myCart={myCart}
                        myCartPackage={cart?.package}
                        setInstructionsModalListnerPackage={setInstructionsModalListnerPackage}
                        instructionsModalListnerPackage={instructionsModalListnerPackage}
                        notes={modalData} />
                </>
            )) : null}
        </>
    )
}


export default CartItem
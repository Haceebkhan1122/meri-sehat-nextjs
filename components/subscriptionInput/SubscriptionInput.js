import React, { useState } from 'react';
import { Form, Input } from 'antd';
// import './subscriptionInput.css';
// import { postNewsLetter } from '../../api/LayoutAPI';
// import i18n from '../../i18n';
import { SuccessModal } from '../successModal';
import arrowRight from '../../public/svg/arrow-right-white.svg'
import Image from 'next/image';


function SubscriptionInput() {
    const [emailForm] = Form.useForm();

    const [loading, setLoading] = React.useState(false);
    const [isSneakBar2, setIsSneakBar2] = useState(false);
    const [validate, setValidate] = useState(true);

    const onEmail = async (v) => {
        try {
            // setLoading(true);
            // let res = await postNewsLetter(v);
            // if (res.code === 200) {
            //     ////console.log(res);
            //     emailForm.resetFields();
            //     showModal()
            //     setTimeout(() => {
            //         closeModal()
            //     }, 3000);
            //     setLoading(false);
            // }
        } catch (error) {
            ////console.log(error);
            // setLoading(false);
        }
    };
    const showModal = () => {
        setIsSneakBar2(true);
    };
    const closeModal = () => {
        setIsSneakBar2(false);
    };

    return (
        <div dir='auto' className="subscription_box">
            <Form form={emailForm} onFinish={onEmail}>
                <div className={`_email_input ${loading ? '_disable' : ''}`}>
                    <Form.Item
                        rules={[
                            { type: 'email', message: i18n.t('email_invalid') },
                            {
                                required: true,
                                message: i18n.t('field_required')
                            }
                        ]}
                        validateTrigger={validate ? "onBlur" : "onChange"}
                        className="email_input_wrapper"
                        name="email"
                    >
                        <Input placeholder={i18n.t('email_address')} onBlur={() => setValidate(false)} />
                    </Form.Item>
                    <button disabled={loading}>
                        <Image src={arrowRight} alt="arrow" />
                    </button>
                </div>
            </Form>
            <SuccessModal show={isSneakBar2} close={setIsSneakBar2} />
        </div>
    );
}

export default SubscriptionInput;

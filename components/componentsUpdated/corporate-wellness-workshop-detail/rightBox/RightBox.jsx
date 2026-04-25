import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import FormWorkshop from './formWorkshop/FormWorkshop'
import TrustBox from './formWorkshop/trustBox/TrustBox'

export default function RightBox({ setModalForm, modalForm, handleSubmit, setFormsubmitSuccsess, formsubmitSuccsess, workshop, name, setName, company, setCompany, email, setEmail, phone, setPhone }) {

    useEffect(() => {
        if (!modalForm) {
            setName("")
            setCompany("")
            setEmail("")
            setPhone("")
        }
    }, [modalForm])

    return (
        <>
            <div className='d-lg-block d-none'>
                <FormWorkshop setFormsubmitSuccsess={setFormsubmitSuccsess} formsubmitSuccsess={formsubmitSuccsess} handleSubmit={handleSubmit} name={name} setName={setName} company={company} setCompany={setCompany} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} /></div>
            <TrustBox workshop={workshop} />
            <div className='d-lg-none d-block'>
                <div className='btnMob'>
                    <button onClick={() => setModalForm(true)}>GET A FREE CONSULTATION</button>
                </div>
            </div>
            <Modal
                centered
                open={modalForm}
                onOk={() => setModalForm(false)}
                onCancel={() => setModalForm(false)}
                className={`modalForm01`}
            >
                <div className='modalForm'>
                    <FormWorkshop setFormsubmitSuccsess={setFormsubmitSuccsess} formsubmitSuccsess={formsubmitSuccsess} handleSubmit={handleSubmit} name={name} setName={setName} company={company} setCompany={setCompany} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} />
                </div>
            </Modal>
        </>
    )
}

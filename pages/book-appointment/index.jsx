import React, { useState, useEffect } from 'react'
import BookAnAppointment from '../../components/componentsUpdated/bookAnAppointment/BookAnAppointment';
import Cookies from 'js-cookie';
import { wrapper } from "@/store/store";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from 'next/head';

const BookAppointmentPage = () => {
    const [clinicInfo, setClinicInfo] = useState(null);
    const [doctorId, setDoctorId] = useState(null);
    const [dashboardKey, setDashboardKey] = useState(null);

    useEffect(() => {
        const clinicData = Cookies.get('clinic_info');
        if (clinicData) {
            setClinicInfo(JSON.parse(clinicData));
        }
    }, []);

    useEffect(() => {
        let getDocId = Cookies.get('clinic_info') !== undefined && JSON.parse(Cookies.get('clinic_info'));
        setDoctorId(getDocId?.doctorId);
        setDashboardKey(getDocId?.fromDashboard);
        if (clinicInfo) {
            Cookies.set('clinic_info', JSON.stringify({
                clinicsInfoId: clinicInfo?.doctor_clinic_id || clinicInfo?.clinicsInfoId,
                doctorId: doctorId,
                fromDashboard: getDocId?.fromDashboard
            }));
        }
    }, [clinicInfo]);

    return (
        <>
            <Head>
                <title>Book Appointment</title>
            </Head>
            <main className='bookAppointmentPage'>
                <BookAnAppointment setDashboardKey={setDashboardKey} dashboardKey={dashboardKey} clinicInfo={clinicInfo} setClinicInfo={setClinicInfo} doctorId={doctorId} />
            </main>
        </>

    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ locale }) => {
            return {
                props: {
                    ...(await serverSideTranslations(locale, ["common"])),
                },
            };
        }
);

export default BookAppointmentPage;

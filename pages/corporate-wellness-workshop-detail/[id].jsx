import React, { useEffect, useState } from 'react'
import styles from "./corporate-wellness-workshop-detail.module.scss"
import { Container, Row, Col } from "react-bootstrap";
import LeftBox from '../../components/componentsUpdated/corporate-wellness-workshop-detail/leftBox/LeftBox';
import RightBox from '../../components/componentsUpdated/corporate-wellness-workshop-detail/rightBox/RightBox';
import { APIV3 } from "@/utils/httpService";
import { cwpWorkshopListingDetail, cwpWorkshopForm } from "../../utils/endpoints";
import SliderFooter from '../../components/componentsUpdated/doctorNow/sliderFooter/SliderFooter'
import { useDispatch, useSelector } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { addTranslation } from "@/store/translationSlice";
import swal from 'sweetalert';
import { useRouter } from 'next/router';

export default function index(props) {
    const { _nextI18Next } = props;
    let i18nDataTwo = useSelector((state) => state.translation.i18n);
    const dispatch = useDispatch();
    const initialLocale = _nextI18Next?.initialLocale;
    const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;
    const [i18nData, setI18nData] = useState(null);
    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [formsubmitSuccsess, setFormsubmitSuccsess] = useState(false);
    const [modalForm, setModalForm] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setI18nData(i18nDataTwo);
        }
    }, [i18nDataTwo]);

    useEffect(() => {
        if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
            dispatch(addTranslation(i18n));
        }
    }, [i18n]);


    // call form api 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (name == "") {
                swal('Error!', "Name is required", 'error');
            }
            else if (company == "") {
                swal('Error!', "Company is required", 'error');
            }
            else if (email == "") {
                swal('Error!', "Email is required", 'error');
            }
            else if (!phone || phone.trim() === "") {
                swal('Error!', "Phone is required", 'error');
            } else if (!/^(03|92)\d{9}$/.test(phone)) {
                swal('Error!', "Invalid format", 'error');
            }
            else {
                const payload = {
                    name: name,
                    phone: phone,
                    company_name: company,
                    company_email: email
                }
                const response = await APIV3.post(cwpWorkshopForm, payload)
                if (response?.status == 200) {
                    setModalForm(false)
                    setFormsubmitSuccsess(true)
                    setModalForm(false)
                    setName("")
                    setCompany("")
                    setEmail("")
                    setPhone("")

                }
            }
        } catch (error) {
            swal('Error!', error?.data?.message, 'error');
        }
    }


    const router = useRouter();

    const handleGoBack = () => {
        router.back(); // Go to the previous page
    };
    return (
        <>
            <div className='wellnessWorkshoDetail'>
                <section className={`${styles.mainListingSec}  `}>
                    <div className={`${styles.boxmobilehead} d-flex align-items-center d-lg-none bg-white`}>
                        <Container>
                            <Row>
                                <Col lg={12}>
                                    <div className={`${styles.backBtn} ps-3`}>
                                        <p onClick={handleGoBack} >

                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24" fill="none">
                                                <g clip-path="url(#clip0_8672_36684)">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.9283 11H10.2348L16.9794 5.4L15.2932 4L5.6582 12L15.2932 20L16.9794 18.6L10.2348 13H24.9283V11Z" fill="#0F345A" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_8672_36684">
                                                        <rect width="28.9051" height="24" fill="white" transform="translate(0.839844)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                            Workshops</p>
                                    </div></Col>
                            </Row>
                        </Container>

                    </div>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className={`${styles.backBtn} d-lg-block d-none`}>
                                    <p onClick={handleGoBack}>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24" fill="none">
                                            <g clip-path="url(#clip0_8672_36684)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M24.9283 11H10.2348L16.9794 5.4L15.2932 4L5.6582 12L15.2932 20L16.9794 18.6L10.2348 13H24.9283V11Z" fill="#0F345A" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_8672_36684">
                                                    <rect width="28.9051" height="24" fill="white" transform="translate(0.839844)" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        Workshops</p>
                                </div>
                            </Col>
                            <Col lg={7}>
                                <LeftBox workshop={props?.workShopDetail} />
                            </Col>
                            <Col lg={5}>
                                <RightBox modalForm={modalForm} setModalForm={setModalForm} setFormsubmitSuccsess={setFormsubmitSuccsess} formsubmitSuccsess={formsubmitSuccsess} handleSubmit={handleSubmit} name={name} setName={setName} company={company} setCompany={setCompany} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} workshop={props?.workShopDetail} />
                            </Col>



                        </Row>
                    </Container>
                </section>
                <section className={`bg-white cwp_workshop`}>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <SliderFooter sliderData={props?.workShopDetail} />
                            </Col>
                        </Row>
                    </Container>

                </section>

            </div>


        </>
    )
}


export async function getServerSideProps(context) {
    const { locale } = context;
    const langChecker = context.req.cookies?.lang;
    const apiLocale = locale === "ur" || langChecker === "2" ? 2 : 1;
    const { id } = context.query;

    const workshopDetail = `${cwpWorkshopListingDetail}${id}`;

    try {
        const workshopDetailPage = await APIV3.get(workshopDetail, {
            headers: {
                platform: "web",
                locale: apiLocale,
            },
        });

        if (workshopDetailPage?.status === 200 && workshopDetailPage?.data) {

            return {
                props: {
                    workShopDetail: workshopDetailPage?.data?.data,
                    ...(await serverSideTranslations(locale, ["common"])),
                },
            };
        } else {
            return { props: { workShopDetail: [] } };
        }
    } catch (error) {
        return { props: { workShopDetail: [] } };
    }
}

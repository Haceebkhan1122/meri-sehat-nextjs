import React, { useState, useMemo } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import styles from "./book-a-nurse.module.scss"
import Link from 'next/link';
import { APIV3 } from "@/utils/httpService";
import { bookANursingForm } from '@/utils/endpoints';
import swal from 'sweetalert';
import HeaderOnlyLogo from '../../components/headerOnlyLogo/HeaderOnlyLogo';
import SuccessModal from '../../components/componentsUpdated/succsessModal/SuccessModal';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';


const index = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const [formsubmitSuccsess, setFormsubmitSuccsess] = useState(false);
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width:767px)');

    // calling API to book a nurse
    const onSubmit = async (data) => {
        try {
            const payload = {
                phone: `0${data.phoneNumber}`,
                age: data.age,
                name: data.fullName,
                address: data.address,
                service: router.query.service,
            }
            const response = await APIV3.post(bookANursingForm, payload);
            if (response?.status == 200) {
                setFormsubmitSuccsess(true);
                reset();
            } else {
                swal("Error!", response?.data?.message, "error");
            }
        } catch (error) {
            console.log(error, "error")
        }
    };

    // create Age array from 0 to 100 number
    const ageOptions = Array.from({ length: 101 }, (_, i) => ({
        id: i,
        title: i.toString(),
    }));

    const transformedText = useMemo(() => {
        if (router.query.service) {
            return router.query.service
                .replace(/_/g, ' ') // Replace underscores with spaces
                .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
        }
        return ''; // Fallback value
    }, [router.query.service]); // Recalculate only when `router.query.service` changes

    return (
        <>
            <Head>
                <title>{transformedText}</title>
            </Head>
            <HeaderOnlyLogo />
            <div className={styles.wrapper}>

                <Container>
                    <Row>
                        <Col md={10} className="mx-auto">
                            <div className={`${styles.backBtn} d-lg-block d-none`}>
                                <Link href="/nursing">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                        <g clip-path="url(#clip0_11256_543)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 11H8.3L13.9 5.4L12.5 4L4.5 12L12.5 20L13.9 18.6L8.3 13H20.5V11Z" fill="#0F345A" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_11256_543">
                                                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Book a Nurse
                                    {/* {isMobile ? "Book a Nurse" : transformedText} */}


                                </Link>
                            </div>
                        </Col>
                        <Col md={12}>
                            <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
                                <h3>Contact Details</h3>
                                <div>
                                    <label>Full Name*</label>
                                    <input
                                        type="text"
                                        {...register("fullName", {
                                            required: "Full Name is required",
                                            maxLength: {
                                                value: 30,
                                                message: "Full Name cannot exceed 30 characters",
                                            },
                                            pattern: {
                                                value: /^[A-Za-z\s]+$/i,
                                                message: "Only alphabets are allowed",
                                            },
                                        })}
                                        maxLength={30}
                                        placeholder="Enter your full name"
                                        onInput={(e) => e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '')} // Prevents non-alphabet input
                                    />
                                    {errors.fullName && <p>* {errors.fullName.message}</p>}
                                </div>
                                <div>
                                    <label >Phone Number*</label>
                                    <div>
                                        <div className={styles.phoneNumber}>
                                            <span>+92</span>
                                            <input
                                                type="tel"
                                                {...register("phoneNumber", {
                                                    required: "Phone Number is required",
                                                    maxLength: { value: 10, message: "Maximum 10 digits allowed" },
                                                    pattern: {
                                                        value: /^3[0-9]{9}$/,
                                                        message: "Phone number must start with 3 and be 10 digits long"
                                                    }
                                                })}
                                                placeholder="Enter  your number"
                                                maxLength={10} // Restrict input length
                                                onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')} // Allow only numbers
                                            />
                                        </div>
                                    </div>
                                    {errors.phoneNumber && <p>* Enter phone number</p>}
                                </div>
                                <div>
                                    <label>Age of Patient*</label>
                                    <select {...register("age", { required: "Please select an age" })}>
                                        <option value="">Select Age</option>
                                        {ageOptions.map((age) => (
                                            <option key={age.id} value={age.id}>
                                                {age.title}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.age && <p>* Select age of patient</p>}
                                </div>
                                <div>
                                    <label>Address*</label>
                                    <input
                                        maxLength={50}
                                        type="text"
                                        {...register("address", { required: "Address is required", maxLength: 30 })}
                                        placeholder="Enter address"
                                    />
                                    {errors.address && <p>*Enter complete address</p>}
                                </div>
                                <div className={`${styles.mobileBtn}`}>
                                    <button type="submit" className={styles.proceedButton}>
                                        PROCEED
                                    </button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Container>
                <SuccessModal setFormsubmitSuccsess={setFormsubmitSuccsess} formsubmitSuccsess={formsubmitSuccsess} />
            </div>
        </>

    )
}

export default index
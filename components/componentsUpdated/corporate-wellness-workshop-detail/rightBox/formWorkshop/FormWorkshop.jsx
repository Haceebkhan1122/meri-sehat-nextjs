import React, { useState } from 'react';
import styles from "./formWorkshop.module.scss"
import SuccsessModal from '../../../succsessModal/SuccessModal';

export default function FormWorkshop({ formsubmitSuccsess, setFormsubmitSuccsess, name, setName, company, setCompany, email, setEmail, phone, setPhone, handleSubmit }) {

    const handlePhoneChange = (e) => {
        const input = e.target.value;
        // Allow only numeric characters
        if (/^\d*$/.test(input)) {
            // Check if the length is less than or equal to 11
            if (input.length <= 11) {
                // Allow typing freely but validate once the input reaches at least 2 digits (start with 03 or 92)
                if (input.length >= 2 && !(input.startsWith("03"))) {
                    return; // Don't update the phone if it doesn't start with "03" or "92"
                }
                setPhone(input);
            }
        }
    };

    return (
        <>
            <div className={`${styles.formBox1} boxFormMob`}>
                <h2>Speak to our experts</h2>
                <p>Get a free consultation</p>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={`${styles.formBoxItem} form-group`}>
                        <div className={`${styles.formIcon}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g clip-path="url(#clip0_8672_36648)">
                                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#97A9BD" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_8672_36648">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <input className='form-control'
                            type="text"
                            name="name"
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={30}
                        />
                    </div>
                    <div className={`${styles.formBoxItem} form-group`}>
                        <div className={`${styles.formIcon}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M4 21C3.45 21 2.97917 20.8042 2.5875 20.4125C2.19583 20.0208 2 19.55 2 19V8C2 7.45 2.19583 6.97917 2.5875 6.5875C2.97917 6.19583 3.45 6 4 6H8V4C8 3.45 8.19583 2.97917 8.5875 2.5875C8.97917 2.19583 9.45 2 10 2H14C14.55 2 15.0208 2.19583 15.4125 2.5875C15.8042 2.97917 16 3.45 16 4V6H20C20.55 6 21.0208 6.19583 21.4125 6.5875C21.8042 6.97917 22 7.45 22 8V19C22 19.55 21.8042 20.0208 21.4125 20.4125C21.0208 20.8042 20.55 21 20 21H4ZM4 19H20V8H4V19ZM10 6H14V4H10V6Z" fill="#97A9BD" />
                            </svg>
                        </div>
                        <input className='form-control'
                            type="text"
                            name="Company"
                            placeholder='Company'
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            maxLength={30}
                        />
                    </div>

                    <div className={`${styles.formBoxItem} form-group`}>
                        <div className={`${styles.formIcon}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g clip-path="url(#clip0_8672_36659)">
                                    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z" fill="#97A9BD" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_8672_36659">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <input className='form-control'
                            type="email"
                            name="Email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength={30}
                        />
                    </div>

                    <div className={`${styles.formBoxItem} form-group`}>
                        <div className={`${styles.formIcon}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21.1409 21.9315C19.0276 21.9315 16.9397 21.4708 14.8771 20.5495C12.8146 19.6281 10.938 18.3221 9.24736 16.6314C7.55674 14.9408 6.25073 13.0642 5.32935 11.0017C4.40796 8.93913 3.94727 6.85122 3.94727 4.73794C3.94727 4.43363 4.0487 4.18004 4.25158 3.97716C4.45445 3.77429 4.70804 3.67285 5.01236 3.67285H9.12056C9.35725 3.67285 9.56857 3.75316 9.75454 3.91376C9.94051 4.07437 10.0504 4.26457 10.0842 4.48435L10.7436 8.03465C10.7774 8.30515 10.7689 8.53338 10.7182 8.71935C10.6675 8.90532 10.5745 9.06593 10.4392 9.20118L7.97939 11.6864C8.31752 12.3119 8.71904 12.9163 9.18396 13.4996C9.64888 14.0828 10.1603 14.645 10.7182 15.186C11.2423 15.7101 11.7917 16.1961 12.3665 16.6441C12.9414 17.0921 13.55 17.5021 14.1924 17.8741L16.5762 15.4903C16.7283 15.3381 16.927 15.224 17.1721 15.1479C17.4173 15.0718 17.6582 15.0507 17.8949 15.0845L21.3945 15.7946C21.6311 15.8622 21.8256 15.9848 21.9777 16.1623C22.1299 16.3398 22.2059 16.5385 22.2059 16.7582V20.8664C22.2059 21.1708 22.1045 21.4244 21.9016 21.6272C21.6988 21.8301 21.4452 21.9315 21.1409 21.9315ZM7.01574 9.75908L8.68945 8.08537L8.25834 5.70159H6.00137C6.0859 6.39475 6.20424 7.07945 6.3564 7.7557C6.50855 8.43194 6.72833 9.09974 7.01574 9.75908ZM16.0944 18.8377C16.7537 19.1251 17.4257 19.3533 18.1104 19.5224C18.7951 19.6915 19.4841 19.8014 20.1772 19.8521V17.6205L17.7934 17.1386L16.0944 18.8377Z" fill="#97A9BD" />
                            </svg>
                        </div>
                        <input
                            className="form-control"
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={handlePhoneChange}
                            pattern="^(03\d{9}|92\d{10})$"
                            maxLength="11"
                        />
                    </div>
                    <div className={`${styles.btnSubmit}`}>
                        <button type='submit'>SUBMIT</button>
                    </div>
                </form>
            </div>
            <SuccsessModal setFormsubmitSuccsess={setFormsubmitSuccsess} formsubmitSuccsess={formsubmitSuccsess} />
        </>
    )
}

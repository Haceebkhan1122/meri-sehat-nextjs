import React, { useState, useEffect } from 'react'
import { pharmacyEndpoint } from "@/utils/endpoints";
import API from "@/utils/httpService";
import Cookies from "js-cookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MetaDataCustom } from "@/components/metaDataCustom";
import fbarea from "../../public/png/fbarea.png";
import health1 from "../../public/png/health1.png";
import health2 from "../../public/png/health2.png";
import health3 from "../../public/png/health3.png";
import health4 from "../../public/png/health4.png";
import health5 from "../../public/png/health5.png";
import health6 from "../../public/png/health6.png";
import health7 from "../../public/png/health7.png";
import health8 from "../../public/png/health8.png";
import healthb1 from "../../public/png/healthb1.png";
import healthb2 from "../../public/png/healthb2.png";
import healthb3 from "../../public/png/healthb3.png";
import healthb4 from "../../public/png/healthb4.png";
import labsyra from "../../public/png/labsyra.png";
import labs_location_banner from "../../public/png/labs_location_banner.png";
import locarrow from "../../public/png/locarrow.png";
import logobanner from "../../public/png/logobanner.png";
import mehmoodabad from "../../public/png/mehmoodabad.png";
import modelcolony from "../../public/png/modelcolony.png";
import phncio from "../../public/png/phncio.png";
import Shadow from "../../public/png/Shadow.png";
import Image from 'next/image';
import Head from 'next/head';

const index = (props) => {
    const [loadMoreClicked, setLoadMoreClicked] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const columnsToHide = document.querySelectorAll(".load-more-column");

            columnsToHide.forEach((col) => {
                col.style.display = "none";
            });
        }
    }, [])

    function loadMoreHandler() {
        const columnsToShow = document.querySelectorAll(".load-more-column");
        setLoadMoreClicked(true);

        document.documentElement.style.setProperty('--animate-duration', '.5s');

        columnsToShow.forEach((col) => {
            col.style.display = "block";
            col.classList.add("animate__animated", "animate__bounce", "animate__repeat-2");
        });

        setTimeout(() => {
            columnsToShow?.[0].classList.add("transform-20");
        }, 100);

    }

    return (
        <>
            <MetaDataCustom metaData={props?.pageData} />
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
                />
            </Head>
            <div id="Main_Page_Wrapper" className='health_care_page'>
                <div id="Page_Wrapper">
                    <div className="page_container">
                        <div className="container-xxl">
                            <div className="banner_labs">
                                <div className="ls_inside_container d-flex align-items-center justify-content-between flex-column flex-sm-row ">
                                    <div className="content_banner">
                                        <div className="logo_inside_banner">
                                            <Image src={logobanner} width={340} className="img-fluid" />

                                        </div>
                                        <div className="banner_highlight">
                                            <div className="banner_offer"><span className="text_banners"><strong>40% OFF</strong> on all health packages!</span></div>
                                        </div>
                                    </div>
                                    <div className="image_banner">
                                        <Image src={labs_location_banner} width={580} className="img-fluid" />
                                        <Image src={labsyra} width={406} className="img-fluid post_top" />
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div id="page_content_wrapper">
                            <div className="page_content_container">
                                <div className="container-xxl">
                                    <section id="Locations_Wrapper" className="py-4 mt-4 py-sm-5 mt-sm-5">
                                        <div className="locations_container">
                                            <div className="locationsx_container">
                                                <div className="sections_heading_block ">
                                                    <div className="section_heading_primary"><h2>Our Clinics - Now Open in Karachi</h2></div>
                                                    <div className="border_section_heading"></div>
                                                    <p className="para_location">Introducing our all-in-one healthcare hub! Beyond our digital platform, experience a modern on-site clinic, advanced laboratory, and innovative pharmacy. Dive into tailored holistic lab packages for a personalized health assessment.</p>
                                                    <div className="subheading_locations">
                                                        <h2>Now open at:</h2>
                                                    </div>
                                                </div>

                                                <div className="container cards_locationsx_container  pt-3 mt-0 ">
                                                    <div className="row justify-content-around mb-4">
                                                        <div className="col-md-4 mb-sm-4 mb-3 pb-4 pb-sm-0 ">
                                                            <div className="card locations-card h-100 p-3">
                                                                <div className="locations_image ">
                                                                    <Image src={mehmoodabad} width={294} height={162} className="mb-2 w-100 hk_loc" alt="Image 1" />
                                                                    <a href="https://bit.ly/45yHWSk">
                                                                        <Image src={locarrow} className="stillloca" width={38} />
                                                                    </a>

                                                                </div>
                                                                <div className="card-body locations_contents">
                                                                    <a href="https://bit.ly/45yHWSk">
                                                                        <h2 className="card-title locations_headings mb-4">Mehmoodabad</h2>
                                                                    </a>
                                                                    <h4 className="locations_subheading mb-3">MAC-II, Ground Floor, <br />
                                                                        Plot No. 1211, Mehmoodabad, <br />Karachi
                                                                    </h4>
                                                                    <div className="location_numbers mb-5 mt-2">
                                                                        <Image src={phncio} width={18} />
                                                                        <span className="nimes">021-35890599</span>
                                                                    </div>

                                                                    <div className="location_buttons">
                                                                        <a href="https://bit.ly/45yHWSk">View Map</a>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 mb-sm-4 mb-3 pb-4 pb-sm-0">
                                                            <div className="card locations-card h-100 p-3">
                                                                <div className="locations_image ">
                                                                    <Image src={fbarea} width={294} height={162} className="mb-2 w-100 hk_loc" alt="Image 2" />
                                                                    <a href="https://bit.ly/3S0vWG4">
                                                                        <Image src={locarrow} width={38} className="stillloca" />
                                                                    </a>

                                                                </div>
                                                                <div className="card-body locations_contents">
                                                                    <a href="https://bit.ly/3S0vWG4">
                                                                        <h2 className="card-title locations_headings mb-4">FB Area</h2>
                                                                    </a>
                                                                    <h4 className="locations_subheading mb-3">AL Rehman Residency, Shop no 1, <br />
                                                                        Plot No. C-4, Block 4, Federal B Area,<br /> KDA Scheme, Number 16, Karachi.</h4>
                                                                    <div className="location_numbers mb-5 mt-2">
                                                                        <Image src={phncio} width={18} />
                                                                        <span className="nimes">021-36346610</span>
                                                                    </div>
                                                                    <div className="location_buttons">
                                                                        <a href="https://bit.ly/3S0vWG4">View Map</a>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 mb-sm-4 mb-0 pb-0 pb-sm-0">
                                                            <div className="card locations-card h-100 p-3">
                                                                <div className="locations_image ">

                                                                    <Image src={modelcolony} width={294} height={162} className="mb-2 w-100 hk_loc" alt="Image 3" />
                                                                    <a href="https://bit.ly/3Ql33mY">
                                                                        <Image src={locarrow} width={38} className="stillloca" />
                                                                    </a>

                                                                </div>
                                                                <div className="card-body locations_contents">
                                                                    <a href="https://bit.ly/3Ql33mY">
                                                                        <h2 className="card-title locations_headings mb-4">Model Colony</h2>
                                                                    </a>
                                                                    <h4 className="locations_subheading mb-3">Shop # 3-4/1-A, Deh Mehran,<br /> Tappo Malir, Street # 14, Model Colony,<br /> Karachi</h4>
                                                                    <div className="location_numbers mb-5 mt-2">
                                                                        <Image src={phncio} width={18} />
                                                                        <span className="nimes">021-34112020</span>
                                                                    </div>
                                                                    <div className="location_buttons">
                                                                        <a href="https://bit.ly/3Ql33mY">View Map</a>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>


                                                </div>

                                            </div>

                                        </div>
                                    </section>

                                </div>

                                <div className="container-fluid bg_location_docs ">
                                    <div className="container">
                                        <section id="Locations_Wrapper" className="py-4 py-sm-5">
                                            <div className="locations_container">
                                                <div className="locationsx_container">
                                                    <div className="sections_heading_block ">
                                                        <div className="section_heading_primary d-flex gap-3 align-items-center"><h2>Our Discounted Labs Packages</h2> <div className="off_in_heading"><h3 className="off_in_heading_style">40% OFF</h3></div></div>
                                                        <div className="border_section_heading"></div>


                                                        {/* <!-- <div className="view_all sections_view_all_cta">
                                        <div className="cta_section_button"><span><Image src="assets/img/headingsicon.svg"></span><a href="#">View All</a></div>
                        
                                        </div> --> */}
                                                    </div>
                                                    <div className="cards_aisec_container py-5 mt-sm-4 mt-0 pb-0 ">
                                                        <div className="row justify-content-between mb-0 mb-sm-4 ">
                                                            <div className="col-md-3 col-12 mb-sm-4 mb-2 pb-4 pb-sm-4 px-2">
                                                                <div className="card ai-card h-100 p-3">
                                                                    <div className="imgbck colors3">
                                                                        <div className="off_in_heading inside_image_disc"><h3 className="off_in_heading_style">40% OFF</h3></div>
                                                                        <Image src={health1} width={250} height={258} className="" alt="Image 1" />

                                                                    </div>
                                                                    <div className="card-body aicard-content">
                                                                        <h2 className="card-title aicard-heading mb-2">Diabetes Profile</h2>
                                                                        <h3 className="price_was">WAS PKR <span>4,140</span></h3>
                                                                        <div className="price_main"><span>PKR</span>2,499</div>
                                                                        <h4 className="aicard-subtitle mb-2">
                                                                            <ul className="lab_bullets">
                                                                                <li>Glucose Fasting</li>
                                                                                <li>Urine for Glucose</li>
                                                                                <li>HBA1C</li>
                                                                                <li>Microalbumin</li>
                                                                            </ul>

                                                                        </h4>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3 col-12 mb-sm-4 mb-2 pb-4 pb-sm-4 px-2 ">
                                                                <div className="card ai-card h-100 p-3">
                                                                    <div className="imgbck colors4">
                                                                        <div className="off_in_heading inside_image_disc"><h3 className="off_in_heading_style">40% OFF</h3></div>
                                                                        <Image src={health2} width={226} height={258} className="" alt="Image 2" />

                                                                    </div>
                                                                    <div className="card-body aicard-content">
                                                                        <h2 className="card-title aicard-heading mb-2">Young Package</h2>
                                                                        <h3 className="price_was">WAS PKR <span>4,140</span></h3>
                                                                        <div className="price_main"><span>PKR</span>2,499</div>
                                                                        <h4 className="aicard-subtitle mb-2">
                                                                            <ul className="lab_bullets">
                                                                                <li>Glucose Fasting</li>
                                                                                <li>Urine for Glucose</li>
                                                                                <li>HBA1C</li>
                                                                                <li>Microalbumin</li>
                                                                            </ul>

                                                                        </h4>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3 col-12 mb-sm-4 mb-2 pb-4 pb-sm-4 px-2 load-more-column">
                                                                <div className="card ai-card h-100 p-3">
                                                                    <div className="imgbck colors2">
                                                                        <div className="off_in_heading inside_image_disc"><h3 className="off_in_heading_style">40% OFF</h3></div>
                                                                        <Image src={health3} width={212} height={258} className="" alt="Image 3" />

                                                                    </div>
                                                                    <div className="card-body aicard-content">
                                                                        <h2 className="card-title aicard-heading mb-2">Heart Profile</h2>
                                                                        <h3 className="price_was">WAS PKR <span>20,595</span></h3>
                                                                        <div className="price_main"><span>PKR</span>12,499</div>
                                                                        <h4 className="aicard-subtitle mb-2">
                                                                            <ul className="lab_bullets">
                                                                                <li>Lipid Profile</li>
                                                                                <li>Cardiac Risk Markers (Trop-I)</li>
                                                                                <li>CBC</li>
                                                                                <li>Electrolytes</li>
                                                                            </ul>

                                                                        </h4>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3 col-12 mb-sm-4 mb-2 pb-4 pb-sm-4 px-2 load-more-column">
                                                                <div className="card ai-card h-100 p-3"><div className="imgbck colors1">
                                                                    <div className="off_in_heading inside_image_disc"><h3 className="off_in_heading_style">40% OFF</h3></div>
                                                                    <Image width={225} src={health4} height={258} className="" alt="Image 3" />

                                                                </div>
                                                                    <div className="card-body aicard-content">
                                                                        <h2 className="card-title aicard-heading mb-2">Cardiovascular Risk</h2>
                                                                        <h3 className="price_was">WAS PKR <span>6,720</span></h3>
                                                                        <div className="price_main"><span>PKR</span>4,099</div>
                                                                        <h4 className="aicard-subtitle mb-2">
                                                                            <ul className="lab_bullets">
                                                                                <li>Cholesterol</li>
                                                                                <li>Triglycerides</li>
                                                                                <li>CRP (High Sensitivity)</li>
                                                                                <li>Fibrinogen</li>
                                                                            </ul>

                                                                        </h4>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row justify-content-between ">
                                                            <div className="col-md-3 col-12 mb-sm-4 mb-2 pb-4 pb-sm-4 px-2  load-more-column">
                                                                <div className="card ai-card h-100 p-3">
                                                                    <div className="imgbck colors1">
                                                                        <div className="off_in_heading inside_image_disc"><h3 className="off_in_heading_style">40% OFF</h3></div>
                                                                        <Image width={245} src={health5} height={258} className="" alt="Image 1" />

                                                                    </div>
                                                                    <div className="card-body aicard-content">
                                                                        <h2 className="card-title aicard-heading mb-2">Diabetes Adv. Profile</h2>
                                                                        <h3 className="price_was">WAS PKR <span>13,695</span></h3>
                                                                        <div className="price_main"><span>PKR</span>8,499</div>
                                                                        <h4 className="aicard-subtitle mb-2">
                                                                            <ul className="lab_bullets">
                                                                                <li>Electrolytes</li>
                                                                                <li>Creatinine Conventional Blood</li>
                                                                                <li>HBA1C</li>
                                                                                <li>Glucose Fasting</li>
                                                                            </ul>

                                                                        </h4>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3 col-12 mb-sm-4 mb-2 pb-4 pb-sm-4 px-2 load-more-column">
                                                                <div className="card ai-card h-100 p-3">
                                                                    <div className="imgbck colors2">
                                                                        <div className="off_in_heading inside_image_disc"><h3 className="off_in_heading_style">40% OFF</h3></div>
                                                                        <Image width={195} src={health6} height={258} className="" alt="Image 2" />

                                                                    </div>
                                                                    <div className="card-body aicard-content">
                                                                        <h2 className="card-title aicard-heading mb-2">Liver/Thyroid Profile</h2>
                                                                        <h3 className="price_was">WAS PKR <span>4,950</span></h3>
                                                                        <div className="price_main"><span>PKR</span>2,499</div>
                                                                        <h4 className="aicard-subtitle mb-2">
                                                                            <ul className="lab_bullets">
                                                                                <li>T3</li>
                                                                                <li>T4</li>
                                                                                <li>TSH</li>

                                                                            </ul>

                                                                        </h4>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3 col-12 mb-sm-4 mb-2 pb-4 pb-sm-4 px-2 load-more-column">
                                                                <div className="card ai-card h-100 p-3">
                                                                    <div className="imgbck colors4">
                                                                        <div className="off_in_heading inside_image_disc"><h3 className="off_in_heading_style">40% OFF</h3></div>
                                                                        <Image src={health7} width={243} height={258} className="" alt="Image 3" />

                                                                    </div>
                                                                    <div className="card-body aicard-content">
                                                                        <h2 className="card-title aicard-heading mb-2">Heart Profile</h2>
                                                                        <h3 className="price_was">WAS PKR <span>9,645</span></h3>
                                                                        <div className="price_main"><span>PKR</span>5,999</div>
                                                                        <h4 className="aicard-subtitle mb-2">
                                                                            <ul className="lab_bullets">
                                                                                <li>CBC</li>
                                                                                <li>Vitamin B12</li>
                                                                                <li>Folate (RBC)</li>
                                                                                <li>ESR</li>
                                                                            </ul>

                                                                        </h4>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3 col-12 mb-sm-4 mb-2 pb-4 pb-sm-4 px-2 load-more-column">
                                                                <div className="card ai-card h-100 p-3"><div className="imgbck colors3">
                                                                    <div className="off_in_heading inside_image_disc"><h3 className="off_in_heading_style">40% OFF</h3></div>
                                                                    <Image width={190} src={health8} height={258} className="" alt="Image 3" />

                                                                </div>
                                                                    <div className="card-body aicard-content">
                                                                        <h2 className="card-title aicard-heading mb-2">Cardiovascular Risk</h2>
                                                                        <h3 className="price_was">WAS PKR <span>4,140</span></h3>
                                                                        <div className="price_main"><span>PKR</span>2,499</div>
                                                                        <h4 className="aicard-subtitle mb-2">
                                                                            <ul className="lab_bullets">
                                                                                <li>Glucose Fasting</li>
                                                                                <li>Urine for Glucose</li>
                                                                                <li>HBA1C</li>
                                                                                <li>Microalbumin</li>
                                                                            </ul>

                                                                        </h4>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {!loadMoreClicked && (
                                                            <div id="load-more-button" className="text-center mt-4 d-sm-none">
                                                                <button className="btn btn-primary" onClick={loadMoreHandler}>Load More</button>
                                                            </div>
                                                        )}




                                                    </div>


                                                </div>

                                            </div>
                                        </section>
                                    </div>
                                </div>














                                <div className="container-xxl">


                                    <section id="aiMonitorWrapper" className="py-4 mt-4 py-sm-5 mt-sm-5">
                                        <div className="ai_monitor_container">
                                            <div className="aisec_container locations_container">

                                                <div className="sections_heading_block ">
                                                    <div className="section_heading_primary"><h2>Our Services</h2></div>
                                                    <div className="border_section_heading"></div>


                                                    {/* <!-- <div className="view_all sections_view_all_cta">
                    <div className="cta_section_button"><span><Image src="assets/img/headingsicon.svg"></span><a href="#">View All</a></div>
    
                    </div> --> */}
                                                </div>

                                                <div className="container cards_aisec_container py-5 mt-4 pb-0 health_boxes">
                                                    <div className="row justify-content-around mb-4">
                                                        <div className="col-md-3 mb-sm-4 mb-5 pb-4 pb-sm-4 ">
                                                            <div className="card ai-card h-100 p-3">
                                                                <div className="imgbck health_box_colors">
                                                                    <Image width={128} src={healthb1} className="mb-2" alt="Image 1" />
                                                                    <Image width={59} src={Shadow} className="" alt="Image 3" />

                                                                </div>
                                                                <div className="card-body aicard-content">
                                                                    <h2 className="card-title aicard-heading mb-4">Tele Consult </h2>
                                                                    <h4 className="aicard-subtitle mb-2">Start an instant video consultation within 2 minutes.</h4>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 mb-sm-4 mb-5 pb-4 pb-sm-4">
                                                            <div className="card ai-card h-100 p-3">
                                                                <div className="imgbck health_box_colors">
                                                                    <Image width={101} src={healthb2} className="mb-2" alt="Image 2" />
                                                                    <Image width={59} src={Shadow} className="" alt="Image 3" />

                                                                </div>
                                                                <div className="card-body aicard-content">
                                                                    <h2 className="card-title aicard-heading mb-4">Physical Consult</h2>
                                                                    <h4 className="aicard-subtitle mb-2">PMDC Verified doctors available onsite for all your medical needs.</h4>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 mb-sm-4 mb-5 pb-4 pb-sm-4">
                                                            <div className="card ai-card h-100 p-3">
                                                                <div className="imgbck health_box_colors">
                                                                    <Image width={143} src={healthb3} className="mb-2" alt="Image 3" />
                                                                    <Image width={59} src={Shadow} className="" alt="Image 3" />

                                                                </div>
                                                                <div className="card-body aicard-content">
                                                                    <h2 className="card-title aicard-heading mb-4">Pharmacy</h2>
                                                                    <h4 className="aicard-subtitle mb-2">Dispensing medications  with no waiting times and long queues.</h4>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 mb-sm-4 mb-5 pb-4 pb-sm-4">
                                                            <div className="card ai-card h-100 p-3"><div className="imgbck health_box_colors">
                                                                <Image width={113} src={healthb4} className="mb-2" alt="Image 3" />
                                                                <Image width={59} src={Shadow} className="" alt="Image 3" />

                                                            </div>
                                                                <div className="card-body aicard-content">
                                                                    <h2 className="card-title aicard-heading mb-4">Labs</h2>
                                                                    <h4 className="aicard-subtitle mb-2">Accurate test results using state-of-the-art equipment and techniques. </h4>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>

                                        </div>
                                    </section>

                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export const getServerSideProps = async ({ locale }) => {
    const langChecker = Cookies.get("lang");
    const apiLocale = locale === "ur" || langChecker == "2" ? 2 : 1;

    try {
        const response = await API.get(pharmacyEndpoint, {
            headers: {
                platform: "web",
                locale: apiLocale,
            },
        });

        let pageData = response?.data;

        if (response?.code === 200) {
            return {
                props: {
                    pageData,
                    ...(await serverSideTranslations(locale, ["common"])),
                },
            };
        } else {
            return { props: { pageData: {} } };
        }
    } catch (error) {
        return { props: { pageData: {} } };
    }
};

export default index
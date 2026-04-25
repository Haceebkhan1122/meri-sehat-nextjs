import React from "react";
import { Col, Container, Row } from "react-bootstrap";
// import paymentIcon from '../../../public/svg/paymenticon.svg'
import Image from "next/image";
import appStore from "../../public/png/apple123.png";
import appleStore from "../../public/svg/AppStoreDownload.svg";
import email from "../../public/svg/phone.svg";
import phone from "../../public/svg/email.svg";
import hiring from "../../public/png/hiring.png";
import iconRight from "../../public/png/icon-right.png";
import { wrapper } from "@/store/store";
import { Form, Input, Button, Select, Radio, Upload, Modal } from "antd";
import { useEffect, useState } from "react";
import { addTranslation } from "@/store/translationSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faYoutube,
  faLinkedin,
  faTwitter,
  faInstagram,
  faChevronRight,
} from "@fortawesome/free-brands-svg-icons";
import { contactUsPageFromServer, footerUrl } from "@/utils/endpoints";
import API from "@/utils/httpService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDispatch } from "react-redux";
import Loader from "@/components/Loader";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { hasFalsyValue } from "@/utils/utilFunctions";
import Cookies from "js-cookie";
import { MetaDataCustom } from "@/components/metaDataCustom";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function index(props) {
  const { contactUsData, _nextI18Next, footerData, cityData } = props;
  const [footer, setFooter] = useState({});
  const dispatch = useDispatch();
  const [uanNumber, setUanNumber] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [interestedInValue, setInterestedInValue] = useState("");
  const [apiLoader, setApiLoader] = useState(false);
  const [interestedError, setInterestedError] = useState("");
  const [formErrors, setFormErrors] = useState({
    nameRequiredError: "",
    nameAlphabetError: "",
    phoneRequiredError: "",
    phoneNumericError: "",
    phoneMaxError: "",
    phoneMinError: "",
    emailRequiredError: "",
    emailInvalidError: "",
    cityRequiredError: "",
    descriptionRequiredError: "",
    descriptionMaxError: "",
  });
  const [form] = Form.useForm();
  const router = useRouter();

  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

  useEffect(() => {
    if (footerUrl?.length > 0) {
      setFooter(footerData);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && footer?.length > 0) {
      setUanNumber(footer?.settings?.uan_number);
    }
  }, []);

  const initialLocale = _nextI18Next?.initialLocale;
  const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;

  useEffect(() => {
    if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
      dispatch(addTranslation(i18n));
    }
  }, [i18n]);

  const mixPanelTracking = () => {
    // mixpanel.track('Call Now', {
    //   Name: userDetailsInfo?.name,
    //   Email: userDetailsInfo?.email,
    //   Number: userDetailsInfo?.phone
    // });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const number = window.localStorage.getItem("uan_number");
      if (number) {
        setUanNumber(number);
      }
    }
  }, []);

  const insterestedIn = [
    {
      value: i18nData?.product_subscription_support,
      id: 1,
    },
    {
      value: i18nData?.account_support,
      id: 2,
    },
    {
      value: i18nData?.doctor_billing,
      id: 3,
    },
    {
      value: i18nData?.refund_request,
      id: 4,
    },
    {
      value: i18nData?.press_marketing_queries,
      id: 5,
    },
    {
      value: i18nData?.partnership_business_management,
      id: 6,
    },
    {
      value: i18nData?.careers,
      id: 7,
    },
  ];

  const onChange = (e) => {
    // console.log(`radio checked:${e.target.value}`);
    setInterestedInValue(e.target.value);
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleBeforeUpload = () => {
    // Prevent the file from being uploaded to the server
    return false;
  };

  // console.log({ fileList })

  const uploadButton = (
    <div>
      <div
        style={{
          marginTop: 8,
        }}
      >
        <span className="for_dard">{i18nData?.add_file}</span>{" "}
        {i18nData?.drop_file}
      </div>
    </div>
  );

  // function fileRequiredValidator() {
  //     if(fileList.length > 0) {
  //         return Promise.resolve();
  //     }

  //     else {
  //         Promise.reject("File is required.");
  //     }
  // }

  async function handleContactForm(e) {
    e.preventDefault();

    setInterestedError("");

    const values = form.getFieldsValue();

    try {
      await form.validateFields();

      if (!interestedInValue) {
        if (router.locale == "en")
          setInterestedError("Please choose an area of interest.");
        else setInterestedError("براہ کرم دلچسپی کا ایک حصہ منتخب کریں۔");
        return;
      }

      const payload = {
        name: values?.name,
        email: values?.email,
        phone_number: values?.phone,
        note: values?.description,
        city_id: values?.city,
        file: fileList?.[0]?.originFileObj,
        interested_in: interestedInValue,
      };

      try {
        setApiLoader(true);
        const response = await API.post("/contact-us-form", payload);
        setApiLoader(false);
      } catch (error) {
        setApiLoader(false);
        // console.log(error);
      }
    } catch (error) {
      if (!interestedInValue) {
        if (router.locale == "en")
          setInterestedError("Please choose an area of interest.");
        else setInterestedError("براہ کرم دلچسپی کا ایک حصہ منتخب کریں۔");
        return;
      }
    }
  }

  useEffect(() => {
    if (router.locale == "en") {
      setFormErrors({
        nameRequiredError: "Please enter your name",
        nameAlphabetError: "Name must contain alphabets.",
        phoneRequiredError: "Please enter your phone number",
        phoneNumericError: "Phone number should only contain numeric values",
        phoneMaxError: "Phone number cannot exceed 11 characters",
        phoneMinError: "Phone number should contain 11 numbers",
        emailRequiredError: "Please enter your email",
        emailInvalidError: "Email is invalid",
        cityRequiredError: "Please select City",
        descriptionRequiredError: "Please enter a description",
        descriptionMaxError: "Description should not exceed 500 characters",
      });
    } else {
      setFormErrors({
        nameRequiredError: "براہ مہربانی اپنا نام درج کریں",
        nameAlphabetError: "نام میں حروف تہجی ہونی چاہئیں",
        phoneRequiredError: "براہ کرم اپنا فون نمبر درج کریں۔",
        phoneNumericError: "فون نمبر میں صرف عددی اقدار ہونی چاہئیں",
        phoneMaxError: "فون نمبر 11 حروف سے زیادہ نہیں ہو سکتا",
        phoneMinError: "فون نمبر میں 11 نمبر ہونے چاہئیں",
        emailRequiredError: "براہ کرم اپنا ای میل درج کریں۔",
        emailInvalidError: "ای میل غلط ہے",
        cityRequiredError: "براہ کرم شہر کا انتخاب کریں۔",
        descriptionRequiredError: "براہ کرم ایک تفصیل درج کریں۔",
        descriptionMaxError: "تفصیل 500 حروف سے زیادہ نہیں ہونی چاہیے۔",
      });
    }
  }, [router.locale]);

  return (
    <>
      <MetaDataCustom metaData={contactUsData} />
      <div className={`${initialLocale === "ur" ? "contact_self_urdu" : ""}`}>
        {(apiLoader || hasFalsyValue(formErrors)) && <Loader />}
        <section className="contact_us forResponsiveContact mt-80">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="box_top">
                  <Row>
                    <Col lg={5}>
                      <h2 class="mb-3 loveTopHelp">{i18n?.love_to_help}</h2>
                      <p className="reach_out">{i18n?.reach_out}</p>
                      <div className="download_buttons">
                        <p className="mt-4">{i18n?.download_our_app_today}</p>
                        <div style={{ display: "flex" }} className="mt-2">
                          <a
                            target="_blank"
                            href="https://apps.apple.com/us/app/meri-sehat/id1643174046"
                          >
                            <Image
                              src={appleStore}
                              alt="logo"
                              className="img-fluid me-3 btn-apple "
                            />
                          </a>
                          <a
                            target="_blank"
                            href="https://play.google.com/store/apps/details?id=pk.merisehat.app"
                          >
                            <Image
                              src={appStore}
                              alt="logo"
                              className="img-fluid btn-apple"
                            />
                          </a>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="contact_us_bottom mt-3">
          <Container>
            <Row className="rtl">
              <Col lg={5} className="reach_uss">
                <div className="ms-7">
                  <h3 className="mt-3 mb-4 reach_head">
                    {i18n?.you_can_also_reach_us_at}
                  </h3>
                  <ul className="contact_list">
                    <li className="d-flex">
                      <div className="box_icon">
                        <Image src={email} alt="email"></Image>
                      </div>
                      <p>
                        {" "}
                        {footer?.settings?.email && (
                          <a href="mailto:help@merisehat.pk">
                            {footer?.settings?.email}
                          </a>
                        )}
                      </p>
                    </li>
                    <li className="d-flex">
                      <div className="box_icon ">
                        <Image src={phone} alt="phone"></Image>
                      </div>
                      <p className="urdu_flex">
                        {uanNumber && (
                          <p className="footerColumn">
                            <a
                              onClick={mixPanelTracking}
                              href={`tel:${uanNumber}`}
                            >
                              {uanNumber}
                            </a>
                          </p>
                        )}
                      </p>
                    </li>
                  </ul>
                  <div dir="auto" className="social_icon_contact">
                    {footer?.settings?.facebook_link && (
                      <a
                        target="_blank"
                        // href="https://www.facebook.com/MeriSehat.pk"
                        href={footer?.settings?.facebook_link}
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon icon={faFacebookF} />
                      </a>
                    )}
                    {footer?.settings?.instagram_link && (
                      <a
                        target="_blank"
                        // href="https://www.instagram.com/merisehat.pk"
                        href={footer?.settings?.instagram_link}
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    )}
                    {footer?.settings?.youtube_link && (
                      <a
                        target="_blank"
                        // href="https://www.youtube.com/merisehat"
                        href={footer?.settings?.youtube_link}
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon icon={faYoutube} />
                      </a>
                    )}
                    {footer?.settings?.twitter_link && (
                      <a
                        target="_blank"
                        className="TwitterBg"
                        // href="https://www.youtube.com/merisehat"
                        href={footer?.settings?.twitter_link}
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    )}
                    {footer?.settings?.lindedin_link && (
                      <a
                        target="_blank"
                        className="LinkedinBg"
                        // href="https://www.youtube.com/merisehat"
                        href={footer?.settings?.lindedin_link}
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon icon={faLinkedin} />
                        <i class="fa-brands fa-linkedin-in"></i>
                      </a>
                    )}
                  </div>
                </div>
                {/* zohaib PM instructed to hide this 'WE ARE HIRING' section */}
                <div className="we_are_hiring d-none d-flex mt-5 ms-md-5">
                  <div>
                    <Image
                      alt="hiring"
                      src={hiring}
                      className="img-fluid mt_15"
                    ></Image>
                  </div>
                  <div className="d-flex align-items-center ms-4">
                    <div className="me-5">
                      <h3 className="fs-4 fw-700 lh-sm">WE ARE HIRING</h3>
                      <p className="fs-5 lh-sm">Join our team now</p>
                    </div>
                    <div>
                      <Image
                        src={iconRight}
                        className=" arrow_hk_f img-fluid"
                      ></Image>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={7}>
                <div className="box_form_contact">
                  <Form form={form} onFinish={handleContactForm}>
                    <Row>
                      <Col md={12}>
                        <div className="intereste_area mb-3">
                          <h3>{i18n?.interested_in}</h3>
                          <Radio.Group onChange={onChange}>
                            {insterestedIn?.length > 0 &&
                              insterestedIn?.map((item) => {
                                return (
                                  <>
                                    <Radio.Button value={item?.id}>
                                      {item?.value}
                                    </Radio.Button>
                                  </>
                                );
                              })}
                          </Radio.Group>
                          {interestedError && (
                            <p className="ant-form-item-explain-error">
                              {" "}
                              {interestedError}{" "}
                            </p>
                          )}
                        </div>
                      </Col>
                      <Col lg={6}>
                        <Form.Item
                          label={i18n?.name_steric}
                          name="name"
                          rules={[
                            {
                              required: true,
                              message: formErrors.nameRequiredError,
                            },
                            {
                              pattern: /^[a-zA-z]/,
                              message: formErrors.nameAlphabetError,
                            },
                          ]}
                        >
                          <Input placeholder={i18nData?.enter_name} />
                        </Form.Item>
                      </Col>
                      <Col lg={6}>
                        <Form.Item
                          label={i18n?.mobile_number}
                          name="phone"
                          rules={[
                            {
                              required: true,
                              message: formErrors.phoneRequiredError,
                            },
                            {
                              pattern: /^\d+$/,
                              message: formErrors.phoneNumericError,
                            },
                            {
                              max: 11,
                              message: formErrors.phoneMaxError,
                            },
                            {
                              min: 11,
                              message: formErrors.phoneMinError,
                            },
                          ]}
                        >
                          <Input
                            placeholder={i18nData?.enter_your_mobile_number}
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={6}>
                        <Form.Item
                          label={i18n?.email}
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: formErrors.emailRequiredError,
                            },
                            {
                              type: "email",
                              message: formErrors.emailInvalidError,
                            },
                          ]}
                        >
                          <Input placeholder={i18nData?.enter_email} />
                        </Form.Item>
                      </Col>
                      <Col lg={6} className="citynew">
                        <Form.Item
                          label={i18nData?.city}
                          name="city"
                          rules={[
                            {
                              required: true,
                              message: formErrors.cityRequiredError,
                            },
                          ]}
                        >
                          <Select
                            placeholder={i18nData?.select_city}
                            showSearch={true}
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                              return option.children?.[1]
                                ?.toString()
                                .toLowerCase()
                                .startsWith(input.toLowerCase());
                            }}
                          >
                            {cityData?.map((city) => (
                              <Select.Option key={city?.id} value={city?.id}>
                                {router.locale == "en"
                                  ? city?.name
                                  : city?.name_ur}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col lg={12}>
                        <Form.Item
                          label=""
                          name="description"
                          rules={[
                            {
                              required: true,
                              message: formErrors.descriptionRequiredError,
                            },
                            {
                              max: 500,
                              message: formErrors.descriptionMaxError,
                            },
                          ]}
                        >
                          <Input.TextArea
                            rows={5}
                            placeholder={i18nData?.leave_message}
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={6}></Col>
                    </Row>
                    <Upload
                      listType="picture-circle"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      multiple={false}
                      beforeUpload={handleBeforeUpload}
                    >
                      {fileList.length === 1 ? null : uploadButton}
                    </Upload>
                    {/* </Form.Item> */}
                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <Image
                        alt="example"
                        width={100}
                        height={100}
                        style={{
                          width: "100%",
                        }}
                        src={previewImage}
                      />
                    </Modal>
                    <Form.Item className="mt-4">
                      <Button
                        type="primary"
                        disabled={apiLoader}
                        onClick={handleContactForm}
                        className="simple_btn"
                      >
                        {i18nData?.submit_btn}
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ locale }) => {
      const langChecker = Cookies.get("lang");
      const apiLocale = locale === "ur" || langChecker == "2" ? 2 : 1;
      const response = await API.get(footerUrl);
      const data = response.data;

      const cityResponse = await API.get("/cities");
      const cityData = cityResponse.data;

      const contactUsData = await API.get(contactUsPageFromServer, {
        headers: {
          platform: "web",
          locale: apiLocale,
        },
      });

      const contactUsDataContent = contactUsData?.data;

      return {
        props: {
          contactUsData: contactUsDataContent,
          footerData: data,
          cityData,
          ...(await serverSideTranslations(locale, ["common"])),
        },
      };
    }
);

export default index;

import { useEffect, useState } from "react";
import styles from "./careerForm.module.scss";
import { Form, Input, Button, Upload } from "antd";
import jobImage from "../../../public/svg/jobimage01.svg";
import Image from "next/image";
import { APIV3 } from "../../../utils/httpService";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Loader";
import { useRouter } from "next/router";

function careerForm({ jobDetails }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [apiLoader, setApiLoader] = useState(false);
  const router = useRouter();

  const handleBeforeUpload = (file) => {
    const isPDF = file.type === "application/pdf";
    const isDoc = file.type.includes("word");
    if (!isPDF && !isDoc) {
      toast.error("You can only upload PDF or Word files!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (!fileList || fileList.length === 0 || !fileList[0].originFileObj) {
        toast.error("Please upload your CV!");
        return;
      }
      setApiLoader(true);
      const formData = new FormData();
      formData.append("job_id", jobDetails?.id);
      formData.append("name", values.name.trim());
      formData.append("email", values.email.trim());
      formData.append("phone", values.phone.trim());
      formData.append("resume", fileList[0].originFileObj);
      const res = await APIV3.post(`/careers/submit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res?.status == 200) {
        toast.success("Application submitted successfully!");
        form.resetFields();
        setFileList([]);
        router.push("/careers");
      }
    } catch (error) {
      console.error(error);
      //   message.error("Something went wrong. Please try again!");
    } finally {
      setApiLoader(false);
    }
  };

  const uploadButton = (
    <div className="boxUpload">
      <p className="d-flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="22"
          viewBox="0 0 12 22"
          fill="none"
        >
          <path
            d="M10 5.00024V16.5002C10 18.7102 8.21 20.5002 6 20.5002C3.79 20.5002 2 18.7102 2 16.5002V4.00024C2 2.62024 3.12 1.50024 4.5 1.50024C5.88 1.50024 7 2.62024 7 4.00024V14.5002C7 15.0502 6.55 15.5002 6 15.5002C5.45 15.5002 5 15.0502 5 14.5002V5.00024H3.5V14.5002C3.5 15.8802 4.62 17.0002 6 17.0002C7.38 17.0002 8.5 15.8802 8.5 14.5002V4.00024C8.5 1.79024 6.71 0.000244141 4.5 0.000244141C2.29 0.000244141 0.5 1.79024 0.5 4.00024V16.5002C0.5 19.5402 2.96 22.0002 6 22.0002C9.04 22.0002 11.5 19.5402 11.5 16.5002V5.00024H10Z"
            fill="#0F345A"
          />
        </svg>
        Attach CV
      </p>
    </div>
  );

  return (
    <>
      {apiLoader == true ? (
        <Loader />
      ) : (
        <div className={`${styles.formCareer} formCareer`}>
          <div className={styles.topBox}>
            <div className={styles.imageBox}>
              <Image src={jobImage} className="img-fluid" alt="Career" />
            </div>
            <div className={styles.contBox}>
              <h3>Come Join Us</h3>
              <p>Enter your details</p>
            </div>
          </div>

          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please enter your name" },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: "Name cannot contain numbers",
                },
              ]}
              className={`${styles.spa01}`}
            >
              <Input
                addonBefore={
                  <img
                    src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cg clip-path='url(%23clip0_6818_87971)'%3E%3Cpath d='M12 12.0002C14.21 12.0002 16 10.2102 16 8.00024C16 5.79024 14.21 4.00024 12 4.00024C9.79 4.00024 8 5.79024 8 8.00024C8 10.2102 9.79 12.0002 12 12.0002ZM12 14.0002C9.33 14.0002 4 15.3402 4 18.0002V20.0002H20V18.0002C20 15.3402 14.67 14.0002 12 14.0002Z' fill='%2397A9BD'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_6818_87971'%3E%3Crect width='24' height='24' fill='white' transform='translate(0 0.000244141)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E`}
                    alt="icon"
                    style={{ width: 24, height: 24 }}
                  />
                }
                maxLength={50}
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              className={`${styles.spa01}`}
              rules={[
                { required: true, message: "Please enter your phone number" },
                {
                  pattern: /^(92\d{9}|03\d{9})$/,
                  message:
                    "Enter valid phone number (must be 11 digits starting with 92 or 03)",
                },
              ]}
            >
              <Input
                addonBefore={
                  <img
                    src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M21.1409 21.932C19.0276 21.932 16.9397 21.4713 14.8771 20.5499C12.8146 19.6286 10.938 18.3226 9.24736 16.6319C7.55674 14.9413 6.25073 13.0647 5.32935 11.0022C4.40796 8.93962 3.94727 6.8517 3.94727 4.73843C3.94727 4.43412 4.0487 4.18053 4.25158 3.97765C4.45445 3.77478 4.70804 3.67334 5.01236 3.67334H9.12056C9.35725 3.67334 9.56857 3.75364 9.75454 3.91425C9.94051 4.07486 10.0504 4.26506 10.0842 4.48484L10.7436 8.03514C10.7774 8.30564 10.7689 8.53387 10.7182 8.71984C10.6675 8.90581 10.5745 9.06641 10.4392 9.20166L7.97939 11.6869C8.31752 12.3124 8.71904 12.9168 9.18396 13.5001C9.64888 14.0833 10.1603 14.6455 10.7182 15.1865C11.2423 15.7105 11.7917 16.1966 12.3665 16.6446C12.9414 17.0926 13.55 17.5026 14.1924 17.8745L16.5762 15.4908C16.7283 15.3386 16.927 15.2245 17.1721 15.1484C17.4173 15.0723 17.6582 15.0512 17.8949 15.085L21.3945 15.7951C21.6311 15.8627 21.8256 15.9853 21.9777 16.1628C22.1299 16.3403 22.2059 16.5389 22.2059 16.7587V20.8669C22.2059 21.1712 22.1045 21.4248 21.9016 21.6277C21.6988 21.8306 21.4452 21.932 21.1409 21.932ZM7.01574 9.75957L8.68945 8.08586L8.25834 5.70208H6.00137C6.0859 6.39524 6.20424 7.07994 6.3564 7.75618C6.50855 8.43243 6.72833 9.10023 7.01574 9.75957ZM16.0944 18.8382C16.7537 19.1256 17.4257 19.3538 18.1104 19.5229C18.7951 19.692 19.4841 19.8018 20.1772 19.8526V17.6209L17.7934 17.1391L16.0944 18.8382Z' fill='%2397A9BD'/%3E%3C/svg%3E`}
                    alt="icon"
                    style={{ width: 24, height: 24 }}
                  />
                }
                maxLength={11}
                placeholder="Phone Number"
              />
            </Form.Item>

            <Form.Item
              name="email"
              className={` ${styles.spa01}`}
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input
                addonBefore={
                  <img
                    src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cg clip-path='url(%23clip0_6818_87978)'%3E%3Cpath d='M20 4.00024H4C2.9 4.00024 2.01 4.90024 2.01 6.00024L2 18.0002C2 19.1002 2.9 20.0002 4 20.0002H20C21.1 20.0002 22 19.1002 22 18.0002V6.00024C22 4.90024 21.1 4.00024 20 4.00024ZM20 18.0002H4V8.00024L12 13.0002L20 8.00024V18.0002ZM12 11.0002L4 6.00024H20L12 11.0002Z' fill='%2397A9BD'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_6818_87978'%3E%3Crect width='24' height='24' fill='white' transform='translate(0 0.000244141)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E`}
                    alt="icon"
                    style={{ width: 24, height: 24 }}
                  />
                }
                placeholder="Email"
              />
            </Form.Item>
            <div className={styles.btnRow}>
              <Upload
                listType="picture-circle"
                fileList={fileList}
                onChange={handleChange}
                multiple={false}
                beforeUpload={handleBeforeUpload}
              >
                {fileList.length === 1 ? null : uploadButton}
              </Upload>

              <div className={styles.submitBtn}>
                <Button
                  type="primary"
                  // loading={loading}
                  onClick={handleSubmit}
                >
                  Apply
                </Button>
              </div>
            </div>
          </Form>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      )}
    </>
  );
}

export default careerForm;

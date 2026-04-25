import { Row, Col, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
// import './Notifications.css'
import BlueNotificationBell from '../../public/svg/blueNotification.svg';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { BsCheckCircle } from 'react-icons/bs';
import { APIV3 } from "@/utils/httpService";
import Loader from '../../components/Loader';
import Cookies from 'js-cookie'
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';
import { downloadPrescription } from "@/utils/utilFunctions";


const Notifications = (props) => {
  const [openTabDefault, setOpenTabDefault] = useState(null);

  useEffect(() => {
    const defaultOpenTab = sessionStorage.getItem('defaultOpenTab');
    setOpenTabDefault(defaultOpenTab)
  }, [])

  const [value, setValue] = React.useState(openTabDefault ? 'unread' : 'all');
  const [notificationData, setNotificationData] = useState([]);
  const [markAsReadSignal, setMarkAsReadSignal] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = () => {
    const Authorization = Cookies.get('Authorization') ? Cookies.get('Authorization') : 0;

    const options = {
      headers: { 'Authorization': Authorization }
    };

    APIV3.get(`/notifications?page=${page}`, options)
      .then((res) => {
        setNotificationData([...notificationData, ...res?.data?.data?.notifications]);
        setPage((prevPage) => prevPage + 1);
      });
  };

  useEffect(() => {
    fetchData();
  }, [markAsReadSignal]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const markNotificationAsRead = async (e, notification_id) => {


    if (!notification_id) {
      try {
        const response = await APIV3.get(
          `/markRead-notifications/999?mark_all=true`
        );

        if (response?.status == 200) {
          setMarkAsReadSignal(true);
        }
      } catch (error) { }
    } else {
      try {
        const response = await APIV3.get(
          `/markRead-notifications/${notification_id}`
        );

        if (response?.status == 200) {
          setMarkAsReadSignal(true);
        }
      } catch (error) { }
    }
  };


  const handleNotificationsFunc = (item) => {
    if (item?.type == "prescription_for_patient") {
      downloadPrescription(item?.appointment_id)
    } else if (item?.type == 'insurance_pending' || item?.type == 'insurance_approved' || item?.type == 'insurance_rejected') {
      Cookies.set('receiptId', item?.claim_id)
      window.location.href = `${item?.redirect_link}`
    }
    // else if (item?.type == 'transaction_completed' || item?.type == 'transaction_fail') {
    //   window.location.href = `${item?.redirect_link}`
    // }
    else {
      window.location.href = `${item?.redirect_link}`
    }
  }


  return (
    // <Layouts>
    <section className="notifications_wrapper">
      <Container>
        {apiLoading ? (
          <Loader />
        ) : (
          <Row className="justify-content-center">
            <Col md={9} className='inner_wrap mb-5'>
              <h3 className="line-height-20">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                    <g clip-path="url(#clip0_130_75844)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M25 14.25H9.75L16.75 7.25L15 5.5L5 15.5L15 25.5L16.75 23.75L9.75 16.75H25V14.25Z" fill="#0F345A" />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_75844">
                        <rect width="30" height="30" fill="white" transform="translate(0 0.5)" />
                      </clipPath>
                    </defs>
                  </svg></span>
                Notifications</h3>
              <div className="card mainCardNotification">
                <div>
                  <Box>
                    <TabContext value={value}>
                      <div className="d-flex align-items-center justify-content-between ps-0 p-3 pb-0 border-btm">
                        <Box className="notifications-tabss">
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="secondary tabs example"
                          >
                            <Tab value="all" label="All" />
                            <Tab value="unread" label="Unread" />
                          </Tabs>
                        </Box>
                        <div className="d-flex align-items-center markasread" style={{ cursor: 'pointer' }} onClick={(e) => markNotificationAsRead(e)} >
                          <p className="mark_noti">
                            Mark all as read
                          </p>
                          <BsCheckCircle />
                        </div>
                      </div>
                      <TabPanel value="all" style={{ padding: '0px' }}>
                        <InfiniteScroll
                          dataLength={notificationData?.length ? notificationData?.length : null}
                          next={() => {
                            fetchData()
                          }}
                          hasMore={true}
                        >
                          {notificationData?.length > 0 ? notificationData?.map((item) => (
                            <div className="innerCardNotification ps-0 p-4 border-bottom" style={{ cursor: 'pointer' }} onClick={(e) => { markNotificationAsRead(e, item?.id); handleNotificationsFunc(item); }}>
                              <div className="unreadNotifications d-flex align-items-center wraper_notifica">
                                {item?.read_status == 0 && (
                                  <div className="newNotificationCircle position-relative">
                                    <Image src={item?.icon ? item?.icon : ''} width={48} height={50} />
                                  </div>
                                )}
                                {item?.read_status == 1 && <Image src={item?.icon ? item?.icon : ''} width={48} height={50} />}
                                <div className="detailsNotifications">
                                  <a className="fs-14 color-313131">
                                    <strong className="fw-400 color-404040">
                                      {item?.title}:
                                    </strong>
                                    <span style={{ marginLeft: '4px' }} >
                                      {item?.text}

                                    </span>
                                  </a>
                                </div>
                                <div className='paymentStatus'>
                                  {item?.status_icon && (
                                    <Image src={item?.status_icon ? item?.status_icon : ''} width={28} height={28} />
                                  )}
                                </div>
                              </div>
                            </div>
                          )) : null}
                        </InfiniteScroll>
                      </TabPanel>
                      <TabPanel value="unread" style={{ padding: '0px' }}>
                        {notificationData?.filter((n) => n?.read_status !== 0) ? (
                          <>
                            <div className="d-flex unreadNotifications">
                              <div className='text-center py-3 px-4'>
                                <p style={{ color: '#0F345A' }}> No unread messages</p>
                              </div>
                            </div>
                          </>
                        ) : ''}
                        {notificationData?.filter((n) => n?.read_status == 0)?.map((item) => (
                          <div className="innerCardNotification p-4 border-bottom" style={{ cursor: 'pointer' }} onClick={(e) => { markNotificationAsRead(e, item?.id); handleNotificationsFunc(item); }}>
                            <div className="d-flex unreadNotifications">
                              <div className="newNotificationCircle position-relative"></div>
                              <div className="bellIcons">
                                <Image src={BlueNotificationBell} />
                              </div>
                              <div className="detailsNotifications">
                                <a onClick={() => handleNotificationsFunc(item)} className="fs-14 color-313131">
                                  <strong className="fw-400 color-404040">
                                    {item?.title}:
                                  </strong>
                                  <span style={{ marginLeft: '4px' }}>
                                    {item?.sub_title}
                                  </span>
                                </a>
                              </div>
                              <div className='paymentStatus'>
                                {item?.status_icon && (
                                  <Image src={item?.status_icon ? item?.status_icon : ''} width={28} height={28} />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </TabPanel>
                    </TabContext>
                  </Box>
                </div>
              </div>
            </Col>
          </Row>
        )}

      </Container>
    </section>
    // </Layouts>
  );
};
export default Notifications;
